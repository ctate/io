# Custom Server

Start a Next.js app programmatically using a custom server.

## Overview

To create a custom server for your Next.js application, you can use Node.js and Express. This allows you to handle requests and responses in a more flexible way.

## Setting Up a Custom Server

1. **Install Dependencies**: Ensure you have Next.js and Express installed in your project.

   ```
   npm install next express
   ```

2. **Create a Server File**: Create a file named `server.js` in the root of your project.

   ```javascript
   const express = require('express');
   const next = require('next');

   const dev = process.env.NODE_ENV !== 'production';
   const app = next({ dev });
   const handle = app.getRequestHandler();

   app.prepare().then(() => {
     const server = express();

     server.get('/custom-route', (req, res) => {
       return app.render(req, res, '/custom-page', req.query);
     });

     server.all('*', (req, res) => {
       return handle(req, res);
     });

     server.listen(3000, (err) => {
       if (err) throw err;
       console.log('> Ready on http://localhost:3000');
     });
   });
   ```

3. **Run the Server**: Start your custom server using Node.js.

   ```
   node server.js
   ```

## Custom Routes

You can define custom routes in your server file. Use `server.get()` to handle specific routes and `server.all()` to handle all other requests.

## Deployment

When deploying your Next.js app with a custom server, ensure your hosting provider supports Node.js applications. Follow their specific instructions for deploying Node.js apps.

## Conclusion

Using a custom server with Next.js provides flexibility in handling requests and allows for custom routing. This setup is ideal for applications that require specific server-side logic.