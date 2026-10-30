import { useEffect, useState } from 'react'

// Dữ liệu nhập từ vietlooktravel.com nằm ở /public/data (tải theo nhu cầu, có cache trong phiên).
const cache = new Map()

// Trả về: undefined = đang tải, false = lỗi / không có, còn lại = dữ liệu.
export function useJson(url) {
  const [state, setState] = useState(() => (url && cache.has(url) ? cache.get(url) : undefined))
  useEffect(() => {
    if (!url) return
    if (cache.has(url)) {
      setState(cache.get(url))
      return
    }
    let alive = true
    setState(undefined)
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        cache.set(url, d)
        if (alive) setState(d)
      })
      .catch(() => alive && setState(false))
    return () => {
      alive = false
    }
  }, [url])
  return state
}

// Tour tiếng Anh cho khách quốc tế (bỏ tour tiếng Việt, khách sạn, outbound).
export const isInboundTour = (x) => x.lang === 'en' && (x.kind === 'tour' || x.kind === 'experience')

export function formatPrice(amount, currency) {
  if (!amount) return null
  return `${currency || 'USD'} ${amount.toLocaleString('en-US')}`
}
