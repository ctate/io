# Global Dependencies

For certain applications, you may want to add dependencies to the entire application. Similar to adding `dependencies` to path operation decorators, you can add them to the `FastAPI` application. In this case, they will be applied to all path operations in the application.

## Code Examples

### Python 3.9+

```Python
{!> ../../docs_src/dependencies/tutorial012_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/dependencies/tutorial012_an.py!}
```

### Python 3.8 Non-Annotated

**Tip:** Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/dependencies/tutorial012.py!}
```

The concepts from the section on adding `dependencies` to path operation decorators still apply, but in this case, they affect all path operations in the app.

## Dependencies for Groups of Path Operations

When structuring larger applications, you will learn how to declare a single `dependencies` parameter for a group of path operations.