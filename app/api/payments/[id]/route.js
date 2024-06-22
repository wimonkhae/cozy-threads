const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const GET = async (request, { params }) => {

    console.log('getting PI', params.id);
    const id = params.id

    try {

        //getting a payment intent
        if (id.startsWith('pi')){

            console.log('retreive a PI');
            const paymentIntent = await stripe.paymentIntents.retrieve(id, {
                expand: ['latest_charge']
            });

            if (paymentIntent) {
                return new Response(JSON.stringify(paymentIntent), {
                    status: 200
                });
            } else {
                return new Response(JSON.stringify({error: "Customer's PI not found "}), {
                    status: 404
                });
            }
           
        } else {
            const paymentIntentList = []

            //retreiving customer payment intents 
            for await (const payment of  stripe.paymentIntents.list({
              customer: params.id,
              expand: ['data.latest_charge']
    
            })) {
                //getting line items from checkout session
                const sessions = await stripe.checkout.sessions.list({
                    payment_intent: payment.id,
                    expand: ['data.line_items']
                })
    
                if (sessions.data.length > 0) {
                    payment.line_items = sessions.data[0].line_items
                }
    
                paymentIntentList.push(payment)
            }
    
            console.log(paymentIntentList.length);
    
            //return payment list 
            if (paymentIntentList) {
                return new Response(JSON.stringify(paymentIntentList), {
                    status: 200
                });
            } else {
                return new Response(JSON.stringify({error: "Customer's payments not found "}), {
                    status: 404
                });
            }
        }

    } catch (error) {
        console.error("Error retrieving customer's payments ")
        return new Response(JSON.stringify({error: "Error retrieving customer's payments "}), {
            status: 500
        });
    }
}