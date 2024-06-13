import Order from '@models/order';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    // Retrieve order from the database
    await connectToDB();
    const order = await Order.findById(params.id);

    // Check if the order was found
    if (order) {
      return new Response(JSON.stringify(order), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error retrieving order:', error);
    return new Response(
      JSON.stringify({ error: 'There was an error retrieving the order' }),
      { status: 500 }
    );
  }
};