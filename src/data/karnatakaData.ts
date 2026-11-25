export type SectionId =
  | 'chat'
  | 'heritage'
  | 'tourism'
  | 'jnanpith'
  | 'figures'
  | 'language'
  | 'quiz';

export interface HeritageItem {
  id: string;
  title: string;
  kannadaTitle: string;
  category: 'Dynasties & History' | 'Cultural Events';
  eraOrSeason: string;
  region: string;
  summary: string;
  details: string;
  highlights: string[];
  image?: string;
  chatPrompt: string;
}

export interface TourismSpot {
  id: string;
  name: string;
  kannadaName: string;
  district: string;
  category: 'Heritage & UNESCO' | 'Hill Stations & Nature' | 'Coastal & Temples';
  bestSeason: string;
  summary: string;
  highlights: string[];
  unescoOrTag: string;
  image?: string;
  chatPrompt: string;
}

export interface JnanpithLaureate {
  id: string;
  order: string;
  year: number;
  name: string;
  kannadaName: string;
  notableWork: string;
  kannadaWork: string;
  movement: string;
  lifespan: string;
  bio: string;
  quote: string;
  chatPrompt: string;
}

export interface FamousFigure {
  id: string;
  name: string;
  kannadaName: string;
  domain: 'Rulers & Warriors' | 'Poets & Reformers' | 'Science & Statesmanship' | 'Arts & Music';
  era: string;
  origin: string;
  summary: string;
  legacy: string;
  chatPrompt: string;
}

export interface KannadaPhrase {
  id: string;
  category: 'Greetings' | 'Travel' | 'Dining' | 'Essentials';
  kannada: string;
  transliteration: string;
  english: string;
  pronunciation: string;
  usageNote: string;
}

export interface KannadaVowel {
  letter: string;
  transliteration: string;
  soundHint: string;
  exampleKannada: string;
  exampleTranslit: string;
  exampleMeaning: string;
}

export type QuizCategory = 'All' | 'History' | 'Jnanpith' | 'Tourism' | 'Language' | 'Luminaries';

