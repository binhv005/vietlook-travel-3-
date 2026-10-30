// Nội dung demo hợp nhất. Các mục đánh dấu PENDING đang chờ chị Vietlook gửi số liệu thật (docs.md mục 9).

const T = (name) => `/img/tour/${name}.webp`
const C = (name) => `/img/car/${name}.webp`

export const CONTACT = {
  phone: '+84 98 339 3588',
  phoneHref: 'tel:+84983393588',
  whatsapp: 'https://wa.me/84983393588',
  email: 'infovietlooktravel@gmail.com',
  address: 'No 58, Yen Nghia Ward, Ha Dong, Hanoi, Vietnam',
  companyEn: 'Vietlook Travel And Trade Company Limited',
  companyVi: 'Công ty TNHH Du lịch và Thương mại Vietlook',
  businessNo: '[PENDING – business registration no.]',
  licenseNo: '[PENDING – international tour operator licence no.]',
}

// Google: số THẬT đọc từ Google Maps của công ty ngày 29/10/2026 (4.7★ · 31 đánh giá) – cập nhật tay khi số thay đổi.
// PENDING: Tripadvisor – số sao + lượt đánh giá THẬT và link chính thức (mục 9 #3).
export const RATINGS = [
  { id: 'tripadvisor', name: 'Tripadvisor', score: '5.0', label: 'Excellent', count: 35, href: '/about#reviews' },
  { id: 'google', name: 'Google', score: '4.7', label: 'Google Maps', count: 31, href: 'https://search.google.com/local/reviews?placeid=ChIJlz9Fwq9TNDER5gBOgkad47I&hl=en' },
]

// Hero: ghép phong cảnh từ Bắc vào Nam để thấy toàn cảnh Việt Nam (docs mục 4).
export const HERO_SLIDES = [
  { img: T('hoang-su-phi-ha-giang'), place: 'Ha Giang', region: 'north' },
  { img: T('ha-long'), place: 'Ha Long Bay', region: 'north' },
  { img: T('tam-coc-bich-dong'), place: 'Ninh Binh', region: 'north' },
  { img: T('hoi-an-9-copy'), place: 'Hoi An', region: 'central' },
  { img: T('da-nang'), place: 'Da Nang', region: 'central' },
  { img: T('bai-tranh-beach-1'), place: 'Nha Trang', region: 'south' },
  { img: T('phu-quoc'), place: 'Phu Quoc', region: 'south' },
]

