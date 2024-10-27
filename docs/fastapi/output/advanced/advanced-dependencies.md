# Advanced Dependencies

## Parameterized Dependencies

Dependencies can be parameterized to allow setting parameters without declaring multiple functions or classes. For example, a dependency can check if the query parameter `q` contains specific content, which can be parameterized.

## Callable Instance

In Python, an instance of a class can be made callable by defining the `__call__` method. This allows FastAPI to check for additional parameters and sub-dependencies, passing values to parameters in the path operation function.

### Example Code

```Python
class FixedContentQueryChecker:
    def __init__(self, fixed_content: str):
        self.fixed_content = fixed_content

    def __call__(self, q: str):
        return self.fixed_content in q
```

## Parameterizing the Instance

The `__init__` method can be used to declare parameters for the instance, allowing the dependency to be parameterized.

### Example Code

```Python
checker = FixedContentQueryChecker("bar")
```

## Using the Instance as a Dependency

The instance can be used in a `Depends(checker)` instead of `Depends(FixedContentQueryChecker)`. FastAPI will call the instance with the query parameter:

```Python
checker(q="somequery")
```

The result will be passed as the value of the dependency in the path operation function as the parameter `fixed_content_included`.

### Example Code

```Python
@app.get("/items/")
async def read_items(fixed_content_included: bool = Depends(checker)):
    return {"fixed_content_included": fixed_content_included}
```

## Note

These examples illustrate the concept of parameterized dependencies. Similar implementations are used in security utility functions. Understanding this concept will help in grasping how those tools work.