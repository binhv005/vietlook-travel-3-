import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { useTr } from '../loc'
import { PACKAGES, REGIONS, OTHER_LOCATIONS, STYLES, VEHICLES } from '../data'
import Icon from './Icon'
import { SplitHead, CenterHead, RollNumber } from './ui'
import { FeaturedTour, TourCard } from './TourCards'
import { srcSet, CARD, FULL } from '../img'

// ---------- Link 1: khối 3 dịch vụ ----------
const SERVICE_IMG = ['/img/tour/tam-coc-bich-dong.webp', '/l1/minivan-golf.webp', '/img/tour/airport-pick-up-one-way.webp']
const SERVICE_TO = ['/tours', '/private-car', '/visa-fast-track']

export function ServicesL1() {
  const { t } = useLang()
  const s = t.l1.services
  return (
    <section className="reveal relative isolate overflow-hidden pb-12 pt-6 font-l1 md:pb-20 md:pt-8">
      <img className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center opacity-[0.16] [mask-image:linear-gradient(to_bottom,transparent,#000_45%)]" alt="" src="/l1/halong-bay.webp" srcSet={srcSet("/l1/halong-bay.webp")} sizes={CARD} />
      <div className="container-x">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="l1-eyebrow mb-2">{s.eyebrow}</p>
            <h2 className="l1-h-section">{s.title}</h2>
          </div>
          <p className="max-w-md text-muted">{s.sub}</p>
        </div>
        <div className="stagger m-rail grid gap-6 md:grid-cols-3">
          {s.items.map(([title, desc, cta], i) => (
            <Link key={title} to={SERVICE_TO[i]} className="l1-card group flex h-full flex-col">
              <div className="overflow-hidden">
                <img className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-105" alt="" src={SERVICE_IMG[i]} srcSet={srcSet(SERVICE_IMG[i])} sizes={CARD} loading="lazy" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold group-hover:text-brand-700">{title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent-600">
                  {cta} <Icon name="arrow" size={16} className="transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Link 2: khối đối tác B2B (ưu tiên số 1) ----------
const B2B_SLIDES = ['emperor-cruises', 'hoi-an-9-copy', 'tam-coc-bich-dong', 'da-nang', 'phu-quoc'].map((n) => `/img/tour/${n}.webp`)

export function B2BL2() {
  const { t } = useLang()
  const b = t.b2bSec
  const [slide, setSlide] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setSlide((i) => (i + 1) % B2B_SLIDES.length), 2000)
    return () => clearInterval(id)
  }, [])
  return (
    <section className="reveal relative isolate scroll-mt-20 overflow-hidden bg-brand-950 py-14 font-card text-white lg:py-[4.5rem]" id="b2b">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img className="absolute inset-0 h-full w-full object-cover" alt="" src="/img/tour/tourduthuyenhalong1ngay1-2.webp" srcSet={srcSet("/img/tour/tourduthuyenhalong1ngay1-2.webp")} sizes={CARD} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-brand-950/30" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(23,128,193,0.45),transparent_50%),radial-gradient(circle_at_90%_90%,rgba(238,59,53,0.25),transparent_45%)]" />
      <div data-anim="sides" className="relative mx-auto grid w-full max-w-[87.5rem] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        <div data-anim="zoom" className="relative mx-auto h-[320px] w-full max-w-lg sm:h-[440px]">
          {/* 2 khung vệt cọ (mask SVG) chồng so le – mỗi khung tự chuyển ảnh mỗi 2s; khung 2 lệch 2 ảnh để luôn khác khung 1 */}
          {[
            ['left-0 top-0 h-[66%] w-[70%]', '/brush-mask.svg', 0],
            ['floaty bottom-0 right-0 h-[60%] w-[64%]', '/brush-mask-2.svg', 2],
          ].map(([pos, mask, offset]) => (
            <div key={mask} className={`absolute drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] ${pos}`}>
              <div className="size-full [mask-repeat:no-repeat] [mask-size:100%_100%]" style={{ maskImage: `url(${mask})`, WebkitMaskImage: `url(${mask})` }}>
                {B2B_SLIDES.map((src, i) => (
                  <img key={src} className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${i === (slide + offset) % B2B_SLIDES.length ? 'opacity-100' : 'opacity-0'}`} alt="" src={src} srcSet={srcSet(src)} sizes={CARD} loading="lazy" />
                ))}
              </div>
            </div>
          ))}
          <div className="absolute bottom-[8%] left-[6%] flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-ink shadow-xl">
            <Icon name="clock" size={32} className="text-sun-500" />
            <div className="leading-tight">
              <p className="text-2xl font-extrabold"><RollNumber value="24h" /></p>
              <p className="text-xs text-muted">{b.stat1}</p>
            </div>
          </div>
          <div className="absolute right-[4%] top-[10%] rounded-xl bg-sun-500 px-4 py-3 text-center shadow-xl">
            <p className="text-2xl font-extrabold"><RollNumber value="2–200+" /></p>
            <p className="text-xs text-white/85">{b.stat2}</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-brand">{b.eyebrow}</p>
          <h2 className="heading-lg mt-3 text-white">{b.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/80">{b.body}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {b.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <Icon name="circleCheck" size={20} className="mt-0.5 shrink-0 text-amber-brand" />
                <span className="text-white/90">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3 max-sm:justify-center">
            <Link to="/partners#partner-form" className="inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-sun-500 px-8 text-base font-semibold text-white shadow-sm shadow-sun-500/25 transition-all hover:bg-sun-600 active:scale-[0.98]">
              <Icon name="handshake" size={20} /> {b.cta1}
            </Link>
            <Link to="/tours" className="inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 border-white/80 px-8 text-base font-semibold text-white transition-all hover:bg-white hover:text-brand-800">
              {b.cta2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Link 1: "Featured Vietnam itineraries" (tour nổi bật + lưới thẻ) ----------
export function PackagesL1() {
  const { t } = useLang()
  const c = t.l1.tours
  const featured = PACKAGES.find((p) => p.featured)
  const rest = PACKAGES.filter((p) => p !== featured).slice(0, 6)
  return (
    <section className="reveal curve-bottom bg-sand py-14 font-l1 md:py-24" data-bg="paper">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="l1-eyebrow mb-3">{t.pkg.eyebrow}</p>
            <h2 className="l1-h-section">{c.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{c.sub}</p>
          </div>
          <div className="shrink-0">
            <Link to="/tours" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-brand-600 px-5 py-2.5 text-[0.95rem] font-semibold text-brand-700 transition hover:bg-brand-50">
              {c.all} <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
        <FeaturedTour p={featured} />
        <div className="stagger m-rail mt-6 grid gap-6 md:grid-cols-3">
          {rest.map((p) => <TourCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}

// ---------- Điểm đến: mosaic Link 3 + thẻ kiểu 6.7 ----------
const MOSAIC = ['md:col-span-2', '', '', 'md:col-span-2']

export function DestTile({ d, region, className = '' }) {
  const { t } = useLang()
  const tr = useTr()
  return (
    <Link to={`/tours?region=${region}`} className={`group relative block h-72 overflow-hidden rounded-[1.75rem] md:h-80 ${className}`}>
      <img className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" src={d.img} srcSet={srcSet(d.img)} sizes={CARD} alt={tr(d.name)} loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-brand-dark/10 transition group-hover:from-brand-dark/95" />
      <div className="absolute inset-x-0 top-0 p-5 text-white md:p-6">
        <h3 className="font-serif text-3xl font-semibold drop-shadow md:text-4xl">{tr(d.name)}</h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {d.tags.map((tag) => <span key={tag} className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">{tr(tag)}</span>)}
          <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold">+{d.more}</span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
        <p className="max-w-sm text-sm text-white/85">{tr(d.desc)}</p>
        <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition group-hover:bg-accent group-hover:text-white">
          {t.dest.discover} <Icon name="arrow" size={14} />
        </span>
      </div>
    </Link>
  )
}

export function OtherTile({ className = '' }) {
  const { t } = useLang()
  return (
    <Link to="/destinations" className={`group relative flex h-72 flex-col justify-between overflow-hidden rounded-[1.75rem] bg-brand-dark p-6 text-white md:h-80 ${className}`}>
      <span className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-accent/20" />
      <div className="relative flex items-center gap-4">
        <strong data-anim="count" className="font-card text-5xl font-bold"><RollNumber value={`${OTHER_LOCATIONS.count}+`} /></strong>
        <div className="flex">
          {OTHER_LOCATIONS.avatars.map((src) => <img key={src} src={src} srcSet={srcSet(src)} sizes={CARD} alt="" loading="lazy" className="-ml-3 size-11 rounded-full border-2 border-white object-cover first:ml-0" />)}
        </div>
      </div>
      <div className="relative">
        <h3 className="text-xl font-bold">{t.dest.other}</h3>
        <p className="mt-2 max-w-sm text-sm text-white/75">{t.dest.otherDesc}</p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/70 px-5 py-2 text-sm font-semibold transition group-hover:bg-white group-hover:text-brand-dark">
          {t.dest.viewAll} <Icon name="arrow" size={14} />
        </span>
      </div>
    </Link>
  )
}

export function RegionsL3() {
  const { t } = useLang()
  const l = t.l3.regions
  const [region, setRegion] = useState('north')
  return (
    <section className="reveal reveal-fx pb-4 pt-12 md:pb-6 md:pt-20">
      <div className="container-x">
        <SplitHead eyebrow={l.eyebrow} title={l.title} note={l.note} indent />
        <div className="mb-8 flex justify-center gap-2" role="tablist">
          {['north', 'central', 'south'].map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={region === k}
              data-pwc-interaction="region-tabs"
              onClick={() => setRegion(k)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition sm:px-6 sm:py-2.5 sm:text-sm ${region === k ? 'border-brand bg-brand text-white' : 'bg-white hover:border-brand hover:text-brand'}`}
            >
              <span className="sm:hidden">{l.short[k]}</span>
              <span className="hidden sm:inline">{t.dest[k]}</span>
            </button>
          ))}
        </div>
        <div key={region} data-pwc-controlled="region-tabs" className="m-rail grid animate-[fade-up_.5s_ease] grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {REGIONS[region].map((d, i) => <DestTile key={d.name} d={d} region={region} className={MOSAIC[i]} />)}
          <OtherTile className="md:col-span-2" />
        </div>
        <div className="mt-10 text-center">
          <Link className="btn btn-brand" to={`/tours?region=${region}`}>{l.viewAll} →</Link>
        </div>
      </div>
    </section>
  )
}

// ---------- Link 2: loại hình tour (bố cục + màu theo Link 2) ----------
const STYLE_COLS = [
  [['luxury', 'emperor-cruises', 'lg:h-72'], ['signature', 'khamphavedepvietnamhuehoiansapa', 'lg:h-52']],
  [['culture', 'tournonchung', 'lg:h-52'], ['family', 'rach-vem-fishing-village-1', 'lg:h-72']],
  [['honeymoon', 'glaming', 'lg:h-72'], ['classic', 'ha-long', 'lg:h-52']],
  [['photography', 'the-best-lotus-viewing-spots-in-ninh-binh', 'lg:h-52'], ['tailor', 'top20diadiemdulichninhbinhbannenbiet', 'lg:h-72']],
]

export function StylesL2() {
  const { t } = useLang()
  return (
    <section className="reveal relative isolate overflow-hidden bg-[#141210] py-14 text-white lg:py-[4.5rem]" id="styles">
      <img className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.22] grayscale-[60%]" alt="" src="/img/tour/ha-long.webp" srcSet={srcSet("/img/tour/ha-long.webp")} sizes={CARD} loading="lazy" />
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-10">
        <header className="mx-auto mb-8 max-w-4xl text-center lg:mb-10">
          <h2 className="inline-block font-card text-3xl font-bold uppercase text-amber-brand sm:text-[2rem]">
            {t.styles.eyebrow}
            <span className="mx-auto mt-1 block h-0.5 w-1/3 bg-amber-brand" />
          </h2>
          <p className="mt-4 leading-relaxed tracking-wide text-white/90 sm:text-[1.05rem]">{t.l2.stylesSub}</p>
        </header>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STYLE_COLS.map((col, i) => (
            <div key={i} className="stagger flex flex-col gap-3 sm:gap-4">
              {col.map(([key, img, h]) => (
                <Link key={key} to="/tours" className={`group relative block h-44 overflow-hidden rounded-md sm:h-56 ${h}`}>
                  <img className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" alt="" src={`/img/tour/${img}.webp`} srcSet={srcSet(`/img/tour/${img}.webp`)} sizes={CARD} loading="lazy" />
                  <span className="absolute inset-0 bg-black/15 transition-colors duration-500 group-hover:bg-black/40" />
                  <span className="absolute inset-0 grid place-items-center px-3 text-center font-card text-lg font-semibold uppercase leading-tight [text-shadow:0_2px_8px_rgba(0,0,0,.7)] sm:text-xl">
                    {t.styles[key][0]}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- 6.5 Trống đồng + logo tròn (gộp 6.3) ----------
// bg="" khi đặt trong khung nền chung với khối phía trên (trang chủ: liền nền với RegionsL3).
export function HeritageDrum({ bg = 'bg-[#f6efe4] pt-10 md:pt-16' }) {
  const { t } = useLang()
  const h = t.heritage
  return (
    <section className={`reveal relative isolate overflow-hidden ${bg}`} id="heritage">
      {/* Nền núi mờ sau trống đồng (như mẫu); ảnh cao 115% + neo trên để cắt dải watermark ở đáy ảnh gốc, mép trên mờ dần vào khối phía trên */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_35%)]">
        <img src="/mountain.webp" alt="" loading="lazy" className="h-[115%] w-full object-cover object-top" />
      </div>
      {/* Sân khấu kiểu Villages Vietnam: trống đồng + logo ở giữa, dải di tích VN đứng phía trước */}
      <div className="relative aspect-[4/3] max-h-[56rem] w-full sm:aspect-[1672/941]">
        {/* Trống đồng cao theo khung (khung trải hết bề ngang, cao tối đa 56rem) */}
        <div className="absolute left-1/2 top-[3%] aspect-square h-[78%] -translate-x-1/2">
          <img src="/trong-dong.webp" alt="" className="absolute inset-0 size-full animate-spin-slower rounded-full mix-blend-multiply" loading="lazy" />
          {/* vòng sáng đỏ + vòng chữ quay quanh logo */}
          <div className="absolute inset-[21%] rounded-full bg-[radial-gradient(circle,#fff_48%,#f9c9c0_57%,#ef6f5c_66%,#e8503d_86%,#e3412f_100%)] shadow-[0_0_48px_14px_rgba(232,80,61,0.4)]" />
          <svg viewBox="0 0 300 300" className="drum-ring absolute inset-[21%] animate-[spin_26s_linear_infinite_reverse]" aria-hidden="true">
            <defs>
              <path id="drum-ring" d="M150,150 m-128,0 a128,128 0 1,1 256,0 a128,128 0 1,1 -256,0" />
            </defs>
            <text>
              {/* Phối theo logo: chữ xanh viền trắng, "TRAVEL" và dấu • trắng (thay cho đỏ, vì nền đỏ) */}
              <textPath href="#drum-ring" textLength="800" lengthAdjust="spacingAndGlyphs">
                {(h.ring + h.ring).split(/(•|TRAVEL)/).map((part, i) => (
                  <tspan key={i} className={part === '•' || part === 'TRAVEL' ? 'fill-white' : 'drum-ring-blue'}>{part}</tspan>
                ))}
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-[33%] grid place-items-center rounded-full bg-white text-center shadow-inner">
            <div className="grid justify-items-center gap-2">
              <img src="/logo.png" alt="Vietlook Travel" className="w-[78%]" />
              <Link to="/about" className="rounded-lg border border-brand px-4 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white sm:text-sm">{t.nav.about}</Link>
            </div>
          </div>
        </div>
        {/* Ảnh đã tách nền trong suốt: các công trình che lên trống đồng ở lớp dưới */}
        <img
          src="/di-tich-vn.webp"
          srcSet="/di-tich-vn-900.webp 900w, /di-tich-vn.webp 1672w"
          sizes="(max-width: 1500px) 100vw, 1500px"
          alt="Vietnam landmarks: Saigon City Hall, Hue Imperial City, Hoan Kiem Lake, Hanoi Flag Tower"
          loading="lazy"
          className="pointer-events-none absolute inset-0 size-full object-cover object-bottom"
        />
      </div>
    </section>
  )
}

// ---------- Link 1: xe ----------
function VehicleCard({ v }) {
  const { t } = useLang()
  const tr = useTr()
  const photos = [v.img, ...(v.thumbs || [])]
  const [shown, setShown] = useState(v.img)
  return (
    <div className="group flex h-full min-w-0 flex-col rounded-3xl border border-[#efe7da] bg-[#f7f3ec] p-5 shadow-[0_10px_30px_-18px_rgba(80,60,20,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(80,60,20,0.45)]">
      <div className="flex aspect-[16/7] items-center justify-center overflow-hidden rounded-2xl">
        <img className={`size-full transition duration-500 group-hover:scale-105 ${shown === v.img && v.studio ? 'object-contain mix-blend-multiply' : 'rounded-2xl object-cover'}`} alt={v.name} src={shown} srcSet={srcSet(shown)} sizes={CARD} loading="lazy" />
      </div>
      <div className="mt-4 flex flex-1 flex-col px-1">
        <h3 className="text-xl font-bold text-ink">{tr(v.name)}</h3>
        <p className="mt-1.5 truncate text-[0.95rem] text-muted">{v.seats} {t.car.seats} · {v.models}</p>
        {photos.length > 1 && (
          <ul className="mt-3 grid grid-cols-5 gap-1.5" aria-label="Photo gallery">
            {photos.slice(0, 5).map((src) => (
              <li key={src}>
                <button type="button" onClick={() => setShown(src)} data-pwc-interaction={`car-${v.key}`} className="block w-full" aria-label={`${v.name} photo`}>
                  <img className={`aspect-[4/3] w-full rounded-lg bg-white object-cover ring-2 transition ${shown === src ? 'ring-[#c9a24a]' : 'ring-transparent hover:ring-[#e6d3a8]'}`} alt="" src={src} srcSet={srcSet(src)} sizes={CARD} loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <p className="whitespace-nowrap text-sm text-muted">
            {v.price ? <>{t.car.from} <strong className="text-lg font-extrabold text-[#8a5a00]">USD {v.price}</strong> {t.car.trip}</> : <strong className="font-semibold text-ink/80">{t.car.onRequest}</strong>}
          </p>
          <Link to={`/private-car?vehicle=${v.key}#car-form`} aria-label={t.car.quote} className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#fbeccc] text-[#8a5a00] transition hover:bg-[#8a5a00] hover:text-white">
            <Icon name="arrow" size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function VehicleGrid() {
  return (
    <div className="stagger m-rail grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {VEHICLES.map((v) => <VehicleCard key={v.key} v={v} />)}
    </div>
  )
}

export function CarsL1() {
  const { t } = useLang()
  const c = t.l1.cars
  return (
    <section className="reveal curve-bottom bg-sand py-14 font-l1 md:py-24" data-bg="paper">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="l1-eyebrow mb-3">{c.eyebrow}</p>
            <h2 className="l1-h-section">{c.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{c.sub}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3 max-sm:justify-center">
            <Link to="/private-car" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-brand-600 px-5 py-2.5 text-[0.95rem] font-semibold text-brand-700 transition hover:bg-brand-50">
              {c.all} <Icon name="arrow" size={16} />
            </Link>
            <Link to="/private-car#car-form" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent-500 px-5 py-2.5 text-[0.95rem] font-semibold text-white shadow-sm transition hover:bg-accent-600">
              {c.quote}
            </Link>
          </div>
        </div>
        <VehicleGrid />
      </div>
    </section>
  )
}

// ---------- Link 1: visa ----------
export function VisaL1() {
  const { t } = useLang()
  const v = t.l1.visa
  return (
    <section className="reveal relative isolate overflow-hidden py-14 font-l1 md:py-24">
      <img className="pointer-events-none absolute right-[2%] top-1/2 -z-10 hidden h-[90%] w-auto max-w-none -translate-y-1/2 select-none opacity-25 md:right-[6%] md:block" alt="" src="/l1/vn-map.webp" srcSet={srcSet("/l1/vn-map.webp")} sizes={CARD} />
      <div data-anim="sides" className="container-x grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <img className="mx-auto aspect-[4/5] w-full max-w-sm rounded-2xl object-cover shadow-xl" alt={v.title} src="/img/tour/welcome-vietlook.webp" srcSet={srcSet("/img/tour/welcome-vietlook.webp")} sizes={CARD} loading="lazy" />
        <div>
          <p className="l1-eyebrow mb-3">{v.eyebrow}</p>
          <h2 className="l1-h-section">{v.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">{v.body}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {v.cards.map(([title, desc], i) => (
              <div key={title} className="rounded-xl border border-line bg-white/85 p-5 backdrop-blur-sm">
                <Icon name={i ? 'planeLanding' : 'stamp'} size={24} className="text-brand-600" />
                <h3 className="mt-3 font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-muted">
            <Icon name="shieldAlert" size={16} className="mt-0.5 shrink-0 text-sun" /> {v.note}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 max-sm:justify-center">
            <Link to="/visa-fast-track" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-600 px-5 py-2.5 text-[0.95rem] font-semibold text-white shadow-sm transition hover:bg-brand-700">
              {v.cta} <Icon name="arrow" size={16} />
            </Link>
            <Link to="/visa-fast-track#prices" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-brand-600 px-5 py-2.5 text-[0.95rem] font-semibold text-brand-700 transition hover:bg-brand-50">
              {t.pages.visa.tableTitle}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- 6.1 Quy trình đặt tour 5 bước ----------
const STEP_ICONS = ['card', 'route', 'map', 'wallet', 'globe']

export function HowToBook() {
  const { t } = useLang()
  return (
    <section className="reveal relative isolate overflow-hidden bg-page py-12 md:py-20" id="how-to-book">
      {/* Ảnh nền mờ (Tràng An) – mép trên/dưới tan vào nền trắng để chữ và số vẫn rõ */}
      <img className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-[0.18] [mask-image:linear-gradient(to_bottom,transparent,#000_25%,#000_75%,transparent)]" alt="" src="/l3/services-bg.webp" srcSet={srcSet("/l3/services-bg.webp")} sizes={CARD} loading="lazy" />
      <div className="container-x">
        <h2 className="text-center font-serif text-3xl font-bold text-ink md:text-4xl">{t.howto.title}</h2>
        <ol className="mt-8 grid gap-3 lg:hidden">
          {t.howto.steps.map(([title, desc], i) => (
            <li key={title} className="flex items-center gap-4 rounded-2xl bg-sand/70 px-4 py-3.5">
              <span className="w-12 shrink-0 font-serif text-4xl font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="relative grid size-10 shrink-0 place-items-center text-ink">
                <span className="absolute left-0 top-1 size-3 rounded-full bg-accent" />
                <Icon name={STEP_ICONS[i]} size={28} stroke={1.5} className="relative" />
              </span>
              <span className="min-w-0">
                <b className="block text-[15px] text-ink">{title}</b>
                <small className="text-[13px] leading-snug text-muted">{desc}</small>
              </span>
            </li>
          ))}
        </ol>
        <ol className="stagger relative mt-12 hidden gap-4 lg:grid lg:grid-cols-5">
          <span className="pointer-events-none absolute inset-x-[10%] top-[118px] hidden border-t-2 border-dotted border-accent/40 lg:block" />
          {t.howto.steps.map(([title, desc], i) => (
            <li key={title} className="group relative text-center">
              <span className="relative mx-auto grid size-16 place-items-center text-ink transition group-hover:-translate-y-1">
                <span className="absolute left-1 top-3 size-4 rounded-full bg-accent" />
                <Icon name={STEP_ICONS[i]} size={40} stroke={1.4} className="relative" />
              </span>
              <h3 className="mx-auto mt-3 max-w-[13rem] text-[15px] font-semibold text-ink/80">{title}</h3>
              <span className="relative z-[1] mx-auto mt-5 block size-2.5 rounded-full bg-accent ring-4 ring-white" />
              <p className="mt-4 font-serif text-5xl font-bold text-accent md:text-6xl">{String(i + 1).padStart(2, '0')}</p>
              <p className="mx-auto mt-3 max-w-[14rem] text-sm text-muted">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
