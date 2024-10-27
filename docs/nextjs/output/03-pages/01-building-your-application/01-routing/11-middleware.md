# Middleware

Learn how to use Middleware to run code before a request is completed.

## Overview

Middleware is a function that runs before the request is completed. It can be used for various purposes such as authentication, logging, and modifying the request or response.

## Usage

To implement middleware, define a function that takes the request and response objects, along with the next middleware function. Call the next function to pass control to the next middleware in the stack.

## Example

```javascript
function myMiddleware(req, res, next) {
    console.log('Request received:', req.url);
    next(); // Pass control to the next middleware
}
```

## Applying Middleware

Middleware can be applied globally or to specific routes. Use the following syntax to apply middleware:

### Global Middleware

```javascript
app.use(myMiddleware);
```

### Route-Specific Middleware

```javascript
app.get('/specific-route', myMiddleware, (req, res) => {
    res.send('This is a specific route.');
});
```

## Conclusion

Middleware is a powerful feature that allows you to run code at various points in the request-response cycle. Use it wisely to enhance your application's functionality.