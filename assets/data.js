// ---------- Demo data (replace with API data later) ----------
// DUMMY IMAGES (free Unsplash photos) – replace with the temple's own photos before going live
const unsplashImg = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const placeholderImg = (txt, w = 400) => `https://placehold.co/${w}x${w}/5f1712/f6c453?text=${encodeURIComponent(txt)}&font=playfair-display`;
const IMG = {
  logo: 'assets/logo.svg',
  hero: [unsplashImg('1761471658531-51ce97fc5b89'), unsplashImg('1692173248120-59547c3d4653'), unsplashImg('1775308637877-6ffa2f0c45fd')],
  temple: unsplashImg('1646056385288-46b2ce4ca4f8'),
  about: [unsplashImg('1763610651463-4e7b3befbcc8'), unsplashImg('1542810634-71277d95dcbb'), unsplashImg('1767324672758-d3958e80f6ea')],
  service: [unsplashImg('1685419368164-eb624c946062', 800), unsplashImg('1777732341528-782603ab6871', 800), unsplashImg('1772152609673-6be26114f76e', 800), unsplashImg('1635192592106-77a5aacbe1a3', 800), unsplashImg('1784802066180-98da8385542e', 800), unsplashImg('1605292356183-a77d0a9c9d1d', 800)],
  gallery: [unsplashImg('1773470871202-bf17f7608c75', 800), unsplashImg('1627894483216-2138af692e32', 800), unsplashImg('1733805569204-41768c7d8c0f', 800), unsplashImg('1546722228-7baeca4bd0b3', 800), unsplashImg('1712777021832-d6ba7a865093', 800)],
  team: ['Trustee', 'Trustee', 'Trustee', 'Trustee', 'Trustee'].map((t, i) => placeholderImg(t + ' ' + (i + 1))),
  donation: [unsplashImg('1705723116788-d11fa6e3f415', 900), unsplashImg('1767324672758-d3958e80f6ea', 900)],
  yagna: unsplashImg('1630764883473-e8c2056f0589'),
  slider: [unsplashImg('1599978364004-95d0725c5bb9'), unsplashImg('1724433320825-51dd5f9c6bc4'), unsplashImg('1598090216740-eb040d8c3f82')],
  // extra mood images used on the home page
  diyas: unsplashImg('1783255166190-bee5e9e1294d', 1800), marigold: unsplashImg('1761847516314-8119e020be98', 1600), bell: unsplashImg('1680505303171-992ef799db43', 900),
  hands: unsplashImg('1752667842815-1b23f0b179df', 1200), shiva: unsplashImg('1566890910598-c5768889e83e', 1200), ganesha: unsplashImg('1790738259777-9b51a4823b32', 900),
  lamp: unsplashImg('1784815130752-60dec0d7a736', 1200), aarti: unsplashImg('1627894483216-2138af692e32', 1600), gopuramNight: unsplashImg('1733805569204-41768c7d8c0f', 1600)
};
const FALLBACK_IMG = IMG.temple;

const SITE = {
  // Name, address, phone and map from the temple's Google Maps listing
  name: 'Sri Navapasana Raja Murugan Temple (Siddhar Peedam)', name_ta: 'ஸ்ரீ நவபாஷாண ராஜ முருகன் கோயில் (சித்தர் பீடம்)',
  short: 'Sri Navapasana Raja Murugan', short_ta: 'ஸ்ரீ நவபாஷாண ராஜ முருகன்',
  phone: '+91 88255 56580', phoneRaw: '918825556580',
  email: 'info@example.com', // TODO: replace with the temple's real email
  address: 'SRD Royal City Annex, 24-25A, Murugan Kovil Street, North Poonamallee, Malayambakkam, Chennai, Tamil Nadu – 600123',
  mapUrl: 'https://maps.app.goo.gl/RwVYhB1NcP7RzCFEA',
  mapEmbed: 'https://maps.google.com/maps?q=13.0368352,80.0909403&z=16&output=embed',
  youtube: '' // e.g. 'https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID'
};

const TEMPLES = [
  { id: 'poonamallee', name: 'Sri Navapasana Raja Murugan Temple', name_ta: 'ஸ்ரீ நவபாஷாண ராஜ முருகன் கோயில்', city: 'Poonamallee, Chennai', img: IMG.temple, deity: 'Murugan',
    // SAMPLE TEXT – replace with the temple's own history
    history: 'Sri Navapasana Raja Murugan Temple is a Siddhar Peedam on Murugan Kovil Street, North Poonamallee, Chennai. Lord Murugan is worshipped here in the Navapashanam tradition of the Siddhars – a sacred compound of nine minerals. Daily abhishekam, Sashti and Kiruthigai poojas and Annadhanam are performed for devotees.' },
  { id: 'varahi-salem', name: 'Sri Aadhi Varahi Temple', name_ta: 'ஸ்ரீ ஆதி வாராஹி கோயில்', city: 'Salem', img: IMG.slider[0], deity: 'Varahi',
    history: 'A powerful shrine of Goddess Varahi near Vazhapadi, Salem, known for continuous yagnas and Chandi homams performed by experienced Vedic priests.' }
];

