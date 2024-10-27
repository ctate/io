# Additional Status Codes

By default, FastAPI returns responses using a JSONResponse, placing the content from your path operation inside that JSONResponse. It uses the default status code or the one set in your path operation.

## Additional Status Codes

To return additional status codes apart from the main one, return a Response directly, such as a JSONResponse, and set the additional status code directly.

For example, if you want a path operation to update items and return HTTP status code 200 "OK" when successful, but also accept new items and return HTTP status code 201 "Created" when items didn't exist before, you can achieve this by importing JSONResponse and returning your content there directly, setting the desired status_code.

### Example Code

Python 3.10+:
```Python
{!> ../../docs_src/additional_status_codes/tutorial001_an_py310.py!}
```

Python 3.9+:
```Python
{!> ../../docs_src/additional_status_codes/tutorial001_an_py39.py!}
```

Python 3.8+:
```Python
{!> ../../docs_src/additional_status_codes/tutorial001_an.py!}
```

Python 3.10+ non-Annotated:
```Python
{!> ../../docs_src/additional_status_codes/tutorial001_py310.py!}
```

Python 3.8+ non-Annotated:
```Python
{!> ../../docs_src/additional_status_codes/tutorial001.py!}
```

### Important Notes

When returning a Response directly, it will be returned as is and won't be serialized with a model. Ensure it contains the desired data and that the values are valid JSON (if using JSONResponse).

You can also use `from starlette.responses import JSONResponse`. FastAPI provides the same starlette.responses as fastapi.responses for convenience, but most available responses come directly from Starlette, including status.

## OpenAPI and API Docs

If you return additional status codes and responses directly, they won't be included in the OpenAPI schema (API docs) because FastAPI cannot know beforehand what you will return. You can document this in your code using Additional Responses.