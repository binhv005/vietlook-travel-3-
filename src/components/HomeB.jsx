import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { useTr } from '../loc'
import { CONTACT, EXPERIENCES, NEWS, REVIEWS, RATINGS } from '../data'
import { useThankYouSubmit } from '../hooks'
import Icon, { BrandIcon } from './Icon'
import { usd } from './TourCards'
import { useJson } from '../useJson'

// Bài viết thật từ vietlooktravel.com; dữ liệu mẫu chỉ dùng trong lúc đang tải.
const isNews = (x) => !x.categories?.includes('Blog')
const showDate = (d) => (/^\d{4}-/.test(d) ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : d)

// Ô ngày dạng tờ lịch (theo mẫu): dải đỏ ghi tháng, nền trắng ghi ngày số to
function DateBadge({ date, big = false }) {
  const { lang } = useLang()
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return null
  const month = lang === 'zh' ? `${d.getMonth() + 1}月` : d.toLocaleDateString('en-GB', { month: 'short' })
  return (
    <time dateTime={d.toISOString().slice(0, 10)} title={showDate(date)} className={`flex shrink-0 flex-col overflow-hidden rounded-lg bg-white text-center shadow-lg ${big ? 'w-16' : 'w-12'}`}>
      <span className={`bg-accent-500 font-bold text-white ${big ? 'py-1 text-xs' : 'py-0.5 text-[10px]'}`}>{month}</span>
      <span className={`font-card font-bold leading-none text-ink ${big ? 'py-2 text-3xl' : 'py-1.5 text-xl'}`}>{d.getDate()}</span>
    </time>
  )
}
import { SplitHead, CenterHead, ArrowSide, Eyebrow, WaveDivider } from './ui'

// ---------- 6 lý do (nội dung Link 2) – kiểu lưới icon minh hoạ 2 màu theo logo (đỏ + xanh dương), không khung thẻ ----------
const R = 'var(--color-accent-500)'
const B = 'var(--color-brand)'
const star = (cx, cy, r) =>
  Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2
    const k = i % 2 ? r * 0.45 : r
    return `${(cx + k * Math.cos(a)).toFixed(1)},${(cy + k * Math.sin(a)).toFixed(1)}`
  }).join(' ')

