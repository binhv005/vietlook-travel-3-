import { createContext, useContext, useEffect, useState } from 'react'
import { pagesEn, pagesZh } from './i18n-pages'

const en = {
  topbar: 'Vietnam Tour Operator & DMC since 2009',
  b2b: 'For Travel Agencies',
  nav: { tours: 'Tours', destinations: 'Destinations', car: 'Private Car', visa: 'Visa & Fast-track', partners: 'B2B Partners', guide: 'Travel Guide', about: 'About us' },
  plan: 'Free Trip Planning',
  menu: 'Menu',
  hero: {
    eyebrow: 'Vietnam Tour Operator & DMC · since 2009',
    title1: 'Discover',
    title2: 'all of Vietnam',
    sub: 'Private tours, Ha Long cruises, cars with English & Chinese-speaking drivers and visa fast-track – from the northern mountains to the southern islands, arranged by one local team.',
    cta1: 'Explore tours',
    cta2: 'Become a partner',
    reviews: 'reviews',
    north: 'North', central: 'Centre', south: 'South',
  },
  search: { keyword: 'Keyword', keywordPh: 'Tour name, place…', where: 'Where to?', long: 'How long?', style: 'Travel style', any: 'Any', submit: 'Search tours', week1: 'Up to 1 week', week2: '8–14 days', week3: '15+ days' },
  badge: 'Free trip planning · Vietlook Travel · ',
  services: {
    eyebrow: 'Our services',
    title: 'One partner, every service',
    sub: 'Tours, private cars and visa – arranged together by one local team, anywhere in Vietnam.',
    tours: { t: 'Group & Tailor-made Tours', d: 'Group programmes and private itineraries across North, Central and South Vietnam, from day trips to 3-week journeys.', cta: 'Explore tours' },
    car: { t: 'Private Car Hire with Driver', d: '4 to 45-seat vehicles with English and Chinese-speaking drivers for airport transfers, sightseeing and intercity trips nationwide.', cta: 'See vehicles' },
    visa: { t: 'Visa & Airport Fast-track', d: 'Vietnam e-visa support and fast-track through immigration at Tan Son Nhat, Noi Bai, Da Nang, Cam Ranh and Phu Quoc.', cta: 'Visa services' },
  },
  b2bSec: {
    eyebrow: 'For travel agents & tour operators',
    title: 'Your reliable ground partner in Vietnam',
    body: 'Vietlook Travel works with agencies, OTAs and MICE organisers as a full-service DMC. Send us your groups or FIT clients – we handle hotels, transport, guides and visas with net rates and fast quotations.',
    points: ['Competitive net rates & series pricing', 'Quotes within 24 hours, English & Chinese speaking', 'White-label itineraries and documents', 'Groups, incentives & MICE from 2 to 200+ pax'],
    cta1: 'Become a partner', cta2: 'Group & Tailor-made Tours',
    stat1: 'quote turnaround', stat2: 'pax / group', stat3: 'years in Vietnam', stat4: 'airports with fast-track',
    partners: 'Trusted by travel partners', partnerLogo: 'Partner logo',
  },
  dest: {
    eyebrow: 'Tours across Vietnam',
    title: 'From the mountains to the sea',
    script: 'North, centre and south – one local team.',
    north: 'North Vietnam', central: 'Central Vietnam', south: 'South Vietnam',
    discover: 'Discover now', other: 'Other locations', otherDesc: 'Every province from Cao Bang to Ca Mau – ask us for any destination.', viewAll: 'View all',
  },
  pkg: {
    eyebrow: 'Multi-day journeys',
    title: 'Best of Vietlook packages',
    sub: 'Private journeys from one to three weeks – each can be adjusted for private clients or groups.',
    all: 'All packages', w1: 'Up to 1 week', w2: '8–14 days', w3: '3 weeks +',
    days: 'days', nights: 'nights', private: 'Private tour', from: 'From', pp: '/ per person', save: 'Save',
    script: 'Hand-picked itineraries. Everything taken care of.',
    itinerary: 'View itinerary', book: 'Book now', viewAll: 'View all package tours', empty: 'No package matches this filter yet – ask us for a tailor-made plan.',
  },
  styles: {
    eyebrow: 'Tour styles', title: 'Find your way to travel', sub: 'Eight ways to see Vietnam – pick a style and we tailor the rest.',
    luxury: ['Luxury', '5-star stays, private guides'], signature: ['Hand-picked', 'Our team’s favourite routes'], culture: ['Culture', 'Crafts, heritage & people'], family: ['Family', 'Easy pace, fun for all ages'],
    honeymoon: ['Honeymoon', 'Romantic escapes for two'], classic: ['Classic', 'Vietnam’s must-see icons'], photography: ['Photography', 'Golden hours & epic views'], tailor: ['Tailor-made', 'Designed around you']
  },
  heritage: {
    eyebrow: 'Since 2009 · Made in Vietnam',
    title: 'Rooted in four thousand years of heritage',
    body: 'The Dong Son bronze drum is the oldest symbol of Vietnamese culture. Like its rings, our services reach out from Hanoi to every corner of the country – citadels, pagodas, ancient towns and the people who keep them alive.',
    ring: 'VIETLOOK TRAVEL • SINCE 2009 • NORTH • CENTRE • SOUTH • ',
    cta: 'Start planning',
  },
  why: {
    eyebrow: 'Why Vietlook Travel', title: 'Six reasons travellers & partners choose us',
    items: [
      ['All-in-one service', 'Tours, private cars, visa and fast-track arranged together – one contact, one invoice.'],
      ['Tailor-made to your budget', 'Choose 3–5★ hotels, pace and activities. We quote clearly with no hidden fees.'],
      ['Local experts since 2009', 'Born-and-raised guides and planners who know every province first-hand.'],
      ['Own fleet & drivers', 'Clean, insured vehicles from 4 to 45 seats with experienced, courteous drivers.'],
      ['24/7 on-trip support', 'Reach us anytime on WhatsApp, WeChat, Zalo or hotline – in English and Chinese.'],
      ['Trusted by partners', 'Travel agencies abroad rely on us as their ground handler for FIT and group series.'],
    ],
  },
  car: {
    eyebrow: 'Private car hire', title: 'A vehicle for every group size', sub: 'Airport transfers, city tours and intercity trips across Vietnam with English & Chinese-speaking drivers.',
    seats: 'seats', from: 'From', trip: '/ trip', onRequest: 'Price on request', quote: 'Request a car quote', all: 'See car services',
  },
  visa: {
    eyebrow: 'Visa & airport fast-track', title: 'A smoother arrival in Vietnam',
    sub: 'Our staff meet you at the gate and walk you through priority lanes at 5 international airports.',
    arrival: 'Arrival', departure: 'Departure', extra: 'Add-ons',
    arrivalFast: 'Arrival fast-track (priority lane)', arrivalVip: 'Arrival VIP lane – no queue', visaFast: 'Visa on arrival + fast-track',
    departFast: 'Departure priority lane', departVip: 'Departure VIP lane', porter: 'Porter service',
    from: 'from', pp: 'USD / pax', na: 'Not available',
    stepsTitle: 'How fast-track works',
    steps: ['Land and walk to the immigration area', 'Our staff hold a name board', 'Meet & check your documents', 'Walk through the priority lane', 'Collect luggage – welcome to Vietnam'],
    note1: 'Prices exclude the government visa fee.', note2: 'No-show or not meeting our staff: 100% charge unless cancelled in advance.',
    cta: 'Book fast-track', evisa: 'E-visa guide',
  },
  howto: {
    eyebrow: 'Simple & transparent', title: 'How to book a tour with us?',
    steps: [
      ['Contact us', 'Send your details via form, WhatsApp, WeChat or email.'],
      ['Share your wishes', 'Dates, group size, hotel class, interests and budget.'],
      ['Get a proposed itinerary', 'A free, detailed plan and clear quotation within 24 hours.'],
      ['Confirm & pay', 'Adjust until it’s perfect, then confirm and pay securely online.'],
      ['Travel with peace of mind', 'Our local team supports you 24/7 throughout the trip.'],
    ],
  },
  reviews: { eyebrow: 'Travellers love Vietnam', title: 'Guest experiences', script: 'Real trips. Real smiles.', readMore: 'Read more reviews on', prev: 'Previous review', next: 'Next review' },
  guide: { eyebrow: 'Travel smarter', title: 'Plan with local knowledge', script: 'Tips from people who live here.', all: 'All travel guides', by: 'By Vietlook' },
  form: {
    eyebrow: 'Plan your trip', title: 'Tell us your dream trip – we’ll plan it for free',
    points: ['Free, no-obligation itinerary', 'Reply within 24 hours', 'Local experts since 2009'],
    name: 'Full name', email: 'Email', phone: 'WhatsApp / phone', month: 'Travel month', travellers: 'Travellers', length: 'Trip length', where: 'Where would you like to go?', ideas: 'Your ideas',
    ideasPh: 'e.g. we love food and hiking, want a few beach days…', whereAny: 'Not sure yet / several places', agency: 'I am a travel agency (B2B)',
    submit: 'Get my free itinerary', thanksTitle: 'Thank you!', thanks: 'We have received your request. A travel expert will reply within 24 hours.', again: 'Send another request',
  },
  footer: {
    services: 'Services', explore: 'Explore', company: 'Company', contact: 'Contact',
    links: {
      services: ['Group & Tailor-made Tours', 'Private Car Hire', 'Visa & Fast-track', 'For travel agencies (B2B)', 'Partnership projects'],
      explore: ['North Vietnam', 'Central Vietnam', 'South Vietnam', 'Tour themes', 'Travel guide'],
      company: ['About us', 'Terms of use', 'Privacy policy', 'Payment & refund policy', 'Cancellation & change policy'],
    },
    license: 'International tour operator licence', bizNo: 'Business registration no.', pay: 'We accept', rights: 'All rights reserved.',
  },
}

