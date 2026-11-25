# Sri Navapasana Raja Murugan Temple – Pooja Booking Platform (HTML + Tailwind + JS)

Temple: Sri Navapasana Raja Murugan Temple (Siddhar Peedam), 24-25A Murugan Kovil Street, North Poonamallee, Chennai 600123 – [Google Maps](https://maps.app.goo.gl/RwVYhB1NcP7RzCFEA)

Run locally: `node serve.js` → http://localhost:5173  (Admin: http://localhost:5173/admin.html)

Demo OTP is **1234** everywhere. Demo booking ID for tracking: **RKDEMO**.
All data lives in `assets/data.js` (poojas, temples, products, etc.) and the browser's localStorage. Connect a real backend/API, Razorpay/Stripe, WhatsApp/SMS gateway before going live.

| Page | File |
|---|---|
| Home | index.html |
| All poojas (filters) | poojas.html |
| Pooja detail + 5-step booking (package → sankalpam → contact/OTP → payment → confirmation), gift a pooja | pooja.html?id=… |
| Track booking | track.html |
| Receipt / sankalpam certificate / donation & order invoice (print to PDF) | receipt.html |
| Temples list / detail (history, priests, authorization letter, 360° tour) | temples.html, temple.html |
| Live darshan | live.html |
| Special darshan slot booking + QR ticket | darshan.html |
| Pooja subscriptions | subscriptions.html |
| Festivals & events (seat limits) | events.html |
| Prasadam order | prasadam.html |
| Divine Collections / product / cart & checkout | shop.html, product.html, cart.html |
| Donation + annadhanam sponsorship by date | donate.html |
| Membership | membership.html |
| Today's panchangam / special days calendar / nakshatra remedy finder | panchangam.html, calendar.html, remedies.html |
| Mantras & slokas / articles / article detail | mantras.html, articles.html, article.html |
| Reviews, About, FAQ, Contact | reviews.html, about.html, faq.html, contact.html |
| Login (OTP) / My Account (dashboard, bookings, family profiles, orders, subscriptions & donations, referral, addresses, wishlist) | login.html, account.html |
| Terms / Privacy / Refund / Shipping | policy.html?p=terms\|privacy\|refund\|shipping |
| 404 | 404.html |
| Admin panel – all 22 sections | admin.html |

**Images are dummy placeholders** (free Unsplash photos + placehold.co for trustees, logo is `assets/logo.svg`). Swap them in the `IMG` block at the top of `assets/data.js` – every page reads from there.
Theme ("Kumkum & Gold"): colours in `assets/tw.js`, fonts Cormorant Garamond + Manrope + Noto Serif Tamil.

Things to fill in: `SITE.youtube` (live stream embed) in `assets/data.js`, sample video URLs per pooja (`video` field), the real authorization letter scan, and the policy text (review with the trust's legal advisor).
