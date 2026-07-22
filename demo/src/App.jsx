import { useCallback, useEffect, useState } from 'react'
import MainLayout from './layouts/MainLayout'
import AboutPage from './pages/AboutPage'
import CategoriesPage from './pages/CategoriesPage'
import CollectionPage from './pages/CollectionPage'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/categories': CategoriesPage,
  '/collections': CollectionPage,
}

function getPathname() {
  return window.location.pathname || '/'
}

function App() {
  const [route, setRoute] = useState(getPathname)

  const navigate = useCallback((path) => {
    const currentRoute = getPathname()
    const scrollTarget = (() => {
      if (/^\/collections\//.test(path) || (path === '/collections' && currentRoute.startsWith('/collections'))) {
        return 'collection-shop'
      }

      if (/^\/categories\//.test(path) || (path === '/categories' && currentRoute.startsWith('/categories'))) {
        return 'category-shop'
      }

      return null
    })()

    setRoute(path)

    window.setTimeout(() => {
      if (scrollTarget) {
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }, [])

  useEffect(() => {
    if (window.location.hash.startsWith('#/')) {
      const path = window.location.hash.slice(1) || '/'
      window.history.replaceState({}, '', path)
      navigate(path)
    }

    const onPopState = () => navigate(getPathname())

    const onClick = (event) => {
      const anchor = event.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return

      event.preventDefault()
      window.history.pushState({}, '', href)
      navigate(href)
    }

    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('click', onClick)
    }
  }, [navigate])

  const categoryMatch = route.match(/^\/categories\/(.+)$/)
  const collectionMatch = route.match(/^\/collections\/(.+)$/)
  const productMatch = route.match(/^\/products\/([^/]+)\/(.+)$/)
  const isRoutedPage = Boolean(routes[route] || categoryMatch || collectionMatch || productMatch)
  const ActivePage = routes[route] || HomePage

  return (
    <MainLayout hideNavbar={route === '/' || !isRoutedPage} activePath={route}>
      {categoryMatch && <CategoriesPage categorySlug={categoryMatch[1]} />}
      {collectionMatch && <CollectionPage categorySlug={collectionMatch[1]} />}
      {productMatch && <ProductDetailPage productId={productMatch[1]} productSlug={productMatch[2]} />}
      {!categoryMatch && !collectionMatch && !productMatch && <ActivePage />}
    </MainLayout>
  )
}

export default App