// Tour dài ngày – nội dung Link 2, thẻ kiểu Link 1, khung vòm (docs 6.6).
export const PACKAGES = [
  {
    id: 'classic-14',
    desc: 'Two weeks from the capital to the Mekong: cruises, karst valleys, imperial Hue, lantern-lit Hoi An and the delta.',
    regions: ['north', 'central', 'south'],
    featured: true,
    days: 14,
    nights: 13,
    title: 'Classic Vietnam: Hanoi to the Mekong – 14 Days 13 Nights',
    route: 'Hanoi – Ha Long – Ninh Binh – Hue – Hoi An – Saigon – Mekong',
    img: T('khamphadanhthangvietnam'),
    highlights: ['Overnight cruise on Ha Long Bay', 'Boat ride through Ninh Binh’s karst valleys', 'Hue Imperial City and royal tombs', 'Lantern evenings in Hoi An'],
    oldPrice: 1690,
    price: 1590,
  },
  {
    id: 'grand-21',
    desc: 'Three weeks to see Vietnam properly: mountains, bays, imperial cities, old towns, highlands, beaches and the Mekong Delta.',
    regions: ['north', 'central', 'south'],
    days: 21,
    nights: 20,
    title: 'Vietnam Grand Journey North to South – 21 Days 20 Nights',
    route: 'Hanoi – Sapa – Ha Long – Ninh Binh – Hue – Hoi An – Saigon – Mekong – Phu Quoc',
    img: T('du-lich-tay-bac'),
    highlights: ['Mountain villages of Sapa', 'Two nights on Ha Long and Lan Ha bays'],
    price: 2890,
  },
  {
    id: 'hl-nb-dn-ha-10',
    desc: 'The best of the north and centre in ten days, with a cruise, countryside boat rides, the Ba Na Hills and Hoi An’s old town.',
    regions: ['north', 'central'],
    days: 10,
    nights: 9,
    title: 'Ha Long – Ninh Binh – Da Nang – Hoi An 10 Days 9 Nights',
    route: 'Hanoi – Ha Long – Ninh Binh – Da Nang – Hoi An',
    img: T('halongninhbinhdananghoian10days9nightstour'),
    highlights: ['Ha Long Bay overnight cruise', 'Tam Coc boat ride and cycling'],
    oldPrice: 805,
    price: 670,
  },
  {
    id: 'hn-hl-sp-dn-hcm-10',
    desc: 'Capital, bay and mountains in the north, then Da Nang’s beaches and the energy of Saigon in the south.',
    regions: ['north', 'central', 'south'],
    days: 10,
    nights: 9,
    title: 'Hanoi – Ha Long – Sapa – Da Nang – Ho Chi Minh',
    route: 'Halong Bay – Sapa – Da Nang – Saigon',
    img: T('khamphavedepvietnamhuehoiansapa'),
    highlights: ['Fansipan cable car & rice terraces', 'Golden Bridge at Ba Na Hills'],
    oldPrice: 675,
    price: 560,
  },
  {
    id: 'hn-hl-nb-dn-pq-10',
    desc: 'A north-to-south classic that ends with island time on Phu Quoc’s white-sand beaches.',
    regions: ['north', 'central', 'south'],
    days: 10,
    nights: 9,
    title: 'Hanoi – Ha Long – Ninh Binh – Da Nang – Phu Quoc',
    route: 'Hanoi – Halong Bay – Ninh Binh – Da Nang – Phu Quoc',
    img: T('tourdulichphuquoc-1'),
    highlights: ['Bai Dinh pagoda & Trang An', 'Four-island boat trip in Phu Quoc'],
    oldPrice: 595,
    price: 492,
  },
  {
    id: 'hl-dn-hcm-9',
    desc: 'Ha Long Bay, the Golden Bridge at Ba Na Hills and a day on the canals of the Mekong Delta.',
    regions: ['north', 'central', 'south'],
    days: 9,
    nights: 8,
    title: 'Ha Long – Da Nang – Ba Na – Ho Chi Minh – Mekong 9 Days 8 Nights',
    route: 'Halong Bay – Da Nang – Ho Chi Minh City – Mekong',
    img: T('halongdanang9day8nightstour'),
    highlights: ['Day cruise on Ha Long Bay', 'Floating markets of the Mekong'],
    oldPrice: 560,
    price: 463,
  },
  {
    id: 'dn-pq-8',
    desc: 'Central coast and island escape: Da Nang, Hoi An’s lanterns and the beaches of Phu Quoc.',
    regions: ['central', 'south'],
    days: 8,
    nights: 7,
    title: 'Da Nang – Phu Quoc Tour 8 Days 7 Nights',
    route: 'Da Nang – Hoi An – Phu Quoc',
    img: T('danang-phuquoctour8days7nights'),
    highlights: ['Cham Islands snorkelling', 'Sunset at Phu Quoc’s Sunset Town'],
    oldPrice: 995,
    price: 828,
  },
  {
    id: 'hl-nb-sp-8',
    desc: 'Hanoi, the karst landscapes of Ninh Binh, a night on Ha Long Bay and two days in the mountains of Sapa.',
    regions: ['north'],
    days: 8,
    nights: 7,
    title: 'Ha Long – Ninh Binh – Sapa 8 Days 7 Nights from Hanoi',
    route: 'Hanoi – Halong Bay – Ninh Binh – Sapa',
    img: T('du-lich-sa-pa-mua-he'),
    highlights: ['Trekking to Cat Cat village', 'Trang An boat ride'],
    oldPrice: 525,
    price: 435,
  },
  {
    id: 'south-7',
    desc: 'Islands of Nha Trang, the pine hills of Da Lat, Mui Ne’s dunes and the Mekong Delta.',
    regions: ['central', 'south'],
    days: 7,
    nights: 6,
    title: 'Nha Trang – Da Lat – Mui Ne – Mekong – Ho Chi Minh',
    route: 'Nha Trang – Da Lat – Mui Ne – Saigon',
    img: T('nha-trang-da-lat-mui-ne-ho-chi-minh-city'),
    highlights: ['Island hopping in Nha Trang', 'Red sand dunes of Mui Ne'],
    oldPrice: 625,
    price: 520,
  },
]