const PRIESTS = [
  { name: 'Sivasri Ramanatha Sivachariyar', exp: 22, spec: 'Homam, Chandi Yagna', img: IMG.team[0] },
  { name: 'Sri Venkatesa Gurukkal', exp: 15, spec: 'Kubera Lakshmi Pooja', img: IMG.team[1] },
  { name: 'Sri Bala Subramania Sastrigal', exp: 18, spec: 'Navagraha Shanti', img: IMG.team[2] }
];

const PKG = (f, fo, p, po, s, so) => [
  { id: 'family', name: 'Family', name_ta: 'குடும்பம்', persons: 5, price: f, mrp: fo },
  { id: 'pair', name: 'Pair', name_ta: 'தம்பதி', persons: 2, price: p, mrp: po },
  { id: 'single', name: 'Single', name_ta: 'தனி நபர்', persons: 1, price: s, mrp: so }
];

const POOJAS = [
  { id: 'sashti-abhishekam', name: 'Sashti Navapashana Murugan Abhishekam', name_ta: 'சஷ்டி நவபாஷாண முருகன் அபிஷேகம்', temple: 'poonamallee', deity: 'Murugan', category: 'pooja',
    tagline: 'Panchamirtha abhishekam to Lord Murugan on Sashti – for courage, health and victory over obstacles', date: '2026-11-29', time: '07:00 AM', cutoff: '2026-11-28', sankalpam: 'Name, Nakshatra & Rasi', img: IMG.hero[0], rating: 4.9, reviews: 264, booked: 1870,
    pkgs: PKG(1501, 2200, 751, 1100, 451, 650), priest: 0, live: true,
    benefits: [['Courage & Victory', 'Removes fear and obstacles with the grace of the Vel'], ['Health', 'Relief from long-standing ailments'], ['Child Blessing', 'Sashti vratham for santhana prapti'], ['Family Peace', 'Harmony and protection for the family']],
    about: 'Sashti, the sixth day of the moon, is most sacred to Lord Murugan. Abhishekam with milk, honey, panchamirtham and vibhuti to the Navapashana Murugan is believed to remove obstacles and bless devotees with courage and good health.' },
  { id: 'sahasra-chandi', name: 'Karya Siddhi Sahasra Chandi Maha Yagna', name_ta: 'கார்ய சித்தி சஹஸ்ர சண்டி மகா யாகம்', temple: 'varahi-salem', deity: 'Durga', category: 'pooja',
    tagline: '48 days continuous yagna to remove all doshas and achieve success in all endeavours', date: '2026-12-15', time: '05:30 AM', cutoff: '2026-12-13', sankalpam: 'Vedic Archana', img: IMG.yagna, rating: 4.9, reviews: 312, booked: 2140,
    pkgs: PKG(3000, 5000, 1299, 2000, 799, 1000), priest: 0, live: true,
    benefits: [['Health & Vitality', 'Overcomes chronic illness, relieves stress, promotes longevity'], ['Wealth & Prosperity', 'Invokes Goddess Lakshmi for abundance and debt relief'], ['Career & Business', 'Clears obstacles in jobs, promotions and ventures'], ['Marriage Harmony', 'Resolves delays in matrimony and brings family unity']],
    about: 'Chandi is the fierce form of Adi Parasakthi combining Saraswati, Lakshmi and Parvati. Participating in a Chandi Yagam with sankalpam is believed to free one from doshas, fulfil righteous desires and bring peace, prosperity and success.' },
  { id: 'kubera-lakshmi', name: 'Kubera Lakshmi Pooja', name_ta: 'குபேர லட்சுமி பூஜை', temple: 'poonamallee', deity: 'Kuberar', category: 'pooja',
    tagline: 'For wealth, debt relief and prosperity in business', date: '2026-12-04', time: '06:00 PM', cutoff: '2026-12-03', sankalpam: 'Name & Nakshatra', img: IMG.hero[0], rating: 4.8, reviews: 528, booked: 5320,
    pkgs: PKG(1501, 2500, 801, 1200, 501, 750), priest: 1, live: false,
    benefits: [['Wealth', 'Blessings of Kuberar for steady income'], ['Debt Relief', 'Removes financial burdens'], ['Business Growth', 'New opportunities and customers'], ['Family Peace', 'Harmony at home']],
    about: 'Lord Kubera is the treasurer of the Devas. Worshipping Lord Kubera together with Mahalakshmi on a Friday or Pournami brings lasting wealth and removes debts.' },
  { id: 'pradosham-abhishekam', name: 'Pradosham Shiva Abhishekam', name_ta: 'பிரதோஷ சிவ அபிஷேகம்', temple: 'poonamallee', deity: 'Shiva', category: 'pooja',
    tagline: 'Abhishekam to Lord Shiva and Nandi during the sacred Pradosha kalam', date: '2026-12-02', time: '04:30 PM', cutoff: '2026-12-01', sankalpam: 'Name, Nakshatra & Gothram', img: IMG.hero[2], rating: 4.9, reviews: 401, booked: 3890,
    pkgs: PKG(1100, 1800, 601, 900, 351, 500), priest: 2, live: true,
    benefits: [['Removes Sins', 'Washes away karmic burdens'], ['Mental Peace', 'Calms the mind'], ['Health', 'Relief from ailments'], ['Moksha', 'Spiritual progress']],
    about: 'Pradosham is the twilight period on the 13th thithi, most dear to Lord Shiva. Abhishekam during this time is said to grant the merit of a hundred poojas.' },
  { id: 'navagraha-shanti', name: 'Navagraha Shanti Homam', name_ta: 'நவக்கிரக சாந்தி ஹோமம்', temple: 'varahi-salem', deity: 'Navagraha', category: 'pooja',
    tagline: 'Pacifies all nine planets and removes planetary doshas', date: '2026-12-20', time: '07:00 AM', cutoff: '2026-12-18', sankalpam: 'Name, Nakshatra & Rasi', img: IMG.slider[1], rating: 4.7, reviews: 198, booked: 1210,
    pkgs: PKG(2100, 3200, 1100, 1600, 651, 900), priest: 2, live: false,
    benefits: [['Dosha Nivarthi', 'Removes graha doshas'], ['Career', 'Smooth progress'], ['Health', 'Protection'], ['Education', 'Focus for students']],
    about: 'Navagraha Shanti Homam is performed to propitiate the nine planets and reduce malefic effects shown in one\'s horoscope.' },
  { id: 'annadhanam-archana', name: 'Annadhanam with Archana', name_ta: 'அன்னதானம் மற்றும் அர்ச்சனை', temple: 'poonamallee', deity: 'Kuberar', category: 'virtual',
    tagline: '"Annam Param Brahmam" – feed devotees in your family name', date: '2026-12-07', time: '12:00 PM', cutoff: '2026-12-06', sankalpam: 'Name & Nakshatra', img: IMG.donation[1], rating: 5.0, reviews: 145, booked: 980,
    pkgs: PKG(2501, 3000, 1001, 1500, 501, 700), priest: 1, live: false,
    benefits: [['Punya', 'Highest merit of food offering'], ['Ancestors', 'Pitru blessings'], ['Prosperity', 'Abundance at home'], ['Joy', 'Blessings of many']],
    about: 'Giving food is a virtue; giving it with love is the highest virtue. Your sankalpam is chanted before the meal is served to devotees.' },
  { id: 'aarti-special', name: 'Maha Deepa Aarti', name_ta: 'மகா தீப ஆரத்தி', temple: 'poonamallee', deity: 'Murugan', category: 'aarti',
    tagline: 'Evening Maha Aarti with your sankalpam', date: '2026-12-05', time: '07:00 PM', cutoff: '2026-12-05', sankalpam: 'Name & Nakshatra', img: IMG.gallery[1], rating: 4.8, reviews: 88, booked: 620,
    pkgs: PKG(501, 800, 301, 450, 151, 250), priest: 1, live: true,
    benefits: [['Light', 'Removes darkness from life'], ['Peace', 'Calm household'], ['Protection', 'Wards off negativity'], ['Blessings', 'Daily grace']],
    about: 'The Maha Deepa Aarti is offered with ghee lamps and camphor while your names are recited before the deity.' },
  { id: 'special-darshan', name: 'Special Darshan (VIP)', name_ta: 'சிறப்பு தரிசனம்', temple: 'poonamallee', deity: 'Murugan', category: 'darshan',
    tagline: 'Priority darshan with prasadam for devotees visiting in person', date: '2026-12-01', time: 'Daily slots', cutoff: '2026-12-31', sankalpam: 'Name', img: IMG.gallery[2], rating: 4.6, reviews: 75, booked: 1430,
    pkgs: PKG(1000, 1200, 500, 600, 250, 300), priest: 1, live: false,
    benefits: [['Priority', 'Short queue'], ['Prasadam', 'Special prasadam'], ['Archana', 'Name archana'], ['Peace', 'Unhurried darshan']],
    about: 'Book a time slot and receive a QR ticket. Show the QR at the entrance for priority darshan.' },
  { id: 'kanakadhara-homam', name: 'Kanakadhara Homam', name_ta: 'கனகதாரா ஹோமம்', temple: 'poonamallee', deity: 'Lakshmi', category: 'pooja',
    tagline: 'Recitation of Kanakadhara Stotram with homam for showers of gold', date: '2026-12-11', time: '08:00 AM', cutoff: '2026-12-10', sankalpam: 'Vedic Archana', img: IMG.slider[2], rating: 4.8, reviews: 156, booked: 870,
    pkgs: PKG(2500, 3500, 1300, 1800, 750, 1000), priest: 0, live: true,
    benefits: [['Gold & Wealth', 'Lakshmi kataksham'], ['Debt Free', 'Clears loans'], ['Home', 'Own house blessings'], ['Success', 'Fulfils desires']],
    about: 'Composed by Adi Shankaracharya, the Kanakadhara Stotram brought a shower of golden amlas. The homam invokes the same grace of Mahalakshmi.' }
];

