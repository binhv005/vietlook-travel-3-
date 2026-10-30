import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { getConsent, setConsent } from '../tracking'

// Thẻ nhỏ góc dưới trái – không che màn hình (docs mục 3: không popup chặn).
export default function CookieBanner() {
  const { t } = useLang()
  const c = t.cookie
  const [open, setOpen] = useState(() => !getConsent())
  // Hiện sau khi trang + font tải xong: tránh thẻ đổi cỡ khi font thay (CLS) và không tranh lượt dựng đầu trang
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (!open) return
    let alive = true
    const show = () => document.fonts.ready.then(() => alive && setShown(true))
    if (document.readyState === 'complete') show()
    else window.addEventListener('load', show, { once: true })
    return () => {
      alive = false
      window.removeEventListener('load', show)
    }
  }, [open])
  if (!open || !shown) return null
  const choose = (granted) => {
    setConsent(granted)
    setOpen(false)
  }
  return (
    <div role="dialog" aria-live="polite" aria-label={c.title} className="fixed bottom-4 left-4 z-50 w-[min(420px,calc(100vw-6.5rem))] animate-[fade-up_.5s_ease] rounded-2xl bg-white p-5 text-ink shadow-2xl ring-1 ring-black/10">
      <p className="font-card text-base font-bold">{c.title}</p>
      <p className="mt-1.5 text-sm text-muted">
        {c.text} <Link to="/policies/privacy" className="font-semibold text-brand underline">{c.more}</Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose(true)} className="btn btn-brand !px-5 !py-2 text-sm" data-pwc-interaction="cookie-accept">{c.accept}</button>
        <button type="button" onClick={() => choose(false)} className="btn btn-outline !px-5 !py-2 text-sm text-ink" data-pwc-interaction="cookie-reject">{c.reject}</button>
      </div>
    </div>
  )
}
