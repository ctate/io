# OpenAPI Webhooks

Webhooks allow your API to notify users' applications by sending requests with data, typically to inform them of events. This process reverses the usual flow where users send requests to your API; instead, your API sends requests to their systems.

## Webhook Process

1. **Define Message**: You specify the message and the body of the request in your code.
2. **Trigger Events**: You determine when your app will send these requests or events.
3. **User Configuration**: Users provide the URL where your app should send requests, often through a web dashboard.

You are responsible for the logic to register URLs for webhooks and the code to send requests, which you can implement in your own code.

## Documenting Webhooks with FastAPI and OpenAPI

Using FastAPI with OpenAPI, you can define webhook names, the types of HTTP operations (e.g., `POST`, `PUT`), and the request bodies your app will send. This simplifies the process for users to implement their APIs to receive webhook requests, potentially allowing them to autogenerate some of their API code.

Webhooks are available in OpenAPI 3.1.0 and above, supported by FastAPI 0.99.0 and above.

## Creating a FastAPI Application with Webhooks

In a FastAPI application, use the `webhooks` attribute to define webhooks similarly to path operations, for example with `@app.webhooks.post()`.

```Python
{!../../docs_src/openapi_webhooks/tutorial001.py!}
```

The defined webhooks will appear in the OpenAPI schema and the automatic documentation UI.

The `app.webhooks` object is an `APIRouter`, similar to what you would use for structuring your app with multiple files.

When defining webhooks, you do not declare a path (like `/items/`). Instead, the text you provide is an identifier for the webhook (the event name), such as in `@app.webhooks.post("new-subscription")`, where `new-subscription` is the webhook name. Users will define the actual URL path for receiving webhook requests elsewhere.

### Accessing Documentation

Start your app and navigate to the documentation at 127.0.0.1:8000/docs. You will see the usual path operations along with the defined webhooks.