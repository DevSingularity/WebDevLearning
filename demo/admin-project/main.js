const STORAGE_KEY = 'utsav-admin-project-products'
const form = document.querySelector('#productForm')
const list = document.querySelector('#productList')
const preview = document.querySelector('#preview')
const upload = document.querySelector('#imageUpload')
const exportButton = document.querySelector('#exportProducts')
let uploadedImage = ''

function slugify(value) {
  return String(value || 'product').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'product'
}

function getProducts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  renderProducts()
}

function renderProducts() {
  const products = getProducts()
  list.innerHTML = products.length ? '' : '<p>No products added yet.</p>'

  products.forEach((product) => {
    const card = document.createElement('article')
    card.className = 'product-card'
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3>${product.name}</h3>
        <p>${product.category} ? ?${product.priceValue}</p>
        <span class="badge">${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
      </div>
      <div class="actions">
        <button class="secondary" data-stock="${product.id}" data-value="${!product.inStock}">${product.inStock ? 'Mark Out' : 'Mark In'}</button>
        <button data-delete="${product.id}">Delete</button>
      </div>
    `
    list.append(card)
  })
}

upload.addEventListener('change', () => {
  const file = upload.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    uploadedImage = reader.result
    preview.src = uploadedImage
    preview.hidden = false
  }
  reader.readAsDataURL(file)
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const name = data.get('name')
  const image = uploadedImage || data.get('image') || './placeholder.png'
  const product = {
    id: Date.now(),
    productId: `admin-${Date.now()}`,
    slug: slugify(name),
    name,
    priceValue: Number(data.get('price')),
    category: data.get('category'),
    description: data.get('description'),
    image,
    images: [image],
    inStock: data.get('stock') === 'in',
    details: `Category: ${data.get('category')}\nDispatch: 2-2 Days`,
  }
  saveProducts([product, ...getProducts()])
  form.reset()
  uploadedImage = ''
  preview.hidden = true
})

list.addEventListener('click', (event) => {
  const deleteId = event.target.dataset.delete
  const stockId = event.target.dataset.stock

  if (deleteId) {
    saveProducts(getProducts().filter((product) => String(product.id) !== deleteId))
  }

  if (stockId) {
    saveProducts(getProducts().map((product) => String(product.id) === stockId ? { ...product, inStock: event.target.dataset.value === 'true' } : product))
  }
})

exportButton.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(getProducts(), null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'utsav-products.json'
  link.click()
  URL.revokeObjectURL(url)
})

renderProducts()
