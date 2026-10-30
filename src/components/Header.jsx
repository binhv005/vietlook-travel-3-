import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n'
import { useTr } from '../loc'
import { CONTACT, REGIONS, STYLES, PACKAGES, CAR_CITIES } from '../data'
import Icon from './Icon'
import { srcSet, CARD, FULL } from '../img'

const T = (name) => `/img/tour/${name}.webp`



// Thêm 2 điểm mỗi vùng để lưới 3 cột của mega menu đủ 2 hàng như Link 3.
const EXTRA_TILES = {
  north: [['Cao Bang', T('bao-lac-cao-bang')], ['Moc Chau', T('doi-che-moc-chau')]],
  central: [['My Son', T('my-son-holy-land-1')], ['Lang Co', T('lang-co1')]],
  south: [['Vung Tau', T('tourdulichvungtau4ngay3dem')], ['Phan Thiet', T('tourdulichmuinegiare')]],
}

function useMenus() {
  const { t } = useLang()
  const m = t.menu2
  const regionTab = (k) => ({
    key: k,
    label: m.toursIn[k],
    more: [m.allIn[k], `/tours?region=${k}`],
    tiles: [...REGIONS[k].map((d) => [d.name, d.img]), ...EXTRA_TILES[k]].map(([label, img]) => ({ label, img, to: `/tours?region=${k}` })),
  })
  return {
    tours: {
      tabs: [
        regionTab('north'),
        regionTab('central'),
        regionTab('south'),
        {
          key: 'special',
          label: m.special,
          more: [m.allDest, '/destinations'],
          tiles: [
            ...['luxury', 'culture', 'family', 'honeymoon', 'photography'].map((k) => ({ label: t.styles[k][0], img: STYLES.find((s) => s.key === k).img, to: '/tours' })),
            { label: `32+ ${t.dest.other}`, img: T('cao-bang'), to: '/destinations' },
          ],
        },
      ],
    },
    packages: {
      tabs: [
        {
          key: 'ours',
          label: m.ourPackages,
          more: [m.viewAll, '/tours'],
          tiles: [
            { label: m.allPackages, img: T('khamphadanhthangvietnam'), to: '/tours' },
            { label: m.tailor, img: '/l3/tailor-hoian.webp', to: '/contact' },
          ],
        },
        {
          key: 'duration',
          label: m.duration,
          more: [m.viewAll, '/tours'],
          tiles: [
            { label: t.pkg.w1, img: T('nha-trang-da-lat-mui-ne-ho-chi-minh-city'), to: '/tours?len=w1' },
            { label: t.pkg.w2, img: T('halongninhbinhdananghoian10days9nightstour'), to: '/tours?len=w2' },
            { label: t.pkg.w3, img: T('du-lich-tay-bac'), to: '/tours?len=w3' },
          ],
        },
        {
          key: 'styles',
          label: m.styles,
          more: [m.viewAll, '/tours'],
          tiles: STYLES.slice(0, 6).map((s) => ({ label: t.styles[s.key][0], img: s.img, to: '/tours' })),
        },
        {
          key: 'popular',
          label: m.popular,
          more: [m.viewAll, '/tours'],
          tiles: PACKAGES.slice(0, 6).map((p) => ({ label: p.title, img: p.img, to: `/tours/${p.id}` })),
        },
      ],
    },
    car: [...CAR_CITIES.map((c) => ({ label: c.name, img: c.tile, to: `/private-car/${c.slug}` })), { label: m.viewAll.replace(' →', ''), img: '/img/car/1061814248554042666108-1.webp', to: '/private-car' }],
    guide: [
      [m.g.destinations, [[t.dest.north, '/travel-guide?topic=north'], [t.dest.central, '/travel-guide?topic=central'], [t.dest.south, '/travel-guide?topic=south']]],
      [m.g.need, [[m.g.visa, '/visa-fast-track'], [m.g.money, '/travel-guide?topic=money'], [m.g.sim, '/travel-guide?topic=sim'], [m.g.tips, '/travel-guide?topic=tips']]],
      [m.g.month, [[m.g.best, '/travel-guide?topic=seasons'], [m.g.spring, '/travel-guide?topic=spring'], [m.g.summer, '/travel-guide?topic=summer'], [m.g.autumn, '/travel-guide?topic=autumn']]],
      [m.g.around, [[m.g.transport, '/travel-guide?topic=transport'], [m.g.boats, '/travel-guide?topic=boats'], [m.g.car, '/private-car']]],
    ],
  }
}

const PANEL = 'invisible absolute right-0 top-full z-50 -translate-y-2 bg-white normal-case tracking-normal text-ink opacity-0 shadow-2xl transition duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100'