const NAKSHATRAS = ['அசுவினி', 'பரணி', 'கிருத்திகை', 'ரோகிணி', 'மிருகசீரிடம்', 'திருவாதிரை', 'புனர்பூசம்', 'பூசம்', 'ஆயில்யம்', 'மகம்', 'பூரம்', 'உத்திரம்', 'அஸ்தம்', 'சித்திரை', 'சுவாதி', 'விசாகம்', 'அனுஷம்', 'கேட்டை', 'மூலம்', 'பூராடம்', 'உத்திராடம்', 'திருவோணம்', 'அவிட்டம்', 'சதயம்', 'பூரட்டாதி', 'உத்திரட்டாதி', 'ரேவதி'];
const NAKSHATRAS_EN = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
const RASIS = ['மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்', 'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்', 'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'];
const GOTHRAMS = ['சிவ கோத்திரம் (Shiva Gothram)', 'Bharadwaja', 'Kashyapa', 'Vasishta', 'Vishwamitra', 'Gautama', 'Atri', 'Jamadagni', 'Agastya', 'Kaundinya', 'Srivatsa', 'Harita'];

const REMEDIES = { // nakshatra index group -> pooja ids
  0: ['navagraha-shanti', 'kubera-lakshmi'], 1: ['sahasra-chandi', 'pradosham-abhishekam'], 2: ['kanakadhara-homam', 'annadhanam-archana']
};

