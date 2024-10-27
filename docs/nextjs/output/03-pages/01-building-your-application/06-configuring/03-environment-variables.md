# Environment Variables

Learn to add and access environment variables in your Next.js application.

## Adding Environment Variables

1. Create a `.env.local` file in the root of your project.
2. Add your environment variables in the format `KEY=VALUE`.

Example:
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Accessing Environment Variables

- Use `process.env.KEY` to access your variables in your application code.

Example:
```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Important Notes

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
- Restart the development server after adding or modifying environment variables.