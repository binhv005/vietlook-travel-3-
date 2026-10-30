import { useLang } from '../i18n'
import { usePageTitle, useThankYouSubmit } from '../hooks'
import { useJson, isInboundTour, formatPrice } from '../useJson'
import { PageHero } from '../components/Layout'
import { ReviewSlider } from '../components/HomeB'
import { RealTourCard, durationLabel } from '../components/RealTours'
import { CenterHead } from '../components/ui'
import Icon from '../components/Icon'
import WpContent from '../components/WpContent'
import NotFound from './NotFound'
import MobileBookBar from '../components/MobileBookBar'

const norm = (x) => (x || '').toLowerCase().replace(/\s+/g, ' ').trim()

function InfoList({ title, items, icon = 'check', tone = 'text-brand' }) {
  if (!items?.length) return null
  return (
    <div className="rounded-2xl bg-sand p-6">
      <h3 className="font-card text-lg font-bold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((x) => <li key={x} className="flex gap-2"><Icon name={icon} size={16} className={`mt-0.5 shrink-0 ${tone}`} /> {x}</li>)}
      </ul>
    </div>
  )
}

// Trang chi tiết tour lấy từ dữ liệu vietlooktravel.com (/data/tours/<slug>.json).
export default function RealTour({ id }) {
  const { t } = useLang()
  const d = t.detail
  const rt = t.realTour
  const tour = useJson(`/data/tours/${id}.json`)
  const all = useJson('/data/tours.json')
  const submit = useThankYouSubmit()
  usePageTitle(
    tour ? `${tour.title} | Vietlook Travel` : tour === false ? t.meta.notFound : t.meta.tours,
    tour ? { desc: tour.summary || tour.title, image: tour.img || undefined } : undefined,
  )

  if (tour === false) return <NotFound />
  if (tour === undefined) {
    return <div className="grid min-h-[70vh] place-items-center pt-32 text-muted">{rt.loading}</div>
  }

  const price = formatPrice(tour.priceFrom, tour.currency)
  const dur = durationLabel(tour, t)
  const facts = [
    dur && ['clock', d.duration, dur],
    tour.code && ['badge', rt.code, tour.code],
    tour.region.length > 0 && ['map', t.pages.tours.region, tour.region.map((r) => t.hero[r]).join(' · ')],
  ].filter(Boolean)
  const related = (all || []).filter((x) => x.id !== tour.id && isInboundTour(x) && x.region.some((r) => tour.region.includes(r))).slice(0, 3)
  const h2 = 'mt-12 mb-4 font-serif text-2xl font-bold text-ink md:text-3xl'
  // Khung Included / Not included / Children / Cancellation được bóc ra từ chính nội dung gốc (tour.html):
  // nếu nội dung gốc đã hiển thị danh sách đó thì ẩn khung để không lặp 2 lần.
  const htmlText = norm(new DOMParser().parseFromString(tour.html || '', 'text/html').body.textContent)
  const dedupe = (items) => (items?.length && htmlText.includes(norm(items[0]).slice(0, 40)) ? null : items)

  return (
    <>
      <PageHero title={tour.title} sub={tour.summary} img={tour.img || '/img/tour/tourdulichninhbinh1ngay.webp'} crumbs={[[t.nav.tours, '/tours'], [tour.title]]} />

      <section className="container-x grid items-start gap-10 py-10 md:py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {facts.map(([icon, label, value]) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl bg-sand px-4 py-3.5">
                <Icon name={icon} size={20} className="shrink-0 text-accent" />
                <span className="grid min-w-0 leading-tight"><small className="text-xs text-muted">{label}</small><b className="truncate text-ink">{value}</b></span>
              </div>
            ))}
          </div>

          {tour.outline?.length > 0 && (
            <>
              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-ink md:text-3xl">{d.overview}</h2>
              <ol className="grid gap-2">
                {tour.outline.map((line) => {
                  const m = line.match(/^(Day\s*[\d–-]+\s*:?)\s*(.*)$/i)
                  return (
                    <li key={line} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
                      {m ? <span className="shrink-0 rounded-full bg-brand px-3 py-0.5 text-xs font-semibold text-white">{m[1].replace(/:$/, '')}</span> : <Icon name="pin" size={16} className="mt-1 shrink-0 text-accent" />}
                      <span className="text-[15px] text-ink">{m ? m[2] : line}</span>
                    </li>
                  )
                })}
              </ol>
            </>
          )}

          <h2 className={h2}>{rt.details}</h2>
          {/* Nội dung gốc từ vietlooktravel.com (đã lọc thẻ/thuộc tính không an toàn khi nhập) */}
          <WpContent html={tour.html} />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <InfoList title={d.included} items={dedupe(tour.inclusions)} />
            <InfoList title={d.excluded} items={dedupe(tour.exclusions)} icon="close" tone="text-muted" />
            <InfoList title={rt.children} items={dedupe(tour.children)} icon="users" />
            <InfoList title={rt.cancellation} items={dedupe(tour.cancellation)} icon="shieldAlert" tone="text-accent-500" />
          </div>

          <p className="mt-8 text-xs text-muted">{rt.updated} {tour.modified}</p>
        </div>

        <aside id="book" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5 lg:sticky lg:top-36">
          <p className="text-sm text-muted">{price ? <>{t.pkg.from} <b className="text-2xl text-brand">{price}</b> {t.pkg.pp}</> : <b className="text-lg text-ink">{t.car.onRequest}</b>}</p>
          <h3 className="mt-3 font-serif text-2xl font-bold">{rt.enquireTitle}</h3>
          <p className="mt-1 text-sm text-muted">{d.bookSub}</p>
          <form className="mt-4 grid gap-3" onSubmit={submit} data-form="booking">
            <label><span className="label">{t.form.name} *</span><input className="field" required name="name" autoComplete="name" /></label>
            <label><span className="label">{t.form.email} *</span><input className="field" required type="email" name="email" autoComplete="email" /></label>
            <label><span className="label">{d.date}</span><input className="field" type="date" name="date" /></label>
            <label><span className="label">{d.pax}</span><input className="field" type="number" min="1" defaultValue="2" name="pax" /></label>
            <input type="hidden" name="tour" value={tour.code || tour.id} />
            <button type="submit" className="btn btn-accent w-full">{d.send} <Icon name="send" size={16} /></button>
          </form>
          <a className="btn btn-outline mt-3 w-full text-brand" href="https://wa.me/84983393588">{d.askQuestion}</a>
        </aside>
      </section>

      <MobileBookBar label={price} />

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
            {related.map((r) => <RealTourCard key={r.id} x={r} />)}
          </div>
        </section>
      )}
    </>
  )
}
