import { startTransition, useEffect, useState } from 'react'
import { ServicesL1, B2BL2, PackagesL1, RegionsL3, StylesL2, HeritageDrum, CarsL1, VisaL1, HowToBook } from '../components/HomeA'
import { WhyL3, CultureL3, PlanFormL3, ReviewsNewsL3 } from '../components/HomeB'

const SECTIONS = [
  <ServicesL1 key="services" />,
  <B2BL2 key="b2b" />,
  /* Trống đồng + di tích nối liền ngay dưới khối vùng miền, chung một nền (như mẫu Villages Vietnam) */
  <div key="regions" className="bg-photo-light">
    <RegionsL3 />
    <HeritageDrum bg="" />
  </div>,
  <PackagesL1 key="packages" />,
  <StylesL2 key="styles" />,
  <CarsL1 key="cars" />,
  <VisaL1 key="visa" />,
  <HowToBook key="how" />,
  <WhyL3 key="why" />,
  <CultureL3 key="culture" />,
  <PlanFormL3 key="plan" />,
  <ReviewsNewsL3 key="reviews" />,
]
const STEP = 2

// Các mục dưới hero trang chủ – tách chunk riêng, tải sau khi hero đã hiện (Home.jsx).
// Dựng dần từng 2 mục mỗi lượt để không có một tác vụ dài chặn luồng chính (TBT); có #hash thì dựng hết ngay.
export default function HomeRest() {
  const [n, setN] = useState(() => (location.hash ? SECTIONS.length : STEP))
  useEffect(() => {
    if (n >= SECTIONS.length) return
    const id = setTimeout(() => startTransition(() => setN((x) => x + STEP)), 50)
    return () => clearTimeout(id)
  }, [n])
  return <>{SECTIONS.slice(0, n)}</>
}
