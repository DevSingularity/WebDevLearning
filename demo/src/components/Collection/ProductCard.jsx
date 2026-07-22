import { FiArrowRight, FiStar } from 'react-icons/fi'
import { formatPrice } from '../../utils/formatPrice'

function ProductCard({ product }) {
  return (
    <article className="group relative min-w-0 border border-espresso/10 bg-[#fffdf8] p-2 shadow-[0_14px_42px_rgba(80,52,25,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(80,52,25,0.13)]">
      <a href={`/products/${product.id}/${product.slug}`} aria-label={`View ${product.name} details`} className="absolute inset-0 z-10" />
      <div className="relative overflow-hidden bg-cream/45">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-[0.92/1] w-full object-cover transition duration-700 group-hover:scale-105 sm:aspect-[4/4.6]"
          loading="lazy"
        />
        {product.rating && (
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[#fffaf4] px-4 py-2 text-sm font-semibold text-[#3f2c1b] shadow-[0_10px_24px_rgba(52,35,20,0.1)]">
            <FiStar className="text-[0.9rem] text-[#9b7a4b]" />
            <span>{product.rating}</span>
          </div>
        )}
      </div>
      <div className="px-1 pb-2 pt-3 sm:px-2 sm:pt-4">
        <p className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-cocoa">{product.category}</p>
        <div className="mt-1 flex items-end justify-between gap-2">
          <h3 className="line-clamp-2 font-serif text-[1.25rem] font-semibold leading-tight text-espresso sm:text-2xl">{product.name}</h3>
          <FiArrowRight className="mb-1 hidden shrink-0 text-cocoa transition group-hover:translate-x-1 sm:block" />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-stone-500">Price: {formatPrice(product)}</span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
