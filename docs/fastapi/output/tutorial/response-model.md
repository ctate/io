# Response Model - Return Type

You can declare the type used for the response by annotating the path operation function return type. You can use type annotations similarly to input data in function parameters, including Pydantic models, lists, dictionaries, and scalar values like integers and booleans.

FastAPI will use this return type to:

- **Validate** the returned data. If the data is invalid (e.g., a missing field), it indicates that your app code is broken, resulting in a server error instead of incorrect data. This ensures that clients receive the expected data shape.
- Add a **JSON Schema** for the response in the OpenAPI path operation, which will be used by automatic documentation and client code generation tools.
- **Limit and filter** the output data to what is defined in the return type, which is crucial for security.

## `response_model` Parameter

In some cases, you may want to return data that does not exactly match the declared type. For example, you might want to return a dictionary or a database object but declare it as a Pydantic model. This allows the Pydantic model to handle data documentation and validation.

If you added the return type annotation, tools would raise an error if the function returns a type different from what was declared. In such cases, you can use the path operation decorator parameter `response_model` instead of the return type.

You can use the `response_model` parameter in any path operation:

- `@app.get()`
- `@app.post()`
- `@app.put()`
- `@app.delete()`

`response_model` receives the same type you would declare for a Pydantic model field, such as a Pydantic model or a list of Pydantic models (e.g., `List[Item]`). FastAPI will use this `response_model` for data documentation, validation, and to convert and filter the output data.

If you have strict type checks in your editor, you can declare the function return type as `Any` to indicate that you are intentionally returning anything. FastAPI will still perform data documentation, validation, and filtering with the `response_model`.

### `response_model` Priority

If both a return type and a `response_model` are declared, the `response_model` takes priority. This allows you to add correct type annotations to your functions while still enabling FastAPI to perform data validation and documentation using the `response_model`. You can also use `response_model=None` to disable creating a response model for that path operation.

## Return the Same Input Data

You can declare a `UserIn` model that contains a plaintext password:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial002_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial002.py!}
```

Using this model, you can declare both input and output:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial002_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial002.py!}
```

This approach may not be a problem if the same user is sending the password. However, using the same model for another path operation could expose user passwords to every client.

**Warning:** Never store or send a user's plaintext password in a response unless you are fully aware of the implications.

## Add an Output Model

Instead, create an input model with the plaintext password and an output model without it:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003.py!}
```

Even if the path operation function returns the same input user containing the password:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003.py!}
```

You can declare the `response_model` as `UserOut`, which does not include the password:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003.py!}
```

FastAPI will filter out all data not declared in the output model.

### `response_model` or Return Type

If the two models differ, annotating the function return type as `UserOut` would cause a type error. Therefore, you must declare it in the `response_model` parameter.

## Return Type and Data Filtering

You may want to annotate the function with one type while returning something that includes more data. FastAPI should filter the data using the response model, ensuring that only the fields declared in the response model are included.

You can use classes and inheritance to achieve this:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_01_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003_01.py!}
```

This approach provides tooling support while allowing FastAPI to filter data.

### Type Annotations and Tooling

`BaseUser` has base fields, and `UserIn` inherits from `BaseUser`, adding the `password` field. The function return type is annotated as `BaseUser`, but a `UserIn` instance is returned. This is valid because `UserIn` is a subclass of `BaseUser`.

### FastAPI Data Filtering

FastAPI ensures that only fields declared in the type are returned, preventing excessive data exposure.

## Other Return Type Annotations

You may return something that is not a valid Pydantic field and annotate it for tooling support.

### Return a Response Directly

Returning a Response directly is a common case:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_02.py!}
```

FastAPI handles this automatically because the return type annotation is a class (or subclass) of `Response`.

### Annotate a Response Subclass

You can also use a subclass of `Response` in the type annotation:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_03.py!}
```

### Invalid Return Type Annotations

Returning an arbitrary object that is not a valid Pydantic type will cause FastAPI to fail when trying to create a Pydantic response model from that type annotation:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_04_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003_04.py!}
```

### Disable Response Model

You can disable response model generation by setting `response_model=None`:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial003_05_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial003_05.py!}
```

## Response Model Encoding Parameters

Your response model can have default values:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial004_py310.py!}
```

- `description: Union[str, None] = None` has a default of `None`.
- `tax: float = 10.5` has a default of `10.5`.
- `tags: List[str] = []` has a default of an empty list.

You might want to omit these from the result if they were not actually stored.

### Use the `response_model_exclude_unset` Parameter

Set the path operation decorator parameter `response_model_exclude_unset=True`:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial004_py310.py!}
```

This will exclude default values from the response.

### Data with Values for Fields with Defaults

If your data has values for fields with default values, they will be included in the response.

### Data with the Same Values as the Defaults

If the data has the same values as the defaults, FastAPI will include them in the response since they were set explicitly.

### `response_model_include` and `response_model_exclude`

You can use the parameters `response_model_include` and `response_model_exclude` to include or exclude specific attributes in the output.

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial005_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial005.py!}
```

### Using Lists Instead of Sets

If you use a list or tuple instead of a set, FastAPI will convert it to a set and work correctly:

```Python
# Example for Python 3.10+
{!> ../../docs_src/response_model/tutorial006_py310.py!}
```

```Python
# Example for Python 3.8+
{!> ../../docs_src/response_model/tutorial006.py!}
```

## Recap

Use the path operation decorator's parameter `response_model` to define response models and ensure private data is filtered out. Use `response_model_exclude_unset` to return only explicitly set values.