import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../i18n'
import { useTr } from '../loc'
import { HERO_SLIDES, RATINGS } from '../data'
import Icon, { BrandIcon, Stars } from './Icon'
import { HeroWaves } from './ui'
import { srcSet, CARD, FULL } from '../img'

const SLIDE_MS = 5200

// Logo tròn xoay (docs 6.3) – vòng chữ quay quanh logo Vietlook.
export function RotatingBadge({ text, to = '/contact', className = 'relative block', id = 'badge-circle' }) {
  return (
    <Link to={to} className={`group size-36 rounded-full bg-white/95 shadow-2xl transition hover:scale-105 ${className}`} aria-label={text}>
      <svg viewBox="0 0 200 200" className="badge-ring absolute inset-0 animate-spin-slow" aria-hidden="true">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href={`#${id}`} textLength="486" lengthAdjust="spacingAndGlyphs">{text}</textPath>
        </text>
      </svg>
      <img src="/logo-mark.png" alt="" className="bob absolute inset-[31%] size-[38%] rounded-full" />
    </Link>
  )
}

export default function Hero() {
  const { t } = useLang()
  const h = t.l3.hero
  const tr = useTr()
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  // Số slide đã gắn ảnh: tăng dần theo slide đang xem (+1 để ảnh kế tải trước), không giảm lại khi quay vòng
  const [reach, setReach] = useState(1)
  if (active + 1 > reach) setReach(active + 1)
  const [form, setForm] = useState({ q: '', where: '', len: '', style: '' })
  // Màn ≥ 768px: ảnh ngang theo srcset; mobile: bản cắt dọc
  const [wide, setWide] = useState(() => window.innerWidth >= 768)
  useEffect(() => {
    const on = () => setWide(window.innerWidth >= 768)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((i) => (i + 1) % HERO_SLIDES.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const q = new URLSearchParams()
    if (form.len) q.set('len', form.len)
    if (form.where) q.set('region', form.where)
    if (form.q) q.set('q', form.q)
    navigate(`/tours${q.size ? `?${q}` : ''}`)
  }

  return (
    <section className="relative isolate flex min-h-[760px] flex-col overflow-hidden md:min-h-[115vh]">
      {/* Ảnh nền rực rỡ ghép Bắc → Nam thay cho video xanh của Link 3 (docs mục 4, 5) */}
      {/* Chỉ gắn ảnh cho slide đang hiện + slide kế (tải dần), không tải cả 8 ảnh lúc mở trang */}
      {/* Mobile dùng bản cắt dọc -m.webp (nét theo chiều cao, nhẹ hơn ảnh ngang 1920px; ảnh đầu được preload
          trong index.html). Chọn ảnh bằng JS thay vì <picture> để không tải thừa bản ngang. */}
      {HERO_SLIDES.map((s, i) => (i <= reach ? (
        <img
          key={s.img}
          {...(wide ? { src: s.img, srcSet: srcSet(s.img), sizes: FULL } : { src: s.img.replace(/\.webp$/, '-m.webp') })}
          alt={i === active ? s.place : ''}
          fetchPriority={i === 0 ? 'high' : 'low'}
          className={`absolute inset-0 -z-20 h-full w-full object-cover saturate-[1.2] transition-opacity duration-[1500ms] ${i === active ? 'ken-burns opacity-100' : 'opacity-0'}`}
        />
      ) : null))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="hero-in container-x flex flex-1 flex-col justify-end pb-20 pt-40 md:justify-center md:pb-40 md:pt-48">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/90 sm:text-sm md:mb-4 md:text-base md:tracking-[0.3em]">{h.greet}</p>
        <h1 className="max-w-4xl font-script text-5xl leading-[1.1] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-7xl md:text-[8.5rem]">
          <span className="block">{h.welcome}</span>
          <span className="block text-accent">{h.vietnam}</span>
        </h1>

        <div className="mt-7 flex flex-wrap gap-2 sm:gap-4 md:mt-10">
          <Link to="/tours" className="inline-flex items-center whitespace-nowrap rounded-full bg-[#ffc94a] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink shadow-lg transition hover:bg-accent hover:text-white sm:px-9 sm:py-4 sm:text-base">
            {h.explore}
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-brand/60 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-brand sm:gap-3 sm:px-8 sm:py-4 sm:text-base">
            <Icon name="pen" size={16} /> {h.quote}
          </Link>
        </div>

        {/* Huy hiệu đánh giá Google + TripAdvisor ngay trên banner (docs 6.2) */}
        <div className="mt-6 flex flex-nowrap gap-x-7 gap-y-4 text-white sm:gap-x-12 md:mt-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          {RATINGS.map((r) => (
            <Link key={r.id} to={r.href} {...(r.href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })} className="group grid justify-items-start gap-1 transition hover:-translate-y-0.5">
              <span className="inline-flex items-center gap-1.5 font-card text-2xl font-bold tracking-tight sm:gap-2 sm:text-3xl md:text-4xl">
                {r.id === 'tripadvisor' && <BrandIcon id="tripadvisor" size={28} />}
                {r.name}
              </span>
              {r.id === 'tripadvisor' ? (
                <span className="inline-flex gap-1" aria-label={`${r.score} out of 5`}>
                  {Array.from({ length: 5 }, (_, i) => <span key={i} className="size-3.5 rounded-full border-2 border-[#34e0a1] bg-[#34e0a1] sm:size-4" />)}
                </span>
              ) : (
                <Stars size={20} />
              )}
              <small className="text-xs font-semibold md:text-sm">
                {r.count ? `${r.score} · ${t.l3.hero.based} ${r.count} ${t.hero.reviews}` : `${r.score} · ${r.label}`}
              </small>
            </Link>
          ))}
        </div>

        <div className="relative z-10 mt-8 md:mt-14">
          <form onSubmit={submit} role="search" className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-ink shadow-2xl sm:p-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
            <label className="col-span-2 sm:col-span-1">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">{t.search.keyword}</span>
              <span className="relative block">
                <Icon name="search" size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input className="field !pl-10" value={form.q} onChange={set('q')} placeholder={t.search.keywordPh} />
              </span>
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">{t.search.where}</span>
              <select className="field" value={form.where} onChange={set('where')}>
                <option value="">{t.search.any}</option>
                <option value="north">{t.dest.north}</option>
                <option value="central">{t.dest.central}</option>
                <option value="south">{t.dest.south}</option>
              </select>
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">{t.search.long}</span>
              <select className="field" value={form.len} onChange={set('len')}>
                <option value="">{t.search.any}</option>
                <option value="w1">{t.search.week1}</option>
                <option value="w2">{t.search.week2}</option>
                <option value="w3">{t.search.week3}</option>
              </select>
            </label>
            <label className="max-sm:hidden">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">{t.search.style}</span>
              <select className="field" value={form.style} onChange={set('style')}>
                <option value="">{t.search.any}</option>
                {['luxury', 'signature', 'culture', 'family', 'honeymoon', 'classic', 'photography', 'tailor'].map((k) => (
                  <option key={k} value={k}>{t.styles[k][0]}</option>
                ))}
              </select>
            </label>
            <button className="btn btn-brand col-span-2 h-[46px] whitespace-nowrap lg:col-span-1" type="submit">
              <Icon name="search" size={16} /> {t.search.submit}
            </button>
          </form>
        </div>
      </div>

      <RotatingBadge text={t.badge} className="absolute right-[max(16px,calc((100%-77.5rem)/2+24px))] top-44 hidden md:block" />

      <div className="absolute bottom-24 right-[max(16px,calc((100%-77.5rem)/2+24px))] hidden items-center gap-1.5 md:flex">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.img}
            aria-label={s.place}
            data-pwc-interaction="hero-carousel"
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${i === active ? 'w-7 bg-accent' : 'w-2 bg-white/60'}`}
          />
        ))}
        <span className="ml-2 inline-flex items-center gap-1 text-sm font-semibold text-white"><Icon name="pin" size={14} /> {tr(HERO_SLIDES[active].place)}</span>
      </div>

      <HeroWaves />
    </section>
  )
}
