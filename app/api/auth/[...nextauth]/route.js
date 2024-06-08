import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.cusId = sessionUser?.cusId

      return session;
    },
    async signIn({ account, profile, user, credentials, session }) {
      
      try {
        //connect to mongoDB
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {

          //create Stripe Customer and save Cus ID in DB
          const customer = await stripe.customers.create({
            name: profile.name,
            email: profile.email,
          });

          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            cusId: customer.id
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }