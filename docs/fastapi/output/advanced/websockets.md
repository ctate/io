# WebSockets

You can use WebSockets with FastAPI.

## Install WebSockets

Create a virtual environment, activate it, and install `websockets`:

```console
$ pip install websockets
```

## WebSockets Client

In production, you would typically use a frontend framework like React, Vue.js, or Angular to communicate with your WebSocket backend. Alternatively, a native mobile application can communicate directly with the WebSocket backend.

For this example, we will use a simple HTML document with JavaScript, which is not optimal for production but serves as a basic server-side example:

```Python
{!../../docs_src/websockets/tutorial001.py!}
```

## Create a WebSocket

In your FastAPI application, create a WebSocket:

```Python
{!../../docs_src/websockets/tutorial001.py!}
```

You can also use `from starlette.websockets import WebSocket`. FastAPI provides the same `WebSocket` for convenience.

## Await for Messages and Send Messages

In your WebSocket route, you can await for messages and send messages:

```Python
{!../../docs_src/websockets/tutorial001.py!}
```

You can receive and send binary, text, and JSON data.

## Try It

If your file is named `main.py`, run your application with:

```console
$ fastapi dev main.py
```

Open your browser at http://127.0.0.1:8000. You will see a simple page where you can type messages in the input box and send them. Your FastAPI application with WebSockets will respond back, allowing you to send and receive multiple messages over the same WebSocket connection.

## Using Depends and Others

In WebSocket endpoints, you can import from FastAPI and use:

- Depends
- Security
- Cookie
- Header
- Path
- Query

They work the same way as for other FastAPI endpoints:

```Python
{!> ../../docs_src/websockets/tutorial002_an_py310.py!}
```

```Python
{!> ../../docs_src/websockets/tutorial002_an_py39.py!}
```

```Python
{!> ../../docs_src/websockets/tutorial002_an.py!}
```

```Python
{!> ../../docs_src/websockets/tutorial002_py310.py!}
```

```Python
{!> ../../docs_src/websockets/tutorial002.py!}
```

As this is a WebSocket, it doesn't make sense to raise an `HTTPException`; instead, raise a `WebSocketException`. You can use a closing code from valid codes defined in the specification.

### Try the WebSockets with Dependencies

If your file is named `main.py`, run your application with:

```console
$ fastapi dev main.py
```

Open your browser at http://127.0.0.1:8000. You can set the "Item ID" used in the path and the "Token" used as a query parameter.

With that, you can connect the WebSocket and send and receive messages.

## Handling Disconnections and Multiple Clients

When a WebSocket connection is closed, `await websocket.receive_text()` will raise a `WebSocketDisconnect` exception, which you can catch and handle:

```Python
{!> ../../docs_src/websockets/tutorial003_py39.py!}
```

```Python
{!> ../../docs_src/websockets/tutorial003.py!}
```

To try it out, open the app with several browser tabs, write messages, and then close one of the tabs. This will raise the `WebSocketDisconnect` exception, and all other clients will receive a message indicating that a client has left the chat.

The app is a minimal example to demonstrate handling and broadcasting messages to several WebSocket connections. However, it only works while the process is running and with a single process. For a more robust solution, consider using encode/broadcaster.

## More Info

To learn more about the options, check Starlette's documentation for:

- The WebSocket class
- Class-based WebSocket handling