// Thứ tự khớp t.why.items: trọn gói · theo ngân sách · chuyên gia địa phương · đội xe · hỗ trợ 24/7 · đối tác tin cậy
const WHY_ART = [
  <>
    <path d="M6 44l16-6 20 8 16-6v18l-16 4-20-6-16 4z" fill={B} />
    <path d="M22 38v18M42 46v16" stroke="#fff" strokeOpacity=".45" strokeWidth="1.5" />
    <path d="M32 4c-8.8 0-16 7-16 15.6C16 31 32 46 32 46s16-15 16-26.4C48 11 40.8 4 32 4z" fill={R} />
    <circle cx="32" cy="19" r="6.5" fill="#fff" />
    <circle cx="32" cy="19" r="2.6" fill={R} />
  </>,
  <>
    <rect x="13" y="8" width="34" height="18" rx="3" fill={R} transform="rotate(-9 30 17)" />
    <rect x="6" y="18" width="48" height="38" rx="7" fill={B} />
    <rect x="38" y="30" width="20" height="14" rx="5" fill={R} />
    <circle cx="46" cy="37" r="2.8" fill="#fff" />
  </>,
  <>
    <polygon points={star(17, 11, 6)} fill={R} />
    <polygon points={star(32, 7, 7)} fill={R} />
    <polygon points={star(47, 11, 6)} fill={R} />
    <circle cx="18" cy="33" r="6" fill={B} fillOpacity=".75" />
    <circle cx="46" cy="33" r="6" fill={B} fillOpacity=".75" />
    <path d="M6 58c0-7 5.4-12 12-12s12 5 12 12zM34 58c0-7 5.4-12 12-12s12 5 12 12z" fill={B} fillOpacity=".75" />
    <circle cx="32" cy="29" r="7.5" fill={B} stroke="#fff" strokeWidth="2" />
    <path d="M18 60c0-8.5 6.3-15 14-15s14 6.5 14 15z" fill={B} stroke="#fff" strokeWidth="2" />
  </>,
  <>
    <path d="M7 42l5-13c1.2-3.2 3.6-5 6.8-5h26.4c3.2 0 5.6 1.8 6.8 5l5 13v11H7z" fill={B} />
    <path d="M17 31l2.4-5h25.2l2.4 5z" fill="#fff" fillOpacity=".85" />
    <rect x="10" y="36" width="7" height="4" rx="2" fill={R} />
    <rect x="47" y="36" width="7" height="4" rx="2" fill={R} />
    <circle cx="19" cy="53" r="6.5" fill={R} />
    <circle cx="45" cy="53" r="6.5" fill={R} />
    <circle cx="19" cy="53" r="2.2" fill="#fff" />
    <circle cx="45" cy="53" r="2.2" fill="#fff" />
  </>,
  <>
    <path d="M13 34v-3a19 19 0 0138 0v3" fill="none" stroke={R} strokeWidth="5" />
    <rect x="7" y="30" width="11" height="17" rx="4.5" fill={R} />
    <rect x="46" y="30" width="11" height="17" rx="4.5" fill={R} />
    <path d="M51.5 47v3a6 6 0 01-6 6H38" fill="none" stroke={R} strokeWidth="3" strokeLinecap="round" />
    <circle cx="36" cy="56" r="3.2" fill={R} />
    <path d="M32 24c-7.7 0-13 5-13 11.5 0 3 1.1 5.6 3.1 7.6L21 49l6.6-3.1c1.4.4 2.9.6 4.4.6 7.7 0 13-5 13-11.5S39.7 24 32 24z" fill={B} />
    <path d="M26 32h12M26 37h12M26 42h7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
  </>,
  <>
    <path d="M44 6v7M35 9l3.5 5M53 9l-3.5 5" stroke={R} strokeWidth="3" strokeLinecap="round" />
    <rect x="6" y="30" width="12" height="27" rx="2.5" fill={R} />
    <path d="M21 56V32l10-14c2.2-3.1 7.4-2.1 7.4 2v8.5H51c3.2 0 5.4 2.9 4.8 6l-3 15.8c-.5 3-3.1 5.2-6.2 5.2H21z" fill={B} />
  </>,
]