export const STYLES = [
  { key: 'luxury', img: T('emperor-cruises') },
  { key: 'signature', img: T('hoi-an-9-copy') },
  { key: 'culture', img: T('lantern-making-be-a-real-farmer-at-tra-que-village') },
  { key: 'family', img: T('bay-mau-coconut-forest') },
  { key: 'honeymoon', img: T('glaming') },
  { key: 'classic', img: T('ha-long') },
  { key: 'photography', img: T('hoang-su-phi-ha-giang') },
  { key: 'tailor', img: T('the-best-lotus-viewing-spots-in-ninh-binh') },
]

// Điểm đến theo vùng + thẻ "Other location" (docs 6.7).
export const REGIONS = {
  north: [
    { name: 'Hanoi', img: T('hanoicitytour01daytrip'), tags: ['Old Quarter', 'Train Street', 'West Lake'], more: 4, desc: 'A thousand-year-old capital of lakes, temples and street food.' },
    { name: 'Ha Long Bay', img: T('tourduthuyenhalong1ngay1-2'), tags: ['Overnight cruise', 'Lan Ha Bay'], more: 3, desc: 'Limestone islands rising from emerald water – best seen from a cruise.' },
    { name: 'Ninh Binh', img: T('tam-coc-bich-dong'), tags: ['Trang An', 'Mua Cave'], more: 5, desc: '“Ha Long Bay on land” – rice fields, rivers and karst peaks.' },
    { name: 'Sapa & Ha Giang', img: T('hoang-su-phi-ha-giang'), tags: ['Rice terraces', 'Loop road'], more: 6, desc: 'Mountain passes, hill-tribe villages and golden terraces.' },
  ],
  central: [
    { name: 'Da Nang', img: T('da-nang'), tags: ['Golden Bridge', 'My Khe Beach'], more: 4, desc: 'Beaches, Ba Na Hills and the gateway to central heritage.' },
    { name: 'Hoi An', img: T('khamphavedepvietnamhuehoiansapa'), tags: ['Lantern town', 'Tra Que'], more: 3, desc: 'A riverside old town glowing with silk lanterns every night.' },
    { name: 'Hue', img: T('imperial-citadel'), tags: ['Imperial City', 'Royal tombs'], more: 4, desc: 'The last imperial capital – citadels, pagodas and royal cuisine.' },
    { name: 'Nha Trang & Da Lat', img: T('hon-mun-island-1'), tags: ['Islands', 'Highlands'], more: 5, desc: 'Turquoise bays on the coast, pine hills and flowers inland.' },
  ],
  south: [
    { name: 'Saigon', img: T('hcm-tour-1'), tags: ['Cu Chi Tunnels', 'Ben Thanh'], more: 4, desc: 'Vietnam’s energetic south – colonial landmarks and night markets.' },
    { name: 'Phu Quoc Island', img: T('phu-quoc'), tags: ['4 islands', 'Snorkelling'], more: 6, desc: 'White-sand beaches, coral reefs and the longest sea cable car.' },
    { name: 'Mekong Delta', img: T('rach-vem-fishing-village-1'), tags: ['Floating market', 'Orchards'], more: 3, desc: 'Sampan rides through canals, fruit gardens and river villages.' },
    { name: 'Mui Ne', img: T('mui-ne-sunset-tour'), tags: ['Sand dunes', 'Fairy Stream'], more: 2, desc: 'Red and white dunes, fishing villages and kitesurf beaches.' },
  ],
}

// PENDING: số lượng theo danh sách tỉnh/thành chị cung cấp (mục 9 #2).
export const OTHER_LOCATIONS = {
  count: 32,
  avatars: [T('cao-bang'), T('doi-che-moc-chau'), T('my-son-holy-land-1'), T('da-lat'), T('ganh-dau-beach')],
}

