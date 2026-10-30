import { useState } from 'react'
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

const MOSAIC = ['md:col-span-2', '', '', 'md:col-span-2']

export function Destinations() {
  const { t } = useLang()
  const pg = t.pages.destinations
  usePageTitle(t.meta.destinations, { desc: t.pages.destinations.sub, image: '/img/tour/hoang-su-phi-ha-giang.webp' })
  return (
    <>
      <PageHero title={pg.title} sub={pg.sub} img="/img/tour/hoang-su-phi-ha-giang.webp" crumbs={[[t.nav.destinations]]} />
      {['north', 'central', 'south'].map((k, i) => (
        <section key={k} id={k} className={`reveal reveal-fx scroll-mt-28 py-12 md:py-16 ${i % 2 ? 'bg-photo-light' : 'bg-white'}`}>
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
            <div className="stagger grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{routes.map((x) => <RealTourCard key={x.id} x={x} />)}</div>
          )}
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-14 md:py-20">
        {/* Nền mờ: ảnh của chính thành phố, mép trên/dưới tan vào nền trắng */}
        <img className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-[0.18] [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" alt="" src={c.img} loading="lazy" />
        <div className="container-x">
          <h2 className="mb-5 text-center font-card text-xl font-bold">{cc.others}</h2>
          {/* Mỗi thành phố là 1 ô ảnh của chính nơi đó, chữ trắng trên lớp tối */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CAR_CITIES.filter((x) => x.slug !== c.slug).map((x) => (
              <li key={x.slug}>
                <Link to={`/private-car/${x.slug}`} className="group relative isolate flex aspect-[4/3] items-end overflow-hidden rounded-2xl p-3 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                  <img className="absolute inset-0 -z-20 size-full object-cover transition duration-500 group-hover:scale-110" src={x.img} alt={tr(x.name)} loading="lazy" />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition group-hover:from-brand-dark/85" />
                  <span className="inline-flex items-center gap-1.5 font-card text-sm font-bold sm:text-base"><Icon name="pin" size={15} className="text-accent" /> {tr(x.name)}</span>
                </Link>
              </li>
            ))}
          </ul>
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
              <select className="field" name="lang"><option>English</option><option>中文</option><option>Tiếng Việt</option></select>
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

function Steps({ title, steps, icon }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
      <h3 className="flex items-center gap-3 font-card text-xl font-bold"><span className="grid size-11 place-items-center rounded-xl bg-brand-light text-brand"><Icon name={icon} size={22} /></span>{title}</h3>
      <ol className="stagger mt-6 grid gap-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-4 rounded-2xl bg-sand px-4 py-3">
            <span className="font-serif text-3xl font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-medium">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

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

      <section className="reveal bg-photo-light py-14 md:py-20">
        <div className="stagger container-x grid gap-6 lg:grid-cols-2">
          <Steps title={pg.arrivalTitle} steps={pg.arrival} icon="planeLanding" />
          <Steps title={pg.departureTitle} steps={pg.departure} icon="plane" />
        </div>
      </section>

      <section className="reveal reveal-fx container-x scroll-mt-28 py-14 md:py-20" id="evisa">
        <CenterHead eyebrow="E-visa" title={pg.evisaTitle} sub={pg.evisaNote} />
        <ol className="stagger m-rail grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pg.evisa.map((s, i) => (
            <li key={s} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <span className="font-serif text-4xl font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-2 text-sm leading-relaxed">{s}</p>
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
