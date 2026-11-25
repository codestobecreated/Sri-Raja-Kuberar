// ---------- Shared helpers, layout, i18n, cart, storage ----------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const qs = k => new URLSearchParams(location.search).get(k);
const rupee = n => '₹' + Number(n).toLocaleString('en-IN');
const fmtDate = (d, o = { day: 'numeric', month: 'short', year: 'numeric' }) => new Date(d + (String(d).length === 10 ? 'T00:00:00' : '')).toLocaleDateString('en-IN', o);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const imgTag = (src, cls = '', alt = '') => `<img src="${src}" alt="${esc(alt)}" loading="lazy" class="${cls}" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">`;

// Safe localStorage
const store = {
  get(k, d) { try { const v = localStorage.getItem('rk_' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('rk_' + k, JSON.stringify(v)); } catch { } }
};

// ---------- Language ----------
let lang = store.get('lang', 'en');
const t = k => (LANG[lang] && LANG[lang][k]) || LANG.en[k] || k;
const L = (o, en = 'name', ta = 'name_ta') => (lang === 'ta' && o[ta]) ? o[ta] : o[en];
function setLang(l) { store.set('lang', l); location.reload(); }

// ---------- Session / user ----------
const user = () => store.get('user', null);
function requireLogin() { if (!user()) location.href = 'login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search); }

// ---------- Cart & wishlist ----------
const cart = {
  all: () => store.get('cart', []),
  add(id, qty = 1, type = 'product') { const c = cart.all(); const f = c.find(i => i.id === id); f ? f.qty += qty : c.push({ id, qty, type }); store.set('cart', c); renderBadges(); toast('Added to cart 🛒'); },
  set(id, qty) { let c = cart.all().map(i => i.id === id ? { ...i, qty } : i).filter(i => i.qty > 0); store.set('cart', c); renderBadges(); },
  clear() { store.set('cart', []); renderBadges(); },
  count: () => cart.all().reduce((a, i) => a + i.qty, 0)
};
const wish = {
  all: () => store.get('wish', []),
  has: id => wish.all().includes(id),
  toggle(id) { let w = wish.all(); w = w.includes(id) ? w.filter(x => x !== id) : [...w, id]; store.set('wish', w); renderBadges(); toast(w.includes(id) ? 'Saved to wishlist ❤️ – we will remind you before the cutoff' : 'Removed from wishlist'); return w.includes(id); }
};

// ---------- Toast & modal ----------
function toast(msg, ms = 2800) {
  let w = $('#toast-wrap');
  if (!w) { w = document.createElement('div'); w.id = 'toast-wrap'; w.className = 'fixed top-20 right-4 z-[90] space-y-2'; document.body.appendChild(w); }
  const el = document.createElement('div');
  el.className = 'fade-up bg-temple-800 text-white text-sm px-4 py-3 rounded-xl shadow-soft max-w-xs';
  el.innerHTML = msg; w.appendChild(el); setTimeout(() => el.remove(), ms);
}
function modal(html, opts = {}) {
  const m = document.createElement('div');
  m.className = 'fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4';
  m.innerHTML = `<div class="bg-white rounded-2xl max-w-${opts.size || 'lg'} w-full max-h-[90vh] overflow-auto fade-up relative">
    <button class="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200" data-close aria-label="Close">✕</button>${html}</div>`;
  m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) m.remove(); });
  document.body.appendChild(m); return m;
}

// ---------- OTP (demo) ----------
function sendOtp(mobile) {
  if (!/^\+?\d{10,13}$/.test(String(mobile).replace(/\s/g, ''))) { toast('Enter a valid mobile number'); return false; }
  store.set('otp', '1234'); toast('OTP sent to ' + esc(mobile) + '<br><b>Demo OTP: 1234</b>', 5000); return true;
}
const verifyOtp = c => String(c).trim() === store.get('otp', '1234');

