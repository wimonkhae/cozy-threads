# Cozy Threads e-Commerce Web Application
Cozy Threads is an basic e-Commerce web application showcasing Stripe Payment features and functionalities. Customers will be able to log in, browse product catelogue, add and remove products from checkout cart, and securely make payment with hosted Stripe Checkout.

The demo application is live at [https://ecommerce-demo-ct.vercel.app](https://ecommerce-demo-ct.vercel)

Source Code: [Github](https://github.com/wimonkhae/cozy-threads)

![Homepage](/public/images/Cozy_Threads.png)

## Table of Contents
1. [Cozy Threads e-Commerce Web Application](#cozy-threads-e-commerce-web-application)
2. [Functionalities and Features](#functionalities-and-features)
3. [Deploying Locally](#deploying-locally)
   1. [Getting Started](#getting-started)
   2. [Configuring Environment Variables](#configuring-environment-variables)
   3. [Configuring Stripe Account](#configuring-stripe-account)
   4. [Running the application locally](#running-the-application-locally)
4. [Other Integrations](#other-integrations)
   1. [Integrating with your own MongoDB Atlas](#integrating-with-your-own-mongodb-atlas)
   2. [Integrating with your own google cloud project](#integrating-with-your-own-google-cloud-project)
5. [Deployment](#deployment)
6. [Testing](#Testing)
7. [Contributing](#contributing)
8. [Roadmap](#roadmap)


## Functionalities and Features
- The application uses Stripe Product and Prices APIs to retreive product information and display them.
- This demo uses Stripe Hosted Checkout with [adaptive pricing](https://dashboard.stripe.com/settings/adaptive-pricing) enabled for Checkout, providing the best in class user payment experience with little to no development time. 
- Payment methods are configured in the Stripe Dashboard under [Payment methods settngs](https://dashboard.stripe.com/test/settings/payment_methods)
- Log In with Stripe google account for quick access (for internal Stripe!). Access is restricted to users within Stripe organization.
- Log In with username and password (simulation of log in)
- MongoDB Atlas to store user information and orders for retreival of information.

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

The applicaiton utilize Next-auth with Google Providers. Next-Auth provides a quick intergration path. This is to enable quick sign in and forego the need for to enter username and password everytime they want to log in or create account. The **TEST ONLY**  Google Cloud project credentials is already added to the .env file. If you want you integrate your own Google Cloud project, please see intergration section below.


### Configuring Stripe Account
Product name, description and image as well as price information are being pull from your Stripe account. 
Featured product will have metadata = `'featured'` set to `'true'`
Product images are under `public` folder.

##### *TODO:* 
[ ] Create a `setup.js` script to populate Stripe Account product catalogue.

### Running the application locally
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
5. Navigate to Network Access, click 'Add IP Address'. Add your IP Adress or add `0.0.0.0/0 to` allow access of all IP Addresses
6. Navigate back to Database, click "Connect", Click "Drivers", here you will find your MongoDB URI. Copy the URI.
7. Add the URI to MONGODB_URI in your `.env` file. Ensure to change the `<password>` to your user password.


### Integrating with your own google cloud project
1. Sign up or log in to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one.
3. Navigate to ‘APIs & Services’ > ‘Credentials’.
4. Click on ‘Create Credentials’ and select ‘OAuth client ID’.
5. Select Web application’ as the application type.
6. Add your application’s URI to ‘Authorized redirect URIs’, For local development, add 2 URLs:
    + http://localhost:3000/ 
    + http://localhost:3000/api/auth/callback/google 
7. Once created, you’ll get your Client ID and Client Secret
8. In .env file, Add the Client ID to `GOOGLE_ID` and Client Secret to `GOOGLE_CLIENT_SECRET`


### Deployment
Deploying on Vercel. 
1. Sign up or log in to [Vercel](https://vercel.com/)
2. set your environment variable. This could be done by uploading .env file to vercel under project setting > Environment Variables.
3. once deploy, update `NEXTAUTH_URL` and `NEXTAUTH_URL_INTERNAL` within the environment variable in your Vercel project
4. update callback URL in [google cloud](https://console.cloud.google.com/) project, under 'Authorize Javascript origins', add the deployed URL (no trailing slash at the end of the URL) and add the same URL with trailing`/api/auth/callback/google` to the "Aurthorized redirect URIs" 
    + For example: `https://<vercel-project-name>.vercel.app/api/auth/callback/google`

### Testing
##### *TODO:* 
[ ] Create automate test scripts


### Contributing
##### *TODO:* 
[ ] Create contributing instruction


### Roadmap
##### *TODO:* 
[ ] Create demo roadmap & planning

