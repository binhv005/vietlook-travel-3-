import { ServicesL1, B2BL2, PackagesL1, RegionsL3, StylesL2, HeritageDrum, CarsL1, VisaL1, HowToBook } from '../components/HomeA'
import { WhyL3, CultureL3, PlanFormL3, ReviewsNewsL3 } from '../components/HomeB'

// Các mục dưới hero trang chủ – tách chunk riêng, tải sau khi hero đã hiện (Home.jsx).
export default function HomeRest() {
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
