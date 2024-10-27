# env

Learn to add and access environment variables in your Next.js application at build time.

## Adding Environment Variables

To add environment variables, create a `.env.local` file in the root of your Next.js project. Define your variables in the format:

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

Variables prefixed with `NEXT_PUBLIC_` will be exposed to the browser.

## Accessing Environment Variables

You can access environment variables in your application using `process.env`. For example:

```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Important Notes

- Environment variables are only available at build time.
- Do not include sensitive information in variables that are prefixed with `NEXT_PUBLIC_`, as they will be exposed to the client-side code.
- Use `.env.development`, `.env.production`, and `.env.test` for different environments.

## Conclusion

Environment variables are a powerful way to manage configuration in your Next.js application. Use them wisely to keep your application secure and maintainable.