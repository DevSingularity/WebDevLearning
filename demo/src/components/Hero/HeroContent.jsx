import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiArrowRight, FiMenu, FiShoppingBag, FiX } from 'react-icons/fi'
import { navLinks } from '../../data/jewelryData'
import { api } from '../../lib/api'

function HeroContent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [community, setCommunity] = useState({ totalUsers: 230000, avatars: [] })

  useEffect(() => {
    let isMounted = true

    api.getHeroCommunity()
      .then((data) => {
        if (!isMounted || !data) return
        setCommunity({
          totalUsers: data.totalUsers || 0,
          avatars: data.avatars || [],
        })
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  const formattedUsers =
    community.totalUsers >= 1000
      ? `${Math.round(community.totalUsers / 1000)}K`
      : String(community.totalUsers)

  return (
    <section id="home" className="relative overflow-hidden bg-[#f8f3ea] text-espresso">
      <div className="overflow-hidden bg-espresso px-3 py-2 text-center text-[0.54rem] font-bold uppercase tracking-[0.22em] text-cream sm:px-4 sm:text-xs sm:tracking-[0.34em]">
        <span className="block whitespace-nowrap">Private festive edit now live / complimentary delivery on every order</span>
      </div>

      <div className="relative z-20 border-b border-espresso/10 bg-[#fbf7ef]/92 backdrop-blur-xl">
        <div className="luxury-container flex min-h-18 items-center justify-between gap-4 sm:min-h-20">
          <a href="/" aria-label="YourShopName home" className="shrink-0">
            <img
              src="/images/utsav-logo.png"
              alt="YourShopName"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </a>

          <nav className="hidden items-center gap-7 lg:flex lg:ml-6">
            {navLinks.slice(0, 3).map((link) => (
              <a key={link.label} href={link.href} className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-espresso/75 transition hover:text-cocoa">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-4 text-espresso/75 lg:flex">

            <a href="https://api.whatsapp.com/send?phone=0000000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-espresso/18 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] transition hover:border-cocoa hover:text-cocoa">
              <FiShoppingBag /> Contact Us
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((value) => !value)}
            className="ml-auto grid size-11 place-items-center rounded-full border border-espresso/10 bg-white text-espresso shadow-sm lg:hidden"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-30 rounded-[1.25rem] border border-espresso/10 bg-white/96 p-4 shadow-2xl backdrop-blur-xl lg:hidden">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-espresso hover:bg-cream"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://api.whatsapp.com/send?phone=0000000000"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-full bg-espresso px-4 py-3 text-center text-sm font-bold text-white hover:bg-cocoa"
            >
              Contact Us
            </a>
          </div>
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-80">
        <div className="absolute left-[-15rem] top-16 size-[34rem] rounded-full border border-cocoa/10" />
        <div className="absolute right-[-10rem] top-12 size-[31rem] rounded-full bg-sand/20 blur-3xl" />
        <div className="absolute bottom-8 left-1/2 h-px w-[85vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-cocoa/20 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="luxury-container relative grid min-h-[calc(100svh-5.5rem)] items-center gap-6 py-9 sm:min-h-[calc(100vh-7rem)] sm:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10"
      >
        <div className="relative z-10 max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.25em] text-cocoa">
            Fine jewellery / small-batch pieces
          </div>

          <h1 className="max-w-4xl font-serif text-[4.05rem] font-semibold leading-[0.78] tracking-normal text-espresso sm:text-[6.2rem] lg:text-[7.35rem]">
            Timeless Elegance
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">
            Warm gold tones, polished pearls, and sculptural accents arranged like a private jewellery editorial for everyday ceremony.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/collections" className="inline-flex items-center justify-center rounded-full bg-espresso px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_18px_42px_rgba(52,35,20,0.2)] transition hover:-translate-y-0.5 hover:bg-cocoa">
              Shop the Edit
            </a>
            <a href="/categories" className="inline-flex items-center justify-center gap-2 rounded-full border border-espresso/20 bg-white/70 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-espresso transition hover:-translate-y-0.5 hover:border-cocoa hover:text-cocoa">
              Explore Collections <FiArrowRight />
            </a>
          </div>

          <div className="mt-9 grid max-w-lg grid-cols-3 border-y border-espresso/10 py-4 text-center sm:text-left">
            {[
              ['10+', 'Fresh arrivals'],
              ['\u20b9149', 'Starting edit'],
              [formattedUsers, 'YourShopName clients'],
            ].map(([value, label]) => (
              <div key={label} className="border-r border-espresso/10 px-3 last:border-r-0 sm:px-5 first:sm:pl-0">
                <p className="font-serif text-3xl font-semibold text-cocoa">{value}</p>
                <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-stone-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem]">
          <img
            src="/images/products/hero-golden-flower-editorial.png"
            alt="Golden flower earrings editorial still life"
            className="aspect-[4/5.15] w-full rounded-t-full object-cover shadow-[0_28px_70px_rgba(80,52,25,0.16)]"
          />
        </div>      </motion.div>
    </section>
  )
}

export default HeroContent
