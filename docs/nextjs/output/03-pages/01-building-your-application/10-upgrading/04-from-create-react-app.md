# Migrating from Create React App

Learn how to migrate your existing React application from Create React App to Next.js.

## Overview

Migrating from Create React App (CRA) to Next.js involves several steps to ensure your application functions correctly in the new environment. This guide outlines the necessary changes and considerations.

## Steps to Migrate

1. **Install Next.js**: Begin by installing Next.js in your project.
   - Run: `npm install next react react-dom`

2. **Update Scripts**: Modify your `package.json` scripts to use Next.js.
   - Replace the existing scripts with:
     ```json
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start"
     }
     ```

3. **Create Pages**: Move your existing components into the `pages` directory.
   - Each component should be a default export from a file named after the route.

4. **Static Assets**: Move static assets to the `public` directory.
   - Update paths in your components accordingly.

5. **Routing**: Replace React Router with Next.js routing.
   - Use the `Link` component from `next/link` for navigation.

6. **API Routes**: If you have API endpoints, consider using Next.js API routes.
   - Create a folder named `api` inside the `pages` directory.

7. **Environment Variables**: Update your environment variables to follow Next.js conventions.
   - Prefix variables with `NEXT_PUBLIC_` for client-side access.

8. **CSS and Assets**: Ensure your CSS and other assets are imported correctly.
   - Use global styles in `pages/_app.js`.

9. **Testing**: Thoroughly test your application to ensure all features work as expected.

## Conclusion

Migrating from Create React App to Next.js can enhance your application's performance and capabilities. Follow the outlined steps carefully to ensure a smooth transition.