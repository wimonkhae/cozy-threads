const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const reqBody = await request.json();

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      automatic_tax: { enabled : true},
      line_items: reqBody.line_items,
      return_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log('====================================');
    console.log('Stripe Embeded Checkout Session:', session);
    console.log('====================================');

    return new Response(JSON.stringify({ clientSecret: session.client_secret }));
  } catch (err) {
    console.error('Error creating Stripe checkout session:', err);
    return new Response(JSON.stringify({ message: 'Error creating Stripe checkout session' }), { status: err.statusCode || 500 });
  }
}

export async function GET(request) {
  try {
    const session = await stripe.checkout.sessions.retrieve(request.url.searchParams.get('session_id'));

    return new Response(
      JSON.stringify({
        status: session.status,
        customer_email: session.customer_details?.email,
      })
    );
  } catch (err) {
    console.error('Error retrieving Stripe checkout session:', err);
    return new Response(JSON.stringify({ message: 'Error retrieving Stripe checkout session' }), { status: err.statusCode || 500 });
  }
}