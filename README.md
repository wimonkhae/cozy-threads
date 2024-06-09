This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Integrating with your own google cloud project

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



## Integrating with your own MongoDB Atlas
1. Sign up or Sign in to MongoDB Atlas
2. Click "Create" to create cluster
3. Select "Shared" cluster and click "Create Cluster"
4. Navigate to Database Access. Create Database User or edit the existing user password (make sure you know the password)
5. Navigate to Network Access, click 'Add IP Address'. Add your IP Adress or add 0.0.0.0/0 to allow access of all IP Addresses
6. Navigate back to Database, click "Connect", Click "Drivers", here you will find your MongoDB URI. Copy the URI.
7. Add the URI to MONGODB_URI in your `.env` file. Ensure to change the `<password>` to your user password.

## Deploy to Vercel
1. set your environment variable. This could be done by uploading .env file to vercel under project setting > Environment Variables
2. [Ignore build steps](https://vercel.com/guides/how-do-i-use-the-ignored-build-step-field-on-vercel) by adding below command to Build Command under project setting > General > Build & Development Settings
`if [ "$VERCEL_ENV" == "production" ]; then exit 1; else exit 0; fi`

## Extra tool
Install Prettier
`npm install --save-dev --global --save-exact prettier`

Use 'eslint-plugin-prettier' plugin to combine ESLint and Prettier which allows ESLint to show formatting errors and ESLint issue and use 'eslint-config-prettier' to disable ESLint rules that conflict with Prettier.
`npm install --save-dev eslint eslint-plugin-prettier eslint-config-prettier`

initial ESLinte configuration
`npx eslint --init`


# unlink Git
`git remote rm origin`
`git remote add origin https://github.com/wimonkhae/ecommerce-demo.git`