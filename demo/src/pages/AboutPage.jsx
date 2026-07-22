import { FaCheck } from 'react-icons/fa'
import { aboutImages, aboutStats, atelierValues, featureItems } from '../data/jewelryData'
import FadeIn from '../components/Common/FadeIn'
import PageHero from '../components/Common/PageHero'
import SectionHeader from '../components/Common/SectionHeader'
import FeatureCard from '../components/Features/FeatureCard'

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Maison YourShopName"
        title="A quieter language of adornment."
        text="YourShopName is built around pieces that feel personal: warm in tone, precise in detail, and considered enough to become part of a daily ritual."
        image={aboutImages.editorial}
      />

      <section className="bg-[#fbf7ef] py-16 sm:py-24">
        <div className="luxury-container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn className="grid grid-cols-2 gap-4">
            <img
              src={aboutImages.editorial}
              alt="Jewelry editorial portrait"
              className="aspect-[4/5] rounded-t-full border border-white/80 object-cover shadow-[0_22px_70px_rgba(80,52,25,0.12)]"
            />
            <img
              src={aboutImages.product}
              alt="Fine jewelry product"
              className="mt-12 aspect-[4/5] rounded-t-full border border-white/80 object-cover shadow-[0_22px_70px_rgba(80,52,25,0.12)]"
            />
          </FadeIn>

          <div>
            <SectionHeader
              eyebrow="Our Atelier"
              title="Made for the moments between occasions."
              text="Our work begins with restraint: a curve, a glint, a proportion that feels right. Each piece is selected to bring polish without excess."
            />
            <FadeIn delay={0.12} className="mt-8 space-y-3">
              {atelierValues.map((value) => (
                <div key={value} className="flex items-center gap-3 border border-espresso/10 bg-[#fffdf8] p-3 pr-5 shadow-[0_12px_34px_rgba(80,52,25,0.05)]">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-espresso text-xs text-white">
                    <FaCheck />
                  </span>
                  <p className="text-sm font-medium leading-6 text-stone-700">{value}</p>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-[#f1eadf] py-14">
        <div className="luxury-container grid gap-3 md:grid-cols-3">
          {aboutStats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.08}>
              <div className="border-y border-espresso/10 bg-[#f8f3ea] p-8 text-center shadow-[0_18px_50px_rgba(80,52,25,0.06)]">
                <p className="font-serif text-6xl font-semibold text-espresso">{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.24em] text-cocoa">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-[#fbf7ef] py-16 sm:py-24">
        <div className="luxury-container">
          <SectionHeader
            align="center"
            eyebrow="Our Standard"
            title="Nothing leaves unfinished."
            text="From the first look to the final clasp, every touchpoint is handled with the same care as the piece itself."
            className="max-w-2xl"
          />
          <div className="mt-10 grid justify-items-center gap-0 overflow-hidden border-y border-espresso/10 bg-[#f8f3ea] md:grid-cols-4 md:justify-items-stretch">
            {featureItems.map((item, index) => (
              <FeatureCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