// Ảnh xe lấy theo Link 1 (ảnh studio + bộ ảnh thực tế từng loại xe).
const L1 = (name) => `/l1/${name}.webp`
// Trang con xe theo thành phố (/private-car/<slug>) – theo Link 3. type = nhãn sản phẩm xe thật trong tours.json.
export const CAR_CITIES = [
  { slug: 'ha-noi', name: 'Ha Noi', type: 'Ha Noi Private Cars', airport: 'Noi Bai International Airport (HAN)', img: T('hanoi6'), tile: T('tourcityhanoi1ngay') },
  { slug: 'ho-chi-minh', name: 'Ho Chi Minh City', type: 'Ho Chi Minh Private Cars', airport: 'Tan Son Nhat International Airport (SGN)', img: T('hcm-tour-1'), tile: T('hcm-tour-1') },
  { slug: 'da-nang', name: 'Da Nang', type: 'Da Nang Private Cars', airport: 'Da Nang International Airport (DAD)', img: T('da-nang'), tile: T('da-nang') },
  { slug: 'nha-trang', name: 'Nha Trang', type: 'Nha Trang Private Cars', airport: 'Cam Ranh International Airport (CXR)', img: T('hon-mun-island-1'), tile: T('tourdulichnhatrang4n3d') },
  { slug: 'mui-ne', name: 'Mui Ne', type: 'Mui Ne Private Cars', airport: 'Mui Ne – Phan Thiet', img: T('mui-ne-sunset-tour'), tile: T('suoi-tien-mui-ne') },
  { slug: 'phu-quoc', name: 'Phu Quoc', type: 'Phu Quoc Private Cars', airport: 'Phu Quoc International Airport (PQC)', img: T('phu-quoc'), tile: T('phu-quoc-to-east-island') },
  { slug: 'da-lat', name: 'Da Lat', type: 'Da Lat Private Cars', airport: 'Lien Khuong Airport (DLI)', img: T('da-lat'), tile: T('da-lat') },
]

export const VEHICLES = [
  { key: 'sedan', name: 'Sedan', seats: 4, models: 'Toyota Vios, Hyundai Accent', img: L1('sedan-studio'), studio: true, thumbs: [L1('sedan-white-1'), L1('sedan-white-2')], price: 13 },
  { key: 'suv', name: 'SUV', seats: 7, models: 'Toyota Innova, Mitsubishi Xpander', img: L1('mpv-studio'), studio: true, thumbs: [L1('mpv-silver-1'), L1('mpv-white-1'), L1('mpv-interior'), L1('minivan-premium')], price: 17 },
  { key: 'limo', name: 'Limousine', seats: 9, models: 'Dcar Limousine, Ford Transit Limousine', img: L1('limo-studio'), studio: true, thumbs: [L1('limo-interior'), L1('limo-dark')], price: 38 },
  { key: 'van', name: 'Van', seats: 16, models: 'Ford Transit, Hyundai Solati', img: L1('van16-studio'), studio: true, thumbs: [L1('van16-white'), L1('van16-interior'), L1('van16-interior-blue')], price: 27 },
  { key: 'coach29', name: '29-seat coach', seats: 29, models: 'Hyundai County, Thaco', img: L1('28cho'), studio: true, price: null },
  { key: 'coach45', name: '45-seat coach', seats: 45, models: 'Hyundai Universe, Thaco', img: L1('45cho'), studio: true, price: null },
]

// Bảng giá fast-track (file "BẢNG GIÁ FT MẪU.xlsx") – PENDING xác nhận giá chính thức hay mẫu (mục 7).
export const AIRPORTS = [
  { code: 'SGN', name: 'Tan Son Nhat', city: 'Ho Chi Minh City' },
  { code: 'HAN', name: 'Noi Bai', city: 'Hanoi' },
  { code: 'DAD', name: 'Da Nang', city: 'Da Nang' },
  { code: 'CXR', name: 'Cam Ranh', city: 'Nha Trang' },
  { code: 'PQC', name: 'Phu Quoc', city: 'Phu Quoc' },
]

