import { useEffect, useState } from 'react'
import { useLang } from '../i18n'

// Thanh đặt tour cố định đáy màn hình trên mobile; ẩn khi form đặt tour hoặc footer đã hiện.
export default function MobileBookBar({ label }) {
  const { t } = useLang()
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const targets = [document.getElementById('book'), document.querySelector('footer')].filter(Boolean)
    const seen = new Set()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)))
      setHidden(seen.size > 0)
    })
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-black/10 bg-white/95 py-2.5 pl-4 pr-20 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur transition-transform duration-300 lg:hidden ${hidden ? 'translate-y-full' : ''}`}>
      <div className="min-w-0 flex-1 leading-tight">
        {label ? (
          <>
            <small className="block text-xs text-muted">{t.pkg.from}</small>
            <b className="text-lg text-accent-600">{label}</b> <small className="text-xs text-muted">{t.pkg.pp}</small>
          </>
        ) : (
          <b className="text-sm text-ink">{t.car.onRequest}</b>
        )}
      </div>
      <button type="button" onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-accent !px-5 !py-2.5 text-sm" data-pwc-interaction="mobile-book">
        {t.pkg.book}
      </button>
    </div>
  )
}
