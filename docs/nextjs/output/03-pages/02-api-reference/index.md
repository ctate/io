# API Reference

Next.js API Reference for the Pages Router.

## Overview

The Pages Router in Next.js allows you to create dynamic routes and handle API requests seamlessly. This documentation provides an overview of the available API methods and their usage.

## API Methods

### `getStaticProps`

Fetches data at build time for static generation.

**Usage:**
```javascript
export async function getStaticProps(context) {
  // Fetch data
  return {
    props: {
      // Data to be passed to the page component
    },
  };
}
```

### `getServerSideProps`

Fetches data on each request for server-side rendering.

**Usage:**
```javascript
export async function getServerSideProps(context) {
  // Fetch data
  return {
    props: {
      // Data to be passed to the page component
    },
  };
}
```

### `getStaticPaths`

Defines dynamic routes for static generation.

**Usage:**
```javascript
export async function getStaticPaths() {
  return {
    paths: [
      // Array of paths to pre-render
    ],
    fallback: false, // or true
  };
}
```

## API Routes

You can create API routes by adding files in the `pages/api` directory.

### Example

```javascript
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
```

## Middleware

Middleware allows you to run code before a request is completed.

### Example

```javascript
export function middleware(req) {
  // Code to run before request
}
```

## Conclusion

The Pages Router in Next.js provides powerful features for building dynamic applications. Utilize the methods and examples provided to enhance your development process.