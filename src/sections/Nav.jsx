import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import Logo from '../components/Logo'
import useScrollSpy from '../hooks/useScrollSpy'

const links = [
  { to: '/what-we-do', label: 'What we do', spy: 'capabilities' },
  { to: '/clients', label: 'Clients', spy: 'case-study' },
  { to: '/about', label: 'About' },
  { to: '/#packages', label: 'Pricing', spy: 'packages' },
  { to: '/contact', label: 'Contact', spy: 'contact' },
]

const SPIED = ['capabilities', 'packages', 'case-study', 'compliance', 'contact']

const linkClass = (isActive) =>
  `relative py-1 transition-colors duration-300 hover:text-ink after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-cobalt after:transition-all after:duration-300 ${
    isActive ? 'text-ink after:w-full' : 'after:w-0 hover:after:w-full'
  }`

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const section = useScrollSpy(SPIED)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled || open
          ? 'glass-bar border-white/10'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[1280px] items-center justify-between px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-10 ${
          scrolled ? 'py-3.5' : 'py-6'
        }`}
      >
        <Link to="/" aria-label="Proxymedia — home" className="flex items-center">
          <Logo size={24} stroke={2.9} />
        </Link>

        <div className="hidden items-center gap-9 text-[14.5px] text-slate md:flex">
          {links.map((l) =>
            l.to.includes('#') ? (
              <Link key={l.to} to={l.to} className={linkClass(l.spy === section)}>
                {l.label}
              </Link>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  linkClass(
                    isActive || (pathname === '/' && l.spy && l.spy === section),
                  )
                }
              >
                {l.label}
              </NavLink>
            ),
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button href="/contact" variant="cobalt" size="sm">
            Book a call
          </Button>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-300 ${
                  open ? 'top-[5px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-300 ${
                  open ? 'top-[5px] -rotate-45' : 'top-[10px]'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="glass-bar border-t border-white/10 md:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col px-6 py-3">
            {links.map((l) =>
              l.to.includes('#') ? (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/[0.06] py-3.5 text-[16px] text-slate"
                >
                  {l.label}
                </Link>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/[0.06] py-3.5 text-[16px] text-slate"
                >
                  {l.label}
                </Link>
              ),
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
