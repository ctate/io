# Request Body

When sending data from a client (e.g., a browser) to your API, it is sent as a **request body**. 

A **request body** is the data sent by the client, while a **response body** is the data your API sends back. Your API typically sends a **response body**, but clients do not always need to send a **request body**; sometimes they only request a path with query parameters.

To declare a **request body**, use Pydantic models for their benefits.

To send data, use one of the following methods: `POST`, `PUT`, `DELETE`, or `PATCH`. Sending a body with a `GET` request is discouraged due to undefined behavior in specifications, but it is supported by FastAPI for complex use cases. However, it won't be documented in interactive Swagger UI, and proxies may not support it.

## Import Pydantic's `BaseModel`

Import `BaseModel` from `pydantic`:

```Python
from pydantic import BaseModel
```

## Create your data model

Declare your data model as a class that inherits from `BaseModel`, using standard Python types for attributes:

```Python
class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None
```

The model above represents a JSON object like:

```JSON
{
    "name": "Foo",
    "description": "An optional description",
    "price": 45.2,
    "tax": 3.5
}
```

The `description` and `tax` attributes are optional.

## Declare it as a parameter

To add it to your path operation, declare it similarly to path and query parameters:

```Python
@app.post("/items/")
async def create_item(item: Item):
```

## Results

With this declaration, **FastAPI** will:

- Read the request body as JSON.
- Convert types as needed.
- Validate the data, returning clear errors for invalid data.
- Provide the received data in the parameter `item`, with editor support for attributes and types.
- Generate JSON Schema definitions for your model, usable elsewhere in your project.
- Include schemas in the generated OpenAPI schema for automatic documentation UIs.

## Automatic docs

The JSON Schemas of your models will be part of your OpenAPI generated schema and shown in interactive API docs.

## Editor support

In your editor, you will receive type hints and completion for the model attributes, along with error checks for incorrect type operations. This design was thoroughly tested to ensure compatibility with various editors, including Visual Studio Code and PyCharm.

## Use the model

Inside the function, access all attributes of the model object directly:

```Python
@app.post("/items/")
async def create_item(item: Item):
    return item.name
```

## Request body + path parameters

You can declare path parameters and request body simultaneously. FastAPI will recognize which parameters come from the path and which from the request body.

```Python
@app.post("/items/{item_id}")
async def update_item(item_id: int, item: Item):
```

## Request body + path + query parameters

You can declare body, path, and query parameters together. FastAPI will correctly identify each parameter's source.

```Python
@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None, item: Item):
```

The function parameters will be recognized as follows:

- Parameters declared in the path are treated as path parameters.
- Singular type parameters (e.g., `int`, `str`) are treated as query parameters.
- Parameters of Pydantic model type are treated as request body.

## Without Pydantic

If you prefer not to use Pydantic models, you can use **Body** parameters. Refer to the documentation for more details on Body parameters.