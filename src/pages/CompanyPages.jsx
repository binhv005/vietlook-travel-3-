import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { trackLead } from '../tracking'
import { useLang } from '../i18n'
import { usePageTitle, useThankYouSubmit } from '../hooks'
import { CONTACT } from '../data'
import { useJson, isInboundTour } from '../useJson'
import { RealTourCard } from '../components/RealTours'
import { PageHero } from '../components/Layout'
import { B2BL2, HowToBook } from '../components/HomeA'
import { WhyL3, GuideCard, PlanFormL3, ReviewSlider } from '../components/HomeB'
import { CenterHead, Eyebrow, Pagination, usePage } from '../components/ui'
import Icon from '../components/Icon'
import WpContent, { prepareContent } from '../components/WpContent'
import NotFound from './NotFound'
import { srcSet, CARD, FULL } from '../img'

// PENDING: dự án hợp tác thật (docs mục 4 + mục 9 #6) – tạm dùng ảnh đoàn của Vietlook.
const PROJECTS = ['/img/tour/tourdulichphuquoc4ngay3demtet1.webp', '/img/tour/emperor-cruises.webp', '/img/tour/welcome-vietlook.webp']

export function Partners() {
  const { t } = useLang()
  const pg = t.pages.partners
  usePageTitle(t.meta.partners, { desc: t.pages.partners.sub, image: '/img/tour/emperor-cruises.webp' })
  const submit = useThankYouSubmit()
  return (
    <>
      <PageHero title={pg.title} sub={pg.sub} img="/img/tour/emperor-cruises.webp" crumbs={[[t.nav.partners]]} />
      <B2BL2 />

      <section className="reveal reveal-fx bg-photo-light scroll-mt-28 py-14 md:py-20" id="projects">
        <div className="container-x">
          <CenterHead eyebrow={t.b2bSec.partners} title={pg.projectsTitle} sub={pg.projectsSub} />
          <div className="stagger grid gap-6 sm:grid-cols-3">
            {/* Viền thẻ cong theo vòm ảnh: bán kính đỉnh = nửa bề rộng thẻ (50cqw), nên thẻ – viền chỉ – ảnh là các vòm đồng tâm */}
            {PROJECTS.map((img) => (
              <div key={img} className="@container">
                <article className="h-full rounded-t-[50cqw] rounded-b-[1.25rem] border border-[#e8dcc6] bg-[#fbf7ef] p-3 text-center">
                  <div className="arch-top border border-[#d9c7a3] p-1.5"><img className="arch-top aspect-[4/3.6] w-full object-cover" src={img} srcSet={srcSet(img)} sizes={CARD} alt="" loading="lazy" /></div>
                  <p className="py-4 text-sm text-muted">{pg.projectPending}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyL3 />

      <section className="reveal bg-photo-dark scroll-mt-28 py-14 text-white md:py-20" id="partner-form">
        <div data-anim="sides" className="container-x grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>{t.b2bSec.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">{pg.formTitle}</h2>
            <p className="mt-4 text-lg text-white/80">{t.b2bSec.body}</p>
          </div>
          <form onSubmit={submit} data-form="partner" className="grid gap-4 rounded-2xl bg-white p-6 text-ink shadow-2xl sm:grid-cols-2 md:p-8">
            <label><span className="label">{pg.company} *</span><input className="field" required name="company" autoComplete="organization" /></label>
            <label><span className="label">{pg.country}</span><input className="field" name="country" /></label>
            <label><span className="label">{t.form.name} *</span><input className="field" required name="name" autoComplete="name" /></label>
            <label><span className="label">{t.form.email} *</span><input className="field" required type="email" name="email" autoComplete="email" /></label>
            <label><span className="label">{t.form.phone}</span><input className="field" type="tel" name="phone" autoComplete="tel" /></label>
            <label><span className="label">{pg.volume}</span>
              <select className="field" name="volume"><option>1–5</option><option>6–20</option><option>21–50</option><option>50+</option></select>
            </label>
            <label className="sm:col-span-2"><span className="label">{t.form.ideas}</span><textarea className="field" name="message" rows="3" /></label>
            <div className="sm:col-span-2"><button type="submit" className="btn btn-accent w-full sm:w-auto"><Icon name="handshake" size={18} /> {t.b2bSec.cta1}</button></div>
          </form>
        </div>
      </section>
    </>
  )
}

export function About() {
  const { t } = useLang()
  const pg = t.pages.about
  usePageTitle(t.meta.about, { desc: t.pages.about.sub, image: '/img/tour/mua-cave.webp' })
  return (
    <>
      <PageHero title={pg.title} sub={pg.sub} img="/img/tour/mua-cave.webp" crumbs={[[t.nav.about]]} />
      <section className="reveal reveal-fx relative isolate overflow-hidden pb-28 pt-14 md:pb-44 md:pt-20">
        {/* Dãy núi (nền trời đã tách trong suốt) ở đáy khối */}
        <img className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full min-w-[900px] select-none max-sm:left-1/2 max-sm:-translate-x-1/2" src="/nui-bg.webp" alt="" loading="lazy" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="relative mx-auto w-full max-w-xl">
            <img className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl" src="/img/tour/quang-phu-cau.webp" srcSet={srcSet("/img/tour/quang-phu-cau.webp")} sizes={CARD} alt="" loading="lazy" />
            <img className="bob absolute -bottom-6 -right-4 size-28 drop-shadow-xl" src="/logo-mark.png" alt="" />
          </div>
          <div>
            <Eyebrow>{t.topbar}</Eyebrow>
            <h2 className="font-serif text-3xl font-bold leading-tight md:text-4xl">{pg.storyTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{pg.story}</p>
            <div className="mt-8 flex flex-wrap gap-3 max-sm:justify-center">
              <Link to="/tours" className="btn btn-brand">{t.hero.cta1} <Icon name="arrow" size={16} /></Link>
              <Link to="/partners" className="btn btn-outline text-brand">{t.hero.cta2}</Link>
            </div>
          </div>
        </div>
      </section>
      <WhyL3 />
      <HowToBook />
      <section className="bg-photo-dark scroll-mt-28 py-14 md:py-20" id="reviews">
        <div className="container-x">
          <h2 className="text-center font-card text-3xl font-bold text-white md:text-5xl">{t.l3.reviews.title}</h2>
          <ReviewSlider />
        </div>
      </section>
    </>
  )
}

export function Contact() {
  const { t } = useLang()
  const pg = t.pages.contact
  usePageTitle(t.meta.contact, { desc: t.pages.contact.sub, image: '/img/tour/ha-long.webp' })
  const [params] = useSearchParams()
  const place = params.get('place')
  const card = 'rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5'
  const icon = 'grid size-12 place-items-center rounded-xl bg-brand-light text-brand'
  return (
    <>
      <PageHero title={pg.title} sub={place ? `${pg.sub} – ${place}` : pg.sub} img="/img/tour/ha-long.webp" crumbs={[[pg.title]]} />
      <PlanFormL3 />
      <section className="reveal container-x py-14 md:py-20">
        <div className="stagger grid gap-5 md:grid-cols-3">
          <div className={card}><span className={icon}><Icon name="pin" size={22} /></span><h3 className="mt-4 font-card text-lg font-bold">{pg.office}</h3><p className="mt-2 text-sm text-muted">{CONTACT.companyEn}<br />{CONTACT.address}</p></div>
          <div className={card}><span className={icon}><Icon name="phone" size={22} /></span><h3 className="mt-4 font-card text-lg font-bold">Hotline · WhatsApp · WeChat · Zalo</h3><p className="mt-2 text-sm text-muted"><a className="font-semibold text-accent-500" href={CONTACT.phoneHref}>{CONTACT.phone}</a><br />{pg.hours}</p></div>
          <div className={card}><span className={icon}><Icon name="mail" size={22} /></span><h3 className="mt-4 font-card text-lg font-bold">Email</h3><p className="mt-2 text-sm"><a className="font-semibold text-accent-500" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p></div>
        </div>
      </section>
    </>
  )
}

const POST_PAGE = 12
const TOPIC_KEYS = ['north', 'central', 'south', 'food', 'seasons', 'tips']
const DEST_KEYS = ['north', 'central', 'south']
const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
// topic 'dest' = mọi bài thuộc 1 trong 3 miền
const matchTopic = (x, topic) => !topic || (topic === 'dest' ? DEST_KEYS.some((k) => x.topics.includes(k)) : x.topics.includes(topic))

// Khối kêu gọi cuối trang blog (kiểu Link 1)
function GuideCta() {
  const { t } = useLang()
  const pg = t.pages.guide
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark py-14 text-center text-white md:py-20">
      <img className="absolute inset-0 -z-10 size-full object-cover opacity-25" src="/img/tour/the-best-lotus-viewing-spots-in-ninh-binh.webp" srcSet={srcSet("/img/tour/the-best-lotus-viewing-spots-in-ninh-binh.webp")} sizes={CARD} alt="" loading="lazy" />
      <div className="container-x">
        <h2 className="font-serif text-3xl font-bold md:text-4xl">{pg.ctaTitle}</h2>
        <p className="mt-3 text-white/80">{pg.ctaSub}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn btn-accent">{pg.ctaBtn}</Link>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn bg-[#25d366] text-white hover:bg-[#1eb455]"><Icon name="chat" size={16} /> {pg.whatsapp}</a>
        </div>
      </div>
    </section>
  )
}

// Thanh chuyên mục dạng cây (kiểu Link 1): Tất cả · Điểm đến › Bắc/Trung/Nam · Mùa · Ẩm thực · Mẹo – kèm số bài
function GuideCategories({ posts, topic, onPick }) {
  const { t } = useLang()
  const item = (k, label, sub = false) => (
    <li key={k || 'all'}>
      <button
        type="button"
        onClick={() => onPick(k)}
        data-pwc-interaction="post-topic"
        className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${sub ? 'pl-6' : 'font-semibold'} ${topic === k ? 'bg-brand text-white' : 'text-ink/80 hover:bg-brand-light hover:text-brand'}`}
      >
        {label}
        <span className={`text-xs ${topic === k ? 'text-white/80' : 'text-muted'}`}>{posts.filter((x) => matchTopic(x, k)).length}</span>
      </button>
    </li>
  )
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <p className="mb-2 flex items-center gap-2 px-3 text-sm font-bold uppercase tracking-wide text-ink"><Icon name="menu" size={16} /> {t.posts.categories}</p>
      <ul className="grid gap-0.5">
        {item('', t.posts.all)}
        {item('dest', t.posts.destinations)}
        {DEST_KEYS.map((k) => item(k, t.posts.topics[k], true))}
        {['seasons', 'food', 'tips'].map((k) => item(k, t.posts.topics[k]))}
      </ul>
    </div>
  )
}

// Cẩm nang du lịch (kiểu Link 1): banner, lưới thẻ 3 cột + tìm kiếm + phân trang, thanh chuyên mục bên phải, khối kêu gọi.
export function TravelGuide() {
  const { t } = useLang()
  const pg = t.pages.guide
  const data = useJson('/data/posts.json')
  const [params, setParams] = useSearchParams()
  const [page, goTo] = usePage(params, setParams, 'post-list')
  const topic = params.get('topic') === 'dest' || TOPIC_KEYS.includes(params.get('topic')) ? params.get('topic') : ''
  const q = (params.get('q') || '').trim().toLowerCase()
  const label = topic === 'dest' ? t.posts.destinations : topic ? t.posts.topics[topic] : t.posts.all
  usePageTitle(topic ? `${label} | ${t.meta.guide}` : t.meta.guide, { desc: pg.sub, image: '/img/tour/doi-che-moc-chau.webp' })
  const all = (data || []).filter((x) => x.lang === 'en')
  const posts = all.filter((x) => matchTopic(x, topic)).filter((x) => !q || `${x.title} ${x.excerpt || ''}`.toLowerCase().includes(q))
  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    next.delete('page')
    setParams(next, { replace: true })
  }
  const pages = Math.ceil(posts.length / POST_PAGE)
  const cur = Math.min(page, Math.max(pages, 1))
  return (
    <>
      <PageHero title={topic ? label : pg.title} sub={pg.sub} img="/img/tour/doi-che-moc-chau.webp" crumbs={topic ? [[t.nav.guide, '/travel-guide'], [label]] : [[t.nav.guide]]} />
      <section className="reveal container-x grid items-start gap-8 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div id="post-list" className="min-w-0 scroll-mt-28">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-card text-2xl font-bold text-ink">{label}</h2>
            <label className="relative w-full sm:w-64">
              <Icon name="search" size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input className="field !rounded-full !py-2 !pl-10" defaultValue={params.get('q') || ''} placeholder={t.posts.search} onChange={(e) => setParam('q', e.target.value)} aria-label={t.posts.search} />
            </label>
          </div>
          <div className="mb-6 lg:hidden">
            <GuideCategories posts={all} topic={topic} onPick={(k) => setParam('topic', k)} />
          </div>
          <div key={`${topic}-${q}-${cur}`} className="grid animate-[fade-up_.5s_ease] gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {posts.slice((cur - 1) * POST_PAGE, cur * POST_PAGE).map((g) => <GuideCard key={g.slug} g={g} />)}
          </div>
          <Pagination page={cur} pages={pages} onChange={goTo} />
        </div>
        <aside className="hidden lg:sticky lg:top-28 lg:block" aria-label={t.posts.categories}>
          <GuideCategories posts={all} topic={topic} onPick={(k) => setParam('topic', k)} />
        </aside>
      </section>
      <GuideCta />
    </>
  )
}

// Mục lục dính, tô sáng mục đang đọc
function Toc({ headings }) {
  const { t } = useLang()
  const [active, setActive] = useState(headings[0]?.id)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-120px 0px -65% 0px' },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [headings])
  return (
    <nav className="max-h-[calc(100vh-9rem)] overflow-y-auto rounded-2xl border border-line bg-white p-5" aria-label={t.pages.guide.toc}>
      <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink"><Icon name="menu" size={16} /> {t.pages.guide.toc}</p>
      <ol className="grid gap-1 text-sm">
        {headings.map((h, i) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className={`flex gap-2 rounded-lg px-2.5 py-2 leading-snug transition ${active === h.id ? 'bg-brand-light font-semibold text-brand' : 'text-ink/70 hover:text-brand'}`}>
              <span className="shrink-0">{i + 1}.</span> {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Chia sẻ bài viết: WhatsApp, Facebook, X, LinkedIn, Email, sao chép link
function ShareBar({ title }) {
  const { t } = useLang()
  const url = window.location.href
  const u = encodeURIComponent(url)
  const txt = encodeURIComponent(title)
  const btn = 'grid size-9 place-items-center rounded-full border border-line text-ink/70 transition hover:border-brand hover:bg-brand hover:text-white'
  const links = [
    ['WhatsApp', `https://wa.me/?text=${txt}%20${u}`, <Icon name="chat" size={15} />],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`, <Icon name="facebook" size={15} />],
    ['X', `https://twitter.com/intent/tweet?url=${u}&text=${txt}`, <b className="text-[13px]">X</b>],
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, <b className="text-[12px]">in</b>],
    ['Email', `mailto:?subject=${txt}&body=${u}`, <Icon name="mail" size={15} />],
  ]
  return (
    <div className="flex flex-wrap items-center gap-2">
      <b className="mr-1 text-ink">{t.pages.guide.share}:</b>
      {links.map(([name, href, icon]) => (
        <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name} className={btn}>{icon}</a>
      ))}
      <button type="button" aria-label={t.pages.guide.copy} className={btn} onClick={() => navigator.clipboard?.writeText(url)}><Icon name="link" size={15} /></button>
    </div>
  )
}

// Chi tiết bài viết (kiểu Link 1): banner căn giữa + tác giả/ngày/phút đọc, nội dung + mục lục dính, gợi ý, chia sẻ, bài & tour liên quan.
export function GuideDetail() {
  const { slug } = useParams()
  const { t } = useLang()
  const pg = t.pages.guide
  const post = useJson(`/data/posts/${slug}.json`)
  const all = useJson('/data/posts.json')
  const tours = useJson('/data/tours.json')
  const prepared = useMemo(() => (post ? prepareContent(post.html) : null), [post])
  usePageTitle(
    post ? `${post.title} | Vietlook Travel` : post === false ? t.meta.notFound : t.meta.guide,
    post ? { desc: post.excerpt || post.title, image: post.img || undefined } : undefined,
  )
  if (post === false) return <NotFound />
  if (post === undefined) return <div className="grid min-h-[70vh] place-items-center pt-32 text-muted">{t.realTour.loading}</div>
  const others = (all || []).filter((x) => x.lang === 'en' && x.slug !== slug)
  const near = others.filter((x) => x.topics.some((k) => post.topics.includes(k)))
  const maybe = near.slice(0, 5)
  const related = near.length >= 8 ? near.slice(5, 11) : others.slice(0, 6)
  const region = DEST_KEYS.find((k) => post.topics.includes(k))
  const relTours = region ? (tours || []).filter((x) => isInboundTour(x) && x.region.includes(region)).slice(0, 3) : []
  const mins = Math.max(1, Math.round(prepared.words / 200))
  const toc = prepared.headings
  const topics = post.topics.filter((k) => TOPIC_KEYS.includes(k))
  return (
    <>
      <PageHero
        center
        title={post.title}
        sub={`${t.guide.by} · ${fmtDate(post.date)} · ${mins} ${pg.minRead}`}
        img={post.img || '/img/tour/doi-che-moc-chau.webp'}
        crumbs={[[t.nav.guide, '/travel-guide'], ...(topics[0] ? [[t.posts.topics[topics[0]], `/travel-guide?topic=${topics[0]}`]] : []), [post.title]]}
      />
      <section className={`container-x grid items-start gap-10 py-12 md:py-16 ${toc.length > 1 ? 'lg:grid-cols-[minmax(0,1fr)_300px]' : 'max-w-4xl'}`}>
        <article className="min-w-0">
          {/* Nội dung gốc từ vietlooktravel.com (đã lọc thẻ/thuộc tính không an toàn khi nhập) */}
          <WpContent prepared={prepared.html} />

          {maybe.length > 0 && (
            <div className="mt-12">
              <h2 className="inline-block border-b-2 border-accent-500 pb-1.5 font-card text-lg font-bold text-ink">{pg.maybe}</h2>
              <ul className="mt-4 grid gap-2">
                {maybe.map((x) => (
                  <li key={x.slug}><Link to={`/travel-guide/${x.slug}`} className="inline-flex items-start gap-1.5 text-brand hover:underline"><Icon name="chevR" size={14} className="mt-1 shrink-0" /> {x.title}</Link></li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm">
            {topics.length > 0 && (
              <p>
                <b className="text-ink">{pg.category}:</b>{' '}
                {topics.map((k, i) => (
                  <span key={k}>{i > 0 && ', '}<Link to={`/travel-guide?topic=${k}`} className="text-brand hover:underline">{t.posts.topics[k]}</Link></span>
                ))}
              </p>
            )}
            <ShareBar title={post.title} />
          </div>

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 inline-block border-b-2 border-accent-500 pb-1.5 font-card text-lg font-bold text-ink">{pg.related}</h2>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">{related.map((x) => <GuideCard key={x.slug} g={x} compact />)}</div>
            </div>
          )}
          <p className="mt-10 text-xs text-muted">{t.posts.source}</p>
        </article>
        {toc.length > 1 && (
          <aside className="hidden lg:sticky lg:top-28 lg:block">
            <Toc headings={toc} />
          </aside>
        )}
      </section>

      {relTours.length > 0 && (
        <section className="bg-photo-light py-14 md:py-16">
          <div className="container-x">
            <h2 className="mb-8 font-serif text-3xl font-bold text-ink md:text-4xl">{pg.relatedTours}</h2>
            <div className="m-rail grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{relTours.map((x) => <RealTourCard key={x.id} x={x} />)}</div>
          </div>
        </section>
      )}
      <GuideCta />
    </>
  )
}

export function ThankYou() {
  const { t } = useLang()
  const pg = t.pages.thanks
  usePageTitle(t.meta.thanks)
  const { state } = useLocation()
  // Sự kiện chuyển đổi Google Ads / GA4 (docs mục 3: trang cảm ơn sau form)
  useEffect(() => {
    if (state?.form) trackLead(state.form)
  }, [state])
  return (
    <section className="bg-photo-light px-4 pb-24 pt-48 text-center">
      <span className="mx-auto grid size-20 animate-[fade-up_.6s_ease] place-items-center rounded-full bg-accent text-white shadow-lg"><Icon name="check" size={38} stroke={2.6} /></span>
      <h1 className="mt-6 font-serif text-4xl font-bold text-ink md:text-5xl">{pg.title}</h1>
      <p className="mx-auto mt-3 max-w-xl text-lg text-muted">{pg.sub}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-outline text-brand">{pg.home}</Link>
        <Link to="/tours" className="btn btn-brand">{pg.tours} <Icon name="arrow" size={16} /></Link>
      </div>
    </section>
  )
}

const POLICIES = ['terms', 'privacy', 'payment', 'cancellation']

// Nội dung chính sách THẬT chờ chị gửi (docs 2b) – không tự soạn số liệu hoàn/hủy.
export function Policy() {
  const { slug } = useParams()
  const { t } = useLang()
  const pg = t.pages.policy
  // Chính sách bảo mật thật lấy từ vietlooktravel.com; các chính sách khác chờ chị gửi (docs 2b).
  const real = useJson(slug === 'privacy' ? '/data/pages/privacy.json' : null)
  usePageTitle(POLICIES.includes(slug) ? `${pg[slug]} | Vietlook Travel` : t.meta.notFound)
  if (!POLICIES.includes(slug)) return <NotFound />
  return (
    <>
      <PageHero title={pg[slug]} img="/img/tour/hanoi6.webp" crumbs={[[pg[slug]]]} />
      <section className="container-x grid items-start gap-8 py-12 md:grid-cols-[260px_1fr] md:py-16">
        <nav className="grid gap-2 md:sticky md:top-28" aria-label="Policies">
          {POLICIES.map((k) => (
            <Link key={k} to={`/policies/${k}`} className={`rounded-xl px-4 py-3 font-semibold transition ${k === slug ? 'bg-brand text-white' : 'bg-sand hover:bg-brand-light'}`}>{pg[k]}</Link>
          ))}
        </nav>
        <div className="grid gap-6">
          {real ? (
            <>
              <WpContent html={real.html} />
              <p className="text-xs text-muted">{pg.updated}: {real.modified}</p>
            </>
          ) : (
            <p className="rounded-xl bg-sand p-5 text-lg">{pg.pending}</p>
          )}
          <p className="leading-relaxed"><strong>{CONTACT.companyEn}</strong><br />{CONTACT.address}<br />{CONTACT.phone} · {CONTACT.email}</p>
        </div>
      </section>
    </>
  )
}
