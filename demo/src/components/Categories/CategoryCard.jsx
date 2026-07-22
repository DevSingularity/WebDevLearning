function CategoryCard({ category }) {
  return (
    <article className="group relative overflow-hidden border border-espresso/10 bg-[#fffdf8] p-2 shadow-[0_14px_42px_rgba(80,52,25,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(80,52,25,0.12)]">
      <div className="overflow-hidden rounded-t-full bg-cream/45">
        <img
          src={category.image}
          alt={category.name}
          className="aspect-[4/4.6] w-full rounded-t-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="px-3 py-4 text-center">
        <h3 className="font-serif text-2xl font-semibold leading-none text-espresso sm:text-3xl">{category.name}</h3>
        <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-cocoa">Explore now</p>
      </div>
    </article>
  )
}

export default CategoryCard
