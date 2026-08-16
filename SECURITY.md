# Security

## Reporting

Email **security@proxymedia.ae**. Please include what you found, how to
reproduce it, and how you'd like to be credited. We'll acknowledge within two
working days.

Please don't open a public GitHub issue for a vulnerability, and don't test
against the live site in ways that affect other visitors (no load testing, no
automated scanning that generates real bookings).

## What this site is

A static marketing site. No database, no user accounts, no server-side code,
no user input handling. Every route is prerendered HTML uploaded to a CDN.
Bookings happen inside Calendly's iframe on Calendly's infrastructure — no
booking data touches this site.

That shape matters: the classic web vulnerabilities (SQL injection, auth
bypass, IDOR, SSRF, file upload) have nothing to attack here. The realistic
risks are different, and listed below.

## What actually protects the site

**Transport.** HTTPS everywhere, HSTS `max-age=63072000`. HTTP redirects to
HTTPS at the edge.

**Headers** — set in `vercel.json`, verify with
`curl -sI https://www.proxymedia.ae/`:

| Header | Value | Stops |
|---|---|---|
| `Content-Security-Policy` | see `vercel.json` | injected scripts, data exfiltration to unknown hosts |
| `X-Frame-Options` / `frame-ancestors` | `DENY` / `'none'` | clickjacking — the site cannot be framed |
| `X-Content-Type-Options` | `nosniff` | a file being executed as a type it isn't |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | leaking full URLs to third parties |
| `Permissions-Policy` | camera, mic, geolocation off | a compromised embed asking for hardware |
| `Cross-Origin-Opener-Policy` | `same-origin` | cross-window tampering |

The CSP allows exactly three third parties: Calendly (the booking embed) and
Google Fonts. Anything else — an injected analytics tag, a compromised
dependency phoning home — is blocked by the browser.

**Inline scripts are allowed by hash, not by `'unsafe-inline'`.** There is one
inline script (the pre-paint bootstrap in `index.html`). `npm run build` fails
if it's edited without updating the hash in `vercel.json`, because the failure
is otherwise silent: dev has no CSP, so it looks fine locally and breaks in
production.

**Supply chain.** `package-lock.json` is committed and CI installs with
`npm ci`, so builds are reproducible. Dependabot opens grouped weekly PRs.
Run `npm audit` before releasing.

**Secrets.** There are none in this repo, and `.gitignore` blocks the usual
shapes (`.env*`, keys, certs, deploy configs). Nothing here needs a secret —
if that changes, it belongs in Vercel's environment variables, never in the
repo. Git history keeps a deleted file forever unless the history is rewritten.

## Where the real risk is

None of the above is what would actually get this site defaced. These would:

1. **A compromised GitHub account.** Anyone who can push to `main` can deploy
   whatever they want. Requires 2FA on every account with access, and branch
   protection on `main`.
2. **A compromised Vercel account.** Same outcome, one step later. 2FA.
3. **Domain or DNS takeover.** Whoever controls DNS controls the site and the
   email. Registrar lock + 2FA on the registrar and SiteGround.
4. **Email spoofing.** Not the site, but the brand: with DMARC at `p=none`,
   anyone can send mail as `@proxymedia.ae` and it will be delivered.

Items 1–4 are account and DNS settings. They cannot be fixed from this
codebase, and they are the ones that matter most.

## Deployment integrity

Every deploy is traceable to a commit. If something looks wrong on the live
site, check the Vercel deployment log against `git log` — a deploy with no
matching commit means someone deployed outside the repo.