const zh = {
  topbar: '越南本地地接社 & DMC · 始于2009年',
  b2b: '旅行社合作',
  nav: { tours: '旅游线路', destinations: '目的地', car: '包车服务', visa: '签证与快速通关', partners: 'B2B 合作', guide: '旅行指南', about: '关于我们' },
  plan: '免费定制行程',
  menu: '菜单',
  hero: {
    eyebrow: '越南地接社 & DMC · 始于2009年',
    title1: '探索',
    title2: '整个越南',
    sub: '私人定制游、下龙湾游轮、配英语/中文司机的包车以及签证快速通关——从北部山区到南部海岛，由同一个本地团队为您安排。',
    cta1: '查看线路',
    cta2: '成为合作伙伴',
    reviews: '条评价',
    north: '北部', central: '中部', south: '南部',
  },
  search: { keyword: '关键词', keywordPh: '线路名称、地点…', where: '目的地', long: '天数', style: '旅行风格', any: '不限', submit: '搜索线路', week1: '1周以内', week2: '8–14天', week3: '15天以上' },
  badge: '免费定制行程 · VIETLOOK TRAVEL · ',
  services: {
    eyebrow: '我们的服务',
    title: '一个伙伴，全部服务',
    sub: '线路、包车与签证——由同一个本地团队在越南全境统一安排。',
    tours: { t: '团队游与定制游', d: '覆盖越南北、中、南部的团队行程与私人定制，从一日游到三周深度游。', cta: '查看线路' },
    car: { t: '包车（含司机）', d: '4至45座车辆，配英语/中文司机，提供接送机、观光及全国城际用车。', cta: '查看车型' },
    visa: { t: '签证与机场快速通关', d: '越南电子签证协助，以及新山一、内排、岘港、金兰、富国机场的快速通关服务。', cta: '签证服务' },
  },
  b2bSec: {
    eyebrow: '面向旅行社与旅游运营商',
    title: '您在越南可靠的地接伙伴',
    body: 'Vietlook Travel 作为全方位 DMC，与旅行社、OTA 及会奖机构合作。把您的团队或散客交给我们——酒店、交通、导游、签证一站式处理，提供净价与快速报价。',
    points: ['有竞争力的净价与系列团价格', '24小时内报价，英语与中文沟通', '白标行程与文件', '2至200+人的团队、奖励旅游与会议'],
    cta1: '成为合作伙伴', cta2: '团队游与定制游',
    stat1: '小时内报价', stat2: '人 / 团', stat3: '年本地经验', stat4: '个机场快速通关',
    partners: '合作伙伴的信赖', partnerLogo: '合作伙伴标志',
  },
  dest: {
    eyebrow: '越南全境线路',
    title: '从高山到大海',
    script: '北部、中部、南部——同一个本地团队。',
    north: '越南北部', central: '越南中部', south: '越南南部',
    discover: '立即探索', other: '其他目的地', otherDesc: '从高平到金瓯的每一个省份——任何目的地都可以咨询我们。', viewAll: '查看全部',
  },
  pkg: {
    eyebrow: '多日游线路',
    title: 'Vietlook 精选套餐',
    sub: '一至三周的私人行程——均可为散客或团队调整。',
    all: '全部', w1: '1周以内', w2: '8–14天', w3: '3周以上',
    days: '天', nights: '晚', private: '私人团', from: '起价', pp: '/ 每人', save: '节省',
    script: '精心挑选的行程，一切为您安排妥当。',
    itinerary: '查看行程', book: '立即预订', viewAll: '查看全部套餐', empty: '暂无符合条件的套餐——欢迎咨询定制行程。',
  },
  styles: {
    eyebrow: '旅行风格', title: '选择您的旅行方式', sub: '八种游览越南的方式——选一种风格，其余交给我们。',
    luxury: ['奢华游', '五星住宿，私人导游'], signature: ['精选线路', '团队最爱的路线'], culture: ['文化游', '手工艺、遗产与人文'], family: ['亲子游', '轻松节奏，老少皆宜'],
    honeymoon: ['蜜月游', '两人的浪漫之旅'], classic: ['经典游', '越南必游地标'], photography: ['摄影游', '黄金时刻与壮丽风景'], tailor: ['定制游', '为您量身打造']
  },
  heritage: {
    eyebrow: '始于2009年 · 越南本地',
    title: '扎根于四千年的文化遗产',
    body: '东山铜鼓是越南文化最古老的象征。正如铜鼓的纹环，我们的服务从河内延伸到越南的每一个角落——古城、寺庙、古镇以及守护它们的人们。',
    ring: 'VIETLOOK TRAVEL • 始于2009 • 北部 • 中部 • 南部 • ',
    cta: '开始规划',
  },
  why: {
    eyebrow: '为什么选择 Vietlook', title: '游客与合作伙伴选择我们的六个理由',
    items: [
      ['一站式服务', '线路、包车、签证和快速通关统一安排——一个联系人，一张账单。'],
      ['按预算定制', '3–5星酒店、节奏与活动自由选择，报价清晰无隐藏费用。'],
      ['2009年起的本地专家', '土生土长的导游和规划师，熟悉每一个省份。'],
      ['自有车队与司机', '4至45座干净、有保险的车辆，司机经验丰富、礼貌周到。'],
      ['24/7 行程支持', '随时通过 WhatsApp、微信、Zalo 或热线联系我们——英语与中文服务。'],
      ['合作伙伴信赖', '海外旅行社将我们作为散客与系列团的地接方。'],
    ],
  },
  car: {
    eyebrow: '包车服务', title: '适合各种团队规模的车辆', sub: '越南全境接送机、市内游览与城际出行，配英语/中文司机。',
    seats: '座', from: '起价', trip: '/ 趟', onRequest: '价格请咨询', quote: '获取包车报价', all: '查看包车服务',
  },
  visa: {
    eyebrow: '签证与机场快速通关', title: '更顺畅地抵达越南',
    sub: '工作人员在登机口迎接，带您通过5个国际机场的优先通道。',
    arrival: '入境', departure: '出境', extra: '附加服务',
    arrivalFast: '入境快速通关（优先通道）', arrivalVip: '入境 VIP 通道——免排队', visaFast: '落地签 + 快速通关',
    departFast: '出境优先通道', departVip: '出境 VIP 通道', porter: '行李协助',
    from: '起', pp: '美元 / 人', na: '暂不提供',
    stepsTitle: '快速通关流程',
    steps: ['落地后前往入境区域', '工作人员举牌迎接', '见面并核对资料', '走优先通道入境', '提取行李——欢迎来到越南'],
    note1: '价格不含政府签证费。', note2: '未登机或未与工作人员会合：未提前取消将收取100%费用。',
    cta: '预订快速通关', evisa: '电子签证指南',
  },
  howto: {
    eyebrow: '简单透明', title: '如何预订行程？',
    steps: [
      ['联系我们', '通过表单、WhatsApp、微信或邮件发送信息。'],
      ['分享您的需求', '日期、人数、酒店等级、兴趣与预算。'],
      ['获取建议行程', '24小时内免费提供详细行程与清晰报价。'],
      ['确认并付款', '调整至满意后确认，在线安全支付。'],
      ['安心出游', '本地团队全程24/7为您提供支持。'],
    ],
  },
  reviews: { eyebrow: '游客爱越南', title: '游客评价', script: '真实的旅程，真实的笑容。', readMore: '查看更多评价', prev: '上一条', next: '下一条' },
  guide: { eyebrow: '聪明出行', title: '本地人的旅行建议', script: '来自本地人的建议。', all: '全部旅行指南', by: 'Vietlook 撰写' },
  form: {
    eyebrow: '规划您的旅程', title: '告诉我们您的梦想之旅——我们免费为您规划',
    points: ['免费、无义务的行程方案', '24小时内回复', '2009年起的本地专家'],
    name: '姓名', email: '邮箱', phone: 'WhatsApp / 电话', month: '出行月份', travellers: '人数', length: '行程天数', where: '想去哪里？', ideas: '您的想法',
    ideasPh: '例如：喜欢美食和徒步，想要几天海滩…', whereAny: '还不确定 / 多个地方', agency: '我是旅行社（B2B）',
    submit: '获取免费行程', thanksTitle: '谢谢！', thanks: '我们已收到您的需求，旅行顾问将在24小时内回复。', again: '再次提交',
  },
  footer: {
    about: 'Vietlook Travel 是位于河内的本地地接社与 DMC，为游客和旅行同业提供越南全境的线路、包车、签证与快速通关服务。',
    services: '服务', explore: '探索', company: '公司', contact: '联系方式',
    links: {
      services: ['团队游与定制游', '包车服务', '签证与快速通关', '旅行社合作（B2B）', '合作项目'],
      explore: ['越南北部', '越南中部', '越南南部', '旅行主题', '旅行指南'],
      company: ['关于我们', '使用条款', '隐私政策', '支付与退款政策', '取消与变更政策'],
    },
    license: '国际旅行社经营许可证', bizNo: '企业注册号', pay: '支付方式', rights: '版权所有。',
  },
}

const DICTS = { en: { ...en, ...pagesEn }, zh: { ...zh, ...pagesZh } }
const LangContext = createContext({ lang: 'en', t: en, setLang: () => { } })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('vl-lang') || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    try {
      localStorage.setItem('vl-lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  return <LangContext.Provider value={{ lang, t: DICTS[lang], setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
