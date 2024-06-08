
import { getFeaturedProductsData } from "@utils/stripe";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Image from "next/image";

export default async function FeaturedProducts () {
    const productData = await getFeaturedProductsData();
 
    return (
        <section className="py-10 px-14">
            <div className="flex items-center space-x-2 mb-6">
                <h3 className="text-xl font-bold pr-2">Featured Products</h3>

                <Link 
                    href="/products"
                    className="flex items-center space-x-2 hover:text-gray-300">
                        <p className="mt-1 flex flex-col items-center">Shop All</p>
                        <button className="flex items-center pt-1">
                            <Image src="/icons/arrow-right.svg" alt='arrow-right' width={24} height={24} />
                        </button>
                </Link>
            </div>
            <div className="container max-w-[1560px] w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productData.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
      </section>
  )
}
