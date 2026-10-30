import { lazy, startTransition, Suspense, useEffect, useState } from 'react'
import { useLang } from '../i18n'
import { usePageTitle } from '../hooks'
import Hero from '../components/Hero'

const HomeRest = lazy(() => import('./HomeRest'))

// Khung Link 3 + khối dịch vụ/thẻ tour/xe/visa Link 1 + khối B2B Link 2 + các mục docs 6.x.
export default function Home() {
  const { t } = useLang()
  usePageTitle(t.meta.home)
  // Dựng hero trước để ảnh hero hiện sớm (LCP mobile); các mục bên dưới (chunk riêng) tải và dựng ngay sau khung hình đầu,
  // trong transition để React chia nhỏ công việc, không chặn luồng chính một lần dài. Có #hash thì dựng hết ngay để cuộn tới đúng mục.
  const [rest, setRest] = useState(() => !!location.hash)
  useEffect(() => {
    if (rest) return
    const id = requestAnimationFrame(() => setTimeout(() => startTransition(() => setRest(true))))
    return () => cancelAnimationFrame(id)
  }, [rest])
  // Giữ chỗ để footer không lộ ra rồi bị đẩy xuống (CLS)
  const hold = <div className="h-screen" />
  return (
    <>
      <Hero />
      {rest ? <Suspense fallback={hold}><HomeRest /></Suspense> : hold}
    </>
  )
}
