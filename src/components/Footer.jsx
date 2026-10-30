import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { CONTACT } from '../data'
import Icon from './Icon'

// Bản đồ văn phòng: chỉ gắn iframe Google Maps khi khách cuộn gần tới footer (Maps tải ~400KB JS, không để tranh lượt tải đầu trang).
function OfficeMap() {
  const box = useRef(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (show) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { rootMargin: '300px' })
    io.observe(box.current)
    return () => io.disconnect()
  }, [show])
  return (
    <div ref={box} className="h-48 w-full overflow-hidden rounded-2xl bg-white/5 lg:h-56">
      {show && <iframe title="Vietlook Travel office" className="size-full border-0" src="https://www.google.com/maps?cid=12890319484623913190&z=17&output=embed" />}
    </div>
  )
}

// Logo phương thức thanh toán (docs 2b – yêu cầu của 9Pay).
const PAY = [
  ['Visa', '/pay/visa.svg', 'h-6'],
  ['Mastercard', '/pay/mastercard.svg', 'h-6'],
  ['JCB', '/pay/jcb.svg', 'h-6'],
  ['American Express', '/pay/americanexpress.svg', 'h-6'],
  ['9Pay', '/pay/9pay.svg', 'h-5'],
]

export function Footer() {
  const { t } = useLang()
  const ft = t.footer
  const f3 = t.l3.footer
  const cols = [
    [f3.aboutVn, [[t.nav.guide, '/travel-guide'], [t.dest.north, '/tours?region=north'], [t.dest.central, '/tours?region=central'], [t.dest.south, '/tours?region=south'], [t.dest.other, '/destinations']]],
    [f3.services, [[ft.links.services[0], '/tours'], [ft.links.services[1], '/private-car'], [ft.links.services[2], '/visa-fast-track'], [ft.links.services[3], '/partners'], [ft.links.services[4], '/partners#projects']]],
    [ft.company, [[ft.links.company[0], '/about'], [ft.links.company[1], '/policies/terms'], [ft.links.company[2], '/policies/privacy'], [ft.links.company[3], '/policies/payment'], [ft.links.company[4], '/policies/cancellation']]],
  ]
  const social = 'grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-accent hover:text-white lg:size-10'

  return (
    <footer className="relative isolate overflow-hidden bg-brand-dark text-white/75">
      {/* Bóng di tích Việt Nam (ảnh đen trắng đã tách nền + đảo sáng) mờ ở đáy footer, mép trên tan dần */}
      <img
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full min-w-[900px] select-none opacity-[0.12] [mask-image:linear-gradient(to_bottom,transparent,#000_35%)] max-sm:left-1/2 max-sm:-translate-x-1/2"
        src="/footer-landmarks.webp"
        alt=""
        loading="lazy"
      />
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-[1.3fr_1fr_1.1fr_1fr_1.3fr] lg:gap-10 lg:py-16">
        <div className="col-span-2 flex flex-col items-center text-center lg:col-span-1">
          {/* Ảnh logo gốc có khoảng trong suốt ở đáy (285/356px có nội dung) – khung theo tỉ lệ nội dung để bỏ khoảng trống, không chỉnh ảnh */}
          <span className="block aspect-[548/285] w-[200px] max-w-full overflow-hidden lg:w-[240px]">
            <img className="block h-auto w-full max-w-none" width="548" height="356" src="/logo.png" alt="Vietlook Travel" loading="lazy" />
          </span>
          {ft.about && <p className="mt-4 hidden text-sm leading-relaxed lg:block">{ft.about}</p>}
          <div className="mt-5 flex justify-center gap-2 lg:gap-3">
            <a className={social} href="https://www.facebook.com/vietlooktravelhanoi" aria-label="Facebook"><Icon name="facebook" size={16} /></a>
            <a className={social} href={CONTACT.whatsapp} aria-label="WhatsApp"><Icon name="chat" size={16} /></a>
            <a className={`${social} text-xs font-bold`} href="https://zalo.me/0983393588" aria-label="Zalo">Zalo</a>
            <Link className={`${social} text-xs font-bold`} to="/contact" aria-label="WeChat">微</Link>
          </div>
        </div>
        {cols.map(([title, links]) => (
          <div key={title}>
            <p className="mb-3 font-card text-sm font-bold uppercase tracking-wide text-white lg:mb-5 lg:text-base">{title}</p>
            <ul className="space-y-2 text-sm lg:space-y-3 lg:text-[15px]">
              {links.map(([label, to]) => <li key={label}><Link className="transition hover:text-accent" to={to}>{label}</Link></li>)}
            </ul>
          </div>
        ))}
        <div className="col-span-2 lg:col-span-1">
          <p className="mb-3 font-card text-sm font-bold uppercase tracking-wide text-white lg:mb-5 lg:text-base">{ft.contact}</p>
          <ul className="space-y-3 text-sm lg:text-[15px]">
            <li className="flex gap-3"><Icon name="pin" size={16} className="mt-0.5 shrink-0 text-accent" /> {CONTACT.address}</li>
            <li className="flex gap-3"><Icon name="phone" size={16} className="mt-0.5 shrink-0 text-accent" /><span><a className="hover:text-accent" href={CONTACT.phoneHref}>{CONTACT.phone}</a><small className="block text-xs text-white/50">Hotline · WhatsApp · WeChat · Zalo</small></span></li>
            <li className="flex gap-3"><Icon name="mail" size={16} className="mt-0.5 shrink-0 text-accent" /><a className="hover:text-accent" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x grid items-center gap-6 py-8 lg:grid-cols-[1fr_1.4fr] lg:gap-8 lg:py-10">
          <div>
            <p className="font-card text-base font-bold uppercase tracking-wide text-white">{f3.office}</p>
            {/* Thông tin pháp nhân – 9Pay yêu cầu để duyệt cổng thanh toán (docs 2b) */}
            <p className="mt-4 flex gap-3 text-lg text-white">
              <Icon name="pin" size={18} className="mt-1.5 shrink-0 text-accent" />
              <span>
                {CONTACT.companyEn}
                <br />
                <span className="text-base text-white/75">{CONTACT.companyEn}</span>
                <br />
                <span className="text-base text-white/75">{CONTACT.address}</span>
              </span>
            </p>
            <ul className="mt-4 space-y-1 text-sm">
              <li>{ft.bizNo}: <span className="text-white">{CONTACT.businessNo}</span></li>
              <li>{ft.license}: <span className="text-white">{CONTACT.licenseNo}</span></li>
            </ul>
            <a className="btn mt-6 bg-accent text-white hover:bg-accent-dark" href="https://www.google.com/maps/place/C%C3%94NG+TY+TNHH+DU+L%E1%BB%8ACH+V%C3%80+TH%C6%AF%C6%A0NG+M%E1%BA%A0I+VIETLOOK/@20.974695,105.7628247,17z/data=!3m1!4b1!4m6!3m5!1s0x313453afc2453f97:0xb2e39d46824e00e6!8m2!3d20.974695!4d105.7653996!16s%2Fg%2F11w1k04chw" target="_blank" rel="noreferrer">
              <Icon name="directions" size={16} /> {f3.directions}
            </a>
          </div>
          <OfficeMap />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 md:flex-row">
          <span>Copyright 2026 © {CONTACT.companyEn}. {ft.rights}</span>
          <span className="flex flex-wrap items-center gap-2">
            <span className="mr-1">{ft.pay}</span>
            {PAY.map(([name, src, h]) => (
              <span key={name} className="grid h-9 w-14 place-items-center rounded-md bg-white shadow-sm" title={name}>
                <img src={src} alt={name} className={`${h} w-auto max-w-[44px] object-contain`} loading="lazy" />
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}

const WHATSAPP = 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z'
const WECHAT = 'M9 3C4.6 3 1 6 1 9.7c0 2.1 1.2 4 3 5.2l-.7 2.2 2.6-1.3c.9.3 2 .5 3.1.5h.6a5.8 5.8 0 0 1-.2-1.5c0-3.5 3.4-6.3 7.5-6.3h.6C16.8 5.4 13.3 3 9 3Zm-2.8 3.7a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm5.6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM16.9 10c-3.4 0-6.1 2.3-6.1 5.1s2.7 5.1 6.1 5.1c.7 0 1.4-.1 2.1-.3l2 1.1-.5-1.8c1.5-1 2.5-2.4 2.5-4.1 0-2.8-2.7-5.1-6.1-5.1Zm-2 2.6a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Zm4 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z'
const PHONE = 'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z'
const Glyph = ({ d }) => <svg className="size-6 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>

// Kiểu villagesvietnam.com: cụm nút nổi ẩn khi còn ở banner, trượt lên + hiện dần khi cuộn qua nửa màn hình đầu
// (cuộn về đầu thì ẩn lại); nút lên đầu trang có vòng tròn chạy theo tiến độ cuộn cả trang.
const RING = 2 * Math.PI * 21

export function FloatingContacts() {
  const { t } = useLang()
  const [shown, setShown] = useState(false)
  const ring = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setShown(window.scrollY > window.innerHeight * 0.5)
      if (ring.current) ring.current.style.strokeDashoffset = RING * (1 - (max > 0 ? Math.min(window.scrollY / max, 1) : 0))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <div className={`fixed bottom-4 right-3 z-50 flex flex-col items-end gap-2 transition duration-700 ease-out sm:bottom-5 sm:right-4 sm:gap-3 ${shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'}`}>
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={t.toTop} tabIndex={shown ? 0 : -1} data-pwc-interaction="to-top" className="relative grid size-11 place-items-center rounded-full bg-white text-accent-500 shadow-lg transition hover:scale-110 sm:size-12">
        <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2.5" />
          <circle ref={ring} cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={RING} strokeDashoffset={RING} />
        </svg>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>
      <a className="grid size-11 place-items-center rounded-full sm:size-12 bg-[#25d366] text-white shadow-lg transition hover:scale-110" href={CONTACT.whatsapp} aria-label="WhatsApp"><Glyph d={WHATSAPP} /></a>
      <Link className="grid size-11 place-items-center rounded-full sm:size-12 bg-[#07c160] text-white shadow-lg transition hover:scale-110" to="/contact" aria-label="WeChat"><Glyph d={WECHAT} /></Link>
      <a className="grid size-11 place-items-center rounded-full sm:size-12 bg-accent-500 text-white shadow-lg transition hover:scale-110" href={CONTACT.phoneHref} aria-label="Hotline"><Glyph d={PHONE} /></a>
    </div>
  )
}