// ---------- Panchangam (approximate astronomical calc for demo) ----------
const THITHIS = ['Prathamai', 'Dwitiyai', 'Tritiyai', 'Chaturthi', 'Panchami', 'Sashti', 'Saptami', 'Ashtami', 'Navami', 'Dasami', 'Ekadasi', 'Dwadasi', 'Thrayodasi', 'Chaturdasi'];
const THITHIS_TA = ['பிரதமை', 'துவிதியை', 'திருதியை', 'சதுர்த்தி', 'பஞ்சமி', 'சஷ்டி', 'சப்தமி', 'அஷ்டமி', 'நவமி', 'தசமி', 'ஏகாதசி', 'துவாதசி', 'திரயோதசி', 'சதுர்த்தசி'];
const RAHU = ['4:30 – 6:00 PM', '7:30 – 9:00 AM', '3:00 – 4:30 PM', '12:00 – 1:30 PM', '1:30 – 3:00 PM', '10:30 AM – 12:00 PM', '9:00 – 10:30 AM'];
const YAMA = ['12:00 – 1:30 PM', '10:30 AM – 12:00 PM', '9:00 – 10:30 AM', '7:30 – 9:00 AM', '6:00 – 7:30 AM', '3:00 – 4:30 PM', '1:30 – 3:00 PM'];
const GULI = ['3:00 – 4:30 PM', '1:30 – 3:00 PM', '12:00 – 1:30 PM', '10:30 AM – 12:00 PM', '9:00 – 10:30 AM', '7:30 – 9:00 AM', '6:00 – 7:30 AM'];
const NALLA = ['7:30 – 8:30 AM', '6:30 – 7:30 AM', '7:30 – 8:30 AM', '9:30 – 10:30 AM', '10:30 – 11:30 AM', '9:30 – 10:30 AM', '7:30 – 8:30 AM'];
const DAYS_TA = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
function panchang(date = new Date()) {
  const d = new Date(date); d.setHours(6, 0, 0, 0);
  const days = (d - Date.UTC(2000, 0, 6, 18, 14)) / 864e5;
  const age = ((days % 29.530588) + 29.530588) % 29.530588;
  const ti = Math.floor(age / (29.530588 / 30));
  const paksha = ti < 15 ? 'Shukla' : 'Krishna';
  let thithi, thithi_ta;
  if (ti === 14) { thithi = 'Pournami'; thithi_ta = 'பௌர்ணமி'; } else if (ti === 29) { thithi = 'Amavasai'; thithi_ta = 'அமாவாசை'; }
  else { thithi = THITHIS[ti % 15]; thithi_ta = THITHIS_TA[ti % 15]; }
  const moonLong = ((218.316 + 13.176396 * (days + 4.24)) - (23.85 + 0.0000014 * days * 365)) % 360; // sidereal approx
  const nk = Math.floor((((moonLong % 360) + 360) % 360) / (360 / 27));
  const w = d.getDay();
  return { thithi, thithi_ta, paksha, nakshatra: NAKSHATRAS_EN[nk], nakshatra_ta: NAKSHATRAS[nk], nkIndex: nk, rahu: RAHU[w], yama: YAMA[w], guli: GULI[w], nalla: NALLA[w], day: d.toLocaleDateString('en-IN', { weekday: 'long' }), day_ta: DAYS_TA[w], sunrise: '6:14 AM', sunset: '5:41 PM' };
}

