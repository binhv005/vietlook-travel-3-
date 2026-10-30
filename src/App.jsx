import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Trang chủ tải ngay; các trang con tách thành file JS riêng, chỉ tải khi mở (giảm dung lượng tải lần đầu).
const page = (load, name) => lazy(() => load().then((m) => ({ default: m[name] })))
const tours = () => import('./pages/Tours')
const services = () => import('./pages/ServicePages')
const company = () => import('./pages/CompanyPages')
const Tours = page(tours, 'Tours')
const TourDetail = page(tours, 'TourDetail')
const Destinations = page(services, 'Destinations')
const PrivateCar = page(services, 'PrivateCar')
const CarCity = page(services, 'CarCity')
const VisaPage = page(services, 'VisaPage')
const Partners = page(company, 'Partners')
const About = page(company, 'About')
const Contact = page(company, 'Contact')
const TravelGuide = page(company, 'TravelGuide')
const GuideDetail = page(company, 'GuideDetail')
const ThankYou = page(company, 'ThankYou')
const Policy = page(company, 'Policy')

const wait = <div className="min-h-[70vh]" />
const s = (el) => <Suspense fallback={wait}>{el}</Suspense>

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tours" element={s(<Tours />)} />
          <Route path="tours/:id" element={s(<TourDetail />)} />
          <Route path="destinations" element={s(<Destinations />)} />
          <Route path="private-car" element={s(<PrivateCar />)} />
          <Route path="private-car/:city" element={s(<CarCity />)} />
          <Route path="visa-fast-track" element={s(<VisaPage />)} />
          <Route path="partners" element={s(<Partners />)} />
          <Route path="travel-guide" element={s(<TravelGuide />)} />
          <Route path="travel-guide/:slug" element={s(<GuideDetail />)} />
          <Route path="about" element={s(<About />)} />
          <Route path="contact" element={s(<Contact />)} />
          <Route path="thank-you" element={s(<ThankYou />)} />
          <Route path="policies/:slug" element={s(<Policy />)} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
