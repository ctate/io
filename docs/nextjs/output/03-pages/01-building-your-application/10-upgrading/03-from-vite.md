# Migrating from Vite

Learn how to migrate your existing React application from Vite to Next.js.

## Migration Steps

1. **Install Next.js**: Begin by installing Next.js in your project. Use the command:
   ```
   npm install next react react-dom
   ```

2. **Update Scripts**: Modify your `package.json` scripts to include Next.js commands:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start"
   }
   ```

3. **Create Pages**: Move your existing components into the `pages` directory. Each component should correspond to a route.

4. **Update Imports**: Adjust your import statements to reflect the new file structure. Ensure that you import React and any other necessary libraries.

5. **Handle Static Assets**: Move any static assets to the `public` directory. Update paths in your code accordingly.

6. **Configure Next.js**: If you have specific configurations, create a `next.config.js` file in the root of your project.

7. **Test Your Application**: Run your application using the command:
   ```
   npm run dev
   ```
   Check for any errors and ensure that all routes are functioning as expected.

8. **Deploy**: Once everything is working locally, you can deploy your Next.js application using your preferred hosting service.

## Additional Resources

For more detailed information, refer to the official Next.js documentation.