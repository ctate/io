# Path Operation Configuration

You can configure your path operation decorator with several parameters.

## Response Status Code

Define the HTTP `status_code` for your path operation response. You can use an integer code, like `404`, or use shortcut constants from `status`.

```Python
from starlette import status
```

**FastAPI** provides `starlette.status` as `fastapi.status` for convenience.

## Tags

Add tags to your path operation by passing the `tags` parameter with a list of strings.

Tags will be included in the OpenAPI schema and used by automatic documentation interfaces.

### Tags with Enums

For larger applications, consider using an `Enum` to maintain consistent tags across related path operations.

```Python
from enum import Enum

class Tags(Enum):
    tag1 = "tag1"
    tag2 = "tag2"
```

## Summary and Description

You can add a `summary` and `description` to your path operation.

## Description from Docstring

For longer descriptions, use the function docstring. FastAPI will read the description from there, allowing Markdown formatting.

## Response Description

Specify the response description with the `response_description` parameter. 

Note that `response_description` refers specifically to the response, while `description` refers to the path operation in general. OpenAPI requires a response description; if not provided, FastAPI will generate a default one.

## Deprecate a Path Operation

To mark a path operation as deprecated without removing it, use the `deprecated` parameter. It will be clearly marked in the interactive documentation.

## Recap

Easily configure and add metadata to your path operations by passing parameters to the path operation decorators.