export interface QuizQuestion {
  id: string;
  category: Exclude<QuizCategory, 'All'>;
  question: string;
  kannadaHint?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StarterPrompt {
  id: string;
  topic: string;
  prompt: string;
}

export const HERO_IMAGES = {
  hampi: '/src/assets/images/hero_hampi_chariot_1795581150928.jpg',
  mysuru: '/src/assets/images/tourism_mysuru_palace_1795581152231.jpg',
  coorg: '/src/assets/images/tourism_coorg_mist_1795581153197.jpg',
  yakshagana: '/src/assets/images/culture_yakshagana_art_1795581153941.jpg',
} as const;

export const CHAT_STARTER_PROMPTS: StarterPrompt[] = [
  {
    id: 'sp-1',
    topic: 'Vijayanagara History',
    prompt: 'Tell me about the golden age of Hampi under Emperor Krishnadevaraya.',
  },
  {
    id: 'sp-2',
    topic: 'Jnanpith Literature',
    prompt: 'Why is Kannada home to 8 Jnanpith Award winners? Highlight Kuvempu and Girish Karnad.',
  },
  {
    id: 'sp-3',
    topic: 'Festivals & Arts',
    prompt: 'Explain the royal traditions of Mysuru Dasara and coastal Yakshagana theatre.',
  },
  {
    id: 'sp-4',
    topic: 'Learn Kannada',
    prompt: 'Teach me 5 polite everyday Kannada phrases for visiting Bengaluru and Mysuru.',
  },
  {
    id: 'sp-5',
    topic: 'Karnataka Tourism',
    prompt: 'Suggest a 4-day heritage and nature itinerary covering Belur, Halebidu, and Coorg.',
  },
  {
    id: 'sp-6',
    topic: 'Vachana Movement',
    prompt: 'How did Basavanna and Akkamahadevi shape 12th-century Kannada society through Vachanas?',
  },
];

export const HERITAGE_AND_EVENTS: HeritageItem[] = [
  {
    id: 'kadamba-dynasty',
    title: 'Kadamba Dynasty of Banavasi',
    kannadaTitle: 'ಬನವಾಸಿಯ ಕದಂಬರು',
    category: 'Dynasties & History',
    eraOrSeason: '345 – 540 CE',
    region: 'Banavasi, Uttara Kannada',
    summary: 'The first indigenous Kannada-speaking royal dynasty to administer Karnataka, elevating Kannada to an official court language.',
    details:
      'Founded by Mayurasharma, the Kadambas established their capital at Banavasi on the banks of the Varada river. The Halmidi inscription (c. 450 CE), discovered in Hassan district during their era, stands as the earliest known full-length Kannada stone inscription.',
    highlights: ['Founded by Mayurasharma', 'Halmidi Inscription (c. 450 CE)', 'Madhukeshwara Temple at Banavasi'],
    chatPrompt: 'Tell me more about the Kadamba dynasty of Banavasi and the historic Halmidi inscription.',
  },
  {
    id: 'badami-chalukyas',
    title: 'Badami Chalukyas & Deccan Architecture',
    kannadaTitle: 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು',
    category: 'Dynasties & History',
    eraOrSeason: '543 – 753 CE',
    region: 'Badami, Aihole & Pattadakal',
    summary: 'Pioneers of rock-cut cave temples and the Vesara architectural synthesis that shaped southern Indian temple building for centuries.',
    details:
      'Under Pulakeshin II, the Badami Chalukyas united much of the Deccan and famously halted Emperor Harshavardhana at the Narmada river. Aihole became the cradle of Indian temple architecture, culminating in the UNESCO-listed Virupaksha Temple at Pattadakal.',
    highlights: ['Emperor Pulakeshin II', 'Aihole Cradle of Architecture', 'Badami Sandstone Cave Temples'],
    chatPrompt: 'Describe the reign of Pulakeshin II and the architectural legacy of the Badami Chalukyas.',
  },
  {
    id: 'rashtrakutas',
    title: 'Rashtrakuta Empire & Kavirajamarga',
    kannadaTitle: 'ರಾಷ್ಟ್ರಕೂಟ ಸಾಮ್ರಾಜ್ಯ',
    category: 'Dynasties & History',
    eraOrSeason: '753 – 982 CE',
    region: 'Manyakheta, Kalaburagi',
    summary: 'A continental power from Manyakheta whose court produced Kavirajamarga, the earliest extant treatise on Kannada poetics.',
    details:
      'Emperor Amoghavarsha Nripatunga championed scholarship and peaceful diplomacy. His 9th-century work Kavirajamarga mapped the cultural geography of Kannada-nadu stretching from the Kaveri to the Godavari rivers and celebrated the linguistic refinement of its people.',
    highlights: ['Emperor Amoghavarsha I', 'Kavirajamarga (c. 850 CE)', 'Patronage of Ponna & Pampa'],
    chatPrompt: 'What makes Kavirajamarga and the Rashtrakuta court of Manyakheta pivotal in Kannada literary history?',
  },
  {
    id: 'hoysala-architecture',
    title: 'Hoysala Empire of Dorasamudra',
    kannadaTitle: 'ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯ',
    category: 'Dynasties & History',
    eraOrSeason: '1026 – 1343 CE',
    region: 'Belur, Halebidu & Somanathapura',
    summary: 'Master patrons of soapstone sculpture whose star-shaped temples in Belur, Halebidu, and Somanathapura earned UNESCO World Heritage status.',
    details:
      'From King Vishnuvardhana to Veera Ballala II, the Hoysalas fostered unprecedented artistic precision. Sculptors such as Jakanachari carved lathe-turned pillars and intricate Madanika bracket figures in chloritic schist, while poets Harihara and Raghavanka revitalized Kannada verse.',
    highlights: ['UNESCO Sacred Ensembles (2023)', 'Star-shaped Stellate Plans', 'Chennakeshava & Hoysaleswara Temples'],
    chatPrompt: 'Explain the distinctive sculptural features of Hoysala temples at Belur, Halebidu, and Somanathapura.',
  },
  {
    id: 'vijayanagara-empire',
    title: 'Vijayanagara Empire at Hampi',
    kannadaTitle: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ',
    category: 'Dynasties & History',
    eraOrSeason: '1336 – 1646 CE',
    region: 'Hampi, Vijayanagara District',
    summary: 'One of medieval Asia’s grandest capitals, renowned for flourishing trade, granite monuments, Carnatic music, and multilingual literature.',
    details:
      'Established by Harihara I and Bukka Raya I along the Tungabhadra river, the empire peaked under Sri Krishnadevaraya. Foreign travellers Domingo Paes and Abdur Razzak described Hampi’s bazaars overflowing with spices, gems, and silk alongside monumental shrines like Vittala Temple.',
    highlights: ['Golden Age of Krishnadevaraya', 'Vittala Stone Chariot & Musical Pillars', 'Haridasa Bhakti Flourishing'],
    image: HERO_IMAGES.hampi,
    chatPrompt: 'What was daily life and cultural patronage like in Hampi at the height of the Vijayanagara Empire?',
  },
  {
    id: 'mysore-wodeyars',
    title: 'Kingdom of Mysore & Karnataka Ekikarana',
    kannadaTitle: 'ಮೈಸೂರು ಸಂಸ್ಥಾನ ಮತ್ತು ಏಕೀಕರಣ',
    category: 'Dynasties & History',
    eraOrSeason: '1399 – 1956 CE',
    region: 'Mysuru & Unified Karnataka',
    summary: 'From the progressive Wodeyar monarchs who built KRS Dam and University of Mysore to the 1956 unification of Kannada-speaking lands.',
    details:
      'Under Nalwadi Krishnaraja Wadiyar IV and Diwan Sir M. Visvesvaraya, Mysore became a model state in education, industry, and irrigation. Following decades of civic advocacy by Aluru Venkata Rao and others, Kannada-speaking regions united on 1 November 1956 (later renamed Karnataka in 1973).',
    highlights: ['Nalwadi Krishnaraja Wadiyar IV', 'Ekikarana Movement (1956)', 'Kannada Rajyotsava (November 1)'],
    image: HERO_IMAGES.mysuru,
    chatPrompt: 'How did the Mysore Wodeyars modernize the state, and how did the 1956 Karnataka Ekikarana movement succeed?',
  },
  {
    id: 'mysuru-dasara',
    title: 'Mysuru Dasara (Nada Habba)',
    kannadaTitle: 'ಮೈಸೂರು ದಸರಾ (ನಾಡಹಬ್ಬ)',
    category: 'Cultural Events',
    eraOrSeason: 'September – October (10 Days)',
    region: 'Mysuru',
    summary: 'Karnataka’s royal state festival celebrated for over four centuries with classical music, palace illumination, and the Jambo Savari procession.',
    details:
      'Initiated by the Vijayanagara emperors and continued by the Wodeyars since 1610, Dasara culminates on Vijayadashami when caparisoned elephants carry the 750 kg Golden Howdah bearing Goddess Chamundeshwari from the illuminated Amba Vilas Palace to Bannimantap.',
    highlights: ['97,000+ Palace Illumination Bulbs', 'Golden Howdah Jambo Savari', 'Torchlight Parade at Bannimantap'],
    image: HERO_IMAGES.mysuru,
    chatPrompt: 'Walk me through the history and 10-day celebrations of Mysuru Dasara.',
  },
  {
    id: 'yakshagana',
    title: 'Yakshagana Bayalata',
    kannadaTitle: 'ಯಕ್ಷಗಾನ ಬಯಲಾಟ',
    category: 'Cultural Events',
    eraOrSeason: 'November – May (Dusk to Dawn)',
    region: 'Udupi, Mangaluru & Malnad',
    summary: 'An electrifying traditional theatre form blending ornate headgear, rhythmic chande drumming, improvised Kannada dialogue, and epic dance.',
    details:
      'Performed across coastal Karavali and Malnad regions in two major styles—Tenkutittu (southern) and Badagutittu (northern)—Yakshagana brings episodes from the Mahabharata, Ramayana, and Puranas alive under flickering oil lamps led by the Bhagavatha storyteller.',
    highlights: ['Tenkutittu & Badagutittu Schools', 'Chande & Maddale Percussion', 'Handcrafted Kedage Mundale Crowns'],
    image: HERO_IMAGES.yakshagana,
    chatPrompt: 'Explain the art form of Yakshagana, its costumes, music, and difference between Tenkutittu and Badagutittu.',
  },
  {
    id: 'hampi-utsav',
    title: 'Hampi Utsav (Vijaya Utsav)',
    kannadaTitle: 'ಹಂಪಿ ಉತ್ಸವ',
    category: 'Cultural Events',
    eraOrSeason: 'November – February (3 Days)',
    region: 'Hampi, Vijayanagara',
    summary: 'A grand cultural festival set amidst illuminated boulder landscapes and ancient granite temples celebrating Vijayanagara’s artistic legacy.',
    details:
      'Reviving the grandeur of the historic Vijayanagara court, Hampi Utsav hosts classical dance recitals, Carnatic and Hindustani concerts, Dollu Kunitha folk troupes, puppetry, and craft exhibitions across open-air heritage stages.',
    highlights: ['Open-air Temple Stage Concerts', 'Janapada Kalavahini Folk Procession', 'Illuminated Heritage Ruins'],
    image: HERO_IMAGES.hampi,
    chatPrompt: 'What cultural performances and experiences can visitors enjoy during Hampi Utsav?',
  },
  {
    id: 'kambala',
    title: 'Kambala Festival',
    kannadaTitle: 'ಕಂಬಳ',
    category: 'Cultural Events',
    eraOrSeason: 'November – March',
    region: 'Dakshina Kannada & Udupi',
    summary: 'An age-old coastal agrarian celebration honoring harvest gratitude through traditional buffalo sprints across slushy paddy tracks.',
    details:
      'Rooted in the agricultural calendar of Tulunadu, Kambala marks the completion of the paddy harvest and pays homage to deities for safeguarding crops. Skilled runners guide paired buffaloes across water-filled parallel tracks amid vibrant coastal folk traditions.',
    highlights: ['Tulunadu Agrarian Heritage', 'Four Traditional Categories', 'Community Harvest Gathering'],
    chatPrompt: 'Tell me about the history, agrarian roots, and traditions of Kambala in coastal Karnataka.',
  },
  {
    id: 'bengaluru-karaga',
    title: 'Bengaluru Karaga Shaktyotsava',
    kannadaTitle: 'ಬೆಂಗಳೂರು ಕರಗ',
    category: 'Cultural Events',
    eraOrSeason: 'March – April (Chaitra Purnima)',
    region: 'Old Pete, Bengaluru',
    summary: 'Bengaluru’s oldest surviving folk-religious night procession, celebrating Draupadi and cosmic feminine strength across historic Pete lanes.',
    details:
      'Originating from the Dharmaraya Swamy Temple in Tigalarapete, the Karaga carrier balances a towering floral pyramid on his head without touching it while escorted by Veerakumaras through historic neighborhoods—including a revered visit to the Hazrat Tawakkal Mastan Dargah symbolizing communal harmony.',
    highlights: ['Dharmaraya Swamy Temple', 'Towering Jasmine Karaga Crown', 'Centuries-old Interfaith Harmony'],
    chatPrompt: 'What is the story and cultural significance behind the historic Bengaluru Karaga festival?',
  },
  {
    id: 'ugadi-rajyotsava',
    title: 'Ugadi & Kannada Rajyotsava',
    kannadaTitle: 'ಯುಗಾದಿ ಮತ್ತು ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ',
    category: 'Cultural Events',
    eraOrSeason: 'March/April & November 1',
    region: 'Statewide across Karnataka',
    summary: 'Two defining pillars of Karnataka’s calendar: Ugadi welcoming the lunar new year with Bevu-Bella, and Rajyotsava honoring statehood.',
    details:
      'During Ugadi, families share Bevu-Bella—bitter neem blossoms and sweet jaggery—reflecting life’s balanced joys and trials alongside festive Obbattu (Holige). On November 1, Kannada Rajyotsava illuminates towns in yellow and crimson flags, honoring achievers with the prestigious Rajyotsava Prashasti.',
    highlights: ['Bevu-Bella Philosophy of Life', 'Yellow & Crimson State Colors', 'Annual Rajyotsava Awards'],
    chatPrompt: 'Explain the symbolism of Bevu-Bella during Ugadi and how Karnataka celebrates Kannada Rajyotsava.',
  },
];

export const TOURISM_SPOTS: TourismSpot[] = [
  {
    id: 'hampi',
    name: 'Hampi',
    kannadaName: 'ಹಂಪಿ',
    district: 'Vijayanagara',
    category: 'Heritage & UNESCO',
    bestSeason: 'October – February',
    unescoOrTag: 'UNESCO World Heritage Site',
    summary: 'Surreal granite boulder valleys cradling the monumental ruins of the 14th-century Vijayanagara capital along the Tungabhadra river.',
    highlights: ['Vittala Temple Stone Chariot', 'Virupaksha Temple & Bazaar', 'Matanga Hill Sunrise', 'Lotus Mahal & Elephant Stables'],
    image: HERO_IMAGES.hampi,
    chatPrompt: 'Create a detailed 2-day sightseeing itinerary for Hampi with historical highlights and sunrise spots.',
  },
  {
    id: 'mysuru-palace',
    name: 'Mysuru & Amba Vilas Palace',
    kannadaName: 'ಮೈಸೂರು ಅರಮನೆ',
    district: 'Mysuru',
    category: 'Heritage & UNESCO',
    bestSeason: 'September – March',
    unescoOrTag: 'Cultural Capital of Karnataka',
    summary: 'The regal city of palaces, sandalwood crafts, fragrant Mysore Mallige jasmine, silk weaving, and the hilltop Chamundi shrine.',
    highlights: ['Mysuru Palace Illumination', 'Chamundi Hills & Nandi Statue', 'Devaraja Heritage Market', 'St. Philomena’s & Jaganmohan Gallery'],
    image: HERO_IMAGES.mysuru,
    chatPrompt: 'What are the must-visit landmarks, traditional foods, and crafts to explore in Mysuru?',
  },
  {
    id: 'coorg-kodagu',
    name: 'Kodagu (Coorg)',
    kannadaName: 'ಕೊಡಗು',
    district: 'Kodagu',
    category: 'Hill Stations & Nature',
    bestSeason: 'October – May',
    unescoOrTag: 'Western Ghats Coffee Highlands',
    summary: 'Mist-draped hills, shade-grown Arabica coffee estates, roaring waterfalls, and Talakaveri—the sacred origin of the River Kaveri.',
    highlights: ['Talakaveri & Bhagamandala', 'Abbey Falls & Raja’s Seat', 'Namdroling Golden Temple', 'Kodava Heritage & Coffee Estates'],
    image: HERO_IMAGES.coorg,
    chatPrompt: 'Plan a nature and culture weekend in Kodagu (Coorg), including Talakaveri and local Kodava cuisine.',
  },
  {
    id: 'belur-halebidu',
    name: 'Belur & Halebidu',
    kannadaName: 'ಬೇಲೂರು ಮತ್ತು ಹಳೇಬೀಡು',
    district: 'Hassan',
    category: 'Heritage & UNESCO',
    bestSeason: 'October – March',
    unescoOrTag: 'UNESCO Sacred Ensembles of the Hoysalas',
    summary: 'Twin jewels of 12th-century Hoysala soapstone craftsmanship featuring lace-like friezes, celestial dancers, and mirrored lathe pillars.',
    highlights: ['Chennakeshava Temple, Belur', 'Hoysaleswara Temple, Halebidu', 'Shravanabelagola Bahubali nearby', '42 Carved Madanika Sculptures'],
    chatPrompt: 'How should I visit Belur, Halebidu, and Shravanabelagola in a single heritage circuit from Bengaluru?',
  },
  {
    id: 'badami-pattadakal',
    name: 'Badami, Aihole & Pattadakal',
    kannadaName: 'ಬಾದಾಮಿ, ಐಹೊಳೆ ಮತ್ತು ಪಟ್ಟದಕಲ್ಲು',
    district: 'Bagalkot',
    category: 'Heritage & UNESCO',
    bestSeason: 'October – February',
    unescoOrTag: 'UNESCO Chalukyan Temple Triad',
    summary: 'Red sandstone cliffs overlooking emerald Agastya Lake, housing 6th-century cave temples and India’s earliest stone architectural laboratories.',
    highlights: ['Four Badami Rock-Cut Caves', 'Pattadakal Virupaksha Temple', 'Aihole Durga Temple', 'Bhutanatha Temple at Sunset'],
    chatPrompt: 'Tell me how to explore the Badami, Aihole, and Pattadakal heritage triangle in North Karnataka.',
  },
  {
    id: 'gokarna-karavali',
    name: 'Gokarna & Karavali Coast',
    kannadaName: 'ಗೋಕರ್ಣ ಮತ್ತು ಕರಾವಳಿ',
    district: 'Uttara Kannada & Udupi',
    category: 'Coastal & Temples',
    bestSeason: 'October – March',
    unescoOrTag: 'Arabian Sea Temple Coast',
    summary: 'Crescent-shaped headland beaches, the ancient Mahabaleshwara shrine, Udupi’s Krishna Matha, and mangrove-lined coastal backwaters.',
    highlights: ['Om & Kudle Headland Trail', 'Mahabaleshwara Temple', 'Murudeshwara & St. Mary’s Island', 'Udupi Temple Cuisine'],
    image: HERO_IMAGES.yakshagana,
    chatPrompt: 'Recommend a coastal Karnataka road trip covering Gokarna, Murudeshwara, and Udupi.',
  },
  {
    id: 'chikmagalur',
    name: 'Chikmagalur & Mullayanagiri',
    kannadaName: 'ಚಿಕ್ಕಮಗಳೂರು',
    district: 'Chikkamagaluru',
    category: 'Hill Stations & Nature',
    bestSeason: 'September – March',
    unescoOrTag: 'Birthplace of Indian Coffee',
    summary: 'Home to Karnataka’s highest peak Mullayanagiri, Baba Budangiri ridges, emerald shola forests, and historic Malnad coffee estates.',
    highlights: ['Mullayanagiri Peak (1,930 m)', 'Baba Budangiri & Hebbe Falls', 'Bhadra Wildlife Sanctuary', 'Sringeri Sharada Peetham'],
    chatPrompt: 'What are the best scenic treks, waterfalls, and heritage temples around Chikmagalur?',
  },
  {
    id: 'jog-falls-malnad',
    name: 'Jog Falls & Shivamogga Malnad',
    kannadaName: 'ಜೋಗ ಜಲಪಾತ ಮತ್ತು ಮಲೆನಾಡು',
    district: 'Shivamogga',
    category: 'Hill Stations & Nature',
    bestSeason: 'July – November',
    unescoOrTag: 'Sharavathi Valley Plunge Cascade',
    summary: 'Where the Sharavathi River leaps 253 meters in four dramatic streams—Raja, Rani, Roarer, and Rocket—framed by lush Sahyadri rainforests.',
    highlights: ['Four-Stream Plunge Waterfall', 'Kuppalli (Kuvempu’s Kavishaila)', 'Agumbe Rainforest Sunsets', 'Ikkeri & Keladi Nayaka Heritage'],
    chatPrompt: 'Tell me about visiting Jog Falls, Kuppalli (Kuvempu’s ancestral home), and Agumbe in Shivamogga.',
  },
];

export const JNANPITH_LAUREATES: JnanpithLaureate[] = [
  {
    id: 'kuvempu',
    order: '01',
    year: 1967,
    name: 'Kuvempu (K. V. Puttappa)',
    kannadaName: 'ಕುವೆಂಪು (ಕುಪ್ಪಳ್ಳಿ ವೆಂಕಟಪ್ಪ ಪುಟ್ಟಪ್ಪ)',
    notableWork: 'Sri Ramayana Darshanam',
    kannadaWork: 'ಶ್ರೀ ರಾಮಾಯಣ ದರ್ಶನಂ',
    movement: 'Navodaya & Vishwamanava Philosophy',
    lifespan: '1904 – 1994',
    bio: 'Revered as Rashtrakavi (National Poet), Kuvempu was the first Kannada writer to win the Jnanpith Award. Raised in the misty Malnad village of Kuppalli, he authored Karnataka’s state anthem "Jaya Bharata Jananiya Tanujate" and championed the Universal Human (Vishwamanava) ideal.',
    quote: 'Every child is born a Universal Human; it is society that turns them into an Alpine Human.',
    chatPrompt: 'Tell me about Kuvempu’s life in Kuppalli, Sri Ramayana Darshanam, and his Vishwamanava philosophy.',
  },
  {
    id: 'dr-bendre',
    order: '02',
    year: 1973,
    name: 'D. R. Bendre (Ambikatanayadatta)',
    kannadaName: 'ದ. ರಾ. ಬೇಂದ್ರೆ (ಅಂಬಿಕಾತನಯದತ್ತ)',
    notableWork: 'Naaku Tanti',
    kannadaWork: 'ನಾಕು ತಂತಿ',
    movement: 'Lyrical Navodaya Poetry',
    lifespan: '1896 – 1981',
    bio: 'Celebrated as Varakavi (Poet of Boons) from Dharwad, Bendre fused folk rhythms of North Karnataka with philosophical depth and musicality. His poetry collection Naaku Tanti ("Four Strings") remains a pinnacle of modern Indian lyricism.',
    quote: 'Where the melody of everyday speech meets the stillness of the cosmos, poetry awakens.',
    chatPrompt: 'Explain the poetic brilliance of D. R. Bendre (Ambikatanayadatta) and his masterpiece Naaku Tanti.',
  },
  {
    id: 'shivaram-karanth',
    order: '03',
    year: 1977,
    name: 'K. Shivaram Karanth',
    kannadaName: 'ಡಾ. ಕೋಟ ಶಿವರಾಮ ಕಾರಂತ',
    notableWork: 'Mookajjiya Kanasugalu',
    kannadaWork: 'ಮೂಕಜ್ಜಿಯ ಕನಸುಗಳು',
    movement: 'Social Realism, Polymath & Yakshagana Revival',
    lifespan: '1902 – 1997',
    bio: 'Known as "Kadala Teerada Bhargava" (Sage of the Seashore), Karanth was a novelist, environmentalist, encyclopedist, and modernizer of Yakshagana. His classic Mookajjiya Kanasugalu probes human history, faith, and memory through an intuitive village grandmother.',
    quote: 'True knowledge asks fearless questions about nature, tradition, and the human spirit.',
    chatPrompt: 'Tell me about K. Shivaram Karanth’s Mookajjiya Kanasugalu and his contributions to Yakshagana.',
  },
  {
    id: 'masti',
    order: '04',
    year: 1983,
    name: 'Masti Venkatesha Iyengar',
    kannadaName: 'ಮಾಸ್ತಿ ವೆಂಕಟೇಶ ಅಯ್ಯಂಗಾರ್',
    notableWork: 'Chikkaveera Rajendra',
    kannadaWork: 'ಚಿಕವೀರ ರಾಜೇಂದ್ರ',
    movement: 'Father of the Modern Kannada Short Story',
    lifespan: '1891 – 1986',
    bio: 'Affectionately hailed as "Maasti Kannadada Aasti" (Masti is Kannada’s Treasure), he wrote under the pen name Srinivasa. His historical novel Chikkaveera Rajendra vividly chronicles the twilight of the Kodagu kingdom with understated prose and moral empathy.',
    quote: 'Gentle clarity in storytelling carries deeper truth than loud ornament.',
    chatPrompt: 'Why is Masti Venkatesha Iyengar called "Kannadada Aasti", and what is Chikkaveera Rajendra about?',
  },
  {
    id: 'vk-gokak',
    order: '05',
    year: 1990,
    name: 'V. K. Gokak',
    kannadaName: 'ವಿ. ಕೃ. ಗೋಕಾಕ',
    notableWork: 'Bharatha Sindhu Rashmi',
    kannadaWork: 'ಭಾರತ ಸಿಂಧು ರಶ್ಮಿ',
    movement: 'Epic Poetry & Modernist Transition',
    lifespan: '1909 – 1992',
    bio: 'An Oxford-educated scholar, educator, and poet from Savanur, Vinayaka Krishna Gokak wrote the monumental 35,000-line Vedic-era epic Bharatha Sindhu Rashmi and chaired the landmark Gokak Committee advocating primacy for Kannada in Karnataka education.',
    quote: 'Language is the living bridge between ancient memory and modern awakening.',
    chatPrompt: 'Tell me about V. K. Gokak’s epic Bharatha Sindhu Rashmi and the historic Gokak Report in Karnataka.',
  },
  {
    id: 'ur-ananthamurthy',
    order: '06',
    year: 1994,
    name: 'U. R. Ananthamurthy',
    kannadaName: 'ಯು. ಆರ್. ಅನಂತಮೂರ್ತಿ',
    notableWork: 'Samskara & Body of Work',
    kannadaWork: 'ಸಂಸ್ಕಾರ ಮತ್ತು ಸಮಗ್ರ ಸಾಹಿತ್ಯ',
    movement: 'Navya (Modernist) Literary Movement',
    lifespan: '1932 – 2014',
    bio: 'A defining intellect of the Navya movement, Ananthamurthy examined orthodoxy, conscience, and modernity in works like Samskara, Bharathipura, and Bhava. A Booker International finalist, he placed Kannada literature at the center of global literary criticism.',
    quote: 'Literature questions every settled certainty so compassion can stay alive.',
    chatPrompt: 'Discuss U. R. Ananthamurthy’s role in the Navya movement and the literary themes of Samskara.',
  },
  {
    id: 'girish-karnad',
    order: '07',
    year: 1998,
    name: 'Girish Karnad',
    kannadaName: 'ಗಿರೀಶ್ ಕಾರ್ನಾಡ್',
    notableWork: 'Yayati, Tughlaq, Hayavadana & Nagamandala',
    kannadaWork: 'ತುಘಲಕ್, ಹಯವದನ ಮತ್ತು ನಾಗಮಂಡಲ',
    movement: 'Contemporary Indian Theatre & Drama',
    lifespan: '1938 – 2019',
    bio: 'A Rhodes Scholar, playwright, actor, and director, Girish Karnad transformed modern Indian drama by weaving Kannada folklore, Yakshagana stagecraft, and history into piercing explorations of identity, power, and desire.',
    quote: 'Myth and history are mirrors through which our present sees its own dilemmas.',
    chatPrompt: 'How did Girish Karnad use Kannada folklore and history in plays like Tughlaq, Hayavadana, and Nagamandala?',
  },
  {
    id: 'chandrashekhara-kambara',
    order: '08',
    year: 2010,
    name: 'Chandrashekhara Kambara',
    kannadaName: 'ಡಾ. ಚಂದ್ರಶೇಖರ ಕಂಬಾರ',
    notableWork: 'Jokumaraswami, Chakori & Complete Works',
    kannadaWork: 'ಜೋಕುಮಾರಸ್ವಾಮಿ ಮತ್ತು ಚಕೋರಿ',
    movement: 'Folk Theatre, Mythic Realism & North Kannada Idiom',
    lifespan: 'Born 1937',
    bio: 'Poet, playwright, folklorist, and founding Vice-Chancellor of Kannada University at Hampi, Kambara infused modern Kannada theatre and fiction with the vibrant oral rhythms and myths of Belagavi’s Bayalata folk traditions.',
    quote: 'In the soil of folk memory grows the most fearless modern imagination.',
    chatPrompt: 'Tell me about Chandrashekhara Kambara’s folk-rooted plays like Jokumaraswami and his work at Kannada University, Hampi.',
  },
];

export const FAMOUS_FIGURES: FamousFigure[] = [
  {
    id: 'basavanna',
    name: 'Basavanna (Basaveshwara)',
    kannadaName: 'ಜಗಜ್ಯೋತಿ ಬಸವಣ್ಣ',
    domain: 'Poets & Reformers',
    era: '1131 – 1167 CE',
    origin: 'Basavana Bagewadi & Kudalasangama',
    summary: '12th-century statesman, philosopher, and pioneer of the Anubhava Mantapa—an egalitarian spiritual parliament that championed Kayaka (dignity of labor) and Dasoha (sharing).',
    legacy: 'His crisp Kannada Vachanas rejected caste and gender hierarchy, making spiritual philosophy accessible in everyday language.',
    chatPrompt: 'Tell me about Basavanna’s Anubhava Mantapa, Kayaka-Dasoha philosophy, and famous Kannada Vachanas.',
  },
  {
    id: 'akkamahadevi',
    name: 'Akkamahadevi',
    kannadaName: 'ಅಕ್ಕಮಹಾದೇವಿ',
    domain: 'Poets & Reformers',
    era: '12th Century CE',
    origin: 'Udutadi, Shivamogga',
    summary: 'Luminous mystic poet of the Vachana movement whose fearless devotion to Channamallikarjuna produced over 400 timeless Kannada Vachanas.',
    legacy: 'Celebrated as an early voice of feminine autonomy and spiritual poetry in South Asian literature.',
    chatPrompt: 'Share the story of Akkamahadevi and translate one of her famous Kannada Vachanas.',
  },
  {
    id: 'krishnadevaraya',
    name: 'Emperor Sri Krishnadevaraya',
    kannadaName: 'ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯ',
    domain: 'Rulers & Warriors',
    era: 'Reigned 1509 – 1529 CE',
    origin: 'Vijayanagara (Hampi)',
    summary: 'The greatest ruler of the Vijayanagara Empire, celebrated as a military strategist, diplomat, builder of grand temples, and patron of literature.',
    legacy: 'Under his rule, Hampi flourished into one of the richest and most cosmopolitan cities of the 16th-century world.',
    chatPrompt: 'What were Emperor Krishnadevaraya’s greatest achievements in administration, architecture, and literature?',
  },
  {
    id: 'kittur-chennamma',
    name: 'Kittur Rani Chennamma',
    kannadaName: 'ಕಿತ್ತೂರು ರಾಣಿ ಚೆನ್ನಮ್ಮ',
    domain: 'Rulers & Warriors',
    era: '1778 – 1829',
    origin: 'Kittur, Belagavi',
    summary: 'One of India’s earliest female monarchs to lead an armed resistance against British East India Company rule in 1824—33 years before 1857.',
    legacy: 'Remembered across Karnataka alongside her commander Sangolli Rayanna as an enduring emblem of courage and sovereignty.',
    chatPrompt: 'Tell me the inspiring history of Kittur Rani Chennamma and Sangolli Rayanna.',
  },
  {
    id: 'onake-obavva',
    name: 'Onake Obavva',
    kannadaName: 'ಒನಕೆ ಓಬವ್ವ',
    domain: 'Rulers & Warriors',
    era: '18th Century',
    origin: 'Chitradurga',
    summary: 'Legendary defender of the Chitradurga hill fort who single-handedly guarded a secret crevice with a wooden pestle (onake) to save the fort from a surprise siege.',
    legacy: 'Honored annually on November 11 as Obavva Jayanti in tribute to fearless civic bravery.',
    chatPrompt: 'Tell me the heroic story of Onake Obavva at Chitradurga Fort.',
  },
  {
    id: 'kempegowda',
    name: 'Nadaprabhu Kempegowda I',
    kannadaName: 'ನಾಡಪ್ರಭು ಕೆಂಪೇಗೌಡ',
    domain: 'Rulers & Warriors',
    era: '1510 – 1569',
    origin: 'Yelahanka & Bengaluru',
    summary: 'Visionary chieftain under the Vijayanagara Empire who founded Bengaluru in 1537 with planned trade petes, interconnected lakes, and four boundary watchtowers.',
    legacy: 'His urban water-harvesting network and artisan markets laid the foundation for modern Bengaluru.',
    chatPrompt: 'How did Nadaprabhu Kempegowda I plan and build historic Bengaluru in 1537?',
  },
  {
    id: 'visvesvaraya',
    name: 'Sir M. Visvesvaraya',
    kannadaName: 'ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ',
    domain: 'Science & Statesmanship',
    era: '1861 – 1962',
    origin: 'Muddenahalli, Chikkaballapur',
    summary: 'Bharat Ratna civil engineer and Diwan of Mysore who designed the Krishna Raja Sagara (KRS) Dam, automatic floodgates, and pioneered planned industrialization.',
    legacy: 'His birthday (September 15) is celebrated across India as Engineer’s Day; he helped establish State Bank of Mysore and Mysore Soap Factory.',
    chatPrompt: 'Highlight Sir M. Visvesvaraya’s engineering breakthroughs and contributions as Diwan of Mysore.',
  },
  {
    id: 'purandara-dasa',
    name: 'Sri Purandara Dasa',
    kannadaName: 'ಶ್ರೀ ಪುರಂದರ ದಾಸರು',
    domain: 'Arts & Music',
    era: '1484 – 1564',
    origin: 'Araga / Hampi, Karnataka',
    summary: 'Revered as the Pitamaha (Grandfather) of Carnatic Music, who systematized music pedagogy with Sarali Varisai and Mayamalavagowla exercises.',
    legacy: 'Composed thousands of devotional Kannada Devaranamas (Kritis) blending profound ethics with melodic clarity.',
    chatPrompt: 'Why is Purandara Dasa known as the Pitamaha of Carnatic music, and what is Dasa Sahitya?',
  },
  {
    id: 'dr-rajkumar',
    name: 'Dr. Rajkumar',
    kannadaName: 'ಡಾ. ರಾಜ್‌ಕುಮಾರ್',
    domain: 'Arts & Music',
    era: '1929 – 2006',
    origin: 'Gajanur & Bengaluru',
    summary: 'Beloved cultural icon, Dadasaheb Phalke laureate, and National Award-winning singer who starred in over 200 Kannada films portraying historical and literary heroes.',
    legacy: 'Unified Kannada speakers through his leadership in the 1982 Gokak linguistic movement and timeless devotion to Kannada language.',
    chatPrompt: 'Explain Dr. Rajkumar’s cultural impact on Kannada cinema, music, and the Gokak linguistic movement.',
  },
  {
    id: 'bhimsen-joshi',
    name: 'Pandit Bhimsen Joshi',
    kannadaName: 'ಪಂಡಿತ್ ಭೀಮಸೇನ್ ಜೋಶಿ',
    domain: 'Arts & Music',
    era: '1922 – 2011',
    origin: 'Gadag, North Karnataka',
    summary: 'Bharat Ratna maestro of the Kirana Gharana in Hindustani classical music, famed for his resonant khayal renditions and Kannada Dasavani bhajans.',
    legacy: 'Bridged classical Hindustani vocal artistry with Karnataka’s rich devotional Santavani tradition.',
    chatPrompt: 'Tell me about Pandit Bhimsen Joshi’s roots in Gadag and his Kannada Dasavani recordings.',
  },
];

export const KANNADA_PHRASES: KannadaPhrase[] = [
  {
    id: 'ph-1',
    category: 'Greetings',
    kannada: 'ನಮಸ್ಕಾರ',
    transliteration: 'Namaskāra',
    english: 'Hello / Respectful greetings',
    pronunciation: 'na-mas-kaa-ra',
    usageNote: 'Universal polite greeting suitable at any time of day.',
  },
  {
    id: 'ph-2',
    category: 'Greetings',
    kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಾ?',
    transliteration: 'Nīvu hēgiddīrā?',
    english: 'How are you? (Respectful)',
    pronunciation: 'nee-vu hay-gid-dee-raa',
    usageNote: 'Use "Nīvu" when speaking politely to elders or new acquaintances.',
  },
  {
    id: 'ph-3',
    category: 'Greetings',
    kannada: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ',
    transliteration: 'Nānu chennāgiddēne',
    english: 'I am doing well',
    pronunciation: 'naa-nu chen-naa-gid-day-nay',
    usageNote: 'Standard warm reply to "Hēgiddīrā?"',
  },
  {
    id: 'ph-4',
    category: 'Greetings',
    kannada: 'ಧನ್ಯವಾದಗಳು',
    transliteration: 'Dhanyavādagaḷu',
    english: 'Thank you very much',
    pronunciation: 'dhan-ya-vaa-da-ga-lu',
    usageNote: 'Formal expression of gratitude; "Thumba thanks" is also common casually.',
  },
  {
    id: 'ph-5',
    category: 'Greetings',
    kannada: 'ನಿಮ್ಮ ಹೆಸರು ಏನು?',
    transliteration: 'Nimma hesaru ēnu?',
    english: 'What is your name?',
    pronunciation: 'nim-ma he-sa-ru ay-nu',
    usageNote: 'Reply with "Nanna hesaru [Name]" (My name is...).',
  },
  {
    id: 'ph-6',
    category: 'Travel',
    kannada: 'ಇಲ್ಲಿಂದ ಎಷ್ಟು ದೂರ?',
    transliteration: 'Illinda eṣṭu dūra?',
    english: 'How far is it from here?',
    pronunciation: 'il-lin-da esh-tu doo-ra',
    usageNote: 'Essential when navigating heritage towns or hill stations.',
  },
  {
    id: 'ph-7',
    category: 'Travel',
    kannada: 'ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ',
    transliteration: 'Dayaviṭṭu sahāya māḍi',
    english: 'Please help me',
    pronunciation: 'da-ya-vit-tu sa-haa-ya maa-di',
    usageNote: '"Dayaviṭṭu" means please and adds warmth to any request.',
  },
  {
    id: 'ph-8',
    category: 'Travel',
    kannada: 'ಮೈಸೂರು ಅರಮನೆಗೆ ದಾರಿ ಯಾವುದು?',
    transliteration: 'Maisūru aramanege dāri yāvudu?',
    english: 'Which way is Mysuru Palace?',
    pronunciation: 'mai-soo-ru a-ra-ma-ne-ge daa-ri yaa-vu-du',
    usageNote: 'Replace the landmark name + "-ge" to ask directions anywhere.',
  },
  {
    id: 'ph-9',
    category: 'Travel',
    kannada: 'ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ',
    transliteration: 'Illi nillisi',
    english: 'Please stop here',
    pronunciation: 'il-li nil-li-si',
    usageNote: 'Polite phrase for auto-rickshaw or taxi rides.',
  },
  {
    id: 'ph-10',
    category: 'Dining',
    kannada: 'ಊಟ ಆಯ್ತಾ?',
    transliteration: 'Ūṭa āytā?',
    english: 'Have you eaten?',
    pronunciation: 'oo-ta aay-taa',
    usageNote: 'A deeply affectionate Karnataka way of checking on someone’s wellbeing.',
  },
  {
    id: 'ph-11',
    category: 'Dining',
    kannada: 'ಕುಡಿಯಲು ನೀರು ಕೊಡಿ',
    transliteration: 'Kuḍiyalu nīru koḍi',
    english: 'Please give me drinking water',
    pronunciation: 'ku-di-ya-lu nee-ru ko-di',
    usageNote: '"Nīru" is water; "Bisi nīru" asks for hot water.',
  },
  {
    id: 'ph-12',
    category: 'Dining',
    kannada: 'ತುಂಬಾ ರುಚಿಯಾಗಿದೆ!',
    transliteration: 'Tumbā ruchiyāgide!',
    english: 'It is very delicious!',
    pronunciation: 'tum-baa ru-chi-yaa-gi-day',
    usageNote: 'A wonderful compliment after trying Bisi Bele Bath or Masala Dosa.',
  },
  {
    id: 'ph-13',
    category: 'Dining',
    kannada: 'ಒಂದು ಫಿಲ್ಟರ್ ಕಾಫಿ ಕೊಡಿ',
    transliteration: 'Ondu filter kāphi koḍi',
    english: 'Please give me one filter coffee',
    pronunciation: 'on-du fil-ter kaa-fi ko-di',
    usageNote: 'Useful at classic darshinis and Malnad cafes.',
  },
  {
    id: 'ph-14',
    category: 'Essentials',
    kannada: 'ನನಗೆ ಸ್ವಲ್ಪ ಕನ್ನಡ ಗೊತ್ತು',
    transliteration: 'Nanage svalpa Kannaḍa gottu',
    english: 'I know a little Kannada',
    pronunciation: 'na-na-gay swal-pa kan-na-da got-tu',
    usageNote: 'Always draws an appreciative smile from local speakers.',
  },
  {
    id: 'ph-15',
    category: 'Essentials',
    kannada: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?',
    transliteration: 'Idara bele eṣṭu?',
    english: 'How much does this cost?',
    pronunciation: 'i-da-ra be-lay esh-tu',
    usageNote: 'Helpful at craft bazaars like Channapatna or Devaraja Market.',
  },
  {
    id: 'ph-16',
    category: 'Essentials',
    kannada: 'ಕ್ಷಮಿಸಿ',
    transliteration: 'Kṣamisi',
    english: 'Excuse me / Sorry',
    pronunciation: 'ksha-mi-si',
    usageNote: 'Polite apology or courteous way to get someone’s attention.',
  },
];

export const KANNADA_VOWELS: KannadaVowel[] = [
  { letter: 'ಅ', transliteration: 'a', soundHint: 'u in cup', exampleKannada: 'ಅಮ್ಮ', exampleTranslit: 'Amma', exampleMeaning: 'Mother' },
  { letter: 'ಆ', transliteration: 'ā', soundHint: 'a in father', exampleKannada: 'ಆನೆ', exampleTranslit: 'Āne', exampleMeaning: 'Elephant' },
  { letter: 'ಇ', transliteration: 'i', soundHint: 'i in sit', exampleKannada: 'ಇಲಿ', exampleTranslit: 'Ili', exampleMeaning: 'Mouse' },
  { letter: 'ಈ', transliteration: 'ī', soundHint: 'ee in see', exampleKannada: 'ಈಜು', exampleTranslit: 'Īju', exampleMeaning: 'Swim' },
  { letter: 'ಉ', transliteration: 'u', soundHint: 'u in put', exampleKannada: 'ಉಡುಪಿ', exampleTranslit: 'Uḍupi', exampleMeaning: 'Udupi city' },
  { letter: 'ಊ', transliteration: 'ū', soundHint: 'oo in moon', exampleKannada: 'ಊಟ', exampleTranslit: 'Ūṭa', exampleMeaning: 'Meal' },
  { letter: 'ಋ', transliteration: 'ṛ', soundHint: 'ri in crisp', exampleKannada: 'ಋಷಿ', exampleTranslit: 'Ṛṣi', exampleMeaning: 'Sage' },
  { letter: 'ಎ', transliteration: 'e', soundHint: 'e in pen', exampleKannada: 'ಎಲೆ', exampleTranslit: 'Ele', exampleMeaning: 'Leaf' },
  { letter: 'ಏ', transliteration: 'ē', soundHint: 'a in gate', exampleKannada: 'ಏಣಿ', exampleTranslit: 'Ēṇi', exampleMeaning: 'Ladder' },
  { letter: 'ಐ', transliteration: 'ai', soundHint: 'ai in aisle', exampleKannada: 'ಐಹೊಳೆ', exampleTranslit: 'Aihoḷe', exampleMeaning: 'Aihole' },
  { letter: 'ಒ', transliteration: 'o', soundHint: 'o in obey', exampleKannada: 'ಒಂದು', exampleTranslit: 'Ondu', exampleMeaning: 'One' },
  { letter: 'ಓ', transliteration: 'ō', soundHint: 'o in note', exampleKannada: 'ಓದು', exampleTranslit: 'Ōdu', exampleMeaning: 'Read' },
  { letter: 'ಔ', transliteration: 'au', soundHint: 'ow in now', exampleKannada: 'ಔಷಧ', exampleTranslit: 'Auṣadha', exampleMeaning: 'Medicine' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    category: 'Jnanpith',
    question: 'Who was the very first Kannada author to receive the prestigious Jnanpith Award in 1967?',
    kannadaHint: 'ಶ್ರೀ ರಾಮಾಯಣ ದರ್ಶನಂ',
    options: ['D. R. Bendre', 'Kuvempu (K. V. Puttappa)', 'Masti Venkatesha Iyengar', 'K. Shivaram Karanth'],
    correctIndex: 1,
    explanation: 'Rashtrakavi Kuvempu won Karnataka’s first Jnanpith Award in 1967 for his epic Sri Ramayana Darshanam.',
  },
  {
    id: 'q-2',
    category: 'History',
    question: 'Which stone inscription from c. 450 CE is recognized as the earliest known full-length Kannada inscription?',
    kannadaHint: 'ಕದಂಬರ ಕಾಲದ ಶಾಸನ',
    options: ['Aihole Inscription', 'Halmidi Inscription', 'Talagunda Pillar', 'Sravanabelagola Edict'],
    correctIndex: 1,
    explanation: 'Discovered in Hassan district during the Kadamba era, the Halmidi inscription (c. 450 CE) is the earliest known full-length inscription in Kannada.',
  },
  {
    id: 'q-3',
    category: 'Tourism',
    question: 'The famous carved Stone Chariot (Kallina Ratha) stands inside which temple complex in Hampi?',
    kannadaHint: 'ಕಲ್ಲಿನ ರಥ',
    options: ['Virupaksha Temple', 'Vittala Temple', 'Hazara Rama Temple', 'Achyutaraya Temple'],
    correctIndex: 1,
    explanation: 'The iconic Vijayanagara Stone Chariot—a shrine dedicated to Garuda—stands in the courtyard of the Vittala Temple in Hampi.',
  },
  {
    id: 'q-4',
    category: 'Jnanpith',
    question: 'How many Kannada literary stalwarts have received the Jnanpith Prashasti to date?',
    options: ['5 laureates', '6 laureates', '8 laureates', '10 laureates'],
    correctIndex: 2,
    explanation: 'Kannada has 8 Jnanpith laureates: Kuvempu, D. R. Bendre, K. Shivaram Karanth, Masti Venkatesha Iyengar, V. K. Gokak, U. R. Ananthamurthy, Girish Karnad, and Chandrashekhara Kambara.',
  },
  {
    id: 'q-5',
    category: 'Luminaries',
    question: 'Who founded the 12th-century egalitarian spiritual assembly known as the Anubhava Mantapa?',
    kannadaHint: 'ಅನುಭವ ಮಂಟಪ',
    options: ['Basavanna', 'Purandara Dasa', 'Madhvacharya', 'Allama Prabhu’s patron Vishnuvardhana'],
    correctIndex: 0,
    explanation: 'Basavanna established the Anubhava Mantapa in Kalyana (Basavakalyan), welcoming poets and thinkers across all backgrounds to compose Vachanas.',
  },
  {
    id: 'q-6',
    category: 'Language',
    question: 'What does the affectionate Kannada greeting "ಊಟ ಆಯ್ತಾ?" (Ūṭa āytā?) mean?',
    kannadaHint: 'ಊಟ ಆಯ್ತಾ?',
    options: ['Where are you going?', 'Have you eaten?', 'How is the weather?', 'What is your name?'],
    correctIndex: 1,
    explanation: '"Ūṭa āytā?" literally asks "Have you eaten?" and is one of the warmest everyday ways Kannadigas express care.',
  },
  {
    id: 'q-7',
    category: 'History',
    question: 'Kavirajamarga, the earliest extant treatise on Kannada grammar and poetics, was composed during which dynasty?',
    kannadaHint: 'ಕವಿರಾಜಮಾರ್ಗ',
    options: ['Hoysalas', 'Rashtrakutas', 'Wodeyars', 'Keladi Nayakas'],
    correctIndex: 1,
    explanation: 'Kavirajamarga (c. 850 CE) was produced in the court of Rashtrakuta Emperor Amoghavarsha Nripatunga at Manyakheta.',
  },
  {
    id: 'q-8',
    category: 'Tourism',
    question: 'Which trio of 12th–13th century Hoysala temples was inscribed as a UNESCO World Heritage Site in 2023?',
    options: [
      'Badami, Aihole & Pattadakal',
      'Belur, Halebidu & Somanathapura',
      'Sringeri, Kollur & Udupi',
      'Hampi, Chitradurga & Bidar',
    ],
    correctIndex: 1,
    explanation: 'The Sacred Ensembles of the Hoysalas—Chennakeshava (Belur), Hoysaleswara (Halebidu), and Keshava (Somanathapura)—joined the UNESCO list in 2023.',
  },
  {
    id: 'q-9',
    category: 'Luminaries',
    question: 'Which legendary Karnataka composer is celebrated as the "Pitamaha" (Grandfather) of Carnatic Music?',
    kannadaHint: 'ಕರ್ನಾಟಕ ಸಂಗೀತ ಪಿತಾಮಹ',
    options: ['Kanakadasa', 'Purandara Dasa', 'Tyagaraja', 'Muthuswami Dikshitar'],
    correctIndex: 1,
    explanation: 'Sri Purandara Dasa systematized Carnatic music pedagogy with foundational lessons and composed thousands of Kannada kirtanas.',
  },
  {
    id: 'q-10',
    category: 'Jnanpith',
    question: 'Which Jnanpith laureate authored the acclaimed plays Tughlaq, Hayavadana, and Nagamandala?',
    options: ['U. R. Ananthamurthy', 'V. K. Gokak', 'Girish Karnad', 'Chandrashekhara Kambara'],
    correctIndex: 2,
    explanation: 'Girish Karnad received the 1998 Jnanpith Award for revolutionizing modern Indian drama through Kannada folklore and history.',
  },
  {
    id: 'q-11',
    category: 'History',
    question: 'On which date is Karnataka’s unification (Ekikarana) celebrated every year as Kannada Rajyotsava?',
    kannadaHint: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ',
    options: ['August 15', 'October 2', 'November 1', 'January 26'],
    correctIndex: 2,
    explanation: 'Kannada-speaking regions united to form Mysore State on November 1, 1956 (renamed Karnataka in 1973), celebrated annually as Kannada Rajyotsava.',
  },
  {
    id: 'q-12',
    category: 'Luminaries',
    question: 'Sir M. Visvesvaraya, whose birthday is celebrated as Engineer’s Day, was the chief architect behind which landmark dam?',
    options: ['Tungabhadra Dam', 'Krishna Raja Sagara (KRS) Dam', 'Almatti Dam', 'Linganamakki Dam'],
    correctIndex: 1,
    explanation: 'Sir M. Visvesvaraya engineered the Krishna Raja Sagara (KRS) Dam across the River Kaveri near Mysuru.',
  },
  {
    id: 'q-13',
    category: 'Language',
    question: 'What does the traditional Ugadi dish "Bevu-Bella" symbolize in Kannada culture?',
    kannadaHint: 'ಬೇವು-ಬೆಲ್ಲ',
    options: [
      'Prosperity and rain',
      'Acceptance of both bitter trials and sweet joys in life',
      'Victory over winter',
      'Harvest of rice and coffee',
    ],
    correctIndex: 1,
    explanation: 'Bevu (bitter neem) and Bella (sweet jaggery) are eaten together on Ugadi to welcome life’s joys and hardships with equanimity.',
  },
  {
    id: 'q-14',
    category: 'Tourism',
    question: 'Talakaveri, the sacred birthplace of the River Kaveri, is located in which misty district of Karnataka?',
    options: ['Chikkamagaluru', 'Kodagu (Coorg)', 'Hassan', 'Uttara Kannada'],
    correctIndex: 1,
    explanation: 'Talakaveri sits on the Brahmagiri hills of Kodagu (Coorg) in the Western Ghats.',
  },
  {
    id: 'q-15',
    category: 'Luminaries',
    question: 'Who founded Bengaluru in 1537 with planned artisan markets (petes) and four historic watchtowers?',
    options: ['Krishnadevaraya', 'Nadaprabhu Kempegowda I', 'Chikkadevaraja Wodeyar', 'Mayurasharma'],
    correctIndex: 1,
    explanation: 'Nadaprabhu Kempegowda I envisioned and laid out Bengaluru in 1537, complete with interconnected tanks and trade quarters.',
  },
  {
    id: 'q-16',
    category: 'Jnanpith',
    question: 'Which Jnanpith-winning novel by K. Shivaram Karanth explores human history through the visions of a village grandmother?',
    kannadaHint: 'ಮೂಕಜ್ಜಿಯ ಕನಸುಗಳು',
    options: ['Samskara', 'Chikkaveera Rajendra', 'Mookajjiya Kanasugalu', 'Chakori'],
    correctIndex: 2,
    explanation: 'K. Shivaram Karanth’s Mookajjiya Kanasugalu ("Mookajji’s Visions") earned him the 1977 Jnanpith Award.',
  },
];
