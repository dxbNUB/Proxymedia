import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './sections/Nav'
import ScrollProgress from './components/ScrollProgress'
import Footer from './sections/Footer'
import Home from './pages/Home'
import WhatWeDo from './pages/WhatWeDo'
import About from './pages/About'
import Clients from './pages/Clients'
import ContactPage from './pages/ContactPage'
import useSeo from './hooks/useSeo'

/**
 * Navigation scrolling. With a hash, wait for the target to exist before
 * scrolling — on a cross-page jump like /#packages the section is not in the
 * DOM on the first frame, which is why the browser used to leave you at the
 * top. Without a hash, go to the top.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = hash.slice(1)
    let frame = 0
    let tries = 0

    const find = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (tries++ < 40) frame = requestAnimationFrame(find)
    }

    frame = requestAnimationFrame(find)
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default function App() {
  const { pathname } = useLocation()
  useSeo()

  return (
    <>
      <ScrollManager />
      <span aria-hidden="true" className="page-grain" />
      <ScrollProgress />
      <Nav />
      <main key={pathname} className="page-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/about" element={<About />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
