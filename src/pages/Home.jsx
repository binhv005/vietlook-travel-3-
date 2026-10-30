import { startTransition, useEffect, useState } from 'react'
import { useLang } from '../i18n'
import { usePageTitle } from '../hooks'
import Hero from '../components/Hero'
import { ServicesL1, B2BL2, PackagesL1, RegionsL3, StylesL2, HeritageDrum, CarsL1, VisaL1, HowToBook } from '../components/HomeA'
import { WhyL3, CultureL3, PlanFormL3, ReviewsNewsL3 } from '../components/HomeB'

// Khung Link 3 + khối dịch vụ/thẻ tour/xe/visa Link 1 + khối B2B Link 2 + các mục docs 6.x.
export default function Home() {
  const { t } = useLang()
  usePageTitle(t.meta.home)
  // Dựng hero trước để ảnh hero hiện sớm (LCP mobile); các mục bên dưới dựng ngay sau khung hình đầu,
  // trong transition để React chia nhỏ công việc, không chặn luồng chính một lần dài. Có #hash thì dựng hết ngay để cuộn tới đúng mục.
  const [rest, setRest] = useState(() => !!location.hash)
  useEffect(() => {
    if (rest) return
    const id = requestAnimationFrame(() => setTimeout(() => startTransition(() => setRest(true))))
    return () => cancelAnimationFrame(id)
  }, [rest])
  return (
    <>
      <Hero />
      {/* Giữ chỗ để footer không lộ ra rồi bị đẩy xuống (CLS) */}
      {rest ? <HomeRest /> : <div className="h-screen" />}
    </>
  )
}

function HomeRest() {
  return (
    <>
      <ServicesL1 />
      <B2BL2 />
      {/* Trống đồng + di tích nối liền ngay dưới khối vùng miền, chung một nền (như mẫu Villages Vietnam) */}
      <div className="bg-photo-light">
        <RegionsL3 />
        <HeritageDrum bg="" />
      </div>
      <PackagesL1 />
      <StylesL2 />
      <CarsL1 />
      <VisaL1 />
      <HowToBook />
      <WhyL3 />
      <CultureL3 />
      <PlanFormL3 />
      <ReviewsNewsL3 />
    </>
  )
}
