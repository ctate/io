# Features

## FastAPI Features

**FastAPI** provides the following:

### Based on Open Standards

- OpenAPI for API creation, including path operations, parameters, request bodies, security, etc.
- Automatic data model documentation with JSON Schema.
- Designed around these standards, allowing for automatic client code generation in many languages.

### Automatic Documentation

Interactive API documentation and exploration web user interfaces based on OpenAPI, with two included by default:

- Swagger UI for interactive exploration and testing of your API.
- ReDoc as an alternative API documentation option.

### Just Modern Python

Utilizes standard Python type declarations (via Pydantic) with no new syntax to learn. Example usage:

```Python
from datetime import date
from pydantic import BaseModel

def main(user_id: str):
    return user_id

class User(BaseModel):
    id: int
    name: str
    joined: date
```

### Editor Support

Designed for an intuitive development experience with autocompletion in various editors, including:

- Visual Studio Code
- PyCharm

### Short

Sensible defaults for everything, with optional configurations. It works out of the box.

### Validation

Validation for various Python data types, including:

- JSON objects (dict)
- JSON arrays (list)
- String fields with min/max lengths
- Numbers with min/max values

Handles validation for more exotic types like URL, Email, UUID, etc., using Pydantic.

### Security and Authentication

Integrated security and authentication without compromising databases or data models. Supports:

- HTTP Basic
- OAuth2 with JWT tokens
- API keys in headers, query parameters, cookies, etc.

### Dependency Injection

An easy-to-use, powerful Dependency Injection system that supports:

- Hierarchical dependencies
- Automatic handling by the framework
- Automatic validation for path operation parameters

### Unlimited Plug-ins

No need for external plug-ins; any integration is simple to use with dependencies.

### Tested

- 100% test coverage
- 100% type-annotated codebase
- Used in production applications

## Starlette Features

**FastAPI** is fully compatible with Starlette, inheriting its features:

- High performance, comparable to NodeJS and Go
- WebSocket support
- In-process background tasks
- Startup and shutdown events
- Test client built on HTTPX
- CORS, GZip, Static Files, Streaming responses
- Session and Cookie support
- 100% test coverage
- 100% type-annotated codebase

## Pydantic Features

**FastAPI** is based on Pydantic, ensuring compatibility with additional Pydantic code:

- No new schema definition language; uses Python types
- Works well with IDEs and linters
- Validates complex structures with hierarchical models
- Extensible with custom data types and validation methods
- 100% test coverage