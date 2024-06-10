const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const query = new URL(request.url).searchParams.get('query');

  if (query === 'all') {
    try {
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
            price: price.unit_amount / 100,
          };
        })
      );

      return new Response(
        JSON.stringify(allProductData),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'Error fetching product data.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

  if (query === 'featured') {
    try {
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

      return new Response(
        JSON.stringify(featuredProductsData),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Error fetching featured product data:', error);
      return new Response(
        JSON.stringify({ message: 'Error fetching featured product data.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

  return new Response(
    JSON.stringify({ message: 'Invalid query parameter.' }),
    {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}