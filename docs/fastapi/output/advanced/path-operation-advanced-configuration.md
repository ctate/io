# Path Operation Advanced Configuration

## OpenAPI operationId

You can set the OpenAPI `operationId` for your path operation using the parameter `operation_id`. Ensure it is unique for each operation.

### Using the path operation function name as the operationId

To use your API's function names as `operationId`s, iterate over all of them and override each path operation's `operation_id` using their `APIRoute.name`. Do this after adding all your path operations.

**Note:** If you manually call `app.openapi()`, update the `operationId`s before that. Ensure each path operation function has a unique name, even across different modules.

## Exclude from OpenAPI

To exclude a path operation from the generated OpenAPI schema, use the parameter `include_in_schema` and set it to `False`.

## Advanced description from docstring

Limit the lines used from the docstring of a path operation function for OpenAPI by adding an `\f` (escaped "form feed" character). This truncates the output for OpenAPI at this point, while allowing other tools to use the rest.

## Additional Responses

You can declare additional responses with their models, status codes, etc. Refer to the documentation about Additional Responses in OpenAPI for more details.

## OpenAPI Extra

When declaring a path operation, FastAPI automatically generates relevant metadata for the OpenAPI schema, including `tags`, `parameters`, `requestBody`, `responses`, etc. You can extend this schema using the parameter `openapi_extra`.

### OpenAPI Extensions

The `openapi_extra` parameter can be used to declare OpenAPI Extensions. This extension will appear at the bottom of the specific path operation in the automatic API docs and in the resulting OpenAPI schema.

### Custom OpenAPI path operation schema

The dictionary in `openapi_extra` merges with the automatically generated OpenAPI schema. You can add additional data to the schema, even if you are not using FastAPI's automatic features.

### Custom OpenAPI content type

You can use a Pydantic model to define the JSON Schema included in the custom OpenAPI schema section for the path operation, even if the request data type is not JSON. This allows you to declare the request content type as YAML, for example, while still using a Pydantic model to generate the JSON Schema.

**Note:** In Pydantic version 1, the method to get the JSON Schema for a model was `Item.schema()`, while in Pydantic version 2, it is `Item.model_json_schema()`. Similarly, the method to parse and validate an object changed from `Item.parse_obj()` in version 1 to `Item.model_validate()` in version 2.