# poweredByHeader

Next.js adds the `x-powered-by` header by default. To opt-out, modify the `next.config.js` file to disable the `poweredByHeader` configuration:

```js
module.exports = {
  poweredByHeader: false,
}
```