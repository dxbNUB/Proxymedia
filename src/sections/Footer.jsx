import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const nav = [
  { to: '/what-we-do', label: 'What we do' },
  { to: '/clients', label: 'Clients' },
  { to: '/about', label: 'About' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-deep">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-10">
        <div className="flex flex-col gap-8 border-b border-white/[0.08] pb-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" aria-label="Proxymedia — home" className="flex items-center">
              <Logo
                size={23}
                stroke={2.9}
                wordmarkClass="text-[17px] font-semibold tracking-[-0.03em] text-ink"
              />
            </Link>
            <p className="mt-4 text-[14.5px] leading-[1.6] text-mute">
              AI automation for businesses in the UAE, Saudi Arabia and the
              wider GCC. Built on infrastructure you own.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 text-[14.5px]">
            {nav.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-slate transition-colors duration-300 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="text-slate transition-colors duration-300 hover:text-ink"
            >
              Contact
            </Link>
          </nav>

          <div className="text-[14.5px]">
            <a
              href="mailto:hello@proxymedia.ae"
              className="text-slate transition-colors duration-300 hover:text-ink"
            >
              hello@proxymedia.ae
            </a>
            <p className="mt-3 text-mute">Dubai, United Arab Emirates</p>
          </div>
        </div>

        <p className="mt-8 text-[13.5px] text-mute">© 2026 Proxymedia</p>
      </div>
    </footer>
  )
}
