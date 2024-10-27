# Body - Updates

## Update replacing with `PUT`

To update an item, use the HTTP `PUT` operation. You can utilize `jsonable_encoder` to convert input data into a JSON-compatible format (e.g., converting `datetime` to `str`).

```Python
{!> ../../docs_src/body_updates/tutorial001_py310.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial001_py39.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial001.py!}
```

`PUT` replaces existing data. For example, if you update the item `bar` with:

```Python
{
    "name": "Barz",
    "price": 3,
    "description": None,
}
```

The missing attribute `"tax": 20.2` will default to `"tax": 10.5`, resulting in the new data being saved with `tax` as `10.5`.

## Partial updates with `PATCH`

You can also use the HTTP `PATCH` operation for partial updates, allowing you to send only the data you want to change.

`PATCH` is less commonly used than `PUT`, and many teams prefer using `PUT` for all updates. FastAPI allows you to choose either method.

### Using Pydantic's `exclude_unset` parameter

To receive partial updates, use the `exclude_unset` parameter in Pydantic's model's `.model_dump()` method.

```Python
{!> ../../docs_src/body_updates/tutorial002_py310.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002_py39.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002.py!}
```

### Using Pydantic's `update` parameter

Create a copy of the existing model using `.model_copy()` and pass the `update` parameter with the data to update.

```Python
{!> ../../docs_src/body_updates/tutorial002_py310.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002_py39.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002.py!}
```

### Partial updates recap

To apply partial updates:

- Optionally use `PATCH` instead of `PUT`.
- Retrieve the stored data.
- Place that data in a Pydantic model.
- Generate a `dict` without default values from the input model (using `exclude_unset`).
- Create a copy of the stored model, updating its attributes with the received partial updates (using the `update` parameter).
- Convert the copied model to a JSON-compatible format (using `jsonable_encoder`).
- Save the data to your database.
- Return the updated model.

```Python
{!> ../../docs_src/body_updates/tutorial002_py310.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002_py39.py!}
```

```Python
{!> ../../docs_src/body_updates/tutorial002.py!}
```

You can use this technique with an HTTP `PUT` operation, but the example uses `PATCH` for clarity.

Note that the input model is still validated. To allow partial updates that can omit all attributes, ensure the model has all attributes marked as optional. For distinguishing between models for updates and creation, refer to Extra Models documentation.