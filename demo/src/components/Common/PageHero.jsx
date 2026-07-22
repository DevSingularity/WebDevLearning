import FadeIn from './FadeIn'

function PageHero({ eyebrow, title, text, image }) {
  return (
    <section className="relative overflow-hidden bg-[#f8f3ea] px-4 py-10 text-espresso sm:py-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-12rem] top-[-12rem] size-[28rem] rounded-full border border-cocoa/10" />
        <div className="absolute right-[-10rem] top-12 size-[26rem] rounded-full bg-sand/20 blur-3xl" />
      </div>
      <div className="luxury-container relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-cocoa">
            {eyebrow}
          </div>
          <h1 className="font-serif text-[3.8rem] font-semibold leading-[0.82] text-espresso sm:text-7xl lg:text-8xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">{text}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-6 rounded-t-full border border-cocoa/20 bg-white/55" />
          <img
            src={image}
            alt=""
            className="relative aspect-[4/3.65] w-full rounded-t-full border border-white/80 object-cover shadow-[0_28px_90px_rgba(80,52,25,0.14)]"
          />
        </FadeIn>
      </div>
    </section>
  )
}

export default PageHero
