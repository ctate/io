# Declare Request Example Data

You can declare examples of the data your app can receive in several ways.

## Extra JSON Schema Data in Pydantic Models

You can declare `examples` for a Pydantic model that will be added to the generated JSON Schema.

### Python 3.10+ Pydantic v2

```Python
{!> ../../docs_src/schema_extra_example/tutorial001_py310.py!}
```

### Python 3.10+ Pydantic v1

```Python
{!> ../../docs_src/schema_extra_example/tutorial001_py310_pv1.py!}
```

### Python 3.8+ Pydantic v2

```Python
{!> ../../docs_src/schema_extra_example/tutorial001.py!}
```

### Python 3.8+ Pydantic v1

```Python
{!> ../../docs_src/schema_extra_example/tutorial001_pv1.py!}
```

The extra info will be added as-is to the output JSON Schema for that model and will be used in the API docs.

### Pydantic v2

In Pydantic version 2, use the attribute `model_config`, which takes a `dict`. Set `"json_schema_extra"` with a `dict` containing any additional data, including `examples`.

### Pydantic v1

In Pydantic version 1, use an internal class `Config` and `schema_extra`. Set `schema_extra` with a `dict` containing any additional data, including `examples`.

## Field Additional Arguments

When using `Field()` with Pydantic models, you can also declare additional `examples`:

### Python 3.10+

```Python
{!> ../../docs_src/schema_extra_example/tutorial002_py310.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/schema_extra_example/tutorial002.py!}
```

## Examples in JSON Schema - OpenAPI

When using any of the following, you can declare a group of `examples` with additional information that will be added to their JSON Schemas inside OpenAPI:

- `Path()`
- `Query()`
- `Header()`
- `Cookie()`
- `Body()`
- `Form()`
- `File()`

### Body with Examples

Here we pass `examples` containing one example of the data expected in `Body()`:

### Python 3.10+

```Python
{!> ../../docs_src/schema_extra_example/tutorial003_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/schema_extra_example/tutorial003_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/schema_extra_example/tutorial003_an.py!}
```

### Python 3.10+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial003_py310.py!}
```

### Python 3.8+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial003.py!}
```

### Body with Multiple Examples

You can also pass multiple `examples`:

### Python 3.10+

```Python
{!> ../../docs_src/schema_extra_example/tutorial004_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/schema_extra_example/tutorial004_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/schema_extra_example/tutorial004_an.py!}
```

### Python 3.10+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial004_py310.py!}
```

### Python 3.8+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial004.py!}
```

When you do this, the examples will be part of the internal JSON Schema for that body data. However, as of the time of writing, Swagger UI does not support showing multiple examples for the data in JSON Schema.

### OpenAPI-Specific Examples

OpenAPI has supported a different field called `examples`, which goes in the details for each path operation, not inside each JSON Schema. This OpenAPI-specific `examples` is a `dict` with multiple examples, each with extra information.

### Using the `openapi_examples` Parameter

You can declare the OpenAPI-specific `examples` in FastAPI with the parameter `openapi_examples` for:

- `Path()`
- `Query()`
- `Header()`
- `Cookie()`
- `Body()`
- `Form()`
- `File()`

Each specific example `dict` in the `examples` can contain:

- `summary`: Short description for the example.
- `description`: A long description that can contain Markdown text.
- `value`: The actual example shown, e.g., a `dict`.
- `externalValue`: Alternative to `value`, a URL pointing to the example.

### Python 3.10+

```Python
{!> ../../docs_src/schema_extra_example/tutorial005_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/schema_extra_example/tutorial005_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/schema_extra_example/tutorial005_an.py!}
```

### Python 3.10+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial005_py310.py!}
```

### Python 3.8+ Non-Annotated

```Python
{!> ../../docs_src/schema_extra_example/tutorial005.py!}
```

## Technical Details

If you are using FastAPI version 0.99.0 or above, you can probably skip these details.

Before OpenAPI 3.1.0, OpenAPI used an older version of JSON Schema, which did not have `examples`. OpenAPI added its own `example` field.

### JSON Schema's `examples` Field

JSON Schema later added an `examples` field. OpenAPI 3.1.0 is based on the latest version of JSON Schema, which includes this new field. The new `examples` field takes precedence over the old `example` field, which is now deprecated.

### Pydantic and FastAPI Examples

When you add `examples` inside a Pydantic model, that example is added to the JSON Schema for that model. This JSON Schema is included in the OpenAPI of your API and used in the docs UI.

### Swagger UI and OpenAPI-Specific Examples

FastAPI 0.103.0 added support for declaring the OpenAPI-specific `examples` field with the new parameter `openapi_examples`.

### Summary

Upgrade to FastAPI 0.99.0 or above for a simpler, consistent, and intuitive experience.