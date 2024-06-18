const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const priceId = new URL(request.url).searchParams.get('price_id');

  if (!priceId) {
    return new Response(
      JSON.stringify({ message: 'price ID not found in the request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const price = await stripe.prices.retrieve(priceId, {
      expand: ['product']
    });

    return new Response(
      JSON.stringify({
        product_name: price.product.name,
        image: price.product.images[0],
        amount: price.unit_amount/100,
        product_id: price.product.id,
        price_id: price.id

      })
    );

  } catch (err) {
    console.error('Error retrieving product and price:', err);
    return new Response(
      JSON.stringify({ message: 'Error retrieving product and price' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
}