// 15 gói theo 5 sân bay (USD); null = sân bay chưa có dịch vụ / chưa có giá.
export const FAST_TRACK = [
  { n: 1, group: 'arrival', en: 'Fast-track (priority lane)', zh: '快速通关（优先通道）', desc: { en: 'Meet & assist to the priority immigration lane (lane 4).', zh: '接机并带至优先入境通道（4号通道）。' }, prices: { SGN: 15, HAN: 10, DAD: 8, CXR: 13, PQC: 14 } },
  { n: 2, group: 'arrival', en: 'Fast-track – diplomatic lane', zh: '快速通关 – 外交通道', desc: { en: 'Meet & assist to the diplomatic immigration lane.', zh: '接机并带至外交入境通道。' }, prices: { SGN: 42, HAN: 17, DAD: 17, CXR: 19, PQC: 22 } },
  { n: 3, group: 'arrival', en: 'Fast-track – VIP B (no queue)', zh: '快速通关 – VIP B（免排队）', desc: { en: 'Meet & assist through the priority lane with no queuing.', zh: '接机并走优先通道，无需排队。' }, prices: { SGN: 57, HAN: 27, DAD: 27, CXR: 32, PQC: 27 } },
  { n: 4, group: 'arrival', en: 'Visa on arrival + fast-track', zh: '落地签 + 快速通关', desc: { en: 'Express visa on arrival, then the priority lane (lane 4).', zh: '快速办理落地签后走优先入境通道（4号通道）。' }, prices: { SGN: 20, HAN: 10, DAD: 8, CXR: 13, PQC: 14 } },
  { n: 5, group: 'arrival', en: 'Visa on arrival + diplomatic lane', zh: '落地签 + 外交通道', desc: { en: 'Express visa on arrival, then the diplomatic lane.', zh: '快速办理落地签后走外交入境通道。' }, prices: { SGN: 47, HAN: 17, DAD: 17, CXR: 19, PQC: 22 } },
  { n: 6, group: 'arrival', en: 'Visa on arrival + VIP B', zh: '落地签 + VIP B', desc: { en: 'Express visa on arrival, then the no-queue lane.', zh: '快速办理落地签后走免排队通道。' }, prices: { SGN: 62, HAN: 27, DAD: 27, CXR: 32, PQC: 27 } },
  { n: 7, group: 'arrival', en: 'Express visa only (no priority lane)', zh: '仅快速落地签（不含优先通道）', desc: { en: 'Visa handled for you; you pass immigration in the regular lane.', zh: '代办签证，旅客自行走普通通道入境。' }, prices: { SGN: 14, HAN: null, DAD: null, CXR: null, PQC: null } },
  { n: 8, group: 'departure', en: 'Departure priority lane', zh: '出境优先通道', desc: { en: 'Meet & assist to the priority emigration lane (lane 4).', zh: '接待并带至优先出境通道（4号通道）。' }, prices: { SGN: 19, HAN: 12, DAD: 12, CXR: 22, PQC: 22 } },
  { n: 9, group: 'departure', en: 'Priority lane + security screening', zh: '优先通道 + 安检', desc: { en: 'Priority emigration lane plus priority security screening.', zh: '优先出境通道并优先安检。' }, prices: { SGN: 25, HAN: 22, DAD: 22, CXR: 25, PQC: null } },
  { n: 10, group: 'departure', en: 'Priority check-in (add-on)', zh: '优先值机（附加）', desc: { en: 'Add-on service. At CXR only for flights to Russia.', zh: '附加服务。金兰机场仅限飞往俄罗斯的航班。' }, prices: { SGN: null, HAN: 17, DAD: 17, CXR: 15, PQC: null } },
  { n: 11, group: 'departure', en: 'Departure VIP B', zh: '出境 VIP B', desc: { en: 'Meet & assist through emigration with no queuing.', zh: '接待并免排队出境。' }, prices: { SGN: 62, HAN: 32, DAD: 32, CXR: null, PQC: null } },
  { n: 12, group: 'departure', en: 'Departure VIP B + security screening', zh: '出境 VIP B + 安检', desc: { en: 'No-queue emigration plus priority security screening.', zh: '免排队出境并优先安检。' }, prices: { SGN: 70, HAN: 42, DAD: 42, CXR: null, PQC: null } },
  { n: 13, group: 'extra', en: 'Night surcharge (23:00 – 06:00)', zh: '夜间附加费（23:00–06:00）', desc: { en: 'Applied per guest, in USD.', zh: '按每位旅客以美元计收。' }, prices: { SGN: 6, HAN: 6, DAD: 6, CXR: 5, PQC: 5 } },
  { n: 14, group: 'extra', en: 'Porter service', zh: '行李协助', desc: { en: 'Help with your luggage.', zh: '协助搬运行李。' }, prices: { SGN: 6, HAN: 6, DAD: 6, CXR: null, PQC: null } },
  { n: 15, group: 'extra', en: 'Porter + screening + escort outside', zh: '行李协助 + 安检 + 送出机场', desc: { en: 'Luggage help, screening and escort to the arrival hall exit.', zh: '协助行李、安检并送至到达大厅出口。' }, prices: { SGN: 12, HAN: 12, DAD: 12, CXR: null, PQC: null } },
]

