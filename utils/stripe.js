import { log } from "console";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export const getAllProductData = async () => {
  const products = await stripe.products.list();
  
  const allProductData = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.retrieve(product.default_price);
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        price_id: price.id,
        price: price.unit_amount / 100, // Convert cents to dollars
      };
    })
  );

  return allProductData;
}

export const getFeaturedProductsData = async () => {

const products = await stripe.products.search({
  query: 'active:\'true\' AND metadata[\'featured\']:\'true\'',
});

  const featuredProductsData = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.retrieve(product.default_price);
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        price_id: price.id,
        price: price.unit_amount / 100,
      };
    })
  );
 
  return featuredProductsData;
};

