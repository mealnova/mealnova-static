# mealnova-static

Static marketing site for **Mealnova** — a hand-authored, from-scratch design
(warm editorial premium: bone canvas, terracotta-amber accent, Fraunces + Inter,
Noto Devanagari for hi/mr). Content mirrors the live Mealnova site; no build step.

## Structure

```
index.html        # language redirect (navigator.language → en/hi/mr)
en/ hi/ mr/       # one long-form page per locale
assets/css/       # single shared stylesheet
assets/js/        # sticky header, mobile nav, scroll reveal
CNAME             # mealnova.in  (GitHub Pages custom domain)
.nojekyll         # serve files as-is
robots.txt, sitemap.xml
```

## Local preview

```bash
python3 -m http.server 4321 --directory .
# open http://localhost:4321
```

## Hosting — GitHub Pages @ apex `mealnova.in`

1. Repo **Settings → Pages** → Source: *Deploy from a branch* → `main` / `/ (root)`.
2. The committed `CNAME` sets the custom domain to `mealnova.in`.
3. Add these DNS records at your domain provider:
   - Apex `mealnova.in` → four A records:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optional) `www` → CNAME → `<org>.github.io`
4. In Pages settings, tick **Enforce HTTPS** once the cert is issued.

## Updating content

Edit the locale HTML files directly and push. Content is intentionally frozen
(no CMS/API dependency) so the site stays up regardless of backend state.
