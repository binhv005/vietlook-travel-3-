import { useMemo } from 'react'

// Khối chỉ chứa ảnh (không có chữ): <p>/<div>/<figure> gồm <img>, có thể bọc trong <a>.
const isImageBlock = (el) =>
  /^(P|DIV|FIGURE)$/.test(el.tagName) && el.querySelector('img') && !el.textContent.trim()

// Tiêu đề mục cho mục lục: h2/h3, hoặc đoạn chỉ gồm chữ đậm ngắn (bài nhập từ WordPress hay dùng <p><strong> làm tiêu đề).
const isBoldHead = (el) => {
  const text = el.textContent.trim()
  return el.tagName === 'P' && text.length >= 8 && text.length <= 120 && /\s/.test(text) && text === el.querySelector('strong, b')?.textContent.trim()
}

// Chuẩn hoá nội dung gốc: gắn id cho tiêu đề mục (mục lục), gom ảnh liền nhau thành lưới 2 ảnh/hàng (.wp-gallery),
// Inclusion/Exclusion thành 2 cột, bọc bảng. Trả về { html, headings, words }.
export function prepareContent(html) {
  if (!html || typeof DOMParser === 'undefined') return { html, headings: [], words: 0 }
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const body = doc.body
  const headings = []
  body.querySelectorAll('h2, h3, p').forEach((el) => {
    if (el.tagName === 'P' && !isBoldHead(el)) return
    const text = el.textContent.trim()
    if (!text || /inclu|exclu|policy|price/i.test(text)) return
    el.id = `sec-${headings.length + 1}`
    el.classList.add('scroll-mt-28')
    headings.push({ id: el.id, text })
  })
  const words = body.textContent.trim().split(/\s+/).length
  let run = []
  const flush = () => {
    const imgs = run.flatMap((el) => [...el.querySelectorAll('img')].map((img) => (img.parentElement.tagName === 'A' ? img.parentElement : img)))
    if (imgs.length >= 2) {
      const grid = doc.createElement('div')
      grid.className = 'wp-gallery'
      imgs.forEach((x) => grid.appendChild(x))
      run[0].before(grid)
      run.forEach((el) => el.remove())
    }
    run = []
  }
  ;[...body.children].forEach((el) => (isImageBlock(el) ? run.push(el) : flush()))
  flush()
  // Cặp "Inclusion + danh sách" / "Exclusion + danh sách" liền nhau → 2 cột (.wp-cols).
  const isListHead = (el) =>
    el &&
    /inclu|exclu|not included/i.test(el.textContent) &&
    (/^H[2-6]$/.test(el.tagName) || (el.tagName === 'P' && el.textContent.trim() === el.querySelector('strong, b')?.textContent.trim())) &&
    /^(UL|OL)$/.test(el.nextElementSibling?.tagName)
  let blocks = []
  const flushCols = () => {
    if (blocks.length >= 2) {
      const cols = doc.createElement('div')
      cols.className = 'wp-cols'
      blocks[0][0].before(cols)
      blocks.forEach((pair) => {
        const col = doc.createElement('div')
        pair.forEach((x) => col.appendChild(x))
        cols.appendChild(col)
      })
    }
    blocks = []
  }
  for (let el = body.firstElementChild; el; ) {
    if (isListHead(el)) {
      const list = el.nextElementSibling
      const next = list.nextElementSibling
      blocks.push([el, list])
      el = next
    } else {
      flushCols()
      el = el.nextElementSibling
    }
  }
  flushCols()
  // Bảng: bọc khung cuộn ngang (mobile không ép vỡ bảng); ô chữ ngắn (vd. "3 pax") giữ trên 1 dòng.
  body.querySelectorAll('table').forEach((table) => {
    const wrap = doc.createElement('div')
    wrap.className = 'wp-table'
    table.before(wrap)
    wrap.appendChild(table)
    table.querySelectorAll('td, th').forEach((cell) => {
      if (cell.textContent.trim().length <= 14) cell.classList.add('nowrap')
    })
  })
  return { html: body.innerHTML, headings, words }
}

// Nội dung nhập từ vietlooktravel.com (đã lọc thẻ/thuộc tính không an toàn khi nhập).
// prepared: kết quả prepareContent đã tính sẵn ở trang cha (để dùng chung cho mục lục).
export default function WpContent({ html, prepared }) {
  const out = useMemo(() => prepared ?? prepareContent(html).html, [html, prepared])
  return <div className="wp-content" dangerouslySetInnerHTML={{ __html: out }} />
}
