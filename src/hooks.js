import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DEFAULT_DESC =
  'Vietlook Travel – local Vietnam tour operator & DMC since 2009. Tours across all of Vietnam, private car hire with English & Chinese-speaking drivers, visa and airport fast-track.'
const DEFAULT_IMG = '/img/tour/bai-tranh-beach-1.webp'

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

// Title, description và OG riêng cho từng trang (docs mục 3 – SEO).
// Lưu ý: bản demo là SPA nên thẻ được cập nhật phía trình duyệt; bản chính thức cần SSR để crawler đọc được.
export function usePageTitle(title, { desc = DEFAULT_DESC, image = DEFAULT_IMG } = {}) {
  useEffect(() => {
    if (!title) return
    const url = window.location.origin + window.location.pathname
    const img = image.startsWith('http') ? image : window.location.origin + image
    document.title = title
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:image', img)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:card', 'summary_large_image')
  }, [title, desc, image])
}

// Form demo: chưa có backend, gửi xong chuyển sang trang cảm ơn.
// Đẩy sự kiện vào dataLayer để GTM/GA4/Google Ads đo chuyển đổi (docs mục 3).
export function useThankYouSubmit(formName = 'lead') {
  const navigate = useNavigate()
  return (e) => {
    e.preventDefault()
    const form = e.currentTarget?.getAttribute?.('data-form') || formName
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'form_submit', form_name: form, page_path: window.location.pathname })
    navigate('/thank-you', { state: { form } })
  }
}