function Tile({ tile, fill = false }) {
  const tr = useTr()
  return (
    <Link to={tile.to} className={`group/tile relative block overflow-hidden bg-brand-dark ${fill ? 'h-full min-h-28' : 'aspect-[16/9]'}`}>
      <img className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover/tile:scale-110" src={tile.img} srcSet={srcSet(tile.img)} sizes={CARD} alt={tile.label} loading="lazy" />
      <span className="absolute inset-0 bg-black/35 transition group-hover/tile:bg-black/15" />
      <span className="absolute inset-0 grid place-items-center px-4 text-center text-sm font-bold uppercase leading-tight tracking-wide text-white [overflow-wrap:anywhere] [text-shadow:0_2px_8px_rgba(0,0,0,.6)] [text-wrap:balance] xl:text-base">
        {tr(tile.label)}
      </span>
    </Link>
  )
}

const TILE_COLS = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3' }

// Mega menu 2 cột của Link 3: danh mục bên trái (hover để đổi), lưới ảnh bên phải.
function TabbedMega({ menu }) {
  const [active, setActive] = useState(menu.tabs[0].key)
  const tab = menu.tabs.find((x) => x.key === active)
  return (
    <div className={`${PANEL} flex w-[min(1100px,calc(100vw-2rem))]`}>
      <div className="w-72 shrink-0 border-r border-black/10 py-4">
        {menu.tabs.map((x) => (
          <button
            key={x.key}
            type="button"
            onMouseEnter={() => setActive(x.key)}
            onFocus={() => setActive(x.key)}
            onClick={() => setActive(x.key)}
            className={`flex w-full items-center justify-between gap-3 whitespace-normal border-b border-black/5 px-5 py-3.5 text-left text-sm font-bold uppercase tracking-wide transition ${active === x.key ? 'text-brand' : 'text-ink/70 hover:text-brand'}`}
          >
            {x.label}
            <Icon name="chevR" size={12} stroke={2.6} className={`shrink-0 transition ${active === x.key ? 'opacity-100' : 'opacity-0'}`} />
          </button>
        ))}
        <Link className="block px-5 py-3.5 text-sm font-semibold text-accent hover:underline" to={tab.more[1]}>{tab.more[0]}</Link>
      </div>
      {/* Ảnh lấp kín khung bên phải: số cột theo số ảnh (tối đa 3), các hàng giãn bằng nhau theo chiều cao cột danh mục */}
      <div className={`grid flex-1 auto-rows-fr gap-1.5 p-1.5 ${TILE_COLS[Math.min(tab.tiles.length, 3)]}`} data-pwc-controlled="mega-tab">
        {tab.tiles.map((tile) => <Tile key={tile.label} tile={tile} fill />)}
      </div>
    </div>
  )
}

function CarMega({ tiles }) {
  return (
    <div className={`${PANEL} w-[min(900px,calc(100vw-2rem))] p-1.5`}>
      <div className="grid grid-cols-4 gap-1.5">{tiles.map((tile) => <Tile key={tile.label} tile={tile} />)}</div>
    </div>
  )
}

