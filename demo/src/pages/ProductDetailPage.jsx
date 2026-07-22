import { useEffect, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { collectionItems } from '../data/jewelryData'
import ProductCard from '../components/Collection/ProductCard'
import { formatPrice } from '../utils/formatPrice'

function ProductDetailPage({ productId, productSlug }) {
  const product =
    collectionItems.find((item) => String(item.id) === String(productId) && item.slug === productSlug) ||
    collectionItems.find((item) => item.slug === productSlug)
  const [activeImage, setActiveImage] = useState(product?.image || '')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    setActiveImage(product?.image || '')
    setQuantity(1)
    setActiveTab('description')
  }, [product?.image])

  if (!product) {
    return (
      <section className="bg-[#f8f3ea] px-4 pb-20 pt-6 sm:pt-8">
        <div className="luxury-container border border-espresso/10 bg-[#fffdf8] p-8 text-center shadow-[0_18px_55px_rgba(80,52,25,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-cocoa">Product Not Found</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-espresso">This piece is no longer available.</h1>
          <a
            href="/collections"
            className="mt-8 inline-flex rounded-full bg-espresso px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-cocoa"
          >
            Back to Collections
          </a>
        </div>
      </section>
    )
  }

  const detailLines = product.details
    ? product.details.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
    : []
  const galleryImages = Array.from(new Set([product.image, ...(product.images || [])]))
    .filter((image) => image && image.includes('/images/products/'))
  const categorySlug = product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const relatedProducts = collectionItems
    .filter((item) => item.category === product.category && String(item.id) !== String(product.id))
    .slice(0, 3)
  const selectedImage = activeImage || product.image
  const displayPrice = formatPrice(product)
  const productPageUrl = window.location.href
  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in this product:\n\n${product.name}\nPrice: ${displayPrice}\nQuantity: ${quantity}\nDescription: ${product.description}\nProduct Link: ${productPageUrl}`,
  )
  const whatsappUrl = `https://api.whatsapp.com/send?phone=0000000000&text=${whatsappMessage}`
  const descriptionCopy = {
    Earrings: `${product.name} is chosen for everyday elegance with a comfortable feel, polished shine, and a versatile silhouette that works for casual outfits, gifting, and festive dressing.`,
    Necklaces: `${product.name} adds a graceful focal point with a refined finish, easy styling, and a soft statement look for daily wear or special occasions.`,
    Bangles: `${product.name} is a delicate wrist accent with a light, elegant finish that pairs beautifully with ethnic looks, western outfits, and layered jewelry styling.`,
    'Hair Accessories': `${product.name} gives hairstyles a soft finishing touch while keeping the look playful, feminine, and easy to wear through the day.`,
    Mangalsutras: `${product.name} blends traditional detail with a polished modern look, making it suitable for daily wear, festive dressing, and meaningful gifting.`,
  }
  const fullDescription = descriptionCopy[product.category] || product.description
  const descriptionHighlights = [
    product.sourceCategory,
    product.material?.replace(/^[^:]+:\s*/, ''),
    product.category,
  ].filter(Boolean)

  return (
    <>
      <section className="bg-[#f8f3ea] px-3 pb-12 pt-4 sm:px-4 sm:pb-16 sm:pt-6">
        <div className="luxury-container">
          <a href="/collections" className="inline-flex rounded-full border border-espresso/10 bg-[#fffdf8]/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cocoa shadow-sm transition hover:text-espresso sm:bg-[#fffdf8]/70 sm:text-xs">
            Back to Collections
          </a>

          <div className="mt-5 border border-espresso/10 bg-[#fffdf8] p-3 shadow-[0_18px_60px_rgba(80,52,25,0.08)] sm:mt-8 sm:p-6 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:p-8">
            <div>
              <div className="relative overflow-hidden border border-espresso/10 bg-cream/45">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="aspect-[4/4.7] w-full object-cover sm:aspect-[4/4.35]"
                />
              </div>

              {galleryImages.length > 1 && (
                <div className="mobile-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-4 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:pb-0">
                  {galleryImages.slice(0, 4).map((image) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(image)}
                      className={`w-16 shrink-0 overflow-hidden border bg-[#fffdf8] p-1 transition hover:-translate-y-0.5 sm:w-auto ${
                        activeImage === image ? 'border-cocoa shadow-[0_12px_28px_rgba(80,52,25,0.16)]' : 'border-sand/40'
                      }`}
                    >
                      <img src={image} alt={product.name} className="aspect-square w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <article className="mt-5 lg:mt-0">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-cocoa">{product.category}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="font-serif text-[2.45rem] font-semibold leading-[0.95] text-espresso sm:text-6xl">
                  {product.name}
                </h1>
                <span className="rounded-full border border-cocoa/20 bg-cream/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cocoa">In Stock</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#5f564d] sm:mt-4 sm:gap-3 sm:text-sm">
                <span className="text-amber-400">*****</span>
                {product.rating && <span>{product.rating} rating</span>}
                {product.reviewCount > 0 && <span>({product.reviewCount} reviews)</span>}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className="font-serif text-4xl font-semibold text-cocoa sm:text-5xl">{displayPrice}</span>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#5f564d] sm:mt-5 sm:leading-7">{product.description}</p>

              <div className="mt-5 border-t border-sand/40 pt-5 sm:mt-7 sm:pt-6">
                <p className="text-sm font-bold text-espresso">Quantity</p>
                <div className="mt-3 grid grid-cols-[1fr_auto] gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                  <div className="col-span-2 inline-flex w-fit items-center rounded-full bg-ivory p-1 sm:col-span-1">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      className="grid size-9 place-items-center rounded-full text-cocoa transition hover:bg-cream"
                    >
                      <FiMinus />
                    </button>
                    <span className="min-w-10 text-center text-sm font-bold text-espresso">{quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((value) => value + 1)}
                      className="grid size-9 place-items-center rounded-full text-cocoa transition hover:bg-cream"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2 rounded-full bg-espresso px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-cocoa sm:col-span-1 sm:px-7"
                  >
                    Contact Us
                  </a>
                  <a
                    href={`/collections/${categorySlug}`}
                    className="rounded-full border border-espresso/10 bg-[#fffdf8]/80 px-4 py-3 text-center text-sm font-bold leading-tight text-espresso transition hover:border-cocoa hover:text-cocoa sm:px-7"
                  >
                    More {product.category}
                  </a>

                </div>
              </div>
            </article>
          </div>

          <section className="mt-6 border border-espresso/10 bg-[#fffdf8] p-4 shadow-[0_14px_40px_rgba(80,52,25,0.06)] sm:mt-12 sm:p-8">
            <div className="grid grid-cols-2 gap-2 border-b border-sand/40 pb-3 text-center text-xs font-bold sm:flex sm:flex-wrap sm:justify-center sm:gap-6 sm:pb-4 sm:text-sm">
              <button
                type="button"
                onClick={() => setActiveTab('description')}
                className={activeTab === 'description' ? 'text-espresso' : 'text-[#9a8d7d] transition hover:text-cocoa'}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={activeTab === 'info' ? 'text-espresso' : 'text-[#9a8d7d] transition hover:text-cocoa'}
              >
                Additional Information
              </button>
            </div>

            <div className="mt-8">
              {activeTab === 'description' ? (
                <div className="border border-espresso/10 bg-[#fbf7ef] p-4 sm:p-8">
                  <p className="max-w-4xl text-sm leading-7 text-[#5f564d] sm:text-base sm:leading-8">{fullDescription}</p>
                  <p className="mt-4 max-w-4xl text-sm leading-7 text-[#7a6c5d]">{product.description}</p>
                  {descriptionHighlights.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {descriptionHighlights.map((highlight) => (
                        <span key={highlight} className="rounded-full border border-espresso/10 bg-[#fffdf8] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cocoa">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : detailLines.length > 0 ? (
                <dl className="grid gap-3 text-sm text-[#5f564d] sm:grid-cols-2">
                  {detailLines.map((line) => {
                    const [label, ...valueParts] = line.split(':')
                    const value = valueParts.join(':').trim()

                    return (
                      <div key={line} className="border border-espresso/10 bg-[#fbf7ef] p-4">
                        {value ? (
                          <>
                            <dt className="font-bold text-cocoa">{label}</dt>
                            <dd className="mt-1">{value}</dd>
                          </>
                        ) : (
                          <dd>{line}</dd>
                        )}
                      </div>
                    )
                  })}
                </dl>
              ) : (
                <p className="text-sm leading-7 text-[#5f564d]">{product.description}</p>
              )}
            </div>
          </section>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-[#fbf7ef] pb-20 sm:pb-28">
          <div className="luxury-container">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-cocoa">You May Also Like</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold text-espresso">More from {product.category}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={`${item.id}-${item.slug}`} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDetailPage













