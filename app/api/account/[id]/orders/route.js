import Order from '@models/order';
import { connectToDB } from '@utils/database';

export const GET = async(request, { params }) => {
    console.log("get user order from cusId ", params.id);

    try {
        //retrieve order from db
        await connectToDB();
        const orders = await Order.find({ cusId: params.id });

        // Return the orders as a response
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.error('Error retrieving orders:', error);
        return new Response(
            JSON.stringify({ error: 'There was an error retrieving the orders' }),
            { status: 500 }
        )
    }

}