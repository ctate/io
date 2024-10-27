# Alternatives, Inspiration and Comparisons

## Intro

**FastAPI** was inspired by the work of previous frameworks and tools. The goal was to create a new framework that combined the best ideas from existing tools while utilizing Python 3.6+ type hints.

## Previous Tools

### Django

Django is a popular Python framework used for building systems like Instagram. It is tightly coupled with relational databases, making it challenging to use with NoSQL databases. It was designed for backend HTML generation rather than modern API creation.

### Django REST Framework

Django REST Framework enhances Django's API capabilities and was one of the first to offer automatic API documentation. It inspired **FastAPI** to include an automatic API documentation web user interface.

### Flask

Flask is a microframework that allows flexibility in using NoSQL databases. Its simplicity and decoupling of components inspired **FastAPI** to adopt a micro-framework approach and a straightforward routing system.

### Requests

**FastAPI** is not an alternative to **Requests**, but it draws inspiration from its intuitive design and sensible defaults. **Requests** is used to interact with APIs, while **FastAPI** is for building them.

### Swagger / OpenAPI

The desire for automatic API documentation led to the adoption of Swagger, which later became OpenAPI. **FastAPI** integrates standards-based user interface tools like Swagger UI and ReDoc.

### Flask REST Frameworks

Many Flask REST frameworks were found to be discontinued or unfit for use.

### Marshmallow

Marshmallow provides data serialization and validation. It inspired **FastAPI** to use code for defining schemas that automatically provide data types and validation.

### Webargs

Webargs is used for parsing incoming request data and was created by the same developers as Marshmallow. It inspired **FastAPI** to implement automatic validation of incoming request data.

### APISpec

APISpec generates OpenAPI schemas but requires YAML definitions in docstrings, which can lead to maintenance issues. **FastAPI** was inspired to support OpenAPI without such limitations.

### Flask-apispec

Flask-apispec integrates Webargs, Marshmallow, and APISpec to generate OpenAPI schemas automatically, inspiring **FastAPI** to generate OpenAPI schemas from the same code that defines serialization and validation.

### NestJS (and Angular)

NestJS is a JavaScript framework inspired by Angular, featuring a dependency injection system. It inspired **FastAPI** to use Python types for editor support and to minimize code repetition.

### Sanic

Sanic is a fast Python framework based on `asyncio`. It inspired **FastAPI** to achieve high performance, leading to its foundation on Starlette.

### Falcon

Falcon is a minimal high-performance framework that requires manual data validation and serialization. It inspired **FastAPI** to find ways to achieve great performance while allowing optional response parameters.

### Molten

Molten shares similar ideas with **FastAPI** but is based on WSGI and has a more verbose configuration. It inspired **FastAPI** to define extra validations for data types using default values.

### Hug

Hug was one of the first frameworks to use Python type hints for API parameter types. It inspired **FastAPI** to declare parameters and generate schemas automatically.

### APIStar

APIStar was a promising framework that used Python type hints and the OpenAPI standard. It inspired **FastAPI** to exist and improve upon its features.

## Used by FastAPI

### Pydantic

Pydantic is used for data validation, serialization, and documentation based on Python type hints, making it intuitive and fast.

### Starlette

Starlette is a lightweight ASGI framework that provides core web functionality. **FastAPI** builds on Starlette, adding features like automatic data validation and OpenAPI schema generation.

### Uvicorn

Uvicorn is a fast ASGI server recommended for running **FastAPI** applications. It supports asynchronous multi-process servers.

## Benchmarks and Speed

For comparisons of Uvicorn, Starlette, and FastAPI, refer to the benchmarks section.