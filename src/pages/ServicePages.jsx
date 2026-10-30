import { useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useLang } from '../i18n'
import { useTr } from '../loc'
import { usePageTitle, useThankYouSubmit } from '../hooks'
import { REGIONS, AIRPORTS, FAST_TRACK, VEHICLES, CAR_CITIES } from '../data'
import { PageHero } from '../components/Layout'
import { DestTile, VehicleGrid } from '../components/HomeA'
import { CenterHead, SplitHead, Eyebrow } from '../components/ui'
import Icon from '../components/Icon'
import { usd } from '../components/TourCards'
import { RealTourCard, CardSkeleton } from '../components/RealTours'
import NotFound from './NotFound'
import { useJson } from '../useJson'
import { srcSet, CARD, FULL } from '../img'

const MOSAIC = ['md:col-span-2', '', '', 'md:col-span-2']

export function Destinations() {
  const { t } = useLang()
  const pg = t.pages.destinations
  usePageTitle(t.meta.destinations, { desc: t.pages.destinations.sub, image: '/img/tour/hoang-su-phi-ha-giang.webp' })
  return (
    <>
      <PageHero title={pg.title} sub={pg.sub} img="/img/tour/hoang-su-phi-ha-giang.webp" crumbs={[[t.nav.destinations]]} />
      {['north', 'central', 'south'].map((k, i) => (
        <section key={k} id={k} className={`reveal reveal-fx scroll-mt-28 py-12 md:py-16 ${i % 2 ? 'bg-photo-light' : 'bg-page'}`}>
          <div className="container-x">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>{t.l3.regions.eyebrow}</Eyebrow>
                <h2 className="font-serif text-3xl font-bold leading-tight md:text-4xl">{t.dest[k]}</h2>
              </div>
              <Link to={`/tours?region=${k}`} className="btn btn-outline text-brand">{pg.tours} <Icon name="arrow" size={16} /></Link>
            </div>
            <div className="stagger grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {REGIONS[k].map((d, j) => <DestTile key={d.name} d={d} region={k} className={MOSAIC[j] || ''} />)}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

// Các tuyến xe / dịch vụ đưa đón Vietlook đang chạy (nhập từ vietlooktravel.com).
function CarRoutes() {
  const { t } = useLang()
  const data = useJson('/data/tours.json')
  const routes = (data || []).filter((x) => x.kind === 'car' && x.lang === 'en')
  if (!routes.length) return null
  return (
    <section className="reveal container-x py-14 md:py-20" id="routes">
      <CenterHead eyebrow={t.car.eyebrow} title={t.realTour.routesTitle} sub={t.realTour.routesSub} />
      <div className="m-rail grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((x) => <RealTourCard key={x.id} x={x} />)}
      </div>
    </section>
  )
}

// Hàng thẻ lướt ngang: 4 thẻ/hàng ở màn rộng (2 ở tablet, ~1 ở mobile), nút ← → để chuyển
function CardRail({ items }) {
  const ref = useRef(null)
  const go = (dir) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
  }
  const arrow = 'absolute top-1/3 z-10 hidden size-11 place-items-center rounded-full bg-white text-brand shadow-lg transition hover:bg-brand hover:text-white md:grid'
  return (
    <div className="relative">
      {items.length > 4 && <button type="button" aria-label="Previous" onClick={() => go(-1)} className={`${arrow} -left-4`}><Icon name="chevL" size={18} /></button>}
      {items.length > 4 && <button type="button" aria-label="Next" onClick={() => go(1)} className={`${arrow} -right-4`}><Icon name="chevR" size={18} /></button>}
      <div ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2">
        {items.map((x) => (
          <div key={x.id} className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"><RealTourCard x={x} /></div>
        ))}
      </div>
    </div>
  )
}

// Trang xe theo thành phố (theo Link 3 /car-rental/<slug>): banner + 3 cam kết, form báo giá nhanh, tuyến xe thật của thành phố.
export function CarCity() {
  const { t } = useLang()
  const tr = useTr()
  const { city } = useParams()
  const c = CAR_CITIES.find((x) => x.slug === city)
  const cc = t.carCity
  const name = c ? tr(c.name) : ''
  usePageTitle(c ? `${cc.title.replace('{city}', name)} | Vietlook Travel` : t.meta.notFound, { desc: c?.airport, image: c?.img })
  const submit = useThankYouSubmit()
  const [tab, setTab] = useState(0)
  const data = useJson('/data/tours.json')
  if (!c) return <NotFound />
  const routes = (data || []).filter((x) => x.kind === 'car' && x.lang === 'en' && x.types.includes(c.type))
  return (
    <>
      <PageHero title={cc.title.replace('{city}', name)} sub={c.airport} img={c.img} crumbs={[[t.nav.car, '/private-car'], [name]]} />

      <section className="reveal container-x grid items-start gap-10 py-12 md:py-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Cột giới thiệu dính lại khi cuộn qua form báo giá (màn ≥ 1024px) */}
        <div className="lg:sticky lg:top-28">
          <Eyebrow>{t.car.eyebrow}</Eyebrow>
          <h2 className="font-serif text-3xl font-bold leading-tight md:text-4xl">{cc.title.replace('{city}', name)}</h2>
          <ul className="mt-6 grid gap-3">
            {cc.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-ink/85">
                <Icon name="circleCheck" size={20} className="mt-0.5 shrink-0 text-accent-500" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} data-form="car-quote" className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 md:p-8">
          <input type="hidden" name="city" value={c.name} />
          <input type="hidden" name="service" value={cc.tabs[tab]} />
          <div className="mb-5 grid grid-cols-3 gap-1.5 rounded-full bg-sand p-1" role="tablist">
            {cc.tabs.map((x, i) => (
              <button key={x} type="button" role="tab" aria-selected={tab === i} onClick={() => setTab(i)} data-pwc-interaction="car-tab" className={`rounded-full px-2 py-2 text-xs font-semibold transition sm:text-sm ${tab === i ? 'bg-brand text-white shadow' : 'text-ink/70 hover:text-brand'}`}>{x}</button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label><span className="label">{cc.from}</span><input className="field" name="pickup" defaultValue={tab === 0 ? c.airport : name} /></label>
            <label><span className="label">{cc.to}</span><input className="field" name="dropoff" /></label>
            <label><span className="label">{cc.time}</span><input className="field" type="datetime-local" name="date" /></label>
            <label><span className="label">{cc.pax}</span><input className="field" type="number" min="1" defaultValue="2" name="pax" /></label>
            <label className="sm:col-span-2"><span className="label">{cc.vehicle}</span>
              <select className="field" name="vehicle">{VEHICLES.map((v) => <option key={v.key} value={v.name}>{tr(v.name)} · {v.seats} {t.car.seats} · {v.models}</option>)}</select>
            </label>
            <label className="sm:col-span-2"><span className="label">{cc.contact} *</span><input className="field" required name="contact" autoComplete="email" /></label>
          </div>
          <p className="mt-4 text-sm font-semibold text-brand">{cc.note}</p>
          <p className="mt-1 text-sm text-muted">{cc.reply}</p>
          <button type="submit" className="btn btn-accent mt-5 w-full">{cc.submit} <Icon name="send" size={16} /></button>
        </form>
      </section>

      <section className="reveal bg-photo-light py-12 md:py-16" id="routes">
        <div className="container-x">
          <CenterHead eyebrow={cc.routesSub.replace('{n}', data ? routes.length : '…')} title={cc.routesTitle.replace('{city}', name)} />
          {data === undefined ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"><CardSkeleton /></div>
          ) : (
            <CardRail items={routes} />
          )}
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-14 md:py-20">
        {/* Nền mờ: ảnh của chính thành phố, mép trên/dưới tan vào nền trắng */}
        <img className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-[0.18] [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" alt="" src={c.img} srcSet={srcSet(c.img)} sizes={CARD} loading="lazy" />
        <div className="container-x">
          <h2 className="mb-5 text-center font-card text-xl font-bold">{cc.others}</h2>
          {/* Mỗi thành phố là 1 ô ảnh của chính nơi đó, chữ trắng trên lớp tối */}
          {/* Dải ảnh tự trượt ngang vô hạn (danh sách lặp 2 lần, chạy -50%), dừng khi rê chuột */}
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <ul className="marquee flex w-max gap-3 pr-3 hover:[animation-play-state:paused]">
            {[0, 1].flatMap((n) => CAR_CITIES.filter((x) => x.slug !== c.slug).map((x) => (
              <li key={`${n}-${x.slug}`} className="w-56 shrink-0 sm:w-64" aria-hidden={n === 1 || undefined}>
                <Link to={`/private-car/${x.slug}`} tabIndex={n === 1 ? -1 : undefined} className="group relative isolate flex aspect-[4/3] items-end overflow-hidden p-3 text-white shadow-md transition hover:shadow-xl">
                  <img className="absolute inset-0 -z-20 size-full object-cover transition duration-500 group-hover:scale-110" src={x.img} srcSet={srcSet(x.img)} sizes={CARD} alt={tr(x.name)} loading="lazy" />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition group-hover:from-brand-dark/85" />
                  <span className="inline-flex items-center gap-1.5 font-card text-sm font-bold sm:text-base"><Icon name="pin" size={15} className="text-accent" /> {tr(x.name)}</span>
                </Link>
              </li>
            )))}
          </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export function PrivateCar() {
  const { t } = useLang()
  const pg = t.pages.car
  const tr = useTr()
  usePageTitle(t.meta.car, { desc: t.pages.car.sub, image: '/img/tour/airport-pick-up-one-way.webp' })
  const submit = useThankYouSubmit()
  const [params] = useSearchParams()
  const pre = VEHICLES.find((v) => v.key === params.get('vehicle'))
  return (
    <>
      <PageHero title={pg.title} sub={pg.sub} img="/img/tour/airport-pick-up-one-way.webp" crumbs={[[t.nav.car]]} />

      <section className="reveal curve-bottom bg-sand py-16 font-l1 md:py-20">
        <div className="container-x">
          <div className="mb-10 max-w-3xl">
            <p className="l1-eyebrow mb-3">{t.l1.cars.eyebrow}</p>
            <h2 className="l1-h-section">{t.l1.cars.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t.l1.cars.sub}</p>
          </div>
          <VehicleGrid />
        </div>
      </section>

      <CarRoutes />

      <section className="reveal bg-photo-dark scroll-mt-28 py-14 text-white md:py-20" id="car-form">
        <div data-anim="sides" className="container-x grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>{t.car.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">{pg.formTitle}</h2>
            <p className="mt-4 text-lg text-white/80">{t.car.sub}</p>
          </div>
          <form onSubmit={submit} data-form="car-quote" className="grid gap-4 rounded-2xl bg-white p-6 text-ink shadow-2xl sm:grid-cols-2 md:p-8">
            <label><span className="label">{t.form.name} *</span><input className="field" required name="name" autoComplete="name" /></label>
            <label><span className="label">{t.form.email} *</span><input className="field" required type="email" name="email" autoComplete="email" /></label>
            <label><span className="label">{pg.pickup}</span><input className="field" name="pickup" placeholder="Noi Bai Airport" /></label>
            <label><span className="label">{pg.dropoff}</span><input className="field" name="dropoff" placeholder="Hanoi Old Quarter" /></label>
            <label><span className="label">{pg.date}</span><input className="field" type="datetime-local" name="date" /></label>
            <label><span className="label">{pg.pax}</span><input className="field" type="number" min="1" defaultValue="2" name="pax" /></label>
            <label><span className="label">{pg.vehicle}</span>
              <select className="field" name="vehicle" defaultValue={pre?.name}>{VEHICLES.map((v) => <option key={v.key} value={v.name}>{tr(v.name)}</option>)}</select>
            </label>
            <label><span className="label">{pg.driverLang}</span>
              <select className="field" name="lang"><option>English</option><option>中文</option><option>Vietnamese</option></select>
            </label>
            <div className="sm:col-span-2"><button type="submit" className="btn btn-accent w-full sm:w-auto">{t.car.quote} <Icon name="send" size={16} /></button></div>
          </form>
        </div>
      </section>
    </>
  )
}

const GROUPS = [
  ['arrival', 'groupArrival'],
  ['departure', 'groupDeparture'],
  ['extra', 'groupExtra'],
]

// Minh hoạ nhiều màu, chủ đạo đỏ + xanh dương theo logo, thêm vàng / xanh trời / xanh lá / màu da cho sinh động
const SR = 'var(--color-accent-500)'
const SB = 'var(--color-brand)'
const SY = '#f6b93b'
const SL = '#8ec5f5'
const SG = '#3fae6a'
const SK = '#f3c8a8'
const SD = '#0b2c4d'
const STEP_ART = {
  landing: (
    <>
      <path d="M4 52c10-6 18-6 28 0s18 6 28 0v12H4z" fill={SY} />
      <path d="M6 46h52" stroke={SD} strokeWidth="3" strokeLinecap="round" />
      <path d="M12 50h8M28 50h8M44 50h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="12" r="6" fill={SY} />
      <path d="M10 20l4-2 10 6 14-6c3-1.2 6 .4 6.8 2.6l-28 14-8-3 5-3-6-5z" fill={SB} transform="rotate(14 30 28)" />
      <path d="M30 27l8-10 4 1-5 11z" fill={SR} transform="rotate(14 30 28)" />
    </>
  ),
  board: (
    <>
      <path d="M22 14c0-6 4-9 10-9s10 3 10 9v2H22z" fill={SD} />
      <rect x="18" y="13" width="28" height="3" rx="1.5" fill={SD} />
      <circle cx="32" cy="20" r="7" fill={SK} />
      <path d="M16 62c0-13 7-22 16-22s16 9 16 22z" fill={SB} />
      <path d="M30 40l2 6 2-6" fill="#fff" />
      <rect x="10" y="32" width="44" height="18" rx="3" fill={SY} stroke={SD} strokeWidth="2" />
      <path d="M18 41h28" stroke={SR} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="12" cy="41" r="3.5" fill={SK} />
      <circle cx="52" cy="41" r="3.5" fill={SK} />
    </>
  ),
  meet: (
    <>
      <circle cx="19" cy="18" r="7" fill={SK} />
      <path d="M12 16c1-5 4-7 7-7s7 2 7 6l-3-1-4 2-4-2z" fill={SD} />
      <path d="M5 60c0-12 6-22 14-22s14 10 14 22z" fill={SB} />
      <circle cx="45" cy="18" r="7" fill={SK} />
      <path d="M38 17c0-6 3-9 7-9s7 3 7 9c-2-2-4-3-7-3s-5 1-7 3z" fill="#7a4a2a" />
      <path d="M31 60c0-12 6-22 14-22s14 10 14 22z" fill={SR} />
      <rect x="49" y="44" width="10" height="13" rx="2" fill={SY} />
      <path d="M24 46c4 3 12 3 16 0" stroke={SK} strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="7" r="3" fill={SG} />
    </>
  ),
  docs: (
    <>
      <rect x="8" y="8" width="32" height="44" rx="4" fill={SB} />
      <rect x="12" y="12" width="24" height="36" rx="2" fill={SD} opacity=".35" />
      <circle cx="24" cy="26" r="7" fill="none" stroke={SY} strokeWidth="2.5" />
      <path d="M17 26h14M24 19v14" stroke={SY} strokeWidth="1.5" />
      <path d="M15 42h18" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="30" y="32" width="28" height="22" rx="4" fill={SR} />
      <rect x="36" y="27" width="10" height="6" rx="1.5" fill={SR} />
      <circle cx="44" cy="43" r="7" fill="#fff" />
      <circle cx="44" cy="43" r="4" fill={SL} />
      <circle cx="53" cy="36" r="1.8" fill={SY} />
      <circle cx="50" cy="56" r="7" fill={SG} />
      <path d="M46.5 56l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  lane: (
    <>
      <path d="M14 62L24 26h16l10 36z" fill={SL} />
      <path d="M32 30v8M32 44v8M32 56v6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="8" y="12" width="48" height="12" rx="3" fill={SB} />
      <path d="M16 18h10" stroke={SY} strokeWidth="3" strokeLinecap="round" />
      <path d="M36 18l4-3v6zM44 18l4-3v6z" fill={SY} />
      <path d="M10 24v38M54 24v38" stroke={SD} strokeWidth="4" strokeLinecap="round" />
      <path d="M24 46l8-8 8 8" stroke={SR} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  clock: (
    <>
      <path d="M22 6h20" stroke={SD} strokeWidth="4" strokeLinecap="round" />
      <path d="M32 6v6" stroke={SD} strokeWidth="4" />
      <path d="M50 14l4 4" stroke={SR} strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="36" r="24" fill={SB} />
      <circle cx="32" cy="36" r="19" fill="#fff" />
      <path d="M32 36V17a19 19 0 0116.5 28.5z" fill={SY} opacity=".55" />
      <path d="M32 22v14l9 6" stroke={SR} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="32" cy="36" r="2.5" fill={SD} />
    </>
  ),
  counter: (
    <>
      <rect x="4" y="8" width="30" height="10" rx="2" fill={SD} />
      <path d="M9 13h20" stroke={SY} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="27" r="6" fill={SK} />
      <path d="M10 40c0-6 4-9 10-9s10 3 10 9z" fill={SG} />
      <rect x="4" y="38" width="38" height="20" rx="3" fill={SB} />
      <path d="M10 46h18" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <rect x="40" y="24" width="20" height="30" rx="4" fill={SR} />
      <path d="M45 24v-6h10v6" stroke={SD} strokeWidth="3" fill="none" />
      <path d="M46 30v18M54 30v18" stroke="#fff" strokeOpacity=".6" strokeWidth="2" />
      <circle cx="44" cy="58" r="3" fill={SD} />
      <circle cx="56" cy="58" r="3" fill={SD} />
    </>
  ),
  takeoff: (
    <>
      <path d="M8 18c4-5 10-5 14 0 3-3 8-3 10 1 4 0 6 3 5 6H8c-3-1-3-6 0-7z" fill={SL} />
      <path d="M4 56c10-5 18-5 28 0s18 5 28 0v8H4z" fill={SG} />
      <path d="M6 52h52" stroke={SD} strokeWidth="3" strokeLinecap="round" />
      <path d="M12 42l4-2 10 6 14-6c3-1.2 6 .4 6.8 2.6l-28 14-8-3 5-3-6-5z" fill={SB} transform="rotate(-22 32 42)" />
      <path d="M32 40l9-8 4 1-6 10z" fill={SR} transform="rotate(-22 32 42)" />
      <path d="M44 22l4-2M48 28l5-1" stroke={SY} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
}
const STEP_ICONS = {
  arrival: ['landing', 'board', 'meet', 'docs', 'lane'],
  departure: ['clock', 'counter', 'board', 'docs', 'takeoff'],
}

// Quy trình fast-track dạng sơ đồ (kiểu "How does it work?"): nhãn tiêu đề, các vòng tròn minh hoạ nối nét đứt,
// đường đứt vòng về chấm kết thúc. Mobile: danh sách dọc nối nét đứt.
function Steps({ title, steps, kind, end }) {
  const icons = STEP_ICONS[kind]
  const circle = (i) => (
    <span className="relative z-10 grid size-24 shrink-0 place-items-center transition group-hover:-translate-y-1 md:size-36">
      <svg viewBox="0 0 64 64" className="size-20 drop-shadow-[0_6px_10px_rgba(11,44,77,0.18)] md:size-32" aria-hidden="true">{STEP_ART[icons[i]]}</svg>
      <span className="absolute -right-1 -top-1 grid size-8 place-items-center rounded-full bg-accent-500 font-card text-sm font-bold text-white shadow">{i + 1}</span>
    </span>
  )
  return (
    <div className="relative">
      <h3 className="relative z-10 inline-flex rounded-xl bg-white px-6 py-3 font-card text-xl font-bold text-ink shadow-sm ring-1 ring-black/5 md:text-2xl">{title}</h3>

      {/* Màn rộng: hàng ngang */}
      <div className="relative mt-10 hidden md:block">
        <span className="absolute -top-10 left-[calc(10%-1px)] h-[5rem] border-l-[3px] border-dashed border-brand/25" aria-hidden="true" />
        <ol className="grid grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <li key={s} className="group relative flex flex-col items-center text-center after:absolute after:left-[calc(50%+4.75rem)] after:top-[4.5rem] after:w-[calc(100%-8.5rem)] after:border-t-[3px] after:border-dashed after:border-brand/25 last:after:hidden">
              {circle(i)}
              <p className="mt-5 max-w-[13rem] text-[15px] font-medium leading-snug text-ink/85">{s}</p>
            </li>
          ))}
        </ol>
        {/* Đường đứt vòng từ bước cuối về chấm kết thúc */}
        <div className="relative mx-[10%] mt-6 h-12 rounded-b-3xl border-x-[3px] border-b-[3px] border-dashed border-brand/25" aria-hidden="true" />
        <p className="relative -mt-3 ml-[calc(10%-11px)] flex items-center gap-3 font-card text-lg font-semibold text-ink">
          <span className="size-6 rounded-full bg-accent-500 ring-4 ring-accent-500/20" /> {end}
        </p>
      </div>

      {/* Mobile: danh sách dọc */}
      <ol className="relative mt-6 grid gap-5 md:hidden">
        <span className="absolute bottom-6 left-12 top-6 border-l-[3px] border-dashed border-brand/25" aria-hidden="true" />
        {steps.map((s, i) => (
          <li key={s} className="group relative flex items-center gap-4">
            {circle(i)}
            <p className="text-[15px] font-medium leading-snug text-ink/85">{s}</p>
          </li>
        ))}
        <li className="relative flex items-center gap-4 pl-9 font-card font-semibold text-ink">
          <span className="relative z-10 size-6 rounded-full bg-accent-500 ring-4 ring-accent-500/20" /> {end}
        </li>
      </ol>
    </div>
  )
}

// Ảnh nền cho 5 thẻ các bước e-visa (bản 640px)
const EVISA_IMGS = ['ha-long', 'hoi-an-9-copy', 'tam-coc-bich-dong', 'da-nang', 'airport-pick-up-one-way']

export function VisaPage() {
  const { t, lang } = useLang()
  const pg = t.pages.visa
  usePageTitle(t.meta.visa, { desc: t.pages.visa.sub, image: '/img/tour/airport-pick-up-one-way.webp' })
  const submit = useThankYouSubmit()
  const [airport, setAirport] = useState('SGN')
  const col = (code) => (code === airport ? '' : 'max-md:hidden')
  const [params] = useSearchParams()
  const [group, setGroup] = useState('arrival')
  const [pkg, setPkg] = useState(() => Number(params.get('pkg')) || 1)
  const other = lang === 'zh' ? 'en' : 'zh'
  const minPrice = (f) => Math.min(...Object.values(f.prices).filter(Boolean))
  const book = (n) => {
    setPkg(n)
    document.getElementById('visa-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <PageHero title={pg.title} sub={pg.sub} img="/img/tour/airport-pick-up-one-way.webp" crumbs={[[t.nav.visa]]} />

      {/* Mỗi gói 1 thẻ: tên EN + ZH, mô tả, giá "từ", giá theo 5 sân bay, nút đặt (docs mục 7) */}
      <section className="reveal reveal-fx bg-photo-light scroll-mt-28 py-12 md:py-16" id="packages">
        <div className="container-x">
          <CenterHead eyebrow={t.visa.eyebrow} title={pg.cardsTitle} sub={pg.cardsSub} />
          <div className="m-chips mb-8 flex flex-wrap justify-center gap-2" role="tablist">
            {GROUPS.map(([g, label]) => (
              <button
                key={g}
                role="tab"
                aria-selected={group === g}
                data-pwc-interaction="fasttrack-group"
                onClick={() => setGroup(g)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition ${group === g ? 'border-brand bg-brand text-white' : 'bg-white hover:border-brand hover:text-brand'}`}
              >
                {pg[label]}
              </button>
            ))}
          </div>
          <div key={group} data-pwc-controlled="fasttrack-group" className="m-rail grid animate-[fade-up_.5s_ease] gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FAST_TRACK.filter((f) => f.group === group).map((f) => (
              <article key={f.n} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-card text-lg font-bold leading-snug">{f[lang]}</h3>
                    <p className="mt-0.5 text-sm text-muted">{f[other]}</p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-light text-sm font-bold text-brand">{f.n}</span>
                </div>
                <p className="mt-3 text-sm text-muted">{f.desc[lang]}</p>
                <p className="mt-4 text-sm text-muted">{pg.fromLabel} <b className="text-xl text-accent-600">{usd(minPrice(f))}</b> {pg.perGuest}</p>
                <ul className="mt-4 grid grid-cols-5 gap-1.5 text-center text-xs">
                  {AIRPORTS.map((a) => (
                    <li key={a.code} className={`rounded-lg px-1 py-2 ${f.prices[a.code] ? 'bg-sand' : 'bg-black/[0.03] text-muted'}`}>
                      <b className="block text-ink">{a.code}</b>
                      {f.prices[a.code] ? f.prices[a.code] : '–'}
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => book(f.n)} data-pwc-interaction="fasttrack-book" className="btn btn-accent mt-5 w-full">
                  {pg.bookThis} <Icon name="arrow" size={16} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal reveal-fx container-x scroll-mt-28 py-12 md:py-16" id="prices">
        <SplitHead reverse eyebrow={t.visa.eyebrow} title={pg.tableTitle} note={[pg.tableSub]} />
        <div className="mb-4 grid grid-cols-5 gap-1.5 md:hidden" role="tablist">
          {AIRPORTS.map((a) => (
            <button key={a.code} role="tab" aria-selected={airport === a.code} data-pwc-interaction="price-airport" onClick={() => setAirport(a.code)} className={`rounded-xl border py-2.5 text-sm font-bold ${airport === a.code ? 'border-brand bg-brand text-white' : 'bg-white'}`}>{a.code}</button>
          ))}
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-sm ring-1 ring-black/5">
          <table className="w-full border-collapse text-[15px]">
            <thead>
              <tr className="bg-brand-dark text-white">
                <th className="px-4 py-3.5 text-left max-md:hidden">#</th>
                <th className="px-4 py-3.5 text-left">{pg.service}</th>
                {AIRPORTS.map((a) => (
                  <th key={a.code} className={`px-3 py-3.5 text-center ${col(a.code)}`}>{a.code}<small className="block text-[11px] font-normal text-white/70">{a.city}</small></th>
                ))}
              </tr>
            </thead>
            {GROUPS.map(([g, label]) => (
              <tbody key={g}>
                <tr><th colSpan={2 + AIRPORTS.length} className="bg-sand px-4 py-2.5 text-left text-xs font-bold uppercase tracking-[0.15em] text-brand-dark">{pg[label]}</th></tr>
                {FAST_TRACK.filter((f) => f.group === g).map((f) => (
                  <tr key={f.n} className="border-t border-black/5 bg-white transition hover:bg-brand-light/50">
                    <td className="px-4 py-3 text-muted max-md:hidden">{f.n}</td>
                    <td className="px-4 py-3"><b className="font-semibold">{f[lang]}</b><small className="block text-[13px] text-muted">{f.desc[lang]}</small></td>
                    {AIRPORTS.map((a) => (
                      <td key={a.code} className={`px-3 py-3 text-center ${col(a.code)}`}>
                        {f.prices[a.code] ? <b className="whitespace-nowrap text-base text-accent-600">{usd(f.prices[a.code])}</b> : <span className="text-muted">–</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
        <ul className="mt-5 list-disc space-y-1 rounded-xl bg-[#fff6e8] py-4 pl-9 pr-5 text-sm">
          <li>{t.visa.note1}</li>
          <li>{t.visa.note2}</li>
        </ul>
      </section>

      <section className="reveal py-14 md:py-20">
        <div className="container-x grid gap-16 md:gap-20">
          <Steps title={pg.arrivalTitle} steps={pg.arrival} kind="arrival" end={pg.arrivalEnd} />
          <Steps title={pg.departureTitle} steps={pg.departure} kind="departure" end={pg.departureEnd} />
        </div>
      </section>

      <section className="reveal reveal-fx container-x scroll-mt-28 py-14 md:py-20" id="evisa">
        <CenterHead eyebrow="E-visa" title={pg.evisaTitle} sub={pg.evisaNote} />
        <ol className="stagger m-rail grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pg.evisa.map((s, i) => (
            <li key={s} className="group relative isolate flex min-h-56 flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-md">
              <img className="absolute inset-0 -z-20 size-full object-cover transition duration-700 group-hover:scale-105" src={`/img/tour/${EVISA_IMGS[i]}-640.webp`} srcSet={srcSet(`/img/tour/${EVISA_IMGS[i]}-640.webp`)} sizes={CARD} alt="" loading="lazy" />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark/95 via-brand-dark/70 to-brand-dark/25" />
              <span className="font-serif text-4xl font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-2 text-sm leading-relaxed text-white/95">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="reveal bg-photo-dark scroll-mt-28 py-14 text-white md:py-20" id="visa-form">
        <div data-anim="sides" className="container-x grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>{t.visa.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">{pg.formTitle}</h2>
            <p className="mt-4 text-lg text-white/80">{t.visa.sub}</p>
          </div>
          <form onSubmit={submit} data-form="fast-track" className="grid gap-4 rounded-2xl bg-white p-6 text-ink shadow-2xl sm:grid-cols-2 md:p-8">
            <label><span className="label">{t.form.name} *</span><input className="field" required name="name" autoComplete="name" /></label>
            <label><span className="label">{t.form.email} *</span><input className="field" required type="email" name="email" autoComplete="email" /></label>
            <label><span className="label">{pg.nationality} *</span><input className="field" required name="nationality" /></label>
            <label><span className="label">{pg.pax}</span><input className="field" type="number" min="1" defaultValue="1" name="pax" /></label>
            <label><span className="label">{pg.date}</span><input className="field" type="date" name="date" /></label>
            <label><span className="label">{pg.airport}</span>
              <select className="field" name="airport">{AIRPORTS.map((a) => <option key={a.code}>{a.code} – {a.name}</option>)}</select>
            </label>
            <label><span className="label">{pg.flight}</span><input className="field" name="flight" placeholder="VN123" /></label>
            <label><span className="label">{pg.pkg}</span>
              <select className="field" name="package" value={pkg} onChange={(e) => setPkg(Number(e.target.value))}>{FAST_TRACK.map((f) => <option key={f.n} value={f.n}>{f.n}. {f[lang]}</option>)}</select>
            </label>
            <div className="sm:col-span-2"><button type="submit" className="btn btn-accent w-full sm:w-auto">{t.visa.cta} <Icon name="send" size={16} /></button></div>
          </form>
        </div>
      </section>
    </>
  )
}
