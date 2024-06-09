import ProductCard from "@components/ProductCard";
import { getAllProductData } from "@utils/stripe";

export default async function Products() {
  const productData = await getAllProductData();

  return (
    <section className="relative overflow-hidden sm:m-0 flex flex-col items-center py-10">
      <h3 className="text-3xl font-bold mb-10 flex  w-full px-14">        
        All Products
      </h3>
      <div className="container max-w-[1560px] w-full px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productData.map((product) => (
              <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

