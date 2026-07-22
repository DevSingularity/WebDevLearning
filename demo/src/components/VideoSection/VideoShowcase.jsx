import { useRef, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import showcaseVideo from '../../assests/earring.mp4'
import { categories } from '../../data/jewelryData'
import FadeIn from '../Common/FadeIn'
import SectionHeader from '../Common/SectionHeader'

function VideoShowcase() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play()
    setIsPlaying(true)
  }

  return (
    <section id="showcase" className="bg-[#fbf7ef] py-16 sm:py-24">
      <div className="luxury-container grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <FadeIn className="group relative overflow-hidden rounded-t-full border border-espresso/10 bg-cream/45 p-2 shadow-[0_26px_80px_rgba(80,52,25,0.12)]">
          <video
            ref={videoRef}
            src={showcaseVideo}
            className="aspect-[4/4.35] w-full rounded-t-full object-cover transition duration-700 group-hover:scale-105 sm:aspect-[4/3.7]"
            playsInline
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
          {!isPlaying && (
            <>
              <div className="absolute inset-2 rounded-t-full bg-espresso/10" />
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Play jewelry showcase"
                className="absolute left-1/2 top-1/2 grid size-17 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cocoa/20 bg-white text-cocoa shadow-[0_18px_45px_rgba(52,35,20,0.2)] transition duration-300 hover:scale-110 hover:bg-cream"
              >
                <FaPlay className="ml-1" />
              </button>
            </>
          )}
        </FadeIn>

        <div>
          <SectionHeader
            eyebrow="The Language of Form"
            title="Designs beyond the everyday."
            text="Begin with a quiet glint for the day, then layer into pieces with more presence after dark. Each silhouette is chosen to feel polished without feeling loud."
          />
          <FadeIn delay={0.12} className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
            {categories.slice(0, 3).map((category) => (
              <a
                key={category.name}
                href={`/collections/${category.slug}`}
                className="group border border-espresso/10 bg-[#fffdf8] p-1.5 text-center shadow-[0_12px_34px_rgba(80,52,25,0.07)] transition duration-300 hover:-translate-y-1 sm:p-2"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="mx-auto aspect-square w-full rounded-t-full object-cover transition duration-500 group-hover:scale-95"
                />
                <div className="py-3">
                  <h3 className="font-serif text-base font-semibold text-espresso sm:text-xl">{category.name}</h3>
                </div>
              </a>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default VideoShowcase