// Review lấy từ Link 2 (TripAdvisor). PENDING: chị gửi 5–10 review thật có ảnh (mục 9 #3).
// PENDING: ngày đánh giá đang để tạm – thay bằng ngày thật trên Tripadvisor khi chị gửi link (docs 6.4, mục 9 #3).
export const REVIEWS = [
  { name: 'Bhavik Shah', date: '03/2026', place: 'Ha Noi & Da Nang', title: 'Our Vietlook guides were excellent', img: '/l3/biking.webp', text: 'Our Vietlook guides Mr. Tinh and Ms. Alana were excellent – friendly, knowledgeable and always on time. A very well organised trip.' },
  { name: 'Patel family', date: '02/2026', place: 'Phu Quoc', title: 'They took great care of our family', img: '/l3/boat.webp', text: 'Our guide was very knowledgeable and took great care of our family throughout the tour.' },
  { name: 'Nisarg S', date: '01/2026', place: 'Da Nang', title: 'A wonderful local guide in Da Nang', img: '/l3/oldquarter.webp', text: 'Our Vietlook tour guide Alina was wonderful – friendly, helpful and full of stories about Da Nang and Hoi An.' },
  { name: 'Niku P', date: '12/2025', place: 'Phu Quoc', title: 'Helped us discover local food', img: T('fishing-snorkeling-2-islands-tour-by-boat'), text: 'The guide was so kind and helped us discover the local food. Thank you Vietlook Travel!' },
  { name: 'Kruti G', date: '11/2025', place: 'Vietnam', title: 'Knowledgeable guide, great English', img: T('hoi-an-9-copy'), text: 'Our guide had great knowledge of every place we visited and spoke very good English. Highly recommended.' },
  { name: 'Hetal S', date: '10/2025', place: 'Vietnam', title: 'A memorable trip', img: T('ha-long'), text: 'Nice, friendly, good, memorable one. Should visit Vietnam once in life.' },
]

// Khối "What's happening in Vietnam" của Link 3.
export const NEWS = [
  { slug: 'lotus-viewing-ninh-binh', title: 'The Best Lotus Viewing Spots In Ninh Binh', img: T('the-best-lotus-viewing-spots-in-ninh-binh'), date: '28 Mar 2026', excerpt: 'Ninh Binh is not only famous for its limestone landscapes and rivers but also for its stunning lotus ponds that bloom beautifully during the summer.' },
  { slug: 'sapa-summer-guide', title: 'Sapa Summer Travel Guide: What To Eat, Where To Stay', img: T('didulichsapathang4cogidep5'), date: '26 Mar 2026', excerpt: 'Sapa in summer offers a refreshing escape with cool weather, lush green rice terraces, and rich cultural experiences.' },
  { slug: 'sapa-summer-tips', title: 'Important Tips For Traveling To Sapa In Summer', img: T('du-lich-sa-pa-mua-he'), date: '26 Mar 2026', excerpt: 'Sapa in summer is a refreshing destination with cool weather, lush green rice terraces, and vibrant local culture.' },
  { slug: 'sapa-beautiful-summer', title: 'What Makes Sapa Beautiful In Summer?', img: T('du-lich'), date: '25 Mar 2026', excerpt: 'Sapa is often associated with misty winters and blooming spring flowers, but summer reveals a completely different side.' },
]

