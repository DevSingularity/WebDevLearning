import CategoryCard from '../components/Categories/CategoryCard'
import SectionHeader from '../components/Common/SectionHeader'
import { categories } from '../data/jewelryData'

function CategorySection() {
  return (
    <section id="categories" className="bg-[#f8f3ea] py-16 sm:py-24">
      <div className="luxury-container">
        <div className="mb-8 flex items-end justify-between gap-5 border-b border-espresso/10 pb-6 sm:mb-10">
          <SectionHeader
            eyebrow="Shop by Category"
            title="Begin with the silhouette."
            text="Earrings, bangles, necklaces, and finishing pieces arranged with the same editorial restraint as the header."
            className="max-w-2xl"
          />
        </div>
        <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-3 sm:gap-5">
          {categories.map((category) => (
            <a key={category.name} href={`/collections/${category.slug}`} className="block w-[78vw] max-w-72 shrink-0 sm:w-72 lg:w-[calc((100%_-_5rem)/5)] lg:max-w-none">
              <CategoryCard category={category} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
