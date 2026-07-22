import { categories } from '../data/jewelryData'
import CategoryCard from '../components/Categories/CategoryCard'
import FadeIn from '../components/Common/FadeIn'
import PageHero from '../components/Common/PageHero'
import PrimaryButton from '../components/Common/PrimaryButton'
import SectionHeader from '../components/Common/SectionHeader'
import categoriesHeroImage from '../assests/categories-hero.png'

function CategoriesPage({ categorySlug }) {
  const selectedCategory = categories.find((category) => category.slug === categorySlug)
  const visibleCategories = selectedCategory ? [selectedCategory] : categories

  return (
    <>
      <PageHero
        eyebrow="The Collections"
        title="Begin with the silhouette."
        text="Each collection is arranged by how it is worn: close to the face, layered at the neckline, or kept as a subtle finishing detail."
        image={categoriesHeroImage}
      />

      <section className="hidden bg-[#fbf7ef] py-16 sm:block sm:py-20">
        <div className="luxury-container grid overflow-hidden border border-espresso/10 bg-[#fffdf8] shadow-[0_28px_90px_rgba(80,52,25,0.1)] lg:grid-cols-[1fr_0.9fr]">
          <FadeIn className="flex min-h-full flex-col justify-between p-8 sm:p-12">
            <SectionHeader
              eyebrow="The Styling Ritual"
              title="Compose your own balance."
              text="Move through earrings, necklaces, bangles, and finishing pieces with a clear eye for proportion, shine, and mood."
            />
            <PrimaryButton href="/collections" className="self-start">
              Shop the Collections
            </PrimaryButton>
          </FadeIn>
          <img
            src="https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=900&q=85"
            alt="Editorial jewelry capsule"
            className="h-full min-h-96 w-full rounded-t-full object-cover p-3"
          />
        </div>
      </section>

      <section id="category-shop" className="scroll-mt-28 bg-[#f8f3ea] pb-20 sm:pb-28">
        <div className="luxury-container">
          <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-3 sm:gap-5">
            {visibleCategories.map((category, index) => (
              <FadeIn key={category.name} delay={index * 0.08} className="w-[78vw] max-w-72 shrink-0 sm:w-72 lg:w-[calc((100%_-_5rem)/5)] lg:max-w-none">
                <a href={`/collections/${category.slug}`} className="block">
                  <CategoryCard category={category} />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default CategoriesPage
