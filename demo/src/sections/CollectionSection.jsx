import ProductCard from '../components/Collection/ProductCard'
import FadeIn from '../components/Common/FadeIn'
import PrimaryButton from '../components/Common/PrimaryButton'
import { collectionItems } from '../data/jewelryData'

function CollectionSection() {
  return (
    <section id="collections" className="bg-[#fbf7ef] py-16 sm:py-24">
      <div className="luxury-container">
        <FadeIn className="mb-8 flex flex-col gap-5 border-y border-espresso/10 py-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cocoa">Best Seller</p>
            <h2 className="mt-3 font-serif text-5xl font-semibold leading-[0.9] text-espresso sm:text-6xl">
              The pieces everyone notices.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-stone-600">
            A warm, polished edit of earrings and finishing pieces selected for daily wear, gifting, and small occasions.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {collectionItems.slice(0, 6).map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>

        <div className="mt-9 text-center">
          <PrimaryButton href="/collections">Discover the Full Collection</PrimaryButton>
        </div>
      </div>
    </section>
  )
}

export default CollectionSection
