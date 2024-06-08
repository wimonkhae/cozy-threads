import Hero from "@components/Hero";
import FeaturedProducts from "@components/FeaturedProducts";

const Home = () => {
  
  return (
    <section className="w-full flex-center flex-col">
      <Hero />
      <FeaturedProducts/>
    </section>
  )
}

export default Home
