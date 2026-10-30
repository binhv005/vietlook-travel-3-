import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { usePageTitle } from '../hooks'

export default function NotFound() {
  const { t } = useLang()
  const nf = t.pages.notFound
  usePageTitle(t.meta.notFound)
  return (
    <section className="bg-photo-light px-4 pb-24 pt-48 text-center">
      <p className="bg-gradient-to-r from-accent-500 to-accent bg-clip-text font-serif text-8xl font-bold text-transparent md:text-9xl">404</p>
      <h1 className="mt-4 font-serif text-4xl font-bold text-ink">{nf.title}</h1>
      <p className="mt-3 text-lg text-muted">{nf.sub}</p>
      <Link to="/" className="btn btn-brand mt-8">{nf.home}</Link>
    </section>
  )
}
