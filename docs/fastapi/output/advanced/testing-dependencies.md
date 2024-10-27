# Testing Dependencies with Overrides

## Overriding Dependencies During Testing

In certain scenarios, you may want to override a dependency during testing. This allows you to prevent the original dependency and its sub-dependencies from running. Instead, you can provide a different dependency that will be used solely for tests, offering a value that can replace the original dependency's value.

### Use Cases: External Service

For example, consider an external authentication provider that you need to call. You send it a token, and it returns an authenticated user. This provider may charge you per request and could take longer to respond than if you used a fixed mock user for tests. You might want to test the external provider once but avoid calling it for every test. In this case, you can override the dependency that calls the provider and use a custom dependency that returns a mock user only for your tests.

### Using the `app.dependency_overrides` Attribute

Your FastAPI application has an attribute `app.dependency_overrides`, which is a simple dictionary. To override a dependency for testing, use the original dependency (a function) as the key and your dependency override (another function) as the value. FastAPI will then call the override instead of the original dependency.

#### Example Code Snippets

For Python 3.10+:

```Python
{!> ../../docs_src/dependency_testing/tutorial001_an_py310.py!}
```

For Python 3.9+:

```Python
{!> ../../docs_src/dependency_testing/tutorial001_an_py39.py!}
```

For Python 3.8+:

```Python
{!> ../../docs_src/dependency_testing/tutorial001_an.py!}
```

For Python 3.10+ non-Annotated:

```Python
{!> ../../docs_src/dependency_testing/tutorial001_py310.py!}
```

For Python 3.8+ non-Annotated:

```Python
{!> ../../docs_src/dependency_testing/tutorial001.py!}
```

### Tips

- Prefer using the `Annotated` version if possible.
- You can set a dependency override for any dependency used in your FastAPI application, including those in path operation functions, decorators, or `.include_router()` calls.
- To reset your overrides, set `app.dependency_overrides` to an empty dictionary:

```Python
app.dependency_overrides = {}
```

- If you want to override a dependency only during specific tests, set the override at the beginning of the test function and reset it at the end.