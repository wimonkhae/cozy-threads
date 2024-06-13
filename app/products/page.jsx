"use client";

import { CartContext } from "@app/layout";
import ProductCard from "@components/ProductCard";
import { useContext, useEffect, useState } from "react";

export default function Products() {
  const { productData,  setProductData } = useContext(CartContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllProductData = async () => {
      try {
        const response = await fetch(`/api/products?query=all`);
        if (response.ok) {
          const prodData = await response.json();
          setProductData(prodData);
          localStorage.setItem('productData', JSON.stringify(prodData))

        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Error fetching product details.');
        }
      } catch (error) {
        setError(error.message || 'Error fetching product details.');
      }
    };

    getAllProductData();
  }, [setProductData]);


  if (error) {
    return (
      <section className="relative overflow-hidden sm:m-0 flex flex-col items-center py-10">
        <h3 className="text-3xl font-bold mb-10 flex  w-full px-14">Error</h3>
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (!productData) {
    return (
      <section className="relative overflow-hidden sm:m-0 flex flex-col items-center py-10">
        <h3 className="text-3xl font-bold mb-10 flex text-center w-full px-14">Loading...</h3>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden sm:m-0 flex flex-col items-center py-10 ">
      <h3 className="text-3xl font-bold mb-10   w-full text-center px-14">All Products</h3>
      <div className="container max-w-[100%] w-full px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}