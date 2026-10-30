const PATHS = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  chevL: 'M15 6l-6 6 6 6',
  chevR: 'M9 6l6 6-6 6',
  chevD: 'M6 9l6 6 6-6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  pin: 'M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4',
  globe: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14',
  car: 'M5 16V11l2-5h10l2 5v5M5 16h14M5 16v2M19 16v2M7.5 13.5h.01M16.5 13.5h.01',
  passport: 'M6 3h12v18H6zM12 13a3 3 0 100-6 3 3 0 000 6zM9 17h6',
  users: 'M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2.5 20a6.5 6.5 0 0113 0M16 4.5a3.5 3.5 0 010 6.5M21.5 20a6.5 6.5 0 00-4-6',
  wallet: 'M3 7h16a2 2 0 012 2v8a2 2 0 01-2 2H3zM3 7V6a2 2 0 012-2h11M16 13h.01',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z',
  shield: 'M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z',
  headset: 'M4 14v-2a8 8 0 0116 0v2M4 14h3v5H5a1 1 0 01-1-1zM20 14h-3v5h2a1 1 0 001-1z',
  handshake: 'M2 11l4-4 4 2 3-2 4 1 5 3M7 14l3 3a2 2 0 003 0l5-5M6 7l-4 4 5 5',
  chat: 'M4 5h16v11H8l-4 4z',
  send: 'M21 3L10 14M21 3l-7 18-4-7-7-4z',
  route: 'M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4zM6 15V9a4 4 0 014-4h2M18 9v6a4 4 0 01-4 4h-2',
  card: 'M3 6h18v12H3zM3 10h18M7 15h4',
  plane: 'M2 13l8 1 4 7h2l-2-7 6-1c1 0 2-1 2-2s-1-2-2-2l-6-1 2-7h-2l-4 7-8 1z',
  play: 'M8 5l11 7-11 7z',
  pen: 'M4 20h4L19 9l-4-4L4 16zM13 7l4 4M14 20h6',
  sliders: 'M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M14 4v4M8 10v4M16 16v4',
  quote: 'M7 17c-2 0-3-1.5-3-3.5C4 10 6 7 9 6l.5 1.2C8 8 7 9.5 7 11h2v6zm9 0c-2 0-3-1.5-3-3.5 0-3.5 2-6.5 5-7.5l.5 1.2C17 8 16 9.5 16 11h2v6z',
  link: 'M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  circleCheck: 'M12 21a9 9 0 100-18 9 9 0 000 18zM8 12.5l2.8 2.8L16.5 9.5',
  directions: 'M12 2.5l9.5 9.5-9.5 9.5L2.5 12zM9 14v-3h5M12 8.5l2.5 2.5L12 13.5',
  stamp: 'M5 21h14M6 17h12v-3a2 2 0 00-2-2h-2l-.5-3A3 3 0 0012 3a3 3 0 00-1.5 6L10 12H8a2 2 0 00-2 2z',
  planeLanding: 'M2 21h20M3.5 11l3 1 3-4 2 .5-1.5 5 5 1.5c1.5.4 2.5 1.6 2 3l-14-4z',
  shieldAlert: 'M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6zM12 8v4M12 16h.01',
  facebook: 'M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8.5c0-.3.2-.5.5-.5z',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z',
  home: 'M3 11l9-7 9 7M5 10v10h14V10',
  badge: 'M12 3l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 21l-2.4-1.8-3 .2-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2z',
}

export default function Icon({ name, size = 20, stroke = 1.8, className, filled = false }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}

export function Stars({ n = 5, size = 14 }) {
  return (
    <span className="inline-flex gap-0.5 text-[#f6b01e]" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }, (_, i) => (
        <Icon key={i} name="star" size={size} filled />
      ))}
    </span>
  )
}

export function BrandIcon({ id, size = 22 }) {
  if (id === 'google')
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
      </svg>
    )
  if (id === 'tripadvisor')
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#34E0A1" />
        <circle cx="7.6" cy="13" r="3.2" fill="#fff" />
        <circle cx="16.4" cy="13" r="3.2" fill="#fff" />
        <circle cx="7.6" cy="13" r="1.4" fill="#000" />
        <circle cx="16.4" cy="13" r="1.4" fill="#000" />
        <path d="M4.5 9.2c4.3-2.3 10.7-2.3 15 0" stroke="#000" strokeWidth="1.3" fill="none" />
      </svg>
    )
  return null
}
