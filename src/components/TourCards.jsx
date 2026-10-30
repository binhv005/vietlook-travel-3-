import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { useTr } from '../loc'
import Icon from './Icon'

export const usd = (n) => `USD ${n.toLocaleString('en-US')}`
export const saving = (p) => (p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0)

export function Price({ p, size = 'text-lg' }) {
  const { t } = useLang()
  return (
    <span className="inline-flex flex-col">
      <span className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-xs text-muted">{t.pkg.from}</span>
        {p.oldPrice && <del className="text-sm text-muted">{usd(p.oldPrice)}</del>}
        <span className={`font-bold text-accent-600 ${size}`}>{usd(p.price)}</span>
        <span className="text-xs text-muted">{t.pkg.pp}</span>
      </span>
    </span>
  )
}

const Check = () => <Icon name="check" size={16} stroke={2.2} className="mt-0.5 shrink-0 text-emerald-600" />

// Thẻ tour nổi bật – Link 1 ("Classic Vietnam: Hanoi to the Mekong").
export function FeaturedTour({ p }) {
  const { t } = useLang()
  const pct = saving(p)
  const tr = useTr()
  return (
    <article className="l1-card group grid overflow-hidden font-l1 transition duration-300 hover:shadow-xl md:grid-cols-[1.15fr_1fr]">
      <Link to={`/tours/${p.id}`} className="relative block aspect-[3/2] overflow-hidden md:aspect-auto md:min-h-full">
        <img className="size-full object-cover transition duration-700 group-hover:scale-105" alt={p.title} src={p.img} loading="lazy" />
        {pct > 0 && <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-accent-600 shadow">{t.pkg.save} {pct}%</span>}        <span className="absolute bottom-4 left-4 rounded-lg bg-accent-500 px-3 py-2 text-center font-bold leading-none text-white shadow">
          <span className="block text-2xl">{p.days}</span>
          <span className="text-[0.7rem] uppercase tracking-wider">{t.pkg.days}</span>
        </span>
      </Link>
      <div className="flex flex-col p-6 lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-500">{p.days} {t.pkg.days} {p.nights} {t.pkg.nights} · {t.pkg.private}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">
          <Link className="hover:text-brand-700" to={`/tours/${p.id}`}>{tr(p.title)}</Link>
        </h3>
        <p className="mt-3 flex items-start gap-1.5 text-sm text-muted">
          <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-brand-500" /> {tr.route(p.route)}
        </p>
        <ul className="mt-4 grid gap-1.5 text-sm text-ink/85">
          {p.highlights.map((h) => <li key={h} className="flex gap-2"><Check /> {tr(h)}</li>)}
        </ul>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
          <Price p={p} size="text-2xl" />
          <div className="flex flex-wrap gap-2">
            <Link to={`/tours/${p.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">{t.pkg.itinerary}</Link>
            <Link to={`/tours/${p.id}#book`} className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600">
              {t.pkg.book} <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

// Thẻ tour thường – giống y Link 1 ("Featured Vietnam itineraries").
export function TourCard({ p }) {
  const { t } = useLang()
  const pct = saving(p)
  const tr = useTr()
  return (
    <article className="l1-card group flex h-full flex-col font-l1 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/tours/${p.id}`} className="relative block aspect-[3/2] overflow-hidden">
        <img className="size-full object-cover transition duration-700 group-hover:scale-105" alt={p.title} src={p.img} loading="lazy" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-800 shadow-sm">
          <Icon name="clock" size={14} /> {p.days} {t.pkg.days} {p.nights} {t.pkg.nights}
        </span>
        {pct > 0 && <span className="absolute bottom-3 left-3 rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-white shadow">{t.pkg.save} {pct}%</span>}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-500">{t.pkg.private}</p>
        <h3 className="text-lg font-bold leading-snug">
          <Link className="hover:text-brand-700" to={`/tours/${p.id}`}>{tr(p.title)}</Link>
        </h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-muted">
          <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-brand-500" /> <span>{tr.route(p.route)}</span>
        </p>
        {p.desc && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/80">{tr(p.desc)}</p>}
        <ul className="mb-4 mt-3 space-y-1.5 text-sm text-ink/85">
          {p.highlights.map((h) => <li key={h} className="flex gap-2"><Check /> {tr(h)}</li>)}
        </ul>
        <div className="mt-auto border-t border-line pt-4">
          <div className="flex items-end justify-between gap-3">
            <Price p={p} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link to={`/tours/${p.id}`} className="inline-flex items-center justify-center rounded-full border border-brand-600 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">{t.pkg.itinerary}</Link>
            <Link to={`/tours/${p.id}#book`} className="inline-flex items-center justify-center rounded-full bg-accent-500 px-3 py-2 text-sm font-semibold text-white hover:bg-accent-600">{t.pkg.book}</Link>
          </div>
        </div>
      </div>
    </article>
  )
}