// Khối "Culture & Cruises" của Link 3 (giá văn hoá lấy từ Link 3; du thuyền chờ báo giá).
export const EXPERIENCES = {
  culture: [
    { title: 'Lantern Making – Be A Real Farmer At Tra Que Village', img: T('lantern-making-be-a-real-farmer-at-tra-que-village'), price: null },
    { title: 'Ha Noi Cultural Day Trip', img: T('cho-dong-xuan-ha-noi'), price: 68 },
    { title: 'Hanoi’s Insider Good Morning – Afternoon Tour', img: T('old-quarter-ta-hien-1'), price: 34 },
    { title: 'Hanoi Bicycle Backstreet Tour 4.5 Hours', img: T('west-lake-hanoi'), price: 42 },
  ],
  cruises: [
    { title: 'Emperor Cruises Ha Long Bay 2 Days 1 Night', img: T('emperor-cruises'), price: null },
    { title: 'Ha Long Bay Day Cruise', img: T('tourduthuyenhalong1ngay1-2'), price: null },
    { title: 'Halong Paradise Cruise 2 Days 1 Night', img: T('ha-long'), price: null },
    { title: 'Nha Trang Sunset Cruise', img: T('sunset-1'), price: null },
  ],
}

// PENDING: danh sách tỉnh/điểm đến chị cung cấp (mục 9 #2) – tạm liệt kê các điểm có tour.
// Mô tả ngắn từng điểm để dựng lịch trình mẫu cho trang chi tiết tour.
const HANOI = { img: T('old-quarter-ta-hien-1'), en: 'Old Quarter walk, Temple of Literature, Hoan Kiem Lake and a street-food evening.', zh: '漫步老城区，参观文庙、还剑湖，晚上品尝街头美食。' }
const HALONG = { img: T('ha-long'), en: 'Cruise among limestone islands, kayaking, caves and a sunset on deck.', zh: '乘游轮穿行石灰岩群岛，划皮艇、游溶洞、甲板上看日落。' }
const SAIGON = { img: T('hcm-tour-1'), en: 'City landmarks, Ben Thanh Market and the Cu Chi Tunnels.', zh: '城市地标、滨城市场与古芝地道。' }
const DANANG = { img: T('da-nang'), en: 'Golden Bridge at Ba Na Hills, Marble Mountains and My Khe Beach.', zh: '巴拿山金桥、五行山与美溪海滩。' }

export const STOP_INFO = {
  Hanoi: HANOI,
  'Ha Long': HALONG,
  'Halong Bay': HALONG,
  'Ninh Binh': { img: T('tam-coc-bich-dong'), en: 'Rowing boat through Trang An, Mua Cave viewpoint and cycling among rice fields.', zh: '乘小船游长安，登舞洞观景台，骑行稻田间。' },
  Sapa: { img: T('du-lich-sa-pa-mua-he'), en: 'Trek to hill-tribe villages, rice terraces and the Fansipan cable car.', zh: '徒步少数民族村寨与梯田，乘番西邦索道。' },
  Hue: { img: T('imperial-citadel'), en: 'Imperial City, royal tombs and a dragon-boat ride on the Perfume River.', zh: '参观皇城、皇陵，乘龙舟游香江。' },
  'Hoi An': { img: T('hoi-an-9-copy'), en: 'Lantern-lit old town, tailor shops and Tra Que herb village.', zh: '灯笼古镇、裁缝店与茶桥香草村。' },
  'Da Nang': DANANG,
  'Ba Na': DANANG,
  Saigon: SAIGON,
  'Ho Chi Minh': SAIGON,
  'Ho Chi Minh City': SAIGON,
  Mekong: { img: T('rach-vem-fishing-village-1'), en: 'Sampan through canals, floating market and fruit orchards.', zh: '乘小舟穿行运河，游水上市场与果园。' },
  'Phu Quoc': { img: T('phu-quoc'), en: 'Island hopping, snorkelling and the Hon Thom cable car.', zh: '跳岛游、浮潜与香岛跨海索道。' },
  'Nha Trang': { img: T('hon-mun-island-1'), en: 'Island boat trip, coral snorkelling and Po Nagar towers.', zh: '乘船游岛、珊瑚浮潜与婆那加占婆塔。' },
  'Da Lat': { img: T('da-lat'), en: 'Pine hills, flower gardens and highland coffee farms.', zh: '松林、花园与高原咖啡园。' },
  'Mui Ne': { img: T('mui-ne-sunset-tour'), en: 'Red and white sand dunes, Fairy Stream and a fishing village.', zh: '红白沙丘、仙女溪与渔村。' },
}
