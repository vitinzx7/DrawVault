import { Route, Routes, useLocation } from 'react-router'
import { AnalyticsConsent } from './components/AnalyticsConsent'
import { SiteHeader } from './components/SiteHeader'
import { AboutPage } from './pages/AboutPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import './App.css'

function App() {
  const location = useLocation()
  const isGalleryPage = location.pathname === '/gallery'

  return (
    <div
      className={`site-shell${isGalleryPage ? ' site-shell--gallery' : ''}`}
    >
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <AnalyticsConsent />
    </div>
  )
}

export default App
