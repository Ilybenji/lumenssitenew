import { useEffect } from 'react'

const BASE_TITLE = 'Lumense'
const BASE_URL = 'https://lumense.se'

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSEO({ title, description, path = '/' }) {
  useEffect(() => {
    document.title = title

    setMeta('description', description)

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', BASE_URL + path)

    // Open Graph
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', BASE_URL + path, 'property')

    // Twitter
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
  }, [title, description, path])
}
