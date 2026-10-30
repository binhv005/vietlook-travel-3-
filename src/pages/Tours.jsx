import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useLang } from '../i18n'
import { useTr } from '../loc'
import { usePageTitle, useThankYouSubmit } from '../hooks'
import { PACKAGES, STOP_INFO } from '../data'
import { PageHero } from '../components/Layout'
import { StylesL2, HowToBook } from '../components/HomeA'
import { ReviewSlider } from '../components/HomeB'
import { TourCard, Price, saving, usd } from '../components/TourCards'
import { CenterHead, Pagination, usePage } from '../components/ui'
import Icon from '../components/Icon'
import RealTour from './RealTour'
import MobileBookBar from '../components/MobileBookBar'
import { RealTourCard, CardSkeleton } from '../components/RealTours'
import { useJson, isInboundTour } from '../useJson'

const REGION_KEYS = ['north', 'central', 'south']

const PAGE = 24
const LEN = {
  w1: (x) => x.days && x.days <= 7,
  w2: (x) => x.days >= 8 && x.days <= 14,
  w3: (x) => x.days >= 15,
}
// Nhãn tour dạng "Ha Noi Tour" → điểm đến "Ha Noi"; "Hoi An" không có hậu tố. Bỏ nhãn chung như "Vietnam Tours".
const destName = (type) => (type === 'Hoi An' ? type : / Tour$/.test(type) ? type.slice(0, -5) : null)

// Tham số URL nhiều giá trị, cách nhau bằng dấu phẩy (?region=north,south&dest=Sapa%20Tour).
const listParam = (params, key) => (params.get(key) || '').split(',').filter(Boolean)

// Khối lọc thu gọn được (Destination / Duration) trong thanh Filters.
function FilterGroup({ title, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-t border-black/10 py-5">
      <button type="button" className="flex w-full items-center justify-between font-card text-sm font-bold uppercase tracking-wide" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {title}
        <Icon name="chevD" size={18} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-4 grid gap-3">{children}</div>}
    </div>
  )
}

