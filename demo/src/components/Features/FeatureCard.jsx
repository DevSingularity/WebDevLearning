import FadeIn from '../Common/FadeIn'

function FeatureCard({ item, index }) {
  const Icon = item.icon

  return (
    <FadeIn delay={index * 0.08}>
      <article className="group h-full w-[min(78vw,18rem)] shrink-0 border-espresso/10 px-6 py-8 text-center transition duration-300 hover:bg-white/45 md:w-auto md:border-r last:md:border-r-0">
        <div className="mx-auto mb-4 hidden size-13 place-items-center rounded-full border border-cocoa/20 bg-[#fffdf8] text-cocoa transition duration-300 group-hover:bg-espresso group-hover:text-white sm:grid">
          <Icon className="text-xl" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-espresso">{item.title}</h3>
        <p className="mx-auto mt-2 max-w-52 text-xs leading-6 text-stone-600">{item.text}</p>
      </article>
    </FadeIn>
  )
}

export default FeatureCard
