import { useLang } from './i18n'

// Bảng dịch EN → 中文 cho nội dung dữ liệu (tên tour, địa danh, review, cẩm nang…).
// Khoá là chuỗi tiếng Anh gốc trong data.js; thiếu khoá thì giữ nguyên tiếng Anh.
const ZH = {
  // Địa danh
  Hanoi: '河内', 'Ha Noi': '河内', 'Ha Long': '下龙', 'Ha Long Bay': '下龙湾', 'Halong Bay': '下龙湾', 'Ninh Binh': '宁平', Sapa: '沙坝',
  'Ha Giang': '河江', 'Sapa & Ha Giang': '沙坝与河江', 'Cao Bang': '高平', 'Moc Chau': '木州', Hue: '顺化', 'Hoi An': '会安',
  'Da Nang': '岘港', 'Ba Na': '巴拿山', 'Nha Trang': '芽庄', 'Da Lat': '大叻', 'Nha Trang & Da Lat': '芽庄与大叻', 'My Son': '美山',
  'Lang Co': '郎姑', Saigon: '西贡', 'Ho Chi Minh': '胡志明市', 'Ho Chi Minh City': '胡志明市', Mekong: '湄公河', 'Mekong Delta': '湄公河三角洲',
  'Phu Quoc': '富国岛', 'Phu Quoc Island': '富国岛', 'Mui Ne': '美奈', 'Vung Tau': '头顿', 'Phan Thiet': '藩切',
  'Ba Be Lake': '巴贝湖', 'Mai Chau': '梅州', 'Pu Luong': '布隆', 'Tam Dao': '三岛', 'Cat Ba': '吉婆岛', 'Co To': '姑苏岛', 'Quan Lan': '官澜岛',
  'Duong Lam': '唐林古村', 'Thanh Hoa': '清化', 'Phong Nha': '峰牙', 'Quang Tri (DMZ)': '广治（非军事区）', 'Quy Nhon': '归仁', 'Phu Yen': '富安',
  'Buon Ma Thuot': '邦美蜀', Pleiku: '波来古', 'Kon Tum': '昆嵩', 'Con Dao': '昆岛', 'Tay Ninh': '西宁', 'Ben Tre': '槟椥', 'Can Tho': '芹苴',
  'Chau Doc': '朱笃', 'Ha Tien': '河仙', 'Rach Gia': '迪石', 'Bac Lieu': '薄辽', 'Ca Mau': '金瓯', Vietnam: '越南', 'Ha Noi & Da Nang': '河内与岘港',
  'Hue Imperial City': '顺化皇城', 'Ba Dinh, Hanoi': '河内巴亭', 'My Son Sanctuary': '美山圣地', 'Tran Quoc Pagoda': '镇国寺',
  'Hoa Lu Ancient Capital': '华闾古都', 'Saigon Notre-Dame': '西贡圣母大教堂',

  // Thẻ điểm đến
  'Old Quarter': '老城区', 'Train Street': '火车街', 'West Lake': '西湖', 'Overnight cruise': '游轮过夜', 'Lan Ha Bay': '兰下湾', 'Trang An': '长安',
  'Mua Cave': '舞洞', 'Rice terraces': '梯田', 'Loop road': '环线公路', 'Golden Bridge': '金桥', 'My Khe Beach': '美溪海滩', 'Lantern town': '灯笼古镇',
  'Tra Que': '茶桥村', 'Imperial City': '皇城', 'Royal tombs': '皇陵', Islands: '海岛', Highlands: '高原', 'Cu Chi Tunnels': '古芝地道',
  'Ben Thanh': '滨城市场', '4 islands': '四岛游', Snorkelling: '浮潜', 'Floating market': '水上市场', Orchards: '果园', 'Sand dunes': '沙丘', 'Fairy Stream': '仙女溪',
  'A thousand-year-old capital of lakes, temples and street food.': '拥有千年历史的首都，湖泊、寺庙与街头美食交织。',
  'Limestone islands rising from emerald water – best seen from a cruise.': '石灰岩岛屿矗立于碧绿海面——乘游轮观赏最佳。',
  '“Ha Long Bay on land” – rice fields, rivers and karst peaks.': '“陆上下龙湾”——稻田、河流与喀斯特山峰。',
  'Mountain passes, hill-tribe villages and golden terraces.': '山口、少数民族村寨与金色梯田。',
  'Beaches, Ba Na Hills and the gateway to central heritage.': '海滩、巴拿山，也是通往中部遗产的门户。',
  'A riverside old town glowing with silk lanterns every night.': '每晚被丝绸灯笼点亮的河畔古镇。',
  'The last imperial capital – citadels, pagodas and royal cuisine.': '越南最后的皇都——皇城、寺庙与宫廷美食。',
  'Turquoise bays on the coast, pine hills and flowers inland.': '海岸边碧蓝海湾，内陆松林与花海。',
  'Vietnam’s energetic south – colonial landmarks and night markets.': '充满活力的南方——殖民时期地标与夜市。',
  'White-sand beaches, coral reefs and the longest sea cable car.': '白沙滩、珊瑚礁与世界最长跨海索道。',
  'Sampan rides through canals, fruit gardens and river villages.': '乘小舟穿行运河、果园与水乡村落。',
  'Red and white dunes, fishing villages and kitesurf beaches.': '红白沙丘、渔村与风筝冲浪海滩。',

  // Tour
  'Classic Vietnam: Hanoi to the Mekong – 14 Days 13 Nights': '经典越南：河内至湄公河 14天13晚',
  'Vietnam Grand Journey North to South – 21 Days 20 Nights': '越南南北深度之旅 21天20晚',
  'Ha Long – Ninh Binh – Da Nang – Hoi An 10 Days 9 Nights': '下龙–宁平–岘港–会安 10天9晚',
  'Hanoi – Ha Long – Sapa – Da Nang – Ho Chi Minh': '河内–下龙–沙坝–岘港–胡志明市',
  'Hanoi – Ha Long – Ninh Binh – Da Nang – Phu Quoc': '河内–下龙–宁平–岘港–富国岛',
  'Ha Long – Da Nang – Ba Na – Ho Chi Minh – Mekong 9 Days 8 Nights': '下龙–岘港–巴拿山–胡志明市–湄公河 9天8晚',
  'Da Nang – Phu Quoc Tour 8 Days 7 Nights': '岘港–富国岛 8天7晚',
  'Ha Long – Ninh Binh – Sapa 8 Days 7 Nights from Hanoi': '河内出发 下龙–宁平–沙坝 8天7晚',
  'Nha Trang – Da Lat – Mui Ne – Mekong – Ho Chi Minh': '芽庄–大叻–美奈–湄公河–胡志明市',
  'Two weeks from the capital to the Mekong: cruises, karst valleys, imperial Hue, lantern-lit Hoi An and the delta.': '两周从首都到湄公河：游轮、喀斯特山谷、顺化皇城、灯笼会安与三角洲。',
  'Three weeks to see Vietnam properly: mountains, bays, imperial cities, old towns, highlands, beaches and the Mekong Delta.': '三周深度游越南：高山、海湾、古都、古镇、高原、海滩与湄公河三角洲。',
  'The best of the north and centre in ten days, with a cruise, countryside boat rides, the Ba Na Hills and Hoi An’s old town.': '十天游遍北部与中部精华：游轮、乡村乘船、巴拿山与会安古镇。',
  'Capital, bay and mountains in the north, then Da Nang’s beaches and the energy of Saigon in the south.': '北部的首都、海湾与高山，再到岘港海滩与充满活力的西贡。',
  'A north-to-south classic that ends with island time on Phu Quoc’s white-sand beaches.': '从北到南的经典线路，最后在富国岛白沙滩享受海岛时光。',
  'Ha Long Bay, the Golden Bridge at Ba Na Hills and a day on the canals of the Mekong Delta.': '下龙湾、巴拿山金桥以及湄公河三角洲运河一日游。',
  'Central coast and island escape: Da Nang, Hoi An’s lanterns and the beaches of Phu Quoc.': '中部海岸与海岛之旅：岘港、会安灯笼与富国岛海滩。',
  'Hanoi, the karst landscapes of Ninh Binh, a night on Ha Long Bay and two days in the mountains of Sapa.': '河内、宁平喀斯特风光、下龙湾一晚以及沙坝山区两天。',
  'Islands of Nha Trang, the pine hills of Da Lat, Mui Ne’s dunes and the Mekong Delta.': '芽庄海岛、大叻松林、美奈沙丘与湄公河三角洲。',
  'Overnight cruise on Ha Long Bay': '下龙湾游轮过夜', 'Boat ride through Ninh Binh’s karst valleys': '乘船穿越宁平喀斯特山谷',
  'Hue Imperial City and royal tombs': '顺化皇城与皇陵', 'Lantern evenings in Hoi An': '会安灯笼之夜', 'Mountain villages of Sapa': '沙坝山村',
  'Two nights on Ha Long and Lan Ha bays': '下龙湾与兰下湾两晚', 'Ha Long Bay overnight cruise': '下龙湾游轮过夜', 'Tam Coc boat ride and cycling': '三谷乘船与骑行',
  'Fansipan cable car & rice terraces': '番西邦索道与梯田', 'Golden Bridge at Ba Na Hills': '巴拿山金桥', 'Bai Dinh pagoda & Trang An': '拜亭寺与长安',
  'Four-island boat trip in Phu Quoc': '富国岛四岛乘船游', 'Day cruise on Ha Long Bay': '下龙湾一日游轮', 'Floating markets of the Mekong': '湄公河水上市场',
  'Cham Islands snorkelling': '占婆岛浮潜', 'Sunset at Phu Quoc’s Sunset Town': '富国岛日落小镇看日落', 'Trekking to Cat Cat village': '徒步猫猫村',
  'Trang An boat ride': '长安乘船', 'Island hopping in Nha Trang': '芽庄跳岛游', 'Red sand dunes of Mui Ne': '美奈红沙丘',

  // Review (khách thật trên Tripadvisor)
  'Our Vietlook guides were excellent': '我们的 Vietlook 导游非常出色',
  'Our Vietlook guides Mr. Tinh and Ms. Alana were excellent – friendly, knowledgeable and always on time. A very well organised trip.': 'Vietlook 的导游 Tinh 先生和 Alana 女士非常出色——友好、知识渊博且总是准时。行程安排得非常好。',
  'They took great care of our family': '他们把我们一家照顾得很好',
  'Our guide was very knowledgeable and took great care of our family throughout the tour.': '导游知识丰富，整个行程都把我们一家照顾得很好。',
  'A wonderful local guide in Da Nang': '岘港的一位出色本地导游',
  'Our Vietlook tour guide Alina was wonderful – friendly, helpful and full of stories about Da Nang and Hoi An.': 'Vietlook 导游 Alina 非常棒——友好、热心，讲了许多关于岘港和会安的故事。',
  'Helped us discover local food': '带我们发现本地美食',
  'The guide was so kind and helped us discover the local food. Thank you Vietlook Travel!': '导游非常亲切，带我们品尝了本地美食。谢谢 Vietlook Travel！',
  'Knowledgeable guide, great English': '导游知识渊博，英语很好',
  'Our guide had great knowledge of every place we visited and spoke very good English. Highly recommended.': '导游对我们去过的每个地方都非常了解，英语也很好。强烈推荐。',
  'A memorable trip': '难忘的旅程',
  'Nice, friendly, good, memorable one. Should visit Vietnam once in life.': '美好、友善、难忘的旅程。一生一定要来一次越南。',

  // Cẩm nang + tin tức
  'Must Try Local Specialties In Ninh Binh You Should Not Miss': '宁平必尝的地方特色美食',
  'Best Time To Visit Ninh Binh: A Complete Seasonal Guide': '宁平最佳旅游时间：全季节指南',
  'Travel Guide To Van Long Nature Reserve': '云龙自然保护区旅行指南',
  'Top Tourist Attractions In Ninh Binh, Vietnam': '越南宁平热门景点',
  'Exciting Experiences At Silver Waterfall In Sapa': '沙坝银瀑布精彩体验',
  'Essential Travel Tips For Exploring Northwest Vietnam': '探索越南西北部的实用贴士',
  'Peaceful Moments In The Green Tea Hills Of Moc Chau': '木州茶山的宁静时光',
  'Exploring The Culture And Traditions Of The Hmong People In Vietnam': '探索越南苗族的文化与传统',
  Food: '美食', Seasons: '季节', Guide: '指南', Tips: '贴士', Culture: '文化',
  'The Best Lotus Viewing Spots In Ninh Binh': '宁平最佳赏荷地点',
  'Ninh Binh is not only famous for its limestone landscapes and rivers but also for its stunning lotus ponds that bloom beautifully during the summer.': '宁平不仅以石灰岩风光和河流闻名，夏季盛开的荷花池同样美不胜收。',
  'Sapa Summer Travel Guide: What To Eat, Where To Stay': '沙坝夏季旅行指南：吃什么、住哪里',
  'Sapa in summer offers a refreshing escape with cool weather, lush green rice terraces, and rich cultural experiences.': '夏天的沙坝气候凉爽，梯田翠绿，文化体验丰富，是理想的避暑地。',
  'Important Tips For Traveling To Sapa In Summer': '夏季前往沙坝的重要贴士',
  'Sapa in summer is a refreshing destination with cool weather, lush green rice terraces, and vibrant local culture.': '夏季的沙坝清爽宜人，有翠绿梯田与丰富多彩的本地文化。',
  'What Makes Sapa Beautiful In Summer?': '夏天的沙坝为何如此美丽？',
  'Sapa is often associated with misty winters and blooming spring flowers, but summer reveals a completely different side.': '沙坝常让人想到雾气弥漫的冬季和春日花海，而夏季则展现出完全不同的一面。',

  // Culture & Cruises
  'Half-Day Tour Conical Hat Making, Cooking Class And Cycling': '半日游：斗笠制作、烹饪课与骑行',
  'Ha Noi Cultural Day Trip': '河内文化一日游', 'Hanoi’s Insider Good Morning – Afternoon Tour': '河内本地人视角半日游',
  'Hanoi Bicycle Backstreet Tour 4.5 Hours': '河内小巷骑行 4.5 小时', 'Emperor Cruises Ha Long Bay 2 Days 1 Night': '下龙湾帝王游轮 2天1晚',
  'Ha Long Bay Day Cruise': '下龙湾一日游轮', 'Saigon River Cocktail Cruise': '西贡河鸡尾酒游船', 'Nha Trang Sunset Cruise': '芽庄日落游船',

  // Xe
  Sedan: '轿车', SUV: 'SUV', Limousine: '豪华商务车', Van: '中巴', '29-seat coach': '29座大巴', '45-seat coach': '45座大巴',
}

export function useTr() {
  const { lang } = useLang()
  const tr = (s) => (lang === 'zh' && s && ZH[s]) || s
  // Lộ trình "A – B – C": dịch từng điểm.
  tr.route = (s) => (lang === 'zh' && s ? s.split(' – ').map((x) => ZH[x.trim()] || x).join(' – ') : s)
  return tr
}