export function WhyL3() {
  const { t } = useLang()
  return (
    <section className="reveal reveal-fx bg-photo-light py-14 md:py-20">
      <div className="container-x">
        <CenterHead eyebrow={t.why.eyebrow} title={t.why.title} wide />
        <div className="stagger mx-auto grid max-w-6xl grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:gap-y-14 lg:grid-cols-3">
          {t.why.items.map(([title, desc], i) => (
            <div key={title} className="group flex flex-col items-center text-center">
              <svg viewBox="0 0 64 64" className="size-16 transition duration-300 group-hover:-translate-y-1.5 group-hover:scale-105 md:size-20" aria-hidden="true">
                {WHY_ART[i]}
              </svg>
              <p className="mt-4 font-card text-[15px] font-bold leading-snug text-ink sm:text-lg">{title}</p>
              <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-muted sm:text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Link 3: Culture & Cruises ----------
const GRID = ['row-span-2', 'col-span-2 max-sm:col-span-1', '', 'max-sm:hidden']

export function CultureL3() {
  const { t } = useLang()
  const l = t.l3.culture
  const tr = useTr()
  const [tab, setTab] = useState('culture')
  return (
    <section className="reveal reveal-fx relative isolate scroll-mt-20 overflow-hidden py-12 md:py-20" id="culture">
      {/* Nền: cánh đồng lúa hoàng hôn (ảnh của khối "Your trip, your way" cũ) + lớp trắng mờ để chữ tối vẫn rõ */}
      <img className="pointer-events-none absolute inset-0 -z-20 size-full object-cover" src="/l3/tailor-bg.webp" alt="" loading="lazy" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/75 to-white/45" />
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_2.1fr] lg:gap-14">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{l.eyebrow}</p>
          <h2 className="font-card text-3xl font-bold leading-tight md:text-4xl 2xl:text-5xl">{l.title}</h2>
          <span className="mt-4 block h-0.5 w-12 bg-accent" />
          <div className="relative mt-4 hidden items-end gap-3 text-brand md:inline-flex">
            <p className="font-hand text-2xl leading-snug md:text-[1.75rem]">
              {l.note.map((n) => <span key={n} className="block">{n}</span>)}
            </p>
            <ArrowSide />
          </div>
          <div className="mt-7 flex flex-wrap gap-3" role="tablist">
            {['culture', 'cruises'].map((k) => (
              <button
                key={k}
                role="tab"
                type="button"
                aria-selected={tab === k}
                data-pwc-interaction="culture-tabs"
                onClick={() => setTab(k)}
                className={`btn !px-5 !py-2.5 text-sm uppercase tracking-wide ${tab === k ? 'btn-brand' : 'btn-outline text-brand'}`}
              >
                {l.tabs[k]}
              </button>
            ))}
          </div>
          <Link className="mt-5 inline-block text-sm font-semibold text-accent hover:underline" to="/tours">{l.viewAll}</Link>
        </div>
        <div key={tab} data-pwc-controlled="culture-tabs" className="grid h-[520px] animate-[fade-up_.5s_ease] grid-cols-2 grid-rows-[1fr_1fr] gap-3 sm:h-[560px] sm:grid-cols-3 md:gap-4">
          {EXPERIENCES[tab].map((x, i) => (
            <Link key={x.title} to="/contact" className={`group relative overflow-hidden rounded-2xl ${GRID[i]}`}>
              <img className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" src={x.img} alt={x.title} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand">{l.tag[tab]}</span>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
                <h3 className={`line-clamp-2 font-serif font-semibold leading-tight ${i < 2 ? 'text-xl md:text-3xl' : 'text-lg md:text-xl'}`}>{tr(x.title)}</h3>
                <p className="mt-2 flex items-center gap-2 text-xs text-white/85 md:text-sm">
                  <span>{x.price ? <>{t.pkg.from} <b className="text-accent">{usd(x.price)}</b></> : t.car.onRequest}</span>
                  <Icon name="arrow" size={14} className="ml-auto -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Link 3: cẩm nang ----------
// Thẻ bài viết kiểu Link 1: ảnh, chuyên mục (đỏ) + ngày, tiêu đề đậm, trích đoạn 3 dòng. compact: chỉ ảnh + tiêu đề (bài liên quan).
const fmtPostDate = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '')

export function GuideCard({ g, compact = false }) {
  const { t } = useLang()
  const tr = useTr()
  const topic = g.topics?.[0] ? t.posts.topics[g.topics[0]] : g.tag
  if (compact) {
    return (
      <Link to={`/travel-guide/${g.slug}`} className="group block">
        <div className="aspect-[3/2] overflow-hidden rounded-xl bg-gradient-to-br from-brand to-brand-dark">
          <img className="size-full object-cover transition duration-500 group-hover:scale-105" src={g.img} alt={g.title} loading="lazy" />
        </div>
        <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-snug text-ink group-hover:text-brand">{tr(g.title)}</h3>
      </Link>
    )
  }
  return (
    <Link to={`/travel-guide/${g.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[3/2] overflow-hidden bg-gradient-to-br from-brand to-brand-dark">
        <img className="size-full object-cover transition duration-500 group-hover:scale-105" src={g.img} alt={g.title} loading="lazy" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-wide">
          {topic && <span className="text-accent-500">{topic}</span>}
          {g.date && <span className="inline-flex items-center gap-1 font-semibold normal-case tracking-normal text-muted"><Icon name="calendar" size={13} /> {fmtPostDate(g.date)}</span>}
        </p>
        <h3 className="mt-2 line-clamp-3 font-card text-base font-bold leading-snug text-ink group-hover:text-brand sm:text-[17px]">{tr(g.title)}</h3>
        {g.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{g.excerpt}</p>}
      </div>
    </Link>
  )
}

// ---------- Link 3: form lên kế hoạch ----------
// Ảnh polaroid ghim ở góc khung thông tin (theo mẫu): [ảnh, vị trí, góc xoay]
const PLAN_PHOTOS = [
  ['ha-long', 'left-0 top-4 w-[52%]', '-rotate-6'],
  ['tam-coc-bich-dong', 'right-0 top-0 w-[52%]', 'rotate-6'],
  ['da-nang', 'left-2 bottom-0 w-[50%]', 'rotate-2'],
  ['hoi-an-9-copy', 'right-1 bottom-3 w-[48%]', '-rotate-3'],
]

// Form lên kế hoạch (kiểu mẫu Villages Vietnam): khung thẻ trắng, trái là khối thông tin liên hệ nền ảnh ruộng bậc thang
// + ảnh polaroid ghim; phải là form đầy đủ các trường.
export function PlanFormL3() {
  const { t } = useLang()
  const f = t.form
  const submit = useThankYouSubmit()
  const info = [
    ['pin', CONTACT.address],
    ['phone', <a key="p" href={CONTACT.phoneHref} className="hover:text-accent">Hotline · WhatsApp: {CONTACT.phone}</a>],
    ['mail', <a key="m" href={`mailto:${CONTACT.email}`} className="hover:text-accent">{CONTACT.email}</a>],
  ]
  return (
    <section className="reveal reveal-fx scroll-mt-28 bg-sand py-14 md:py-20" id="plan">
      <div className="container-x">
        <div className="grid gap-6 rounded-3xl bg-white p-3 shadow-xl sm:p-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          {/* Khối thông tin */}
          <div className="relative isolate overflow-hidden rounded-2xl bg-brand-dark p-7 text-white sm:p-10">
            <img className="absolute inset-0 -z-20 size-full object-cover" src="/img/tour/hoang-su-phi-ha-giang.webp" alt="" loading="lazy" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-dark/90 via-brand-dark/75 to-brand-dark/55" />
            <div className="pointer-events-none absolute -right-3 -top-3 hidden h-48 w-48 lg:block xl:h-56 xl:w-56" aria-hidden="true">
              {PLAN_PHOTOS.map(([img, pos, rot]) => (
                <div key={img} className={`absolute bg-white p-1.5 pb-4 shadow-xl ${pos} ${rot}`}>
                  <img className="aspect-[4/3] w-full object-cover" src={`/img/tour/${img}.webp`} alt="" loading="lazy" />
                </div>
              ))}
              <span className="absolute left-1/2 top-1 size-7 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#ff6b5e] to-accent-500 shadow-[0_4px_8px_rgba(0,0,0,0.4)]" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{f.eyebrow}</p>
            <h2 className="mt-3 max-w-xs font-serif text-3xl font-bold leading-tight md:text-4xl lg:max-w-[16rem] xl:max-w-[18rem]">{f.title}</h2>
            <ul className="mt-6 space-y-2.5 text-white/90">
              {f.points.map((x) => <li key={x} className="flex items-center gap-3"><Icon name="circleCheck" size={20} className="shrink-0 text-accent" /> {x}</li>)}
            </ul>
            <ul className="mt-10 space-y-5 border-t border-white/20 pt-8 text-[15px] font-medium">
              {info.map(([icon, text]) => (
                <li key={icon} className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/15"><Icon name={icon} size={16} /></span>
                  <span className="pt-1">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form đầy đủ */}
          {/* TODO: nối API gửi form; trang /thank-you để đo conversion GA4/Ads (docs mục 3) */}
          <form onSubmit={submit} data-form="trip-plan" className="grid content-start gap-x-5 gap-y-4 p-3 text-ink sm:grid-cols-2 sm:p-4 lg:py-8 lg:pr-8">
            <label><span className="label">{f.name} <b className="text-accent-500">*</b></span><input className="field" name="name" required autoComplete="name" /></label>
            <label><span className="label">{f.email} <b className="text-accent-500">*</b></span><input className="field" type="email" name="email" required autoComplete="email" /></label>
            <label><span className="label">{f.phone}</span><input className="field" name="phone" type="tel" autoComplete="tel" /></label>
            <label><span className="label">{f.month}</span><input className="field" name="month" type="month" /></label>
            <label><span className="label">{f.travellers}</span><input className="field" name="pax" type="number" min="1" defaultValue="2" /></label>
            <label><span className="label">{f.length}</span>
              <select className="field" name="length" defaultValue="w1">
                <option value="w1">{t.pkg.w1}</option>
                <option value="w2">{t.pkg.w2}</option>
                <option value="w3">{t.pkg.w3}</option>
              </select>
            </label>
            <label className="sm:col-span-2"><span className="label">{f.where}</span>
              <select className="field" name="destinations" defaultValue="">
                <option value="">{f.whereAny}</option>
                <option>{t.dest.north}</option>
                <option>{t.dest.central}</option>
                <option>{t.dest.south}</option>
              </select>
            </label>
            <label className="sm:col-span-2"><span className="label">{f.ideas}</span><textarea className="field min-h-36" name="message" rows="5" placeholder={f.ideasPh} /></label>
            <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" name="agency" className="size-4 accent-[var(--color-accent)]" /> {f.agency}</label>
            <button type="submit" className="btn btn-brand mt-2 w-full sm:col-span-2">{f.submit} <Icon name="send" size={16} /></button>
          </form>
        </div>
      </div>
    </section>
  )
}

// ---------- Đánh giá (khung Link 3, thẻ kiểu 6.4) + tin tức ----------
const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

// Huy hiệu vòng bông lúa + 5 sao (theo ảnh mẫu chị gửi cho thẻ review, docs 6.4).
const WC = { x: 32, y: 30, r: 23 }
const toXY = (deg, r = WC.r) => [WC.x + r * Math.cos((deg * Math.PI) / 180), WC.y + r * Math.sin((deg * Math.PI) / 180)]

// Một nhánh lúa bên trái: thân cong từ đáy lên đỉnh, hạt lúa mọc hai bên thân.
function WheatBranch() {
  const angles = [118, 132, 146, 160, 174, 188, 202, 216, 229]
  const grain = (deg, side) => {
    const [px, py] = toXY(deg, WC.r + side * 2.1)
    const dir = deg + 90 + side * -32 // hướng hạt: theo thân, nghiêng ra ngoài / vào trong
    return <ellipse key={`${deg}${side}`} cx={px} cy={py} rx="1.55" ry="3.6" transform={`rotate(${dir - 90} ${px} ${py})`} />
  }
  const [x0, y0] = toXY(100)
  const [x1, y1] = toXY(244)
  const [tx, ty] = toXY(247, WC.r - 0.5)
  return (
    <g>
      <path d={`M${x0} ${y0} A${WC.r} ${WC.r} 0 0 1 ${x1} ${y1}`} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      {angles.map((a) => grain(a, 1))}
      {angles.map((a) => grain(a, -1))}
      <ellipse cx={tx} cy={ty} rx="1.4" ry="3.4" transform={`rotate(247 ${tx} ${ty})`} />
    </g>
  )
}

const STAR = 'M0 -1 L0.2245 -0.309 L0.951 -0.309 L0.3633 0.118 L0.5878 0.809 L0 0.382 L-0.5878 0.809 L-0.3633 0.118 L-0.951 -0.309 L-0.2245 -0.309 Z'
const STARS = [
  [17.5, 27.5, 2.6],
  [24.5, 24, 3.3],
  [32, 22.5, 4.2],
  [39.5, 24, 3.3],
  [46.5, 27.5, 2.6],
]

function Laurel5() {
  return (
    <svg viewBox="0 0 64 58" className="h-16 w-[71px] shrink-0 text-[#b8864b]" fill="currentColor" role="img" aria-label="5 out of 5 stars">
      <WheatBranch />
      <g transform="translate(64 0) scale(-1 1)">
        <WheatBranch />
      </g>
      {STARS.map(([x, y, s]) => <path key={x} d={STAR} transform={`translate(${x} ${y}) scale(${s})`} />)}
      <text x="32" y="43" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="13" fontWeight="700">5.0</text>
    </svg>
  )
}

export function ReviewCard({ r }) {
  const tr = useTr()
  return (
    <article className="relative w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl bg-[#fffaf1] shadow-md sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]">
      <img className="aspect-[16/9] w-full object-cover" src={r.img} alt={r.place} loading="lazy" />
      <div className="flex min-h-[15rem] flex-col px-6 pb-6 pt-5">
        <h3 className="font-card text-lg font-bold leading-snug text-ink">{tr(r.title)}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{tr(r.text)}</p>
        <div className="mt-auto flex items-center gap-3 border-t border-black/10 pt-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-accent text-sm font-bold text-white ring-2 ring-white" aria-hidden="true">{initials(r.name)}</span>
          <span className="grid leading-tight">
            <b className="text-ink">{r.name}</b>
            <small className="text-muted">{tr(r.place)}{r.date ? ` · ${r.date}` : ''}</small>
          </span>
          <span className="ml-auto"><Laurel5 /></span>
        </div>
      </div>
    </article>
  )
}

export function ReviewSlider({ light = false }) {
  const { t } = useLang()
  const ref = useRef(null)
  // Nhảy theo vị trí thẻ (không dùng scrollBy) để snap-mandatory không kéo ngược về chỗ cũ; hết thì quay vòng.
  const scroll = (dir) => {
    const el = ref.current
    if (!el || !el.children.length) return
    const cards = [...el.children]
    const pos = cards.map((c) => c.offsetLeft - cards[0].offsetLeft)
    const max = el.scrollWidth - el.clientWidth
    const cur = pos.reduce((best, p, i) => (Math.abs(p - el.scrollLeft) < Math.abs(pos[best] - el.scrollLeft) ? i : best), 0)
    const perView = Math.max(1, Math.round(el.clientWidth / cards[0].offsetWidth))
    let left
    if (dir > 0) left = el.scrollLeft >= max - 4 ? 0 : Math.min(pos[Math.min(cur + perView, cards.length - 1)], max)
    else left = el.scrollLeft <= 4 ? max : pos[Math.max(cur - perView, 0)]
    el.scrollTo({ left, behavior: 'smooth' })
  }
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => scroll(1), 6000)
    return () => clearInterval(id)
  }, [])
  const btn = `absolute top-[30%] z-10 hidden size-12 place-items-center rounded-full bg-white text-brand shadow-lg transition hover:bg-brand hover:text-white md:grid`
  return (
    <div className="relative mt-8 md:mt-12">
      <button className={`${btn} -left-3`} aria-label={t.reviews.prev} onClick={() => scroll(-1)} data-pwc-interaction="reviews-carousel"><Icon name="chevL" size={18} /></button>
      <button className={`${btn} -right-3`} aria-label={t.reviews.next} onClick={() => scroll(1)} data-pwc-interaction="reviews-carousel"><Icon name="chevR" size={18} /></button>
      <div ref={ref} data-pwc-controlled="reviews-carousel" className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4">
        {REVIEWS.map((r) => <ReviewCard key={r.name} r={r} />)}
      </div>
      <div className={`mt-6 flex flex-wrap items-center justify-center gap-3 text-sm ${light ? 'text-muted' : 'text-white/75'}`}>
        {/* Mobile: dòng chữ riêng, 2 huy hiệu đánh giá xuống dòng dưới và nằm cạnh nhau */}
        <span className="w-full text-center sm:w-auto">{t.reviews.readMore}</span>
        {RATINGS.map((r) => (
          <a key={r.id} href={r.href} {...(r.href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-ink shadow">
            <BrandIcon id={r.id} size={18} /> {r.name} <b className="text-accent-500">{r.score}</b>
          </a>
        ))}
      </div>
    </div>
  )
}

export function ReviewsNewsL3() {
  const { t } = useLang()
  const r = t.l3.reviews
  const n = t.l3.news
  const tr = useTr()
  const posts = useJson('/data/posts.json')
  const latest = posts ? posts.filter((x) => x.lang === 'en' && isNews(x)).slice(0, 4) : []
  const [lead, ...rest] = latest.length === 4 ? latest : NEWS
  return (
    <div className="relative isolate">
      <div className="parallax-bg absolute inset-0 -z-20 bg-[url('/l3/bay-bg.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark/85" />
      <section className="reveal reveal-fx scroll-mt-32 py-12 md:py-20" id="reviews">
        <div className="container-x">
          <div className="mb-4 flex flex-col gap-2 md:mb-10 md:flex-row-reverse md:items-end md:justify-between md:gap-10">
            <div className="max-w-2xl md:text-right">
              <h2 className="font-card text-3xl font-bold leading-tight text-white md:text-5xl">{r.title}</h2>
            </div>
            <div className="relative mt-4 hidden w-fit text-accent md:mb-10 md:ml-6 md:mt-0 md:block md:-rotate-3">
              <p className="font-hand text-2xl leading-snug md:text-[1.75rem]"><span className="block">{r.note}</span></p>
            </div>
          </div>
          <ReviewSlider />
        </div>
      </section>

      <section className="reveal reveal-fx container-x py-12 md:py-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <Eyebrow>{n.eyebrow}</Eyebrow>
            <h2 className="font-card text-3xl font-bold leading-tight text-white md:text-5xl">{n.title}</h2>
            <div className="relative mt-4 hidden items-end gap-3 text-accent md:inline-flex">
              <p className="font-hand text-2xl leading-snug md:text-[1.75rem]">{n.note.map((x) => <span key={x} className="block">{x}</span>)}</p>
              <ArrowSide />
            </div>
          </div>
          <Link className="inline-flex items-center gap-2 font-semibold text-accent hover:underline" to="/travel-guide">{n.all} <Icon name="arrow" size={16} /></Link>
        </div>
        <div className="stagger grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <Link className="group block" to={`/travel-guide/${lead.slug}`}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-dark transition duration-500 group-hover:opacity-90">
              <img className="absolute inset-0 h-full w-full object-cover" src={lead.img} alt={lead.title} loading="lazy" />
            </div>
            <div className="mt-5 flex items-center gap-4">
              <DateBadge date={lead.date} big />
              <h3 className="font-card text-2xl font-bold leading-snug text-white group-hover:text-accent md:text-3xl">{tr(lead.title)}</h3>
            </div>
            <p className="mt-3 line-clamp-2 text-lg text-white/75">{tr(lead.excerpt)}</p>
          </Link>
          <ul className="divide-y divide-white/15">
            {rest.map((x) => (
              <li key={x.slug}>
                <Link className="group flex gap-5 py-5 first:pt-0" to={`/travel-guide/${x.slug}`}>
                  <div className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-brand to-brand-dark md:w-40">
                    <img className="absolute inset-0 h-full w-full object-cover" src={x.img} alt={x.title} loading="lazy" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <DateBadge date={x.date} />
                      <h3 className="line-clamp-2 font-card text-lg font-bold leading-snug text-white group-hover:text-accent">{tr(x.title)}</h3>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-white/70">{tr(x.excerpt)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <WaveDivider fill="#0b2c4d" />
    </div>
  )
}
