# JSON Compatible Encoder

In certain situations, you may need to convert a data type (such as a Pydantic model) into a format compatible with JSON (like a `dict`, `list`, etc.), especially for storage in a database.

**FastAPI** provides the `jsonable_encoder()` function for this purpose.

## Using the `jsonable_encoder`

Consider a database `fake_db` that only accepts JSON-compatible data. For instance, it does not accept `datetime` objects, which must be converted to a `str` in ISO format.

Similarly, the database cannot accept a Pydantic model (an object with attributes) but only a `dict`. The `jsonable_encoder` function facilitates this conversion.

It takes an object, such as a Pydantic model, and returns a JSON-compatible version:

```Python
# Python 3.10+
{!> ../../docs_src/encoder/tutorial001_py310.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/encoder/tutorial001.py!}
```

In this example, `jsonable_encoder` converts the Pydantic model to a `dict` and the `datetime` to a `str`. The output can be encoded using the Python standard `json.dumps()`.

The function does not return a large `str` containing JSON data; instead, it returns a standard Python data structure (e.g., a `dict`) with values and sub-values that are all JSON-compatible.

Note: `jsonable_encoder` is used internally by **FastAPI** to convert data but is also useful in various other scenarios.