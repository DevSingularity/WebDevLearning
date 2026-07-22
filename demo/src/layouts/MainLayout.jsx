import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

function MainLayout({ children, hideNavbar = false, activePath = '/' }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fbf7ef] text-espresso">
      {!hideNavbar && <Navbar activePath={activePath} />}
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
