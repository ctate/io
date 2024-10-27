# Using Dataclasses

FastAPI is built on top of Pydantic, allowing the use of `dataclasses` similarly to Pydantic models for declaring requests and responses. 

Pydantic provides internal support for `dataclasses`, enabling FastAPI to convert standard dataclasses to Pydantic's version. This supports:

- Data validation
- Data serialization
- Data documentation

While dataclasses can't perform all functions of Pydantic models, they can be useful for existing dataclasses in web APIs.

## Dataclasses in `response_model`

Dataclasses can be used in the `response_model` parameter, automatically converting them to Pydantic dataclasses. This ensures their schema appears in the API documentation.

## Dataclasses in Nested Data Structures

Dataclasses can be combined with other type annotations to create nested data structures. If issues arise with API documentation, switch from standard `dataclasses` to `pydantic.dataclasses`, which serves as a drop-in replacement.

1. Import `field` from standard `dataclasses`.
2. Use `pydantic.dataclasses` as a replacement.
3. The `Author` dataclass can include a list of `Item` dataclasses.
4. Use the `Author` dataclass in the `response_model` parameter.
5. Other standard type annotations can be used with dataclasses.
6. Return a dictionary containing lists of dataclasses, with FastAPI serializing the data to JSON.
7. The `response_model` can use a list of `Author` dataclasses.
8. Path operation functions can use regular `def` instead of `async def`.
9. The function may return dictionaries instead of dataclasses, with FastAPI converting the response using the `response_model`.

Dataclasses can be combined with various type annotations to form complex data structures.

## Learn More

Dataclasses can be combined with Pydantic models, inherited, or included in custom models. For further information, refer to the Pydantic documentation on dataclasses.

## Version

This feature is available since FastAPI version 0.67.0.