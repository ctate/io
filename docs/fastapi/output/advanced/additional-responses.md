# Additional Responses in OpenAPI

This is a rather advanced topic. If you are starting with FastAPI, you might not need this.

You can declare additional responses with various status codes, media types, and descriptions. These additional responses will be included in the OpenAPI schema and will appear in the API documentation. Ensure you return a `Response` like `JSONResponse` directly, with your status code and content.

## Additional Response with `model`

You can pass a `responses` parameter to your path operation decorators. It receives a dictionary where the keys are status codes (e.g., `200`), and the values are dictionaries containing information for each response. Each response dictionary can have a key `model`, which contains a Pydantic model, similar to `response_model`. FastAPI will generate its JSON Schema and include it in the OpenAPI.

For example, to declare a response with a status code `404` and a Pydantic model `Message`, you can write:

```Python
{!../../docs_src/additional_responses/tutorial001.py!}
```

Keep in mind that you must return the `JSONResponse` directly.

The `model` key is not part of OpenAPI. FastAPI will take the Pydantic model, generate the JSON Schema, and place it correctly in the OpenAPI schema under the `content` key, which contains another JSON object. This object has a media type key (e.g., `application/json`) that contains another JSON object with a `schema` key referencing the global JSON Schemas.

The generated responses in the OpenAPI for this path operation will be:

```JSON
{
    "responses": {
        "404": {
            "description": "Additional Response",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/Message"
                    }
                }
            }
        },
        "200": {
            "description": "Successful Response",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/Item"
                    }
                }
            }
        },
        "422": {
            "description": "Validation Error",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/HTTPValidationError"
                    }
                }
            }
        }
    }
}
```

The schemas are referenced in another part of the OpenAPI schema:

```JSON
{
    "components": {
        "schemas": {
            "Message": {
                "title": "Message",
                "required": [
                    "message"
                ],
                "type": "object",
                "properties": {
                    "message": {
                        "title": "Message",
                        "type": "string"
                    }
                }
            },
            "Item": {
                "title": "Item",
                "required": [
                    "id",
                    "value"
                ],
                "type": "object",
                "properties": {
                    "id": {
                        "title": "Id",
                        "type": "string"
                    },
                    "value": {
                        "title": "Value",
                        "type": "string"
                    }
                }
            },
            "ValidationError": {
                "title": "ValidationError",
                "required": [
                    "loc",
                    "msg",
                    "type"
                ],
                "type": "object",
                "properties": {
                    "loc": {
                        "title": "Location",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "msg": {
                        "title": "Message",
                        "type": "string"
                    },
                    "type": {
                        "title": "Error Type",
                        "type": "string"
                    }
                }
            },
            "HTTPValidationError": {
                "title": "HTTPValidationError",
                "type": "object",
                "properties": {
                    "detail": {
                        "title": "Detail",
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/ValidationError"
                        }
                    }
                }
            }
        }
    }
}
```

## Additional Media Types for the Main Response

You can use the `responses` parameter to add different media types for the same main response. For example, you can declare that your path operation can return a JSON object (media type `application/json`) or a PNG image:

```Python
{!../../docs_src/additional_responses/tutorial002.py!}
```

You must return the image using a `FileResponse` directly. Unless you specify a different media type in your `responses` parameter, FastAPI will assume the response has the same media type as the main response class (default `application/json`).

## Combining Information

You can combine response information from multiple sources, including `response_model`, `status_code`, and `responses` parameters. You can declare a `response_model` with a default status code `200` (or a custom one) and then add additional information in `responses`.

For example, you can declare a response with a status code `404` that uses a Pydantic model and has a custom description, and a response with a status code `200` that uses your `response_model` but includes a custom example:

```Python
{!../../docs_src/additional_responses/tutorial003.py!}
```

## Combine Predefined Responses and Custom Ones

You can have predefined responses that apply to many path operations and combine them with custom responses needed for each path operation. Use the Python technique of "unpacking" a dictionary:

```Python
old_dict = {
    "old key": "old value",
    "second old key": "second old value",
}
new_dict = {**old_dict, "new key": "new value"}
```

You can use this technique to reuse predefined responses in your path operations and combine them with additional custom ones:

```Python
{!../../docs_src/additional_responses/tutorial004.py!}
```

## More Information about OpenAPI Responses

To see what you can include in the responses, check these sections in the OpenAPI specification:

- OpenAPI Responses Object
- OpenAPI Response Object