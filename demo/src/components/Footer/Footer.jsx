import { socialLinks } from '../../data/jewelryData'

function Footer() {
  return (
    <footer className="bg-espresso px-4 py-14 text-cream sm:py-18">
      <div className="luxury-container">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.7fr]">
          <div>
            <h2 className="font-serif text-4xl font-semibold text-white">YourShopName</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-cream/70">
              Jewelry for intimate rituals, evening plans, and the small moments that deserve a little ceremony.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.label}
                    href={social.href || '/'}
                    {...(social.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-sand hover:text-espresso"
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-white">Explore</h3>
            {[
              { label: 'Collections', href: '/collections' },
              { label: 'Maison YourShopName', href: '/about' },
              { label: 'Categories', href: '/categories' },
            ].map((item) => (
              <a key={item.label} href={item.href} className="mb-3 block text-sm text-cream/70 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-white">Care</h3>
            {[
              { label: 'Sizing Guide', href: '/about' },
              { label: 'Shipping', href: '/' },
              { label: 'Returns', href: '/about' },
              { label: 'Materials', href: '/about' },
            ].map((item) => (
              <a key={item.label} href={item.href} className="mb-3 block text-sm text-cream/70 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 YourShopName. All rights reserved.</p>
          <p>Privacy Policy / Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
