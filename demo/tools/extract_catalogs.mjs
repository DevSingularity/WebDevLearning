import fs from 'node:fs'

const inputPath = process.argv[2] ?? 'C:/Users/lenovo/Downloads/fixed_catalogs.json'
const outputPath = process.argv[3] ?? 'src/data/catalogProducts.js'

const source = JSON.parse(fs.readFileSync(inputPath, 'utf8'))

const categoryMap = {
  'Earrings & Studs': 'Earrings',
  'Bangles & Bracelets': 'Bangles',
  'Hair Clips & Hair Pins': 'Hair Accessories',
  'Necklaces & Chains': 'Necklaces',
  Mangalsutras: 'Mangalsutras',
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function titleCase(value) {
  return String(value || '')
    .split(/\s+/)
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ''))
    .join(' ')
}

const catalogProducts = (source.catalogs || []).map((catalog, index) => {
  const sourceCategory = catalog.sub_sub_category_name || catalog.category_name || 'Jewelry'
  const category = categoryMap[sourceCategory] || sourceCategory
  const fallbackName = `Catalog ${catalog.id || index + 1}`
  const name = catalog.hero_product_name || catalog.name || fallbackName
  const productImage = catalog.product_images?.[0]?.url
  const image = catalog.images?.[0] || productImage || catalog.image || catalog.collage_image || ''
  const images = Array.from(
    new Set(
      [
        image,
        catalog.image,
        catalog.collage_image,
        ...(catalog.images || []),
        ...(catalog.product_images || []).map((product) => product.url),
      ].filter(Boolean),
    ),
  )
  const priceValue = catalog.min_product_price ?? catalog.min_catalog_price ?? null
  const detailLines = String(catalog.full_details || '').split(/\r?\n/)

  return {
    id: catalog.id || catalog.product_id || index + 1,
    productId: catalog.product_id || String(catalog.hero_pid || ''),
    slug: catalog.slug || slugify(name),
    name: titleCase(name),
    price: priceValue == null ? '' : `\u20b9${priceValue}`,
    priceValue,
    originalPrice: catalog.original_price ? `\u20b9${catalog.original_price}` : null,
    category,
    sourceCategory,
    material:
      detailLines.find((line) => /^Base Metal:|^Plating:|^Type:/i.test(line)) || sourceCategory,
    description: catalog.description || catalog.name || name,
    details: catalog.full_details || '',
    image,
    images,
    rating:
      catalog.supplier_reviews_summary?.average_rating_str ||
      catalog.supplier_reviews_summary?.average_rating ||
      null,
    reviewCount:
      catalog.supplier_reviews_summary?.rating_count ||
      catalog.supplier_reviews_summary?.review_count ||
      0,
    discountText: catalog.discount_text || '',
    meeshoUrl: catalog.consumer_share_text?.match(/https?:\/\/\S+/)?.[0] || '',
  }
})

const uniqueCatalogProducts = Array.from(
  new Map(catalogProducts.map((product) => [`${product.id}-${product.slug}`, product])).values(),
)

const file = `export const catalogProducts = ${JSON.stringify(uniqueCatalogProducts, null, 2)}\n`

fs.writeFileSync(outputPath, file)
console.log(`Wrote ${uniqueCatalogProducts.length} products to ${outputPath}`)
