// Ảnh đáp ứng: mỗi ảnh .webp trong /img, /vl, /l1, /l3 có thêm bản -640.webp và -1024.webp (tạo sẵn khi build ảnh),
// để trình duyệt tải bản vừa khung thay vì ảnh 1920px (PageSpeed mobile).
const RESPONSIVE = /^\/(img|vl|l1|l3)\/.+(?<!-640|-1024)\.webp$/

export const sized = (src, w) => (src && RESPONSIVE.test(src) ? src.replace(/\.webp$/, `-${w}.webp`) : src)

export const srcSet = (src) => (src && RESPONSIVE.test(src) ? `${sized(src, 640)} 640w, ${sized(src, 1024)} 1024w, ${src} 1920w` : undefined)

// sizes dùng chung (giá trị khởi đầu; autoSizes chỉnh lại theo khung thật)
export const CARD = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
export const FULL = '100vw'

// Ảnh object-fit: cover trong khung khác tỉ lệ (ô dọc chứa ảnh ngang, nền tràn màn hình…) cần bản rộng hơn bề ngang khung.
// Tính bề rộng thật cần = max(rộng khung, cao khung × tỉ lệ ảnh) rồi đặt lại sizes để trình duyệt chọn đúng bản ảnh.
// Kích thước khung lấy từ ResizeObserver (không tự đọc layout → không buộc reflow); chạy cả trước khi ảnh lazy tải
// (tạm đoán tỉ lệ 3:2) để trình duyệt chọn ngay bản vừa khung thay vì bản theo sizes mặc định rồi tải lại.
export function autoSizes() {
  const box = new WeakMap()
  const fix = (img) => {
    const b = box.get(img)
    if (!img.srcset || !b || !b.width || !b.height) return
    const w = +img.getAttribute('width'), h = +img.getAttribute('height')
    const ratio = img.naturalWidth ? img.naturalWidth / img.naturalHeight : w && h ? w / h : 1.5
    const cover = img.classList.contains('object-cover')
    const need = Math.ceil(cover ? Math.max(b.width, b.height * ratio) : b.width)
    const cur = parseInt(img.dataset.need || '0', 10)
    if (need > cur) {
      img.dataset.need = need
      img.sizes = `${need}px`
    }
  }
  const ro = new ResizeObserver((entries) => entries.forEach((e) => {
    box.set(e.target, e.contentRect)
    fix(e.target)
  }))
  const watch = (img) => {
    if (img.dataset.sized) return
    img.dataset.sized = '1'
    ro.observe(img)
    if (!img.complete) img.addEventListener('load', () => fix(img), { once: true })
  }
  document.querySelectorAll('img[srcset]').forEach(watch)
  new MutationObserver(() => document.querySelectorAll('img[srcset]:not([data-sized])').forEach(watch)).observe(document.body, { childList: true, subtree: true })
}