function GuideMega({ groups }) {
  const { t } = useLang()
  return (
    <div className={`${PANEL} w-[min(900px,calc(100vw-2rem))] p-6`}>
      <div className="grid grid-cols-4 gap-6">
        {groups.map(([title, links]) => (
          <div key={title}>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">{title}</p>
            <ul className="space-y-2 text-sm font-medium">
              {links.map(([label, to]) => <li key={label}><Link className="text-ink/80 hover:text-brand" to={to}>{label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <Link className="mt-5 block border-t border-black/10 pt-4 text-sm font-semibold text-brand hover:underline" to="/travel-guide">{t.l3.guide.all} →</Link>
    </div>
  )
}

function LangSwitch({ dark = false }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`flex overflow-hidden rounded-full border ${dark ? 'border-black/15' : 'border-white/30'}`} role="group" aria-label="Language">
      {[['en', 'EN'], ['zh', '中文']].map(([k, label]) => (
        <button key={k} className={`px-2.5 py-0.5 ${lang === k ? 'bg-accent font-semibold text-white' : ''}`} onClick={() => setLang(k)}>
          {label}
        </button>
      ))}
    </div>
  )
}

// Mục menu mobile có thể mở rộng danh sách con.
function MobileItem({ label, to, links }) {
  const tr = useTr()
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-black/5">
      <div className="flex items-center">
        <NavLink to={to} className={({ isActive }) => `flex-1 py-3.5 text-base font-bold uppercase tracking-wide ${isActive ? 'text-accent' : ''}`}>{label}</NavLink>
        {links && (
          <button type="button" aria-label={label} aria-expanded={open} data-pwc-interaction="mobile-submenu" onClick={() => setOpen((v) => !v)} className="grid size-10 place-items-center">
            <Icon name="chevD" size={18} className={`transition ${open ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
      {links && open && (
        <ul className="mb-3 grid gap-2 pl-3 text-[15px]">
          {links.map(([l, href]) => <li key={l}><Link to={href} className="text-ink/75 hover:text-brand">{tr(l)}</Link></li>)}
        </ul>
      )}
    </div>
  )
}

export default function Header() {
  const { t } = useLang()
  const menus = useMenus()
  const { pathname, search } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [opened, setOpened] = useState({})
  const openMenu = (key) => setOpened((o) => (o[key] ? o : { ...o, [key]: true }))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Đóng menu (mobile + dropdown đang focus) khi chuyển trang.
  useEffect(() => {
    setOpen(false)
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }, [pathname, search])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const linkCls = ({ isActive }) => `block rounded-md px-2 py-7 xl:px-3 hover:text-accent ${isActive ? 'text-accent' : ''}`
  const Chev = () => <Icon name="chevD" size={11} stroke={2.6} className="ml-1 inline" />

  const NAV = [
    { key: 'tours', label: t.nav.tours, to: '/tours', panel: <TabbedMega menu={menus.tours} />, links: menus.tours.tabs.map((x) => [x.label, x.more[1]]) },
    { key: 'packages', label: t.menu2.packages, to: '/tours', panel: <TabbedMega menu={menus.packages} />, links: menus.packages.tabs[1].tiles.map((x) => [x.label, x.to]) },
    { key: 'car', label: t.nav.car, to: '/private-car', panel: <CarMega tiles={menus.car} />, links: menus.car.slice(0, 7).map((x) => [x.label, x.to]) },
    { key: 'visa', label: t.nav.visa, to: '/visa-fast-track' },
    { key: 'partners', label: t.nav.partners, to: '/partners' },
    { key: 'guide', label: t.nav.guide, to: '/travel-guide', panel: <GuideMega groups={menus.guide} />, links: menus.guide.flatMap(([, l]) => l).slice(0, 7) },
    { key: 'about', label: t.nav.about, to: '/about' },
  ]

  return (
    <header className={`fixed top-0 z-40 w-full bg-white text-ink transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      <div className="bg-brand-dark text-xs text-white/90">
        <div className="container-x flex items-center justify-between gap-4 py-2">
          <span className="hidden sm:inline">{t.topbar}</span>
          <div className="ml-auto flex items-center gap-4">
            <Link to="/partners" className="hidden font-semibold text-amber-brand md:inline">{t.b2b}</Link>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a className="hidden md:inline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <LangSwitch />
          </div>
        </div>
      </div>

      <div className="container-x relative flex h-[80px] items-center justify-between gap-4 md:h-[92px]">
        <Link to="/" className="shrink-0" aria-label="Vietlook Travel">
          <img width="548" height="356" className="h-16 w-auto max-w-none object-contain md:h-[76px]" src="/logo.png" alt="Vietlook Travel" />
        </Link>

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center whitespace-nowrap text-sm font-bold uppercase tracking-wide">
            {NAV.map((item) => (
              <li key={item.key} className={item.panel ? 'group' : ''} data-pwc-interaction={item.panel ? `menu-${item.key}` : undefined} onMouseEnter={() => openMenu(item.key)} onFocus={() => openMenu(item.key)}>
                <NavLink to={item.to} className={item.key === 'packages' ? 'block rounded-md px-2 py-7 hover:text-accent xl:px-3' : linkCls} aria-haspopup={item.panel ? 'true' : undefined}>
                  {item.label}
                  {item.panel && <Chev />}
                </NavLink>
                {/* Menu thả xuống chỉ dựng (và tải ảnh) sau lần rê chuột đầu tiên */}
                {opened[item.key] && item.panel}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link className="btn btn-accent hidden whitespace-nowrap !py-2.5 md:max-lg:inline-flex" to="/contact">{t.plan}</Link>
          <button className="rounded-md p-2 text-2xl lg:hidden" aria-label={t.menu} aria-expanded={open} aria-controls="mobile-nav" data-pwc-interaction="menu" onClick={() => setOpen(true)}>
            <Icon name="menu" size={26} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <nav
          id="mobile-nav"
          data-pwc-controlled="menu"
          className={`absolute inset-y-0 right-0 flex w-[min(340px,86vw)] flex-col overflow-y-auto bg-white p-6 text-ink shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'invisible translate-x-full'}`}
        >
          <div className="mb-4 flex items-center justify-between">
            <img className="h-14 w-auto max-w-none object-contain" width="548" height="356" src="/logo.png" alt="Vietlook Travel" />
            <button aria-label="Close" className="rounded-md p-2" onClick={() => setOpen(false)}><Icon name="close" size={24} /></button>
          </div>
          {NAV.map((item) => <MobileItem key={item.key} label={item.label} to={item.to} links={item.links} />)}
          <div className="mt-6 flex items-center justify-between gap-3 text-sm">
            <LangSwitch dark />
            <Link to="/contact" className="btn btn-accent !py-2.5">{t.plan}</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