const SPECIAL_DAYS = [
  { date: '2026-11-27', type: 'Pradosham', ta: 'பிரதோஷம்', pooja: 'pradosham-abhishekam' },
  { date: '2026-11-29', type: 'Sashti', ta: 'சஷ்டி', pooja: 'sashti-abhishekam' },
  { date: '2026-12-01', type: 'Ekadasi', ta: 'ஏகாதசி', pooja: 'kanakadhara-homam' },
  { date: '2026-12-02', type: 'Pradosham', ta: 'பிரதோஷம்', pooja: 'pradosham-abhishekam' },
  { date: '2026-12-04', type: 'Pournami', ta: 'பௌர்ணமி', pooja: 'kubera-lakshmi' },
  { date: '2026-12-05', type: 'Karthigai Deepam', ta: 'கார்த்திகை தீபம்', pooja: 'aarti-special' },
  { date: '2026-12-11', type: 'Kiruthigai', ta: 'கிருத்திகை', pooja: 'kanakadhara-homam' },
  { date: '2026-12-15', type: 'Ekadasi', ta: 'ஏகாதசி', pooja: 'sahasra-chandi' },
  { date: '2026-12-17', type: 'Pradosham', ta: 'பிரதோஷம்', pooja: 'pradosham-abhishekam' },
  { date: '2026-12-19', type: 'Amavasai', ta: 'அமாவாசை', pooja: 'annadhanam-archana' },
  { date: '2026-12-25', type: 'Sashti', ta: 'சஷ்டி', pooja: 'navagraha-shanti' }
];

const SUB_PLANS = [
  { id: 'pradosham', name: 'Pradosham Archana', ta: 'பிரதோஷ அர்ச்சனை', per: 'Twice a month', price: 251, icon: '🔱' },
  { id: 'pournami', name: 'Pournami Archana', ta: 'பௌர்ணமி அர்ச்சனை', per: 'Monthly', price: 151, icon: '🌕' },
  { id: 'sashti', name: 'Sashti Archana', ta: 'சஷ்டி அர்ச்சனை', per: 'Twice a month', price: 201, icon: '🦚' },
  { id: 'amavasai', name: 'Amavasai Tharpanam', ta: 'அமாவாசை தர்ப்பணம்', per: 'Monthly', price: 301, icon: '🌑' },
  { id: 'all', name: 'All Four – Complete', ta: 'நான்கும் சேர்த்து', per: 'Monthly', price: 699, icon: '🪔', best: true }
];

