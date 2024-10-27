# FastAPI

FastAPI is a modern, high-performance web framework for building APIs with Python based on standard Python type hints.

## Key Features

- **Fast**: Very high performance, comparable to NodeJS and Go.
- **Fast to code**: Increases development speed by 200% to 300%.
- **Fewer bugs**: Reduces human-induced errors by about 40%.
- **Intuitive**: Excellent editor support with completion everywhere.
- **Easy**: Designed for ease of use and learning.
- **Short**: Minimizes code duplication and reduces bugs.
- **Robust**: Produces production-ready code with automatic interactive documentation.
- **Standards-based**: Fully compatible with OpenAPI and JSON Schema.

## Sponsors

For a list of sponsors, visit the FastAPI website.

## Opinions

- Kabir Khan, Microsoft: "I'm using FastAPI a ton these days... planning to use it for all of my team's ML services."
- Piero Molino, Uber: "We adopted the FastAPI library to spawn a REST server for predictions."
- Kevin Glisson, Netflix: "Netflix is pleased to announce the open-source release of our crisis management orchestration framework: Dispatch, built with FastAPI."
- Brian Okken, Python Bytes: "I’m over the moon excited about FastAPI. It’s so fun!"
- Timothy Crosley, Hug creator: "What you've built looks super solid and polished... it's really inspiring."
- Ines Montani, Explosion AI: "If you're looking to learn one modern framework for building REST APIs, check out FastAPI."
- Deon Pillsbury, Cisco: "I would highly recommend FastAPI. It is beautifully designed, simple to use, and highly scalable."

## Typer: The FastAPI of CLIs

If you are building a CLI app, check out Typer, which is intended to be the FastAPI of CLIs.

## Requirements

FastAPI relies on:
- Starlette for web components.
- Pydantic for data handling.

## Installation

Create and activate a virtual environment, then install FastAPI:

```
$ pip install "fastapi[standard]"
```

## Example

### Create it

Create a file `main.py` with:

```Python
from typing import Union
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
```

### Run it

Run the server with:

```
$ fastapi dev main.py
```

### Check it

Open your browser at http://127.0.0.1:8000/items/5?q=somequery to see the JSON response.

### Interactive API docs

Access the automatic interactive API documentation at:
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Example Upgrade

Modify `main.py` to handle a body from a `PUT` request:

```Python
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}
```

## Performance

FastAPI applications running under Uvicorn are among the fastest Python frameworks available.

## Dependencies

FastAPI depends on Pydantic and Starlette.

### Standard Dependencies

Install with `pip install "fastapi[standard]"` to include optional dependencies like:
- email-validator
- httpx
- jinja2
- python-multipart
- uvicorn

### Without Standard Dependencies

Install with `pip install fastapi` to exclude optional dependencies.

### Additional Optional Dependencies

Consider installing:
- pydantic-settings for settings management.
- orjson for ORJSONResponse support.
- ujson for UJSONResponse support.

## License

This project is licensed under the terms of the MIT license.