# Lifespan Events

You can define logic that should be executed before the application starts up. This code will be executed once, before the application starts receiving requests.

Similarly, you can define logic that should be executed when the application is shutting down. This code will be executed once, after handling possibly many requests.

This code covers the whole application lifespan, which is important for setting up resources that are shared among requests and need to be cleaned up afterwards, such as a database connection pool or loading a shared machine learning model.

## Use Case

Imagine you have machine learning models that you want to use to handle requests. These models are shared among requests, and loading the model can take considerable time due to reading data from disk. You want to load it before handling requests, but only right before the application starts receiving requests, not while the code is being loaded.

## Lifespan

You can define startup and shutdown logic using the `lifespan` parameter of the FastAPI app and a context manager.

Create an async function `lifespan()` with `yield`:

```Python
{!../../docs_src/events/tutorial003.py!}
```

Before the `yield`, simulate the expensive startup operation of loading the model. This code will be executed before the application starts taking requests. After the `yield`, unload the model, which will be executed after the application finishes handling requests, right before shutdown.

### Lifespan Function

The async function with `yield` is similar to Dependencies with `yield`. The first part of the function executes before the application starts, and the part after the `yield` executes after the application has finished.

### Async Context Manager

The function is decorated with `@asynccontextmanager`, converting it into an async context manager. You can use it with `async with`:

```Python
async with lifespan(app):
    await do_stuff()
```

Before entering the `with` block, the code before the `yield` executes, and after exiting the block, the code after the `yield` executes. Pass the `lifespan` async context manager to FastAPI.

## Alternative Events (deprecated)

The recommended way to handle startup and shutdown is using the `lifespan` parameter. If you provide a `lifespan` parameter, `startup` and `shutdown` event handlers will not be called.

### `startup` Event

To add a function that runs before the application starts, declare it with the event `"startup"`:

```Python
{!../../docs_src/events/tutorial001.py!}
```

The startup event handler function will initialize items, and the application won't start receiving requests until all startup event handlers have completed.

### `shutdown` Event

To add a function that runs when the application is shutting down, declare it with the event `"shutdown"`:

```Python
{!../../docs_src/events/tutorial002.py!}
```

The shutdown event handler function will write a line to a file.

### `startup` and `shutdown` Together

The logic for startup and shutdown is often connected. Using the `lifespan` is now recommended for better management of shared logic and resources.

## Technical Details

This is part of the Lifespan Protocol defined in the ASGI technical specification. You can read more about the Starlette lifespan handlers in Starlette's documentation.

## Sub Applications

Lifespan events (startup and shutdown) will only be executed for the main application, not for sub applications.