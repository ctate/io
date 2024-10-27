# Generate Clients

FastAPI is based on the OpenAPI specification, providing automatic compatibility with various tools, including automatic API documentation via Swagger UI. A notable advantage is the ability to generate clients (SDKs) for your API in multiple programming languages.

## OpenAPI Client Generators

Numerous tools exist for generating clients from OpenAPI. A common tool is OpenAPI Generator. For frontend development, an interesting alternative is openapi-ts.

## Client and SDK Generators - Sponsor

Several company-backed client and SDK generators based on OpenAPI (FastAPI) offer additional features on top of high-quality generated SDKs/clients. Some of these companies sponsor FastAPI, ensuring its continued development and a healthy ecosystem. Examples include:

- Speakeasy
- Stainless
- liblab

Many other companies provide similar services that can be found online.

## Generate a TypeScript Frontend Client

### FastAPI Application Example

A simple FastAPI application can be created as follows:

```Python
# Python 3.9+
{!> ../../docs_src/generate_clients/tutorial001_py39.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/generate_clients/tutorial001.py!}
```

The path operations define the models used for request and response payloads, utilizing the models `Item` and `ResponseMessage`.

### API Docs

The API docs display schemas for data sent in requests and received in responses, derived from the app's OpenAPI schema.

### Generate a TypeScript Client

#### Install openapi-ts

Install openapi-ts in your frontend code:

```console
$ npm install @hey-api/openapi-ts --save-dev
```

#### Generate Client Code

To generate the client code, use the command line application `openapi-ts`. Add the following script to your `package.json`:

```JSON
{
  "name": "frontend-app",
  "version": "1.0.0",
  "scripts": {
    "generate-client": "openapi-ts --input http://localhost:8000/openapi.json --output ./src/client --client axios"
  },
  "devDependencies": {
    "@hey-api/openapi-ts": "^0.27.38",
    "typescript": "^4.6.2"
  }
}
```

Run the script:

```console
$ npm run generate-client
```

This command generates code in `./src/client` using `axios`.

### Try Out the Client Code

You can import and use the client code, benefiting from autocompletion for methods and payloads.

## FastAPI App with Tags

For larger FastAPI apps, tags can be used to separate different groups of path operations. Example:

```Python
# Python 3.9+
{!> ../../docs_src/generate_clients/tutorial002_py39.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/generate_clients/tutorial002.py!}
```

### Generate a TypeScript Client with Tags

Generating a client for a FastAPI app using tags will separate the client code based on those tags, resulting in organized client code.

### Client Method Names

Generated method names may not be clean, as they use the OpenAPI internal operation ID. FastAPI ensures unique operation IDs by combining the function name, path, and HTTP method.

## Custom Operation IDs and Better Method Names

You can modify the generation of operation IDs for simpler method names. Ensure each operation ID remains unique, possibly by using tags.

### Custom Generate Unique ID Function

Customize the unique ID function for path operations. Example:

```Python
# Python 3.9+
{!> ../../docs_src/generate_clients/tutorial003_py39.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/generate_clients/tutorial003.py!}
```

### Generate a TypeScript Client with Custom Operation IDs

Regenerating the client will yield improved method names, reflecting the tag and function name without URL path information.

### Preprocess the OpenAPI Specification for the Client Generator

To eliminate duplicated information in method names, preprocess the OpenAPI JSON to remove prefixed tags. Example scripts:

```Python
# Python
{!> ../../docs_src/generate_clients/tutorial004.py!}
```

```Javascript
# Node.js
{!> ../../docs_src/generate_clients/tutorial004.js!}
```

### Generate a TypeScript Client with the Preprocessed OpenAPI

Modify `package.json` to use the local OpenAPI file:

```JSON
{
  "name": "frontend-app",
  "version": "1.0.0",
  "scripts": {
    "generate-client": "openapi-ts --input ./openapi.json --output ./src/client --client axios"
  },
  "devDependencies": {
    "@hey-api/openapi-ts": "^0.27.38",
    "typescript": "^4.6.2"
  }
}
```

After generating the new client, you will have clean method names with autocompletion and inline errors.

## Benefits

Using automatically generated clients provides autocompletion for methods, request payloads, and response payloads, along with inline errors. Updates to the backend code can be reflected in the frontend by regenerating the client, allowing for early error detection during development.