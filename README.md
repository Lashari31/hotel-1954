# Hotel 1954 — Muzaffarabad, Azad Kashmir

Marketing website for **Hotel 1954**, a luxury riverside hotel in Muzaffarabad,
Azad Kashmir. A static, multi-page site with clean folder URLs.

## Pages
| URL | Page |
| --- | --- |
| `/` | Home |
| `/rooms/` | Rooms &amp; Suites |
| `/about/` | Our Story |
| `/explore/` | Explore Kashmir |
| `/gallery/` | Gallery |
| `/contact/` | Contact |
| `/booking/` | Reserve |

## Tech
Plain HTML, CSS and JavaScript — no build step. Shared design system in
`assets/styles.css`, shared behaviour in `assets/script.js`. Icons via
Font Awesome, fonts via Google Fonts (Cormorant Garamond + Jost).

## Preview locally
Because the site uses folder URLs, open it through a local web server (not by
double-clicking a file):

```
# Windows: just double-click
Start-Preview.bat

# or, in any terminal:
python -m http.server 8080
# then visit http://localhost:8080/
```

## Deploy
The site uses **relative paths**, so it works from any location — a domain root,
a Netlify/Vercel subdomain, or a GitHub Pages project sub-path.

- **GitHub Pages:** push this repo, then enable Pages (Settings → Pages → Deploy
  from branch → `main` / root).
- **Custom domain:** point `hotel1954.com` at the host and it serves clean URLs
  (`/rooms/`, `/about/`, …) automatically.

## Notes
- Photos are high-quality placeholders — replace the image URLs with real
  Hotel 1954 / Neelum Valley photography before launch.
- Reservations and the contact form open a prefilled WhatsApp message.