// Siddha products by Viralli Herbals Pharma (same address as the temple) – from the Justdial owner photos.
// PRICES ARE PLACEHOLDERS – Justdial does not list prices. Update price / mrp / stock with the real values.
const JD_IMG = n => `https://content.jdmagicbox.com/v2/comp/chennai/b4/044pxx44.xx44.221203033101.s8b4/catalogue/viralli-herbals-pharma-${n}.jpg?w=800&q=80`;
const BRAND = { name: 'Viralli Herbals Pharma', logo: JD_IMG('malayambakkam-chennai-butter-distributors-glp2gmp1zd'), justdial: 'https://www.justdial.com/Chennai/Viralli-Herbals-Pharma-Srd-Roal-City-Annex-Malayambakkam/044PXX44-XX44-221203033101-S8B4_BZDET' };
const SIDDHA_NOTE = 'Traditional Siddha medicine. Use as directed by a qualified Siddha physician.';
const PRODUCTS = [
  { id: 'kandankathiri-lehyam', name: 'Kandankathiri Lehyam', ta: 'கண்டங்கத்திரி லேகியம்', price: 350, mrp: 400, img: JD_IMG('kumaran-nagar-chennai-butter-distributors-ol7q60gf9g'), cat: 'Lehyam', stock: 30, desc: 'Siddha lehyam prepared with Kandankathiri (Solanum xanthocarpum). ' + SIDDHA_NOTE },
  { id: 'prasava-lehyam', name: 'Prasava Lehyam', ta: 'பிரசவ லேகியம்', price: 350, mrp: 400, img: JD_IMG('malayambakkam-chennai-butter-distributors-bpdkkfwmj8'), cat: 'Lehyam', stock: 30, desc: 'Traditional Siddha lehyam for women after childbirth. ' + SIDDHA_NOTE },
  { id: 'n-pain-cure-oil', name: 'N Pain Cure Oil (Spray)', ta: 'என் பெயின் க்யூர் ஆயில்', price: 250, mrp: 300, img: JD_IMG('kumaran-nagar-chennai-butter-distributors-k0yd5un868'), cat: 'Oil', stock: 40, desc: 'Herbal oil spray – as printed on the pack: relief from joint pain & body ache. For external use only.' },
  { id: 'viralli-ghee', name: 'Viralli Ghee', ta: 'விரல்லி நெய்', price: 300, mrp: 350, img: JD_IMG('kumaran-nagar-chennai-butter-distributors-3qd0xx6b6x'), cat: 'Ghee', stock: 25, desc: 'Pure ghee from Viralli Herbals Pharma.' },
  { id: 'k-cure-capsule', name: 'K Cure Capsule', ta: 'கே க்யூர் கேப்சூல்', price: 300, mrp: 350, img: JD_IMG('kumaran-nagar-chennai-butter-distributors-9r1uugdl6e'), cat: 'Capsules', stock: 40, desc: 'Siddha proprietary capsule. ' + SIDDHA_NOTE },
  { id: 'viralli-liv-capsule', name: 'Viralli Liv Capsule', ta: 'விரல்லி லிவ் கேப்சூல்', price: 300, mrp: 350, img: JD_IMG('malayambakkam-chennai-physiotherapy-centres-88cntuisji'), cat: 'Capsules', stock: 40, desc: 'Siddha herbal capsule for liver care. ' + SIDDHA_NOTE },
  { id: 'kazhacchikkai-capsule', name: 'Kazhacchikkai Capsule', ta: 'கழற்சிக்காய் கேப்சூல்', price: 250, mrp: 300, img: JD_IMG('kumaran-nagar-chennai-butter-distributors-apsfv7jniw'), cat: 'Capsules', stock: 40, desc: 'Capsules made with Kazhacchikkai (Caesalpinia bonduc). ' + SIDDHA_NOTE },
  { id: 'avarampoo-capsule', name: 'Avarampoo Capsule', ta: 'ஆவாரம்பூ கேப்சூல்', price: 250, mrp: 300, img: JD_IMG('kumaran-nagar-chennai-butter-distributors-3jij2i7lxn'), cat: 'Capsules', stock: 40, desc: 'Capsules made with Avarampoo (Tanner\'s cassia flower). ' + SIDDHA_NOTE },
  { id: 'triphala-capsule', name: 'Triphala Capsule', ta: 'திரிபலா கேப்சூல்', price: 250, mrp: 300, img: JD_IMG('kumaran-nagar-chennai-butter-distributors-t2uzwmgfju'), cat: 'Capsules', stock: 40, desc: 'Capsules of Triphala – amla, haritaki and bibhitaki. ' + SIDDHA_NOTE },
  { id: 'triphala-choornam', name: 'Triphala Choornam', ta: 'திரிபலா சூரணம்', price: 120, mrp: 150, img: JD_IMG('kumaran-nagar-chennai-butter-distributors-pcsz776x2h'), cat: 'Choornam', stock: 50, desc: 'Triphala powder in a sealed pouch. ' + SIDDHA_NOTE },
  { id: 'nellikkai-powder', name: 'Nellikkai Powder', ta: 'நெல்லிக்காய் பொடி', price: 120, mrp: 150, img: JD_IMG('malayambakkam-chennai-physiotherapy-centres-t5g4iq6lnw'), cat: 'Choornam', stock: 50, desc: 'Amla (Indian gooseberry) powder in a sealed pouch.' },
  { id: 'navalkottai-powder', name: 'Navalkottai Powder', ta: 'நாவல்கொட்டை பொடி', price: 120, mrp: 150, img: JD_IMG('kumaran-nagar-chennai-butter-distributors-apzl3h1tl2'), cat: 'Choornam', stock: 50, desc: 'Jamun (naval) seed powder in a sealed pouch. ' + SIDDHA_NOTE },
  { id: 'maruthani-powder', name: 'Maruthani Powder', ta: 'மருதாணி பொடி', price: 100, mrp: 120, img: JD_IMG('kumaran-nagar-chennai-butter-distributors-8igh4z88uj'), cat: 'Choornam', stock: 50, desc: 'Henna (maruthani) leaf powder for hair and hands.' }
];

