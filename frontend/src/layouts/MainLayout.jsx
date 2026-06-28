import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTopButton from '../components/ScrollToTopButton'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-dark-900 text-white transition-colors duration-300">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
