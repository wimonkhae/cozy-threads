const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
    const cusId = new URL(request.url).searchParams.get('cus_id');

    if (!cusId) {
        return new Response(
          JSON.stringify({ message: 'Customer ID not found in the request' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
    
        const paymentIntents = await stripe.paymentIntents.list({
            customer: cusId,
            limit: 10,
        })
       
        return new Response(
          JSON.stringify({
            paymentIntents
    
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