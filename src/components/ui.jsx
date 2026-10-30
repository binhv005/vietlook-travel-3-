import { useLang } from '../i18n'
import Icon from './Icon'

// Các mảnh giao diện dùng chung theo Link 3: sóng, ghi chú viết tay, tiêu đề khối.

export function HeroWaves({ fill = '#ffffff' }) {
  return (
    <svg aria-hidden="true" className="hero-waves absolute inset-x-0 -bottom-px h-16 w-full md:h-24" preserveAspectRatio="none" viewBox="0 24 150 28">
      <defs>
        <path
          id="hero-wave"
          d="M-160 44c7.5 0 14.5-8 22-8s14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8 14.5-8 22-8 14.5 8 22 8v44h-352z"
        />
      </defs>
      <g>
        <use href="#hero-wave" x="48" y="0" fill="rgba(255,255,255,0.25)" />
        <use href="#hero-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
        <use href="#hero-wave" x="48" y="7" fill={fill} />
      </g>
    </svg>
  )
}

// Dải sóng ngăn cách giữa hai khối (2 kiểu đường cong của Link 3).
export function WaveDivider({ fill = '#ffffff', bg = 'transparent', variant = 'soft', flip = false, className = '' }) {
  const paths =
    variant === 'soft'
      ? ['M0 52 C220 12 420 18 620 50 S1000 80 1180 38 1380 20 1440 30 V100 H0 Z', 'M0 70 C180 30 320 30 480 62 S780 98 960 60 1260 22 1440 58 V100 H0 Z']
      : ['M0 60 C120 20 240 20 360 60 S600 100 720 60 960 20 1080 60 1320 100 1440 60 V100 H0 Z', 'M0 60 C120 20 240 20 360 60 S600 100 720 60 960 20 1080 60 1320 100 1440 60 V100 H0 Z']
  return (
    <div className={`h-12 md:h-20 ${flip ? 'rotate-180' : ''} ${className}`} style={{ background: bg }} aria-hidden="true">
      <svg className="block h-full w-full" preserveAspectRatio="none" viewBox="0 0 1440 100">
        <path d={paths[0]} fill={fill} opacity={variant === 'soft' ? 0.45 : 0.4} transform={variant === 'soft' ? undefined : 'translate(-180 -14)'} />
        <path d={paths[1]} fill={fill} />
      </svg>
    </div>
  )
}

function ArrowDown({ className }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 80 70">
      <path d="M60 4 C 30 10, 14 30, 22 62" />
      <path d="M12 52 L22 64 L32 52" />
    </svg>
  )
}

export function ArrowSide({ className = 'mb-2 hidden h-14 w-24 shrink-0 md:block' }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 120 80">
      <path d="M6 74 C 30 30, 60 14, 108 12" />
      <path d="M92 2 L109 12 L94 24" />
    </svg>
  )
}

// Ghi chú viết tay (font Caveat) kèm mũi tên – kiểu "Hand-picked itineraries. Everything taken care of."
export function HandNote({ lines, side = 'right', tone = 'text-brand', indent = false }) {
  const right = side === 'right'
  return (
    <div className={`relative mt-4 hidden w-fit md:mt-0 md:block ${right ? 'md:-rotate-3 md:mb-10 md:ml-6' : 'md:rotate-2 md:mb-8 md:mr-10'} ${tone}`}>
      <p className="font-hand text-2xl leading-snug md:text-[1.75rem]">
        {lines.map((l, i) => (
          <span key={l} className={`block ${indent && i > 0 ? 'md:pl-8' : ''}`}>{l}</span>
        ))}
      </p>
      <ArrowDown className={`absolute top-full hidden h-10 w-12 md:block ${right ? 'right-2 -scale-x-100' : 'left-0'}`} />
    </div>
  )
}

export function Eyebrow({ children, className = '' }) {
  return <p className={`mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent ${className}`}>{children}</p>
}

