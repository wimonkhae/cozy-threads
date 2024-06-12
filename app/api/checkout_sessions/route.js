const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const reqBody = await request.json();

  let body = {
    mode: 'payment',
    line_items: reqBody.line_items,
    metadata: { cart: JSON.stringify(reqBody) },
    payment_intent_data: {
      metadata: {
        cart: JSON.stringify(reqBody),
      },
    },
    success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${request.headers.get('origin')}/cancel?session_id={CHECKOUT_SESSION_ID}`,
  };

  if (reqBody?.customer) {
    body.customer = reqBody.customer;
  }

  
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(
      body
  );


    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Error creating Stripe checkout session:', err);
    return new Response(
      JSON.stringify({ message: 'Error creating Stripe checkout session' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET(request) {

  try {
    const sessionId = new URL(request.url).searchParams.get('session_id');
    if (!sessionId) {
      return new Response(
        JSON.stringify({ message: 'Session ID not found in the request' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand:['payment_intent', 'line_items', 'payment_intent.latest_charge']
      });


    return new Response(
      
      JSON.stringify({
        id: session.payment_intent.id,
        status: session.payment_intent.status,
        amount: "$" + session.payment_intent.amount / 100,
        line_items: session.payment_intent.metadata,
        recieptUrl: session.payment_intent.latest_charge.receipt_url,
        customer: session.payment_intent.customer || 'Guest',
        created: new Date(session.created * 1000).toDateString()
      })
    );
  } catch (err) {
    console.error('Error retrieving Stripe checkout session:', err);
    return new Response(
      JSON.stringify({ message: 'Error retrieving Stripe checkout session' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}