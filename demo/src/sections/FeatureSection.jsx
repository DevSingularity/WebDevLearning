import FeatureCard from '../components/Features/FeatureCard'
import { featureItems } from '../data/jewelryData'

function FeatureSection() {
  const movingItems = [...featureItems, ...featureItems]

  return (
    <section id="features" className="bg-[#f1eadf] py-10 sm:py-12">
      <div className="luxury-container overflow-hidden border-y border-espresso/10 bg-[#f8f3ea] shadow-[0_18px_60px_rgba(80,52,25,0.06)]">
        <div className="feature-marquee flex w-max md:grid md:w-auto md:grid-cols-4">
          {movingItems.map((item, index) => (
            <FeatureCard key={`${item.title}-${index}`} item={item} index={index % featureItems.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
