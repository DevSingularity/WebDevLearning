export function formatPrice(product) {
  if (product?.priceValue || product?.priceValue === 0) {
    return `₹${product.priceValue}`
  }

  return String(product?.price || '').replace(/â‚¹|₹/g, '₹')
}
