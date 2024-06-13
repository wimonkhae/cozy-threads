import Hero from "@components/Hero";
import FeaturedProducts from "@components/FeaturedProducts";

// export const metadata = {
//   title: "Cozy Threads",
//   description: "Ethically-source apparel and accessories",
// };

const Home = () => {
  
  return (
    <section className="w-full flex-center flex-col">
      <Hero />
      <FeaturedProducts/>
    </section>
  )
}

export default Home
