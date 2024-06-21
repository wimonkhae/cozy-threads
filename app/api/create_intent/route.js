const stripe = require("stripe")("sk_test_51PLngWBtNUwkIEohQWxewn4iUZ9mq8XVNqs3I5Qdh2ZVT3jdGLefboi84Pwk2Ef9Dac6dCd6pJcBJWET722FKq1D006IwX1q0Y");

export default async function handler(req, res) {
    const { amount } = await req.body();
    console.log("amount ", amount);
  if (req.method === 'POST') {
    try {
      const intent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        automatic_payment_methods: {enabled: true},
      });
      res.status(200).json({ client_secret: intent.client_secret });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}