// Ảnh đáp ứng: mỗi ảnh .webp trong /img, /vl, /l1, /l3 có thêm bản -640.webp và -1024.webp (tạo sẵn khi build ảnh),
// để trình duyệt tải bản vừa khung thay vì ảnh 1920px (PageSpeed mobile).
const RESPONSIVE = /^\/(img|vl|l1|l3)\/.+(?<!-640|-1024)\.webp$/

export const sized = (src, w) => (src && RESPONSIVE.test(src) ? src.replace(/\.webp$/, `-${w}.webp`) : src)

export const srcSet = (src) => (src && RESPONSIVE.test(src) ? `${sized(src, 640)} 640w, ${sized(src, 1024)} 1024w, ${src} 1920w` : undefined)

// sizes dùng chung
export const CARD = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
export const FULL = '100vw'
