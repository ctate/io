# Path Parameters

Path parameters can be declared using the syntax of Python format strings:

```Python
{!../../docs_src/path_params/tutorial001.py!}
```

The value of the path parameter `item_id` is passed to your function as the argument `item_id`. For example, accessing `/items/foo` will return:

```JSON
{"item_id":"foo"}
```

## Path Parameters with Types

You can specify the type of a path parameter using Python type annotations:

```Python
{!../../docs_src/path_params/tutorial002.py!}
```

In this case, `item_id` is declared as an `int`. Accessing `/items/3` will return:

```JSON
{"item_id":3}
```

The function receives the value as a Python `int`, not a string.

## Data Validation

Accessing `/items/foo` will result in an HTTP error:

```JSON
{
  "detail": [
    {
      "type": "int_parsing",
      "loc": [
        "path",
        "item_id"
      ],
      "msg": "Input should be a valid integer, unable to parse string as an integer",
      "input": "foo"
    }
  ]
}
```

This error occurs because `item_id` is not an `int`. The same error will appear for a `float` value.

## Documentation

Accessing `/docs` provides automatic, interactive API documentation, integrating Swagger UI.

## Standards-Based Benefits

The generated schema follows the OpenAPI standard, allowing for alternative API documentation via ReDoc at `/redoc`.

## Pydantic

Data validation is handled by Pydantic, allowing the use of type declarations with various data types.

## Order Matters

When defining path operations, ensure that specific paths are declared before more general ones to avoid conflicts:

```Python
{!../../docs_src/path_params/tutorial003.py!}
```

## Predefined Values

To restrict path parameter values, use a Python `Enum`:

### Create an Enum Class

Import `Enum` and create a subclass that inherits from `str` and `Enum`:

```Python
{!../../docs_src/path_params/tutorial005.py!}
```

### Declare a Path Parameter

Use the enum class for type annotation:

```Python
{!../../docs_src/path_params/tutorial005.py!}
```

### Working with Enumerations

You can compare and access the value of enumeration members:

```Python
{!../../docs_src/path_params/tutorial005.py!}
```

Return enum members from your path operation, which will be converted to their corresponding values in the response:

```JSON
{
  "model_name": "alexnet",
  "message": "Deep Learning FTW!"
}
```

## Path Parameters Containing Paths

For a path operation like `/files/{file_path}`, you can declare a path parameter to contain a path using:

```
/files/{file_path:path}
```

This allows for URLs like `/files/home/johndoe/myfile.txt`.

## Recap

Using FastAPI with standard Python type declarations provides:

* Editor support: error checks, autocompletion
* Data parsing
* Data validation
* API annotation and automatic documentation

This is a key advantage of FastAPI compared to other frameworks.