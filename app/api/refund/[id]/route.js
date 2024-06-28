const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request, {params}) {
  

  try {
    
    const refund = await stripe.refunds.create({
      payment_intent: params.id,
      reason: 'requested_by_customer'
    })


    return new Response(JSON.stringify(refund), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Error creating Stripe refund:', err);
    return new Response(
      JSON.stringify({ message: 'Error creating Stripe refund' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

