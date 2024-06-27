
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PaymentElementForm from "./paymentElementForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentElement({cart}) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect( () => {

    const fetchPaymentIntent = async () => {
        try {
          const response = await fetch('/api/create_intent', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cart: cart,
              customer: localStorage.getItem('cusId'),
              paymentElement: 'true'
            }),
          });
    
          if (response.ok) {
            const { client_secret } = await response.json();
            setClientSecret(client_secret);
          } else {
            console.error('Error creating Payment Intent:', response.status);
          }
        } catch (error) {
          console.error('Error creating Payment Intent:', error);
        }
      };
    
      fetchPaymentIntent();
    }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="my-4">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentElementForm />
        </Elements>
      )}
    </div>
  );
}