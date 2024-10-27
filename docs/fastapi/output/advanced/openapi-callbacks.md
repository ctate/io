# OpenAPI Callbacks

You can create an API with a path operation that triggers a request to an external API created by another developer, often the same developer using your API. This process is called a "callback," where your API sends a request to the external API.

## An App with Callbacks

For example, consider an app that allows creating invoices with fields such as `id`, `title` (optional), `customer`, and `total`. The external developer will create an invoice in your API using a POST request. Your API will then:

- Send the invoice to a customer of the external developer.
- Collect the payment.
- Send a notification back to the API user (the external developer) via a POST request to the external API (the callback).

## The Normal FastAPI App

Initially, the API app will have a path operation that receives an `Invoice` body and a query parameter `callback_url` containing the callback URL. 

```Python
{!../../docs_src/openapi_callbacks/tutorial001.py!}
```

The `callback_url` query parameter uses a Pydantic Url type.

The new addition is `callbacks=invoices_callback_router.routes` as an argument to the path operation decorator.

## Documenting the Callback

The callback code will depend on your API app and may vary significantly. A simple callback might look like this:

```Python
callback_url = "https://example.com/api/v1/invoices/events/"
httpx.post(callback_url, json={"description": "Invoice paid", "paid": True})
```

The critical part is ensuring that the external developer implements the external API correctly according to the data your API will send in the callback request body.

This documentation will appear in the Swagger UI at `/docs`, guiding external developers on how to build the external API.

## Write the Callback Documentation Code

This code is for documenting how the external API should look. You can create automatic documentation for an API with FastAPI, which will help document the external API by creating the necessary path operation(s).

### Create a Callback APIRouter

First, create a new `APIRouter` for the callbacks.

```Python
{!../../docs_src/openapi_callbacks/tutorial001.py!}
```

### Create the Callback Path Operation

Use the created `APIRouter` to define the callback path operation. It should resemble a normal FastAPI path operation:

- It should declare the body it will receive, e.g., `body: InvoiceEvent`.
- It could declare the response it should return, e.g., `response_model=InvoiceEventReceived`.

```Python
{!../../docs_src/openapi_callbacks/tutorial001.py!}
```

Key differences from a normal path operation:

- It doesn't need actual code since your app will not call this code; the function can simply use `pass`.
- The path can include an OpenAPI 3 expression, allowing the use of variables from the original request sent to your API.

### The Callback Path Expression

The callback path can include an OpenAPI 3 expression containing parts of the original request. For example:

```Python
"{$callback_url}/invoices/{$request.body.id}"
```

If the external developer sends a request to your API with:

```
https://yourapi.com/invoices/?callback_url=https://www.external.org/events
```

and a JSON body of:

```JSON
{
    "id": "2expen51ve",
    "customer": "Mr. Richie Rich",
    "total": "9999"
}
```

Your API will process the invoice and send a callback request to the external API:

```
https://www.external.org/events/invoices/2expen51ve
```

with a JSON body like:

```JSON
{
    "description": "Payment celebration",
    "paid": true
}
```

It expects a response from the external API with a JSON body like:

```JSON
{
    "ok": true
}
```

### Add the Callback Router

Now that you have the callback path operation(s) in the callback router, use the `callbacks` parameter in your API's path operation decorator to pass the `.routes` attribute from that callback router:

```Python
{!../../docs_src/openapi_callbacks/tutorial001.py!}
```

### Check the Docs

Start your app and navigate to the documentation at `http://127.0.0.1:8000/docs`. You will see a "Callbacks" section for your path operation, detailing how the external API should be structured.