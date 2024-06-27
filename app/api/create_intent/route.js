import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function calculateTotalAmount(cart) {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

function createLineItems(cart) {
  return cart.map((item) => ({
    price: item.price_id,
    quantity: item.quantity,
  }));
}

export async function POST(req) {
  try {
    const reqBody = await req.json();
    console.log("pi", reqBody);

    const { cart, customer } = reqBody

      const totalAmount = Math.round(calculateTotalAmount(cart) * 100); // Convert to cents
      const lineItems = createLineItems(cart);
  

      let body = {
        amount: totalAmount,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
      };
    
      if (customer) {
        body.customer = customer;
        body.metadata = {customer: customer}
      }

      if (lineItems){
        body.metadata =  { line_items: JSON.stringify(lineItems) }
      }
    
    const intent = await stripe.paymentIntents.create(
      body,
    );

    return NextResponse.json({ client_secret: intent.client_secret });

  } catch (err) {
    console.error('Error creating Payment Intent:', err);
    return NextResponse.json(
      { message: 'Error creating Payment Intent' },
      { status: 500 }
    );
  }
}