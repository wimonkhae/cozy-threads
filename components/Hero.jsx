// import "@styles/globals.css";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden flex justify-center sm:m-0">
      <div
        className="bg-[var(--color-dark-green)] w-full max-h-[884px] max-w-[1560px] flex items-center bg-cover bg-[revert] bg-no-repeat sm:bg-cover sm:bg-center"
        style={{
          backgroundImage: `url('https://kater-ecommerce.s3.eu-west-1.amazonaws.com/ethical-sourcing.jpg')`,
        }}
      >
        <div className="py-10 px-14 flex flex-col justify-center p-[15%_var(--gutter-h)] w-full md:p-[10%_30px] sm:p-[50px_30px]">
          <h5 className="text-white text-6xl font-bold mb-6">PREMIUM QUALITY</h5>
          <h1 className="text-white text-xl font-bold mb-10">Ethically sourced apparel and accessories</h1>

          <Link href="/products">
            <button className="bg_color hover:bg-green-900 text-base text-white py-2 px-4 rounded-[10px] transition-colors duration-300 flex flex-wrap self-start mr-auto">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>
    </section> 
  )
}

export default Hero