// Tiêu đề khối kiểu Link 3: chữ bên phải + ghi chú tay bên trái (reverse) hoặc ngược lại.
export function SplitHead({ eyebrow, title, note, reverse = false, titleClass = 'font-serif text-3xl font-bold leading-tight md:text-4xl', noteTone, indent }) {
  return (
    <div className={`mb-6 flex flex-col gap-2 md:mb-14 md:items-end md:justify-between md:gap-10 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      <div className={`max-w-2xl ${reverse ? 'md:text-right' : ''}`}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className={titleClass}>{title}</h2>
      </div>
      {note && <HandNote lines={note} side={reverse ? 'right' : 'left'} tone={noteTone} indent={indent} />}
    </div>
  )
}

// wide: khung rộng hơn để tiêu đề dài nằm trên 1 dòng ở màn lớn
export function CenterHead({ eyebrow, title, sub, light = false, wide = false }) {
  return (
    <div className={`mx-auto mb-10 text-center ${wide ? 'max-w-5xl' : 'max-w-2xl'}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={`font-serif text-3xl font-bold leading-tight md:text-4xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {sub && <p className={`mt-3 text-base ${light ? 'text-white/80' : 'text-muted'}`}>{sub}</p>}
    </div>
  )
}

// Số chạy kiểu đồng hồ (tham khảo bellairetravels.com): mỗi chữ số cuộn từ 0 tới giá trị khi khối cha có .anim-in; ký tự khác giữ nguyên.
export function RollNumber({ value }) {
  let d = 0
  return (
    <span className="roll-number" aria-label={value}>
      {[...value].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="roll-digit" aria-hidden="true">
            <span style={{ '--n': ch, '--i': d++ }}>
              {Array.from({ length: 10 }, (_, k) => <span key={k}>{k}</span>)}
            </span>
          </span>
        ) : (
          <span key={i} className="roll-char" aria-hidden="true">{ch}</span>
        ),
      )}
    </span>
  )
}

// Lấy số trang từ ?page= (mặc định 1); đổi trang thì cuộn về đầu danh sách (phần tử có id = anchor).
export function usePage(params, setParams, anchor) {
  const page = Math.max(1, parseInt(params.get('page'), 10) || 1)
  const goTo = (n) => {
    const next = new URLSearchParams(params)
    if (n > 1) next.set('page', n)
    else next.delete('page')
    setParams(next)
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return [page, goTo]
}

// Phân trang số: ← 1 … 4 5 6 … 12 →
export function Pagination({ page, pages, onChange }) {
  const { t } = useLang()
  if (pages <= 1) return null
  const nums = [...new Set([1, page - 1, page, page + 1, pages])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b)
  const items = nums.flatMap((n, i) => (i && n - nums[i - 1] > 1 ? ['…' + n, n] : [n]))
  const btn = 'grid size-11 place-items-center rounded-full border text-sm font-semibold transition'
  const arrow = `${btn} bg-white hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-40`
  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label={t.pager.label}>
      <button type="button" className={arrow} disabled={page === 1} onClick={() => onChange(page - 1)} aria-label={t.pager.prev} data-pwc-interaction="pager">
        <Icon name="chevL" size={18} />
      </button>
      {items.map((n) =>
        typeof n === 'string' ? (
          <span key={n} className="px-1 text-muted">…</span>
        ) : (
          <button
            key={n}
            type="button"
            aria-current={n === page ? 'page' : undefined}
            onClick={() => onChange(n)}
            data-pwc-interaction="pager"
            className={`${btn} ${n === page ? 'border-brand bg-brand text-white' : 'bg-white hover:border-brand hover:text-brand'}`}
          >
            {n}
          </button>
        ),
      )}
      <button type="button" className={arrow} disabled={page === pages} onClick={() => onChange(page + 1)} aria-label={t.pager.next} data-pwc-interaction="pager">
        <Icon name="chevR" size={18} />
      </button>
    </nav>
  )
}
