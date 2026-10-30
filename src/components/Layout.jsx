import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useLang } from '../i18n'
import Header from './Header'
import { Footer, FloatingContacts } from './Footer'
import { HeroWaves } from './ui'
import CookieBanner from './CookieBanner'
import { trackPageView } from '../tracking'
import Icon from './Icon'
import { RotatingBadge } from './Hero'

// Về đầu trang khi đổi route, hoặc cuộn tới #hash nếu có.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 120)
      return () => clearTimeout(id)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  useEffect(() => {
    const id = setTimeout(() => trackPageView(pathname), 50)
    return () => clearTimeout(id)
  }, [pathname])
  return null
}

// Hiệu ứng hiện khi cuộn tới: khối .reveal → .reveal-in (Link 3); nhóm .stagger / [data-anim] → .anim-in (kiểu bellairetravels.com).
// MutationObserver bắt cả phần tử sinh sau (đổi tab, dữ liệu tải xong) để không phần tử nào bị ẩn mãi.
const PENDING = '.reveal:not(.reveal-in), .stagger:not(.anim-in), [data-anim]:not(.anim-in)'
const inClass = (el) => (el.classList.contains('reveal') ? 'reveal-in' : 'anim-in')

function useReveal(pathname, lang) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(PENDING).forEach((el) => el.classList.add(inClass(el)))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(inClass(e.target))
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    const scan = () => document.querySelectorAll(PENDING).forEach((el) => io.observe(el))
    scan()
    let raf = 0
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(scan)
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(raf)
      mo.disconnect()
      io.disconnect()
    }
  }, [pathname, lang])
}

export default function Layout() {
  const { pathname } = useLocation()
  const { lang } = useLang()
  useReveal(pathname, lang)
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Header />
      <main key={pathname} className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingContacts />
      <CookieBanner />
    </div>
  )
}

// Banner trang con – cùng ngôn ngữ với hero Link 3 (ảnh nền, lớp tối, sóng đáy).
// Màn ≥ 768px: banner cao theo đúng tỉ lệ ảnh (tối đa 1 màn hình) để thấy trọn ảnh; không phóng (ken-burns) để giữ độ nét.
// Tiêu đề nhập từ nguồn có thể VIẾT HOA TOÀN BỘ và rất dài → đổi về Hoa Đầu Chữ; mô tả bị cắt giữa chừng → thêm "…".
const titleCase = (x) => (x && x.length > 20 && x === x.toUpperCase() ? x.toLowerCase().replace(/(^|[\s–\-(/])(\p{L})/gu, (m, a, b) => a + b.toUpperCase()) : x)
const tidySub = (x) => (x && !/[.!?…)]$/.test(x.trim()) ? `${x.trim()}…` : x)

export function PageHero({ title: rawTitle, sub: rawSub, img, crumbs = [], center = false }) {
  const { t } = useLang()
  const title = titleCase(rawTitle)
  const sub = tidySub(rawSub)
  // Cỡ chữ tiêu đề theo độ dài để không tràn lên thanh menu
  const size = title.length > 90 ? 'text-3xl md:text-4xl' : title.length > 55 ? 'text-3xl md:text-5xl' : 'text-4xl md:text-6xl'
  const [ratio, setRatio] = useState(null)
  return (
    <section
      style={ratio ? { '--hero-ratio': ratio } : undefined}
      className="relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden md:min-h-[max(520px,min(calc(100vw/var(--hero-ratio,2.4)),100vh))]"
    >
      <img className="absolute inset-0 -z-20 h-full w-full object-cover saturate-[1.1]" src={img} alt="" fetchPriority="high" onLoad={(e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/35 to-black/15" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-black/50 to-transparent" />
      <div className={`hero-in container-x pb-24 pt-48 text-white md:pb-32 md:pt-52 ${center ? 'text-center' : ''}`}>
        <nav className={`flex flex-wrap items-center gap-1.5 text-sm text-white/85 ${center ? 'justify-center' : ''}`} aria-label="Breadcrumb">
          <Link to="/" className="hover:text-accent">{t.home}</Link>
          {crumbs.map(([label, to]) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <Icon name="chevR" size={13} />
              {to ? <Link to={to} className="hover:text-accent">{label}</Link> : <span aria-current="page" className="max-w-[16rem] truncate text-accent">{titleCase(label)}</span>}
            </span>
          ))}
        </nav>
        <h1 className={`mt-4 max-w-4xl ${center ? 'mx-auto' : ''} font-serif font-bold leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] ${size}`}>{title}</h1>
        {sub && <p className={`mt-4 line-clamp-3 max-w-2xl text-lg text-white/90 ${center ? 'mx-auto' : ''}`}>{sub}</p>}
      </div>
      {/* Vòng tròn xoay giống banner trang chủ – góc dưới bên phải, trên đường sóng (màn ≥ 768px) */}
      <RotatingBadge text={t.badge} id="badge-circle-page" className="absolute bottom-32 right-[max(16px,calc((100%-1240px)/2+24px))] hidden md:block" />
      <HeroWaves />
    </section>
  )
}
