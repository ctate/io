# Benchmarks

Independent TechEmpower benchmarks show FastAPI applications running under Uvicorn as one of the fastest Python frameworks available, only below Starlette and Uvicorn themselves (used internally by FastAPI).

## Benchmarks and Speed

When checking benchmarks, it is common to see several tools of different types compared as equivalent. Specifically, Uvicorn, Starlette, and FastAPI are often compared together among many other tools.

The simpler the problem solved by the tool, the better performance it will get. Most benchmarks do not test the additional features provided by the tool.

### Hierarchy

- **Uvicorn**: an ASGI server
  - **Starlette**: (uses Uvicorn) a web microframework
    - **FastAPI**: (uses Starlette) an API microframework with several additional features for building APIs, including data validation.

### Performance Insights

- **Uvicorn**:
  - Best performance due to minimal extra code apart from the server itself.
  - Not typically used to write applications directly; doing so would require including much of the code provided by Starlette or FastAPI, resulting in similar overhead.
  - Compare Uvicorn against other application servers like Daphne, Hypercorn, and uWSGI.

- **Starlette**:
  - Next best performance after Uvicorn, as it runs on Uvicorn and incurs additional overhead from executing more code.
  - Provides tools for building simple web applications with routing based on paths.
  - Compare Starlette against web frameworks or microframeworks like Sanic, Flask, and Django.

- **FastAPI**:
  - Cannot be faster than Starlette since it uses it as a foundation.
  - Offers additional features essential for building APIs, such as data validation and serialization, along with automatic documentation generated at startup without runtime overhead.
  - If using Starlette or another tool directly, you would need to implement data validation and serialization yourself, leading to similar overhead as FastAPI.
  - Using FastAPI saves development time, reduces bugs, and minimizes lines of code while maintaining comparable performance.
  - Compare FastAPI against frameworks that provide integrated automatic data validation, serialization, and documentation, such as Flask-apispec, NestJS, and Molten.