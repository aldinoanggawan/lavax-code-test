## LavaNote (LavaX Code Test)

This project is a code test from [LavaX](https://www.lavax.co/) which was built with Next.js and it is a Progressive Web App.

The idea behind this project is to implement Next.js data fetching method `getStaticProps` which fetches data during build time, and `getServerSideProps` which fetches data on each request in the server side while integrating it with Apollo GraphQL.

Every note on the homepage is fetched during build time, and is saved in Apollo cache. When user visits the web-app, any notes that are available from the build time will be shown constantly without the need to fetch another request on the client side.

To make sure that the user can get the latest data after adding a note, incremental static generation is used by adding `revalidate = 1` in the return values of `getStaticProps` which will attempt the page to regenerate when request comes in at most once every second.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend

The backend of this project was made with node.js and can be checked here [lavax-code-test-backend](https://github.com/aldinoanggawan/lavax-code-test-backend).

## Live

This project has also been deployed using Vercel and can be accessed here [LavaNote](https://lavanote.vercel.app/).
