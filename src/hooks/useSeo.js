import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, metaFor } from '../config/seo'

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * Keeps head tags correct after client-side navigation. The prerendered HTML
 * is already right on first load — this only matters once React takes over.
 */
export default function useSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaFor(pathname)
    const url = `${SITE}${pathname === '/' ? '/' : pathname}`

    document.title = meta.title
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:title"]', 'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[name="twitter:title"]', 'content', meta.title)
    setMeta('meta[name="twitter:description"]', 'content', meta.description)
  }, [pathname])
}
