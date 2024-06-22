import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const reqBody = await req.json();

      // Calculate the total amount
      const cart = reqBody.cart
      const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const totalAmount = (Math.round(total * 100)); // Convert to cents

      let body = {
        amount: totalAmount,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        // metadata: { cart: JSON.stringify(reqBody.cart) }, too long 500 characters limit
      };
    
      if (reqBody?.customer) {
        body.customer = reqBody.customer;
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