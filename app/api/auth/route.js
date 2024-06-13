import User from '@models/user';
import { connectToDB } from '@utils/database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export async function POST(request) {
    const reqBody = await request.json()
    try {
        //connect to mongoDB
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: reqBody.email });
        let user = userExists

        // if not, create a new document and save user in MongoDB
        if (!userExists) {

            //create Stripe Customer and save Cus ID in DB
            const customer = await stripe.customers.create({
                name: reqBody.name,
                email: reqBody.email,
            });

            user = await User.create({
                email: reqBody.email,
                username: reqBody.name.replace(" ", "").toLowerCase(),
                cusId: customer.id,
                password: reqBody.password
            });
        }
            return new Response(JSON.stringify({ user: user }),{
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.log("Error checking if user exists: ", error.message);
            return new Response(
                JSON.stringify({ message: 'Error creating/retrieving user' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
              );
        }
}