function Check({ label, count, checked, onChange, sub = false }) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 ${sub ? 'pl-8 text-[15px]' : ''}`}>
      <input type="checkbox" className="size-5 shrink-0 cursor-pointer rounded accent-brand" checked={checked} onChange={onChange} />
      <span className="flex-1 text-ink/85">{label}</span>
      <span className="text-xs text-muted">{count}</span>
    </label>
  )
}

// Danh sách tour thật từ vietlooktravel.com + thanh lọc bên trái (vùng miền › điểm đến, số ngày) như mẫu Link 3.
export function Tours() {
  const { t } = useLang()
  const pt = t.pages.tours
  usePageTitle(t.meta.tours, { desc: pt.sub, image: '/img/tour/tourdulichninhbinh1ngay.webp' })
  const [params, setParams] = useSearchParams()
  const [page, goTo] = usePage(params, setParams, 'tour-list')
  const data = useJson('/data/tours.json')
  const lens = listParam(params, 'len').filter((k) => LEN[k])
  const regions = listParam(params, 'region').filter((k) => REGION_KEYS.includes(k))
  const dests = listParam(params, 'dest')
  const q = (params.get('q') || '').trim().toLowerCase()

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value) next.delete(key)
    else next.set(key, value)
    next.delete('page')
    setParams(next, { replace: true })
  }
  const toggle = (key, list, value) => setParam(key, (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]).join(','))
  const reset = () => {
    setParams(params.get('q') ? { q: params.get('q') } : {}, { replace: true })
  }

  const tours = useMemo(() => (data || []).filter(isInboundTour), [data])
  // Điểm đến con của từng vùng: lấy từ nhãn "<Nơi> Tour", xếp vào vùng xuất hiện nhiều nhất trong các tour mang nhãn đó.
  const destTree = useMemo(() => {
    const info = {}
    tours.forEach((x) =>
      x.types.forEach((type) => {
        if (!destName(type)) return
        const d = (info[type] ||= { n: 0, region: {} })
        d.n += 1
        x.region.forEach((r) => (d.region[r] = (d.region[r] || 0) + 1))
      }),
    )
    const tree = { north: [], central: [], south: [] }
    Object.entries(info).forEach(([type, d]) => {
      const top = Object.entries(d.region).sort((a, b) => b[1] - a[1])[0]
      if (top && d.n >= 2) tree[top[0]].push(type)
    })
    Object.values(tree).forEach((arr) => arr.sort((a, b) => info[b].n - info[a].n))
    return tree
  }, [tours])

  const byText = tours.filter((x) => !q || `${x.title} ${x.summary} ${x.types.join(' ')} ${x.code || ''}`.toLowerCase().includes(q))
  const byLen = (x) => !lens.length || lens.some((k) => LEN[k](x))
  const byPlace = (x) => (!regions.length && !dests.length) || regions.some((r) => x.region.includes(r)) || dests.some((d) => x.types.includes(d))
  const list = byText.filter(byLen).filter(byPlace)
  const pages = Math.ceil(list.length / PAGE)
  const cur = Math.min(page, Math.max(pages, 1))
  // Số đếm cạnh mỗi lựa chọn tính theo các bộ lọc còn lại (từ khoá + nhóm kia).
  const placePool = byText.filter(byLen)
  const lenPool = byText.filter(byPlace)

  const filterHead = (
    <div className="flex items-center justify-between pb-5">
      <span className="flex items-center gap-2.5 font-card text-xl font-bold"><Icon name="sliders" size={22} /> {pt.filters}</span>
      <button type="button" className="text-sm font-semibold text-brand hover:underline" onClick={reset}>{pt.reset}</button>
    </div>
  )
  const filters = (
    <>
      <FilterGroup title={pt.destination}>
        {REGION_KEYS.map((r) => (
          <div key={r} className="grid gap-3">
            <Check label={t.dest[r]} count={placePool.filter((x) => x.region.includes(r)).length} checked={regions.includes(r)} onChange={() => toggle('region', regions, r)} />
            {destTree[r].map((d) => (
              <Check key={d} sub label={destName(d)} count={placePool.filter((x) => x.types.includes(d)).length} checked={dests.includes(d)} onChange={() => toggle('dest', dests, d)} />
            ))}
          </div>
        ))}
      </FilterGroup>
      <FilterGroup title={pt.duration}>
        {Object.keys(LEN).map((k) => (
          <Check key={k} label={t.pkg[k]} count={lenPool.filter(LEN[k]).length} checked={lens.includes(k)} onChange={() => toggle('len', lens, k)} />
        ))}
      </FilterGroup>
    </>
  )

  return (
    <>
      <PageHero title={pt.title} sub={pt.sub} img="/img/tour/tourdulichninhbinh1ngay.webp" crumbs={[[t.nav.tours]]} />
      <section className="reveal container-x grid items-start gap-8 py-10 md:py-16 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl border border-black/10 bg-white p-6 lg:sticky lg:top-28 lg:block" aria-label={pt.filters}>
          {filterHead}
          {filters}
        </aside>
        <details className="rounded-2xl border border-black/10 bg-white px-5 lg:hidden">
          <summary className="flex cursor-pointer items-center gap-2.5 py-4 font-card font-bold">
            <Icon name="sliders" size={20} /> {pt.filters}
            <Icon name="chevD" size={18} className="ml-auto" />
          </summary>
          {filterHead}
          {filters}
        </details>

        <div id="tour-list" className="scroll-mt-28">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative flex-1">
              <Icon name="search" size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input className="field !pl-10" defaultValue={params.get('q') || ''} placeholder={t.search.keywordPh} onChange={(e) => setParam('q', e.target.value)} aria-label={t.search.keyword} />
            </label>
            <p className="text-muted sm:ml-4"><strong className="text-xl text-accent-500">{data ? list.length : '…'}</strong> {pt.found}</p>
          </div>
          {data === undefined ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"><CardSkeleton /></div>
          ) : list.length ? (
            <>
              <div key={`${lens}-${regions}-${dests}-${q}-${cur}`} className="grid animate-[fade-up_.5s_ease] gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {list.slice((cur - 1) * PAGE, cur * PAGE).map((x) => <RealTourCard key={x.id} x={x} />)}
              </div>
              <Pagination page={cur} pages={pages} onChange={goTo} />
            </>
          ) : (
            <p className="py-10 text-center text-muted">{t.pkg.empty} <Link className="font-semibold text-accent-500" to="/contact">{t.plan} →</Link></p>
          )}
        </div>
      </section>
      <StylesL2 />
      <HowToBook />
    </>
  )
}

// Dựng lịch trình mẫu từ các điểm trong tuyến, chia đều số ngày.
function buildItinerary(p) {
  const stops = p.route.split(' – ').map((s) => s.trim())
  const per = p.days / stops.length
  return stops.map((name, i) => {
    const start = Math.floor(i * per) + 1
    const end = Math.max(start, Math.floor((i + 1) * per))
    const info = STOP_INFO[name] || STOP_INFO[Object.keys(STOP_INFO).find((k) => name.startsWith(k))] || null
    return { name, range: start === end ? `${start}` : `${start}–${end}`, info }
  })
}

export function TourDetail() {
  const { id } = useParams()
  const { t, lang } = useLang()
  const d = t.detail
  const tr = useTr()
  const p = PACKAGES.find((x) => x.id === id)
  usePageTitle(p ? `${p.title} | Vietlook Travel` : t.meta.notFound, p ? { desc: `${p.desc || p.route} From USD ${p.price}.`, image: p.img } : undefined)
  const submit = useThankYouSubmit()
  if (!p) return <RealTour id={id} />

  const days = buildItinerary(p)
  const related = PACKAGES.filter((x) => x.id !== p.id && x.regions.some((r) => p.regions.includes(r))).slice(0, 3)
  const pct = saving(p)
  const h2 = 'mt-12 mb-4 font-serif text-2xl font-bold text-ink md:text-3xl'

  return (
    <>
      <PageHero title={tr(p.title)} sub={tr.route(p.route)} img={p.img} crumbs={[[t.nav.tours, '/tours'], [tr(p.title)]]} />

      <section className="container-x grid items-start gap-10 py-10 md:py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div className="reveal">
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[['clock', d.duration, `${p.days} ${t.pkg.days} ${p.nights} ${t.pkg.nights}`], ['users', d.type, d.private], ['map', t.pages.tours.region, p.regions.map((r) => t.hero[r]).join(' · ')]].map(([icon, label, value]) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl bg-sand px-4 py-3.5">
                <Icon name={icon} size={20} className="shrink-0 text-accent" />
                <span className="grid leading-tight"><small className="text-xs text-muted">{label}</small><b className="text-ink">{value}</b></span>
              </div>
            ))}
            {pct > 0 && <div className="grid place-items-center rounded-2xl bg-accent-500 px-4 py-3.5 font-bold text-white">{t.pkg.save} {pct}%</div>}
          </div>

          <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-ink md:text-3xl">{d.overview}</h2>
          {p.desc && <p className="text-lg leading-relaxed text-muted">{tr(p.desc)}</p>}
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {p.highlights.map((h) => <li key={h} className="flex gap-2"><Icon name="circleCheck" size={20} className="shrink-0 text-accent" /> {tr(h)}</li>)}
          </ul>

          <h2 className={h2}>{d.itinerary}</h2>
          <p className="text-sm text-muted">{d.itineraryNote}</p>
          <div className="mt-5 grid gap-3">
            {days.map((s, i) => (
              <details key={s.name + i} open={i === 0} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 open:shadow-lg" data-pwc-interaction="itinerary">
                <summary className="flex cursor-pointer items-center gap-4 px-5 py-4 font-semibold text-ink">
                  <span className="shrink-0 rounded-full bg-brand px-3 py-1 text-xs text-white">{lang === 'zh' ? `${d.day} ${s.range} 天` : `${d.day} ${s.range}`}</span>
                  <span className="font-card text-lg">{tr(s.name)}</span>
                  <Icon name="chevD" size={18} className="ml-auto shrink-0 transition group-open:rotate-180" />
                </summary>
                <div className="grid gap-4 px-5 pb-5 sm:grid-cols-[180px_1fr] sm:items-center">
                  {s.info && <img className="aspect-[16/9] w-full rounded-xl object-cover sm:aspect-[4/3]" src={s.info.img} alt={s.name} loading="lazy" />}
                  <p className="text-muted">{s.info ? s.info[lang] : tr(p.highlights[0])}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-sand p-6">
              <h3 className="font-card text-lg font-bold">{d.included}</h3>
              <ul className="mt-3 space-y-2 text-sm">{d.inc.map((x) => <li key={x} className="flex gap-2"><Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand" /> {x}</li>)}</ul>
            </div>
            <div className="rounded-2xl bg-sand p-6">
              <h3 className="font-card text-lg font-bold">{d.excluded}</h3>
              <ul className="mt-3 space-y-2 text-sm">{d.exc.map((x) => <li key={x} className="flex gap-2"><Icon name="close" size={16} className="mt-0.5 shrink-0 text-muted" /> {x}</li>)}</ul>
            </div>
          </div>

          <h2 className={h2}>{d.faq}</h2>
          <div data-anim="right" className="grid gap-3">
            {d.faqs.map(([q, a]) => (
              <details key={q} className="group rounded-2xl bg-white shadow-sm ring-1 ring-black/5" data-pwc-interaction="faq">
                <summary className="flex cursor-pointer items-center gap-4 px-5 py-4 font-semibold">
                  {q}
                  <Icon name="chevD" size={18} className="ml-auto shrink-0 transition group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-muted">{a}</p>
              </details>
            ))}
          </div>
        </div>

        <aside id="book" className="scroll-mt-28 rounded-2xl border-t-4 border-accent bg-white p-6 shadow-2xl ring-1 ring-black/5 lg:sticky lg:top-28">
          <Price p={p} size="text-2xl" />
          <h3 className="mt-3 font-serif text-2xl font-bold">{d.book}</h3>
          <p className="mt-1 text-sm text-muted">{d.bookSub}</p>
          <form className="mt-4 grid gap-3" onSubmit={submit} data-form="booking">
            <label><span className="label">{t.form.name} *</span><input className="field" required name="name" autoComplete="name" /></label>
            <label><span className="label">{t.form.email} *</span><input className="field" required type="email" name="email" autoComplete="email" /></label>
            <label><span className="label">{d.date}</span><input className="field" type="date" name="date" /></label>
            <label><span className="label">{d.pax}</span><input className="field" type="number" min="1" defaultValue="2" name="pax" /></label>
            <input type="hidden" name="tour" value={p.id} />
            <button type="submit" className="btn btn-accent w-full">{d.send} <Icon name="send" size={16} /></button>
          </form>
          <a className="btn btn-outline mt-3 w-full text-brand" href="https://wa.me/84983393588">{d.askQuestion}</a>
        </aside>
      </section>

      <MobileBookBar label={usd(p.price)} />

      <section className="bg-photo-dark py-14 md:py-20">
        <div className="container-x">
          <h2 className="text-center font-card text-3xl font-bold text-white md:text-4xl">{d.reviews}</h2>
          <ReviewSlider />
        </div>
      </section>

      {related.length > 0 && (
        <section className="reveal container-x py-14 md:py-20">
          <CenterHead eyebrow={t.pkg.eyebrow} title={d.related} />
          <div className="m-rail grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <TourCard key={r.id} p={r} />)}
          </div>
        </section>
      )}
    </>
  )
}