// ---------- Icons (line icons, stroke = currentColor) ----------
const ICONS = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
  cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
  play: '<polygon points="7 4 20 12 7 20 7 4" fill="currentColor"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>', check: '<path d="M20 6 9 17l-5-5"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  scroll: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6M9 15l2 2 4-4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
  temple: '<path d="M12 2.5 13.6 5h-3.2L12 2.5Z"/><path d="M9 5h6l1 3H8l1-3ZM7 8h10l1 3.5H6L7 8ZM4.5 11.5h15M6 11.5V21M18 11.5V21M10 15h4v6h-4zM3 21h18"/>',
  diya: '<path d="M12 2.5c1.6 2.1 2.2 3.4 2.2 4.5a2.2 2.2 0 0 1-4.4 0c0-1.1.6-2.4 2.2-4.5Z"/><path d="M2.5 12.5c0 3.3 4.3 5.5 9.5 5.5s9.5-2.2 9.5-5.5h-19ZM21.5 12.5l1-2M8 21.5h8M12 18v3.5"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  sparkle: '<path d="M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9L12 3Z"/><path d="M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17Z"/>',
  hands: '<path d="M12 21V11.5M12 11.5 9.5 4.6a1.4 1.4 0 0 0-2.7.8L8.6 13 6 10.8a1.5 1.5 0 0 0-2.1 2.1L9 18.5V21M12 11.5l2.5-6.9a1.4 1.4 0 0 1 2.7.8L15.4 13l2.6-2.2a1.5 1.5 0 0 1 2.1 2.1L15 18.5V21"/>',
  om: '<path d="M4.5 8.5c1.6-1.3 4.4-1.4 5.3.3.9 1.8-.9 3.2-2.7 3.2 2.9 0 4.4 1.7 3.6 4-.9 2.6-4.9 3.1-6.9 1M13 12.5c1.2-1.7 3.6-1.7 4.6 0 1.1 1.9.2 5.5-2.3 6.3M14 6.5c1.4 1.2 3.5 1.2 4.6-.2M17.5 2.5h.01"/>'
};
const ic = (n, c = 'w-5 h-5') => `<svg class="${c} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const WA_ICON = '<svg viewBox="0 0 24 24" class="w-6 h-6 fill-current" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>';

// Decorative gold mandala (pure SVG, no image)
function mandala(cls = '', rings = [[16, 46, 12], [12, 34, 9], [8, 22, 7]]) {
  const petals = rings.map(([n, r, s]) => [...Array(n)].map((_, i) => `<path d="M100 ${100 - r - s} q${s * .6} ${s} 0 ${s * 2} q${-s * .6} ${-s} 0 ${-s * 2}z" transform="rotate(${i * 360 / n} 100 100)"/>`).join('')).join('');
  return `<svg class="${cls}" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width=".8" aria-hidden="true">
    <circle cx="100" cy="100" r="96"/><circle cx="100" cy="100" r="88" stroke-dasharray="2 4"/><circle cx="100" cy="100" r="70"/><circle cx="100" cy="100" r="14"/>
    ${[...Array(32)].map((_, i) => `<path d="M100 4 L103 12 L100 20 L97 12Z" transform="rotate(${i * 11.25} 100 100)"/>`).join('')}${petals}</svg>`;
}
const divider = (c = 'text-gold-500') => `<div class="flex items-center justify-center gap-3 ${c}"><span class="h-px w-14 bg-current opacity-50"></span>${ic('diya', 'w-5 h-5')}<span class="h-px w-14 bg-current opacity-50"></span></div>`;

// ---------- Shared UI pieces ----------
function poojaCard(p) {
  const tp = TEMPLES.find(x => x.id === p.temple) || {};
  const min = Math.min(...p.pkgs.map(k => k.price)), mrp = Math.max(...p.pkgs.filter(k => k.price === min).map(k => k.mrp));
  const d = new Date(p.date + 'T00:00:00');
  return `<article class="group relative flex flex-col rounded-[1.6rem] bg-white border border-sandal overflow-hidden hover:shadow-soft hover:-translate-y-1 transition duration-300">
    <a href="pooja.html?id=${p.id}" class="relative block aspect-[4/3] overflow-hidden">
      ${imgTag(p.img, 'w-full h-full object-cover group-hover:scale-105 transition duration-700', p.name)}
      <span class="absolute inset-0 bg-gradient-to-t from-night-950/80 via-night-950/10 to-transparent"></span>
      <span class="absolute top-3 left-3 rounded-2xl bg-ivory/95 text-center px-3 py-1.5 shadow"><b class="block font-display text-2xl leading-none text-temple-800">${d.getDate()}</b><span class="text-[10px] font-bold uppercase tracking-wider text-gold-700">${d.toLocaleDateString('en', { month: 'short' })}</span></span>
      ${p.live ? `<span class="chip absolute bottom-3 left-3 bg-red-600/95 text-white"><span class="w-1.5 h-1.5 rounded-full bg-white pulse-dot"></span>Live stream</span>` : ''}
      <span class="absolute bottom-3 right-3 chip bg-black/40 backdrop-blur text-white">${ic('star', 'w-3.5 h-3.5 text-gold-300')} ${p.rating}</span>
    </a>
    <button onclick="this.innerHTML=wish.toggle('${p.id}')?'&#10084;':'&#9825;'" class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-ivory/95 text-temple-700 shadow grid place-items-center text-lg" aria-label="Save to wishlist">${wish.has(p.id) ? '&#10084;' : '&#9825;'}</button>
    <div class="p-5 flex flex-col flex-1">
      <p class="text-[11px] tracking-[.18em] uppercase font-bold text-gold-700 flex items-center gap-1.5">${ic('temple', 'w-3.5 h-3.5')}${esc(L(tp))}</p>
      <h3 class="font-display text-[1.45rem] leading-tight font-semibold text-temple-900 mt-2 line-clamp-2">${esc(L(p))}</h3>
      <p class="text-sm text-stone-600 mt-1.5 line-clamp-2">${esc(p.tagline)}</p>
      <div class="mt-auto pt-5 flex items-end justify-between gap-3 border-t border-dashed border-sandal mt-4">
        <div class="pt-3"><span class="text-[11px] text-stone-500">Starts from</span><div class="text-xl font-extrabold text-temple-800">${rupee(min)} <s class="text-xs font-medium text-stone-400">${rupee(mrp)}</s></div></div>
        <a href="pooja.html?id=${p.id}" class="btn btn-gold text-sm !py-2 !px-4">${t('bookNow')} ${ic('arrow', 'w-4 h-4')}</a>
      </div>
    </div></article>`;
}
function stars(n) { return '★★★★★'.slice(0, Math.round(n)) + '<span class="opacity-30">' + '★★★★★'.slice(Math.round(n)) + '</span>'; }
function reviewCard(r) {
  return `<figure class="relative rounded-[1.6rem] bg-white border border-sandal p-6 h-full flex flex-col">
    <span class="absolute -top-4 left-6 font-display text-7xl leading-none text-gold-300">“</span>
    <div class="text-gold-500 tracking-wider">${stars(r.rating)}</div>
    <blockquote class="text-stone-700 mt-3 leading-relaxed flex-1">${esc(r.text)}</blockquote>
    <figcaption class="mt-5 flex items-center gap-3"><span class="w-11 h-11 rounded-full bg-temple-700 text-gold-200 grid place-items-center font-display text-xl">${esc(r.name[0])}</span>
      <div class="flex-1"><b class="text-temple-900">${esc(r.name)}</b><div class="text-xs text-stone-500">${esc(r.city)} · ${esc(r.pooja)}</div></div>
      <span class="chip bg-temple-50 text-temple-700">${ic('shield', 'w-3.5 h-3.5')} Verified</span></figcaption></figure>`;
}
function pageHero(title, sub = '', crumbs = []) {
  return `<section class="relative overflow-hidden night-bg text-white">
    <div class="absolute -right-24 -top-24 w-[26rem] h-[26rem] text-gold-400/15 animate-spin-slow">${mandala('w-full h-full')}</div>
    <div class="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
      <nav class="text-xs uppercase tracking-[.2em] text-gold-200/70 mb-4"><a href="index.html" class="hover:text-gold-300">${t('home')}</a>${crumbs.map(c => ` <span class="mx-1 opacity-50">/</span> ${c[1] ? `<a href="${c[1]}" class="hover:text-gold-300">${esc(c[0])}</a>` : esc(c[0])}`).join('')}</nav>
      <h1 class="font-display text-4xl md:text-6xl font-semibold gold-text leading-tight">${title}</h1>${sub ? `<p class="mt-4 text-stone-300 max-w-2xl text-lg">${sub}</p>` : ''}
    </div><div class="gold-line"></div></section>`;
}
function genId(prefix = 'RK') { return prefix + new Date().toISOString().slice(2, 10).replace(/-/g, '') + Math.floor(1000 + Math.random() * 9000); }

// ---------- Header / Footer ----------
const NAV = [
  ['home', 'index.html'], ['poojas', 'poojas.html'],
  ['services', null, [['Special Darshan · சிறப்பு தரிசனம்', 'darshan.html'], ['Aarti · ஆர்த்தி', 'poojas.html?cat=aarti'], ['Pooja · பூஜை', 'poojas.html?cat=pooja'], ['Virtual Seva · மெய்நிகர் சேவை', 'poojas.html?cat=virtual'], ['Pooja Subscriptions', 'subscriptions.html'], ['Gift a Pooja', 'pooja.html?id=kubera-lakshmi&gift=1'], ['Prasadam Order', 'prasadam.html'], ['Festivals & Events', 'events.html']]],
  ['live', 'live.html'], ['shop', 'shop.html'],
  ['panchangam', null, [["Today's Panchangam", 'panchangam.html'], ['Special Days Calendar', 'calendar.html'], ['Nakshatra Remedy Finder', 'remedies.html'], ['Mantras & Slokas', 'mantras.html'], ['Articles', 'articles.html']]],
  ['about', null, [['About Us & Swamigal', 'about.html'], ['Temples', 'temples.html'], ['Membership', 'membership.html'], ['Donate', 'donate.html'], ['Reviews', 'reviews.html'], ['FAQ', 'faq.html'], ['Contact', 'contact.html']]]
];
function renderHeader() {
  const here = location.pathname.split('/').pop() || 'index.html', u = user();
  const navLink = ([k, href, sub]) => sub
    ? `<div class="relative group"><button class="px-2.5 py-2 font-semibold hover:text-temple-600 flex items-center gap-1 whitespace-nowrap">${t(k)} <svg class="w-3 h-3 opacity-60" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" fill="none" stroke-width="1.6"/></svg></button>
       <div class="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block z-50"><div class="bg-ivory rounded-2xl shadow-soft border border-sandal p-2 w-72">${sub.map(s => `<a href="${s[1]}" class="block px-4 py-2.5 rounded-xl text-sm hover:bg-temple-50 hover:text-temple-700">${s[0]}</a>`).join('')}</div></div></div>`
    : `<a href="${href}" class="relative px-2.5 py-2 whitespace-nowrap font-semibold hover:text-temple-600 ${here === href ? 'text-temple-700 after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-gold-400 after:rounded' : ''}">${t(k)}</a>`;
  const next = SPECIAL_DAYS.find(d => d.date >= new Date().toISOString().slice(0, 10));
  const tick = `<span class="text-gold-300 font-tamil">ஓம் ஸ்ரீ ராஜ குபேராய நமஹ</span><span class="opacity-40">✦</span><span>${next ? `Next special day: <b class="text-gold-200">${next.type}</b> · ${fmtDate(next.date, { weekday: 'short', day: 'numeric', month: 'short' })}` : ''}</span><span class="opacity-40">✦</span><span>Video proof on WhatsApp for every pooja</span><span class="opacity-40">✦</span><span>Prasadam delivered across India & abroad</span><span class="opacity-40">✦</span>`;
  $('#site-header').outerHTML = `
  <div class="bg-night-950 text-stone-300 text-xs">
    <div class="max-w-7xl mx-auto px-4 h-9 flex items-center gap-4">
      <div class="flex-1 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"><div class="inline-flex gap-6 animate-marquee">${tick}${tick}</div></div>
      <a href="tel:${SITE.phoneRaw}" class="hidden sm:flex items-center gap-1.5 hover:text-gold-300">${ic('phone', 'w-3.5 h-3.5')} ${SITE.phone}</a>
      <div class="flex rounded-full border border-white/15 p-0.5" role="group" aria-label="Language">
        <button onclick="setLang('en')" class="px-2.5 py-0.5 rounded-full ${lang === 'en' ? 'bg-gold-400 text-night-950 font-bold' : ''}">EN</button>
        <button onclick="setLang('ta')" class="px-2.5 py-0.5 rounded-full ${lang === 'ta' ? 'bg-gold-400 text-night-950 font-bold' : ''}">தமிழ்</button>
      </div>
    </div>
  </div>
  <header class="sticky top-0 z-40 bg-ivory/90 backdrop-blur-md border-b border-sandal">
    <div class="max-w-7xl mx-auto px-4 h-[72px] flex items-center gap-4">
      <a href="index.html" class="flex items-center gap-3 shrink-0">${imgTag(IMG.logo, 'h-12 w-12', 'logo')}
        <span class="leading-none"><b class="block font-display text-[1.45rem] font-semibold text-temple-800">${esc(L(SITE, 'short', 'short_ta'))}</b><span class="text-[9.5px] tracking-[.32em] text-gold-700 font-bold">SIDDHAR PEEDAM</span></span></a>
      <nav class="hidden xl:flex items-center text-[14px] text-stone-800 mx-auto">${NAV.map(navLink).join('')}</nav>
      <div class="flex items-center gap-0.5 ml-auto xl:ml-0 text-temple-800">
        <a href="track.html" class="hidden 2xl:grid w-10 h-10 place-items-center rounded-full hover:bg-temple-50" title="${t('track')}">${ic('pin')}</a>
        <a href="account.html#wishlist" class="relative w-10 h-10 grid place-items-center rounded-full hover:bg-temple-50" aria-label="Wishlist">${ic('heart')}<span data-badge="wish" class="absolute top-0.5 right-0.5 hidden min-w-[18px] h-[18px] px-1 rounded-full bg-temple-600 text-white text-[10px] place-items-center"></span></a>
        <a href="cart.html" class="relative w-10 h-10 grid place-items-center rounded-full hover:bg-temple-50" aria-label="Cart">${ic('cart')}<span data-badge="cart" class="absolute top-0.5 right-0.5 hidden min-w-[18px] h-[18px] px-1 rounded-full bg-temple-600 text-white text-[10px] place-items-center"></span></a>
        <a href="${u ? 'account.html' : 'login.html'}" class="hidden sm:grid w-10 h-10 place-items-center rounded-full hover:bg-temple-50" title="${u ? t('account') : t('login')}">${ic('user')}</a>
        <a href="poojas.html" class="hidden sm:inline-flex btn btn-gold text-sm !py-2.5 ml-2 whitespace-nowrap">${ic('diya', 'w-4 h-4')} ${t('book')}</a>
        <button id="menu-btn" class="xl:hidden w-10 h-10 rounded-full border border-sandal grid place-items-center ml-1" aria-label="Menu">${ic('menu')}</button>
      </div>
    </div>
  </header>
  <div id="drawer" class="fixed inset-0 z-[60] hidden">
    <div class="absolute inset-0 bg-night-950/60" data-close></div>
    <aside class="absolute right-0 top-0 h-full w-80 max-w-[86%] bg-ivory overflow-y-auto p-6">
      <div class="flex items-center justify-between mb-6"><span class="font-display text-2xl text-temple-800">Menu</span><button class="w-9 h-9 rounded-full bg-sandal grid place-items-center" data-close aria-label="Close">${ic('x', 'w-4 h-4')}</button></div>
      ${NAV.map(([k, h, sub]) => sub ? `<details class="border-b border-sandal py-2"><summary class="font-semibold py-1.5 cursor-pointer">${t(k)}</summary>${sub.map(s => `<a href="${s[1]}" class="block pl-3 py-1.5 text-sm text-stone-700">${s[0]}</a>`).join('')}</details>` : `<a href="${h}" class="block border-b border-sandal py-3 font-semibold">${t(k)}</a>`).join('')}
      <a href="track.html" class="flex items-center gap-2 border-b border-sandal py-3 font-semibold">${ic('pin', 'w-4 h-4')} ${t('track')}</a>
      <a href="${u ? 'account.html' : 'login.html'}" class="flex items-center gap-2 border-b border-sandal py-3 font-semibold">${ic('user', 'w-4 h-4')} ${u ? t('account') : t('login')}</a>
      <a href="poojas.html" class="btn btn-gold w-full mt-6">${t('book')}</a>
    </aside>
  </div>`;
  $('#menu-btn').onclick = () => $('#drawer').classList.remove('hidden');
  $('#drawer').addEventListener('click', e => { if (e.target.closest('[data-close]')) $('#drawer').classList.add('hidden'); });
}
function renderFooter() {
  const col = (title, links) => `<div><h4 class="font-display text-xl text-gold-200 mb-4">${title}</h4><ul class="space-y-2.5 text-sm">${links.map(l => `<li><a href="${l[1]}" class="text-stone-400 hover:text-gold-300 transition">${l[0]}</a></li>`).join('')}</ul></div>`;
  $('#site-footer').outerHTML = `
  <footer class="relative night-bg text-stone-300 overflow-hidden pb-24 md:pb-0">
    <div class="absolute left-1/2 -translate-x-1/2 -top-40 w-[34rem] h-[34rem] text-gold-400/10 animate-spin-slow pointer-events-none">${mandala('w-full h-full')}</div>
    <div class="relative max-w-7xl mx-auto px-4 pt-16">
      <div class="rounded-[2rem] border border-gold-400/25 bg-white/[.03] p-8 md:p-10 grid md:grid-cols-2 gap-6 items-center">
        <div><p class="eyebrow !text-gold-400">Newsletter</p><h3 class="font-display text-3xl md:text-4xl text-white mt-2">${t('newsletter')}</h3><p class="text-sm text-stone-400 mt-2">Special days, live stream alerts and divine messages – once a week.</p></div>
        <form id="nl-form" class="flex gap-2 rounded-full bg-white/10 p-1.5"><input type="email" required placeholder="Your email address" class="flex-1 bg-transparent px-4 text-white placeholder:text-stone-500 !shadow-none" aria-label="Email"><button class="btn btn-gold shrink-0 !py-2.5">${t('subscribe')}</button></form>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 py-14">
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3">${imgTag(IMG.logo, 'h-14 w-14', 'logo')}<b class="font-display text-2xl text-white leading-tight">${esc(L(SITE))}</b></div>
          <p class="text-sm mt-5 text-stone-400 leading-relaxed max-w-sm">${SITE.address}</p>
          <div class="mt-5 space-y-2 text-sm"><a href="tel:${SITE.phoneRaw}" class="flex items-center gap-2 hover:text-gold-300">${ic('phone', 'w-4 h-4 text-gold-400')} ${SITE.phone}</a><a href="mailto:${SITE.email}" class="flex items-center gap-2 hover:text-gold-300">${ic('mail', 'w-4 h-4 text-gold-400')} ${SITE.email}</a></div>
          <button id="pwa-install" class="hidden mt-5 btn btn-ghost text-sm !py-2">Install app</button>
        </div>
        ${col('Online Services', [['All E-Poojas', 'poojas.html'], ['Special Darshan', 'darshan.html'], ['Pooja Subscriptions', 'subscriptions.html'], ['Prasadam Order', 'prasadam.html'], ['Live Darshan', 'live.html'], ['Festivals & Events', 'events.html'], ['Track Pooja', 'track.html']])}
        ${col('Spiritual', [["Today's Panchangam", 'panchangam.html'], ['Special Days Calendar', 'calendar.html'], ['Nakshatra Remedies', 'remedies.html'], ['Mantras & Slokas', 'mantras.html'], ['Articles', 'articles.html'], ['Divine Collections', 'shop.html']])}
        ${col('Help', [['About Us', 'about.html'], ['FAQ', 'faq.html'], ['Contact Us', 'contact.html'], ['Terms & Conditions', 'policy.html?p=terms'], ['Privacy Policy', 'policy.html?p=privacy'], ['Refund & Cancellation', 'policy.html?p=refund'], ['Shipping Policy', 'policy.html?p=shipping']])}
      </div>
    </div>
    <div class="relative border-t border-white/10"><div class="max-w-7xl mx-auto px-4 py-5 text-xs flex flex-wrap justify-between gap-3 text-stone-500">
      <span>© ${new Date().getFullYear()} ${esc(SITE.name)}. All rights reserved.</span>
      <span class="flex items-center gap-4"><span class="flex items-center gap-1">${ic('shield', 'w-3.5 h-3.5 text-gold-500')} Secure payments</span><span>UPI · Cards · Netbanking · USD · SGD · MYR · AED</span></span></div></div>
  </footer>
  <div id="float-actions" class="fixed z-50 right-4 bottom-4 flex flex-col gap-3">
    <a href="https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent('Vanakkam, I would like to book a pooja')}" target="_blank" rel="noopener" class="w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lg hover:scale-105 transition" aria-label="WhatsApp">${WA_ICON}</a>
    <a href="tel:${SITE.phoneRaw}" class="w-14 h-14 rounded-full bg-temple-700 text-gold-200 grid place-items-center shadow-lg hover:scale-105 transition ring-2 ring-gold-400/40" aria-label="Call">${ic('phone', 'w-6 h-6')}</a>
  </div>`;
  $('#nl-form').onsubmit = e => { e.preventDefault(); e.target.reset(); toast('🙏 Subscribed! Watch your inbox for divine updates.'); };
}

function renderBadges() {
  const set = (k, n) => $$(`[data-badge="${k}"]`).forEach(b => { b.textContent = n; b.classList.toggle('hidden', !n); b.classList.toggle('grid', !!n); });
  set('cart', cart.count()); set('wish', wish.all().length);
}

// ---------- PWA ----------
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; const b = $('#pwa-install'); if (b) { b.classList.remove('hidden'); b.onclick = () => deferredPrompt.prompt(); } });
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => { });

document.addEventListener('DOMContentLoaded', () => {
  if ($('#site-header')) renderHeader();
  if ($('#site-footer')) renderFooter();
  document.documentElement.lang = lang === 'ta' ? 'ta' : 'en';
  renderBadges();
});
