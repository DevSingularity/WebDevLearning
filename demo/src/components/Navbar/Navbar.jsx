import { useState } from 'react'
import { FiMenu, FiShoppingBag, FiX } from 'react-icons/fi'
import { navLinks } from '../../data/jewelryData'

function Navbar({ activePath = '/' }) {
  const [open, setOpen] = useState(false)

  const isActiveLink = (href) => {
    if (href === '/') return activePath === '/'
    if (href === '/collections' && activePath.startsWith('/products/')) return true
    return activePath === href || activePath.startsWith(`${href}/`)
  }

  return (
    <header className="relative z-50 bg-[#fbf7ef] text-espresso">
      <div className="overflow-hidden bg-espresso px-3 py-2 text-center text-[0.54rem] font-bold uppercase tracking-[0.22em] text-cream sm:px-4 sm:text-xs sm:tracking-[0.34em]">
        <span className="block whitespace-nowrap">Private festive edit now live / complimentary delivery on every order</span>
      </div>

      <div className="relative border-b border-espresso/10 bg-[#fbf7ef]/92 backdrop-blur-xl">
        <div className="luxury-container flex min-h-18 items-center justify-between gap-4 sm:min-h-20">
          <a href="/" aria-label="YourShopName home" className="shrink-0">
            <img
              src="/images/utsav-logo.png"
              alt="YourShopName"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </a>

          <nav className="hidden items-center gap-7 lg:flex lg:ml-6">
            {navLinks.slice(0, 3).map((link) => {
              const active = isActiveLink(link.href)

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-[0.7rem] font-bold uppercase tracking-[0.22em] transition hover:text-cocoa ${
                    active ? 'text-cocoa' : 'text-espresso/75'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-4 text-espresso/75 lg:flex">

            <a
              href="https://api.whatsapp.com/send?phone=0000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-espresso/18 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] transition hover:border-cocoa hover:text-cocoa"
            >
              <FiShoppingBag /> Contact Us
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
            className="ml-auto grid size-11 place-items-center rounded-full border border-espresso/10 bg-white text-espresso shadow-sm lg:hidden"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {open && (
          <div className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-30 rounded-[1.25rem] border border-espresso/10 bg-white/96 p-4 shadow-2xl backdrop-blur-xl lg:hidden">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href)

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active ? 'bg-cream text-espresso' : 'text-espresso hover:bg-cream'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="https://api.whatsapp.com/send?phone=0000000000"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-espresso px-4 py-3 text-center text-sm font-bold text-white hover:bg-cocoa"
            >
              Contact Us
            </a>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