const PRASADAM = [
  { id: 'p-full', name: 'Full Prasadam Kit', price: 499, items: 'Vibhuti, kumkum, raksha, dry fruit prasadam, photo of deity' },
  { id: 'p-mini', name: 'Mini Prasadam', price: 199, items: 'Vibhuti, kumkum, raksha' },
  { id: 'p-laddu', name: 'Laddu Prasadam (4 pcs)', price: 299, items: 'Ghee laddu prepared in temple kitchen' }
];

const DONATIONS = [
  { id: 'annadhanam', name: 'Annadhanam', ta: 'அன்னதானம்', raised: 6000, goal: 200000, img: IMG.donation[1], desc: 'The provider of food is the provider of life. Sponsor meals for devotees.' },
  { id: 'bricks', name: 'Donate Bricks – Temple Construction', ta: 'செங்கல் தானம்', raised: 15000, goal: 300000, img: IMG.donation[0], desc: 'Each brick you donate becomes part of the temple forever.' },
  { id: 'goshala', name: 'Goshala (Cow Care)', ta: 'கோசாலை', raised: 42000, goal: 150000, img: IMG.gallery[3], desc: 'Feed and care for the temple cows.' },
  { id: 'education', name: 'Education for Children', ta: 'கல்வி உதவி', raised: 28000, goal: 100000, img: IMG.about[1], desc: 'Support Swamigal\'s mission of educating poor children.' }
];

const MEMBERSHIP = [
  { id: 'devotee', name: 'Devotee', price: 1001, per: 'year', perks: ['Name archana on your birthday', 'Monthly newsletter', '5% off all poojas'] },
  { id: 'patron', name: 'Patron', price: 5001, per: 'year', perks: ['Everything in Devotee', 'Pournami archana every month', 'Prasadam by post quarterly', '10% off all poojas'], best: true },
  { id: 'trustee', name: 'Honorary Trustee', price: 25001, per: 'lifetime', perks: ['Lifetime archana on family nakshatras', 'Name on donor wall', 'Invitation to Kumbabishekam & festivals', '15% off all poojas'] }
];

const EVENTS = [
  { id: 'brahmotsavam', name: 'Brahmotsavam 2027', date: '2027-01-14', seats: 500, left: 132, price: 0, img: IMG.gallery[0] },
  { id: 'kumbabishekam', name: 'Maha Kumbabishekam', date: '2027-03-21', seats: 1000, left: 640, price: 0, img: IMG.temple },
  { id: 'lakshmi-homam', name: 'Sri Maha Lakshmi Kubera Homam (Seated)', date: '2026-12-25', seats: 108, left: 9, price: 2100, img: IMG.yagna }
];

const LIVE = [
  { title: 'Sahasra Chandi Maha Yagna – Day 12', when: 'LIVE NOW', live: true, img: IMG.yagna },
  { title: 'Pradosham Abhishekam', when: '27 Nov, 4:30 PM', img: IMG.hero[2] },
  { title: 'Karthigai Deepam Maha Aarti', when: '5 Dec, 6:30 PM', img: IMG.gallery[1] }
];

const MANTRAS = [
  { name: 'Shadakshara Mantra (Om Saravanabhava)', text: 'ॐ शरवणभव', ta: 'ஓம் சரவணபவ – முருகப் பெருமானின் ஆறெழுத்து மந்திரம்; பயம் நீக்கி வெற்றி அருளும்.', dur: '2:10' },
  { name: 'Skanda Gayatri', text: 'ॐ तत्पुरुषाय विद्महे महासेनाय धीमहि तन्नः स्कन्दः प्रचोदयात्', ta: 'மகாசேனனான கந்தனை தியானிக்கிறோம்; அவன் நம்மை நல்வழியில் நடத்தட்டும்.', dur: '2:35' },
  { name: 'Kubera Mantra', text: 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा', ta: 'செல்வத்தின் அதிபதியான குபேரனே, எனக்கு செல்வமும் தானியமும் அருள்வாயாக.', dur: '3:12' },
  { name: 'Lakshmi Gayatri', text: 'ॐ महालक्ष्म्यै च विद्महे विष्णुपत्न्यै च धीमहि तन्नो लक्ष्मीः प्रचोदयात्', ta: 'விஷ்ணுவின் துணைவியான மகாலட்சுமியை தியானிக்கிறோம்; அவள் நம்மை வழிநடத்தட்டும்.', dur: '2:40' },
  { name: 'Maha Mrityunjaya Mantra', text: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्', ta: 'மூன்று கண்களுடைய சிவனை வணங்குகிறோம்; மரண பயத்திலிருந்து விடுவித்து அமரத்துவம் அருள்வாயாக.', dur: '4:05' },
  { name: 'Durga Saptashati Dhyanam', text: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते', ta: 'எல்லா மங்களங்களுக்கும் மங்களமானவளே, நாராயணியே உன்னை வணங்குகிறேன்.', dur: '1:58' }
];

const ARTICLES = [
  { id: 'sthala-puranam', title: 'Sthala Puranam of Sri Navapasana Raja Murugan Temple', ta: 'ஸ்ரீ நவபாஷாண ராஜ முருகன் கோயில் தல புராணம்', img: IMG.temple, date: '2026-11-10', read: 6, excerpt: 'The Navapashana Murugan and the Siddhar tradition behind the peedam at North Poonamallee, Chennai.' },
  { id: 'why-pradosham', title: 'Why Pradosham is the Most Powerful Time for Shiva Worship', ta: 'பிரதோஷத்தின் மகிமை', img: IMG.hero[2], date: '2026-11-02', read: 4, excerpt: 'The story of the churning of the ocean, Nandi, and why devotees gather at twilight on the 13th thithi.' },
  { id: 'annadhanam', title: 'Annam Param Brahmam – The Merit of Annadhanam', ta: 'அன்னம் பரம்பிரம்மம்', img: IMG.donation[1], date: '2026-10-21', read: 5, excerpt: 'Why the scriptures call food the Supreme Brahman and how annadhanam is practised at the peedam every day.' },
  { id: 'kubera-worship', title: 'How to Worship Lord Kubera at Home', ta: 'வீட்டில் குபேர வழிபாடு', img: IMG.hero[0], date: '2026-10-05', read: 7, excerpt: 'Direction, day, lamp and mantra – a simple guide to Kubera pooja on Fridays and Pournami.' }
];

const REVIEWS = [
  { name: 'Lakshmi R.', city: 'Chennai', rating: 5, pooja: 'Kubera Lakshmi Pooja', text: 'Received the video on WhatsApp the same evening and could hear our names clearly in the sankalpam. Prasadam arrived in 3 days.' },
  { name: 'Karthik S.', city: 'Singapore', rating: 5, pooja: 'Sahasra Chandi Maha Yagna', text: 'Paid in SGD without any issue. Watched the yagna live with my parents. Very genuine service.' },
  { name: 'Meena V.', city: 'Coimbatore', rating: 5, pooja: 'Pradosham Shiva Abhishekam', text: 'Subscribed for monthly Pradosham archana for my family. Reminders come a day before. Om Namah Shivaya.' },
  { name: 'Arun P.', city: 'Dubai', rating: 4, pooja: 'Navagraha Shanti Homam', text: 'Booking was simple, did not even need an account. Gothram default option helped as we did not know ours.' },
  { name: 'Revathi K.', city: 'Bengaluru', rating: 5, pooja: 'Annadhanam with Archana', text: 'Sponsored annadhanam for my daughter\'s birthday and got photos of the seva. Truly blessed.' }
];

const FAQS = [
  ['Do I need an account to book a pooja?', 'No. Guest checkout only needs your name, mobile number and an OTP. You can create an account later to save family profiles.'],
  ['How will I know the pooja was performed?', 'A video and photos of the pooja with your sankalpam are sent on WhatsApp. You can also track every stage on the Track Booking page.'],
  ['I don\'t know my gothram. What should I select?', 'Select "Shiva Gothram" – it is the traditional default for devotees who do not know their gothram.'],
  ['Can I pay from outside India?', 'Yes. We accept USD, SGD, MYR and AED through Razorpay International / Stripe, in addition to UPI, cards and netbanking.'],
  ['When will prasadam reach me?', 'Prasadam is dispatched within 2 days after the pooja. You will get a courier tracking number on WhatsApp and SMS.'],
  ['Can I cancel a booking?', 'Bookings can be cancelled before the booking cutoff date for a full refund. Please see the Refund & Cancellation Policy.'],
  ['Is this an authorised temple website?', 'Yes. The temple authorization letter is displayed on every temple page. Payments go directly to the trust account.']
];

const LANG = {
  en: { home: 'Home', poojas: 'E-Poojas', services: 'Services', temples: 'Temples', live: 'Live Darshan', shop: 'Divine Collections', donate: 'Donate', membership: 'Membership', panchangam: 'Panchangam', about: 'About Us', contact: 'Contact', track: 'Track Pooja', book: 'Book a Pooja', login: 'Login', account: 'My Account',
    tagline: 'Authentic Vedic poojas performed in your name & gothram', heroTitle: "Receive Lord Murugan's blessings, wherever you are", heroSub: 'Book poojas, homams and archanas at the peedam. Watch them live and receive video proof and prasadam at your doorstep.',
    featured: 'Upcoming Poojas', viewAll: 'View all', bookNow: 'Book Now', specialDays: 'Upcoming Special Days', todayPanchang: "Today's Panchangam", why: 'Why devotees trust us', reviews: 'Devotee Reviews', newsletter: 'Subscribe to our newsletter', subscribe: 'Subscribe' },
  ta: { home: 'முகப்பு', poojas: 'இ-பூஜைகள்', services: 'சேவைகள்', temples: 'கோயில்கள்', live: 'நேரலை தரிசனம்', shop: 'தெய்வீக பொருட்கள்', donate: 'நன்கொடை', membership: 'உறுப்பினர்', panchangam: 'பஞ்சாங்கம்', about: 'எங்களைப் பற்றி', contact: 'தொடர்பு', track: 'பூஜை நிலை', book: 'பூஜை பதிவு', login: 'உள்நுழை', account: 'என் கணக்கு',
    tagline: 'உங்கள் பெயர் மற்றும் கோத்திரத்தில் வேத பூஜைகள்', heroTitle: 'எங்கிருந்தாலும் முருகனின் அருளைப் பெறுங்கள்', heroSub: 'பீடத்தில் பூஜை, ஹோமம், அர்ச்சனைகளை பதிவு செய்யுங்கள். நேரலையில் காணுங்கள், வீடியோ சான்று மற்றும் பிரசாதம் வீடு தேடி வரும்.',
    featured: 'வரவிருக்கும் பூஜைகள்', viewAll: 'அனைத்தும்', bookNow: 'பதிவு செய்', specialDays: 'வரவிருக்கும் விசேஷ நாட்கள்', todayPanchang: 'இன்றைய பஞ்சாங்கம்', why: 'பக்தர்கள் நம்புவதற்கான காரணம்', reviews: 'பக்தர்களின் கருத்துகள்', newsletter: 'செய்தி மடலுக்கு பதிவு செய்யுங்கள்', subscribe: 'பதிவு' }
};

const DEMO_BOOKING = { id: 'RKDEMO', pooja: 'kubera-lakshmi', name: 'Kubera Lakshmi Pooja', temple: 'Sri Navapasana Raja Murugan Temple', date: '2026-11-21', time: '06:00 PM', pkg: 'Family',
  members: [{ name: 'Ramesh Kumar', nak: 'ரோகிணி', rasi: 'ரிஷபம்', goth: 'சிவ கோத்திரம் (Shiva Gothram)' }, { name: 'Lakshmi Ramesh', nak: 'அஸ்தம்', rasi: 'கன்னி', goth: 'சிவ கோத்திரம் (Shiva Gothram)' }],
  contact: 'Ramesh Kumar', mobile: '9876543210', email: '', amount: 1600, currency: 'INR', method: 'upi', prasadam: true, created: '2026-11-18T10:00:00Z', status: 4, courier: { name: 'DTDC', no: 'D74839201IN' } };
