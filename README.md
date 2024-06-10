

# Cozy Threads e-Commerce Web Application
Cozy Threads is an basic e-Commerce web application showcasing Stripe Payment functionalities. Customers will be able to browse product catelogue on Cozy Threads e-Commerce website, add and remove products from checkout cart, securely make payment with hosted Stripe Checkout.

The demo application is live at [https://ecommerce-demo-ct.vercel.app](https://ecommerce-demo-ct.vercel)

![Homepage](/public/images/Cozy_Threads.png)


## Functionalities and Features
- The application uses Stripe Product and Prices APIs.
- This demo uses Stripe Hosted Checkout with [adaptive pricing](https://dashboard.stripe.com/settings/adaptive-pricing) enabled for Checkout, providing the best in class user payment experience with little to no development time. 
- Payment methods are configured in the Stripe Dashboard under [Payment methods settngs](https://dashboard.stripe.com/test/settings/payment_methods)

## Deploying Locally

Below is the instruction to deploy this application running locally on [localhost:3000](http://localhost:3000/)

### Getting Started

Clone the repo and install dependencies.
```bash
$ git clone https://github.com/wimonkhae/ecommerce-demo.git

$ npm install
```
### Configuring Environment Variables
Add your Stripe API keys and secret to your .env file.
```bash
cp .env.example .env
```
This application uses MongoDB for as Database. The publicly available **TEST ONLY** MongoDB Atlas URI has already been added to the .env file. If you want you integrate your own Mongo DB Atlas, please see intergration section below.

### Configuring Stripe Account
Product name, description and image as well as price information are being pull from your Stripe account. 
Featured product will have metadata = `'featured'` set to `'true'`
Product images are under `public` folder.

##### TODO: 
- [ ]Create a `setup.js` script to populate Stripe Account product catalogue.

### Running the application
```bash
$ npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Other Integrations

### Integrating with your own MongoDB Atlas
1. Sign up or Sign in to MongoDB Atlas
2. Click "Create" to create cluster
3. Select "Shared" cluster and click "Create Cluster"
4. Navigate to Database Access. Create Database User or edit the existing user password (make sure you know the password)
5. Navigate to Network Access, click 'Add IP Address'. Add your IP Adress or add 0.0.0.0/0 to allow access of all IP Addresses
6. Navigate back to Database, click "Connect", Click "Drivers", here you will find your MongoDB URI. Copy the URI.
7. Add the URI to MONGODB_URI in your `.env` file. Ensure to change the `<password>` to your user password.



### Integrating with your own google cloud project
Ref: [Next-Auth Guid](https://karthickragavendran.medium.com/setup-guide-for-nextauth-with-google-and-credentials-providers-in-next-js-13-8f5f13414c1e)

This project utilize NextAuth with Google Providers. This is to enable quick sign in. This forego the need for to enter username and password everytime they want to log in or create account.

1. Sign up or log in to [Google Cloud Platform](https://console.cloud.google.com/)
2. Create a new project or select an existing one.
3. Navigate to ‘APIs & Services’ > ‘Credentials’.
4. Click on ‘Create Credentials’ and select ‘OAuth client ID’.
5. Select Web application’ as the application type.
6. Add your application’s URI to ‘Authorized redirect URIs’, For local development, add 2 URLs:
    + http://localhost:3000/ 
    + http://localhost:3000/api/auth/callback/google 
7. Once created, you’ll get your Client ID and Client Secret
8. In .env file, Add the Client ID to GOOGLE_ID and Client Secret to GOOGLE_CLIENT_SECRET



### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

1. set your environment variable. This could be done by uploading .env file to vercel under project setting > Environment Variables
2. [Ignore build steps](https://vercel.com/guides/how-do-i-use-the-ignored-build-step-field-on-vercel) by adding below command to Build Command under project setting > General > Build & Development Settings
`if [ "$VERCEL_ENV" == "production" ]; then exit 1; else exit 0; fi`
3. once deploy, update NEXTAUTH_URL and NEXTAUTH_URL_INTERNAL within the environment variable in your Vercel project
4. update callback URL in [google cloud](https://console.cloud.google.com/) project, under 'Authorize Javascript origins', add the deployed URL (no trailing slash at the end of the URL) and add the same URL with trailing`/api/auth/callback/google` to the "Aurthorized redirect URIs" 
    + Example: https://{vercel-project-name}.vercel.app/api/auth/callback/google

