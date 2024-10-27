# Encoders - jsonable_encoder

The `jsonable_encoder` function in FastAPI is used to convert data types into a format that is JSON serializable. This is particularly useful when working with complex data types such as Pydantic models, SQLAlchemy models, or other custom objects.

## Usage

```python
from fastapi.encoders import jsonable_encoder

data = {"key": "value"}
json_compatible_data = jsonable_encoder(data)
```

## Parameters

- `obj`: The object to be converted into a JSON-compatible format.
- `include`: A set of fields to include in the output.
- `exclude`: A set of fields to exclude from the output.
- `by_alias`: Whether to use field aliases defined in Pydantic models.
- `exclude_unset`: Whether to exclude unset fields from the output.

## Returns

Returns a JSON-compatible version of the input object.

## Example

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post("/items/")
async def create_item(item: Item):
    json_compatible_item_data = jsonable_encoder(item)
    return json_compatible_item_data
```

## Notes

- The function handles various data types, including lists and dictionaries.
- It is particularly useful for preparing data for responses in FastAPI endpoints.