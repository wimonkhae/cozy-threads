import Order from '@models/order';
import guestOrder from '@models/guestOrder';
import { connectToDB } from '@utils/database';


export async function POST(request) {
    const reqBody = await request.json();
    let useId = reqBody.userId

    try {
        //connect to mongoDB
        await connectToDB();

        //if no login user, create a guest user
        if (!reqBody.userId) {
                    //create new order document in DB
            const newGuestOrder = new guestOrder({
                user: reqBody.userId,
                cartItems: reqBody.cart,
                cusId: reqBody.customer,
                paymentIntent: reqBody.pi,
                status: reqBody.status,
                totalAmount: `$${reqBody.totalAmount}`,
                pi_created: reqBody.pi_created,
            });

            //save to db
            await newGuestOrder.save()

            return new Response(
                JSON.stringify(newGuestOrder, { status: 201 })
            )
        };
        if (reqBody.userId) {
            //create new order document in DB
            const newOrder = new Order({
                user: reqBody.userId,
                cartItems: reqBody.cart,
                cusId: reqBody.customer,
                paymentIntent: reqBody.pi,
                status: reqBody.status,
                totalAmount: `$${reqBody.totalAmount}`,
                pi_created: reqBody.pi_created,
            });

            //save to db
            await newOrder.save()

            return new Response(
                JSON.stringify(newOrder, { status: 201 })
            )
        }

    } catch (error) {
        console.error('Error saving order:', error);
        return new Response(
            JSON.stringify({ error: 'There was an error saving the order' }),
            { status: 500 }
        );
    }

};