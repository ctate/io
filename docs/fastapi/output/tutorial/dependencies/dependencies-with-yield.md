# Dependencies with Yield

FastAPI supports dependencies that perform additional steps after finishing. To implement this, use `yield` instead of `return`, placing the extra steps after the `yield`.

**Tip:** Use `yield` only once per dependency.

**Technical Details:**
Any function valid for `@contextlib.contextmanager` or `@contextlib.asynccontextmanager` can be used as a FastAPI dependency. FastAPI utilizes these decorators internally.

## A Database Dependency with Yield

You can create a database session and close it after finishing. Only the code before and including the `yield` statement executes before creating a response. The yielded value is injected into path operations and other dependencies, while the code after the `yield` executes after the response is delivered.

**Tip:** You can use `async` or regular functions; FastAPI handles both correctly.

## A Dependency with Yield and Try

Using a `try` block in a dependency with `yield` allows you to catch exceptions thrown during its use. You can handle specific exceptions with `except SomeException`. Use `finally` to ensure exit steps execute regardless of exceptions.

## Sub-dependencies with Yield

You can create sub-dependencies of any size, all capable of using `yield`. FastAPI ensures the exit code in each dependency with `yield` runs in the correct order. Dependencies can depend on one another, and you can mix dependencies that use `yield` and those that use `return`.

**Technical Details:** This functionality relies on Python's Context Managers, which FastAPI uses internally.

## Dependencies with Yield and HTTPException

You can raise an `HTTPException` in the exit code after the `yield`. This technique is advanced and typically unnecessary, as exceptions can be raised in the application code.

## Dependencies with Yield and Except

If you catch an exception in a dependency with `yield` and do not raise it again, FastAPI will not recognize the exception, leading to an HTTP 500 Internal Server Error without logs.

### Always Raise in Dependencies with Yield and Except

If you catch an exception, you should re-raise the original exception unless raising another `HTTPException`. This ensures the server logs the error.

## Execution of Dependencies with Yield

The execution sequence involves the client starting a request, running code up to `yield`, and handling exceptions as they arise. Only one response is sent to the client, which cannot be changed afterward.

**Tip:** This diagram illustrates the flow of exceptions, including `HTTPException`, through dependencies with `yield`.

## Dependencies with Yield, HTTPException, Except, and Background Tasks

**Warning:** This section contains technical details primarily relevant for users of FastAPI versions prior to 0.106.0.

### Dependencies with Yield and Except, Technical Details

In versions before FastAPI 0.110.0, unhandled exceptions captured in dependencies with `yield` would be forwarded to exception handlers. This behavior changed to prevent unhandled memory consumption.

### Background Tasks and Dependencies with Yield, Technical Details

Before FastAPI 0.106.0, raising exceptions after `yield` was not possible. This was changed to allow better resource management, encouraging the creation of resources for background tasks within the tasks themselves.

## Context Managers

### What are Context Managers

Context Managers are Python objects used in a `with` statement, ensuring resources are properly managed. For example, using `with open(...)` ensures files are closed after use.

### Using Context Managers in Dependencies with Yield

**Warning:** This is an advanced concept. Beginners may want to skip it.

You can create Context Managers by defining a class with `__enter__()` and `__exit__()` methods. You can also use `with` or `async with` statements inside FastAPI dependencies with `yield`.

**Tip:** FastAPI internally uses `@contextlib.contextmanager` and `@contextlib.asynccontextmanager` for dependencies with `yield`, but you do not need to use these decorators in your FastAPI dependencies.