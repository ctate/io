# Dependencies in Path Operation Decorators

In some cases, you may not need the return value of a dependency inside your path operation function, or the dependency may not return a value. However, you still need it to be executed. Instead of declaring a path operation function parameter with `Depends`, you can add a list of `dependencies` to the path operation decorator.

## Add Dependencies to the Path Operation Decorator

The path operation decorator receives an optional argument `dependencies`, which should be a list of `Depends()`.

### Python 3.9+

```Python
{!> ../../docs_src/dependencies/tutorial006_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/dependencies/tutorial006_an.py!}
```

### Python 3.8 Non-Annotated

**Tip:** Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/dependencies/tutorial006.py!}
```

These dependencies will be executed the same way as normal dependencies, but their value (if they return any) won't be passed to your path operation function.

**Tip:** Some editors check for unused function parameters and show them as errors. Using these dependencies in the path operation decorator ensures they are executed while avoiding editor/tooling errors. This can also help prevent confusion for new developers who might see an unused parameter and think it's unnecessary.

**Info:** In this example, we use invented custom headers `X-Key` and `X-Token`. In real cases, when implementing security, you would benefit more from using the integrated Security utilities.

## Dependencies Errors and Return Values

You can use the same dependency functions you normally use.

### Dependency Requirements

Dependencies can declare request requirements (like headers) or other sub-dependencies.

### Python 3.9+

```Python
{!> ../../docs_src/dependencies/tutorial006_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/dependencies/tutorial006_an.py!}
```

### Python 3.8 Non-Annotated

**Tip:** Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/dependencies/tutorial006.py!}
```

### Raise Exceptions

These dependencies can raise exceptions, just like normal dependencies.

### Python 3.9+

```Python
{!> ../../docs_src/dependencies/tutorial006_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/dependencies/tutorial006_an.py!}
```

### Python 3.8 Non-Annotated

**Tip:** Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/dependencies/tutorial006.py!}
```

### Return Values

Dependencies can return values or not; the values won't be used. You can reuse a normal dependency (that returns a value) you already use elsewhere, and even though the value won't be used, the dependency will be executed.

### Python 3.9+

```Python
{!> ../../docs_src/dependencies/tutorial006_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/dependencies/tutorial006_an.py!}
```

### Python 3.8 Non-Annotated

**Tip:** Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/dependencies/tutorial006.py!}
```

## Dependencies for a Group of Path Operations

Later, when reading about how to structure bigger applications, possibly with multiple files, you will learn how to declare a single `dependencies` parameter for a group of path operations.

## Global Dependencies

Next, we will see how to add dependencies to the whole FastAPI application, so that they apply to each path operation.