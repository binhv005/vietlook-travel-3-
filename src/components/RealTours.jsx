import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { formatPrice } from '../useJson'
import Icon from './Icon'

const GENERIC_TYPES = ['Tour Packages', 'Vietnam Tours', 'Travel Experience']

export const mainType = (x) => x.types.find((n) => !GENERIC_TYPES.includes(n)) || x.types[0] || ''

export function durationLabel(x, t) {
  if (!x.days) return null
  if (x.days === 1) return t.realTour.dayTrip
  return `${x.days} ${t.pkg.days}${x.nights ? ` ${x.nights} ${t.pkg.nights}` : ''}`
}

// Thẻ tour thật (dữ liệu vietlooktravel.com) theo kiểu thẻ Link 1.
export function RealTourCard({ x }) {
  const { t } = useLang()
  const price = formatPrice(x.priceFrom, x.currency)
  const dur = durationLabel(x, t)
  return (
    <article className="l1-card group flex h-full flex-col font-l1 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/tours/${x.id}`} className="relative block aspect-[3/2] overflow-hidden bg-sand">
        {x.img && <img className="size-full object-cover transition duration-700 group-hover:scale-105" alt={x.title} src={x.img} loading="lazy" />}
        {dur && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-800 shadow-sm">
            <Icon name="clock" size={14} /> {dur}
          </span>
        )}
        {x.code && <span className="absolute bottom-3 left-3 rounded-full bg-brand-dark/85 px-2.5 py-1 text-xs font-bold text-white">{x.code}</span>}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-500">{mainType(x) || t.pkg.private}</p>
        <h3 className="text-lg font-bold leading-snug">
          <Link className="hover:text-brand-700" to={`/tours/${x.id}`}>{x.title}</Link>
        </h3>
        {x.summary && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/80">{x.summary}</p>}
        <div className="mt-auto border-t border-line pt-4">
          <p className="whitespace-nowrap text-sm text-muted">
            {price ? <>{t.pkg.from} <b className="text-lg text-brand xl:text-base 2xl:text-lg">{price}</b> {t.pkg.pp}</> : <b className="font-semibold text-ink/80">{t.car.onRequest}</b>}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm xl:text-[13px] 2xl:text-sm">
            <Link to={`/tours/${x.id}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-brand-600 px-2 py-2 font-semibold text-brand-700 hover:bg-brand-50">{t.pkg.itinerary}</Link>
            <Link to={`/tours/${x.id}#book`} className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-accent-500 px-2 py-2 font-semibold text-white hover:bg-accent-600">{t.realTour.enquire}</Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export function CardSkeleton({ n = 6 }) {
  return Array.from({ length: n }, (_, i) => (
    <div key={i} className="l1-card animate-pulse">
      <div className="aspect-[3/2] bg-sand" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 rounded bg-sand" />
        <div className="h-5 w-4/5 rounded bg-sand" />
        <div className="h-3 w-full rounded bg-sand" />
        <div className="h-3 w-2/3 rounded bg-sand" />
      </div>
    </div>
  ))
}
