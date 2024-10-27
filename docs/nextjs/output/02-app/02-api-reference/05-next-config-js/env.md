# Environment Variables in Next.js

Learn to add and access environment variables in your Next.js application at build time.

Since the release of Next.js 9.4, there is a more intuitive experience for adding environment variables. 

**Good to know**: Environment variables specified in this way will always be included in the JavaScript bundle. Prefixing the environment variable name with `NEXT_PUBLIC_` only has an effect when specifying them through the environment or .env files.

To add environment variables to the JavaScript bundle, open `next.config.js` and add the `env` config:

```js
module.exports = {
  env: {
    customKey: 'my-value',
  },
}
```

You can access `process.env.customKey` in your code. For example:

```jsx
function Page() {
  return <h1>The value of customKey is: {process.env.customKey}</h1>
}

export default Page
```

Next.js will replace `process.env.customKey` with `'my-value'` at build time. Destructuring `process.env` variables won't work due to the nature of webpack DefinePlugin.

For example, the following line:

```jsx
return <h1>The value of customKey is: {process.env.customKey}</h1>
```

Will end up being:

```jsx
return <h1>The value of customKey is: {'my-value'}</h1>
```