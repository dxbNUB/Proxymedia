import { useEffect, useRef, useState } from 'react'
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
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    // Hysteresis, not one threshold: a single trip point at 16px means any
    // scroll that hovers around it toggles the bar's hairline border on and
    // off every frame, which reads as a flickering line across the hero.
    const onScroll = () =>
      setScrolled((was) => (was ? window.scrollY > 8 : window.scrollY > 28))

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on route change, so tapping a link never leaves the panel hanging.
  useEffect(() => setOpen(false), [pathname])

  /**
   * While the menu is open it behaves like a dialog: Escape closes it, the
   * page behind does not scroll, and focus moves into the panel and comes
   * back to the toggle afterwards. Scroll lock is padded to the scrollbar
   * width so locking does not shift the layout sideways.
   */
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    const { body } = document
    const gap = window.innerWidth - document.documentElement.clientWidth
    const prev = { overflow: body.style.overflow, padding: body.style.paddingRight }

    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`

    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('a')?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      body.style.overflow = prev.overflow
      body.style.paddingRight = prev.padding
    }
  }, [open])

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
            ref={toggleRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
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
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="glass-bar border-t border-white/10 md:hidden"
        >
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
