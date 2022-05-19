This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and enhanced with styled components, linters, storybook, sentry and other useful packages.

Everything already setup/configured for you with bit guidance as to witch other packages I would recommend. 

## Getting Started

First, install dependencies:

```bash
npm i
# or
yarn install
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Next Step

State, form, network, utility packages aren't being included intentionally, because than this template would be too opinionated.

### State package
Really depends on your needs, but in most cases I would go with [redux](https://www.npmjs.com/package/redux) together with [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)

### Form package
I would recommend [react-hook-form](https://www.npmjs.com/package/react-hook-form)
```bash
npm install react-hook-form
```

### Network package 
Depends on your needs, I would choose based on this:
- [ky](https://www.npmjs.com/package/ky) for simple request without caching etc (just extending `fetch` function)
- [react-query](https://www.npmjs.com/package/react-query) if you need caching and advanced features. Or if you communicate with REST and GraphQL APIs in one app
- [@apollo/client](https://www.npmjs.com/package/@apollo/client) for communication with only GraphQL API

### Utility package
As I am big fun of functional programming, I would definitely go for [ramda](https://www.npmjs.com/package/ramda)
```bash
npm install ramda
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Todo 
- Add Dockerfile
- Add and configure cypress + unit/component testing packages