// Gắn GTM / GA4 khi có ID trong biến môi trường (.env – xem .env.example).
// Consent Mode v2 mặc định "denied" được khai báo sẵn trong index.html.
const GTM_ID = import.meta.env.VITE_GTM_ID
const GA4_ID = import.meta.env.VITE_GA4_ID

function loadScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

export function initTracking() {
  window.dataLayer = window.dataLayer || []
  if (GTM_ID) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`)
  } else if (GA4_ID) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`)
    window.gtag('js', new Date())
    window.gtag('config', GA4_ID, { send_page_view: false })
  }
}

// SPA: báo page_view mỗi lần đổi route.
export function trackPageView(path) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'page_view', page_path: path, page_title: document.title })
  if (!GTM_ID && GA4_ID && window.gtag) window.gtag('event', 'page_view', { page_path: path, page_title: document.title })
}

// Trang cảm ơn: sự kiện chuyển đổi cho Google Ads / GA4.
export function trackLead(form) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'generate_lead', form_name: form })
  if (!GTM_ID && GA4_ID && window.gtag) window.gtag('event', 'generate_lead', { form_name: form })
}

export function setConsent(granted) {
  const v = granted ? 'granted' : 'denied'
  try {
    localStorage.setItem('vl-consent', v)
  } catch {
    /* storage unavailable */
  }
  if (window.gtag) {
    window.gtag('consent', 'update', { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v })
  }
}

export function getConsent() {
  try {
    return localStorage.getItem('vl-consent')
  } catch {
    return null
  }
}
