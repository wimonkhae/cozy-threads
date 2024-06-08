import Order from '@models/order';
import { connectToDB } from '@utils/database';


export async function POST(request) {
    
    const reqBody = await request.json();
    try {
        //connect to mongoDB
        await connectToDB();
        
        const newOrder = new Order({
            user: reqBody.userId,
            cartItems: reqBody.cart,
            cusId: reqBody.customer,
            paymentIntent: reqBody.pi,
            status: reqBody.status,
            totalAmount: reqBody.totalAmount,
        });

        //save to db
        await newOrder.save()

        return new Response(
            JSON.stringify(newOrder, { status: 201 })
        )
    } catch (error) {
        console.error('Error saving order:', error);
        return new Response(
            JSON.stringify({ error: 'There was an error saving the order' }),
            { status: 500 }
        );
    }

};


export async function GET(request) {
    console.log("getting user orders from DB");
    const userId = new URL(request.url).searchParams.get('user_id');
    console.log(userId);
    try {
        await connectToDB();

        const orders = await Order.find({ user: userId });
        console.log("user orders", orders);

        
        // Return the orders as a response
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.error('Error retrieving orders:', error);
        return new Response(
            JSON.stringify({ error: 'There was an error retrieving the orders' }),
            { status: 500 }
        )
    }
};