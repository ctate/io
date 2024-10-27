# Concurrency and async / await

Details about the `async def` syntax for path operation functions and some background about asynchronous code, concurrency, and parallelism.

## In a hurry?

If you are using third-party libraries that require `await`, declare your path operation functions with `async def`:

```Python
@app.get('/')
async def read_results():
    results = await some_library()
    return results
```

You can only use `await` inside functions created with `async def`.

If a third-party library does not support `await`, declare your path operation functions with `def`:

```Python
@app.get('/')
def results():
    results = some_library()
    return results
```

If your application does not need to wait for external responses, use `async def`. If unsure, use `def`.

You can mix `def` and `async def` in your path operation functions. FastAPI will handle them appropriately, ensuring asynchronous performance optimizations.

## Technical Details

Modern Python supports asynchronous code using coroutines with `async` and `await` syntax.

### Asynchronous Code

Asynchronous code allows the program to wait for an operation to complete without blocking. During this wait, the program can perform other tasks. This is particularly useful for I/O operations, which are slower than CPU operations.

### Concurrency and Burgers

**Concurrency** refers to multiple tasks making progress without necessarily executing simultaneously, while **parallelism** involves tasks running at the same time.

#### Concurrent Burgers

In a concurrent scenario, you place an order and wait while doing other activities, like chatting, until your order is ready.

#### Parallel Burgers

In a parallel scenario, multiple cashiers take orders and prepare food simultaneously. You must wait at the counter for your order, which limits your ability to engage in other activities.

### Burger Conclusion

For web applications, concurrency is often more beneficial due to the nature of I/O-bound operations. FastAPI leverages this for high performance.

### Is concurrency better than parallelism?

No, concurrency is not inherently better than parallelism. It is more effective in scenarios with significant waiting times, such as web applications. In CPU-bound tasks, parallelism is preferable.

### Concurrency + Parallelism: Web + Machine Learning

FastAPI supports both concurrency for web development and parallelism for CPU-bound tasks, making it suitable for data science and machine learning applications.

## `async` and `await`

To define asynchronous code, use `async def` and `await`:

```Python
burgers = await get_burgers(2)
```

`await` must be used within an `async def` function:

```Python
async def get_burgers(number: int):
    return burgers
```

You cannot call an `async def` function without `await`:

```Python
burgers = get_burgers(2)  # This won't work
```

### More technical details

Functions defined with `async def` must be called within other `async def` functions. FastAPI handles this for you.

### Write your own async code

FastAPI is built on Starlette, which is compatible with asyncio and Trio. You can use AnyIO for advanced concurrency patterns.

### Other forms of asynchronous code

The `async` and `await` syntax simplifies working with asynchronous code compared to previous methods like threads or callbacks.

## Coroutines

A coroutine is the result of an `async def` function. It can be paused and resumed, allowing for efficient asynchronous programming.

## Conclusion

Modern Python supports asynchronous code through coroutines with `async` and `await`, enabling FastAPI's impressive performance.

## Very Technical Details

### Path operation functions

When using `def`, FastAPI runs the function in an external threadpool to avoid blocking the server. For trivial compute-only functions, prefer `async def`.

### Dependencies

Dependencies defined with `def` run in an external threadpool, while those with `async def` are awaited.

### Sub-dependencies

You can mix dependencies with `def` and `async def`. FastAPI will manage their execution appropriately.

### Other utility functions

Utility functions can be defined with either `def` or `async def`. FastAPI's behavior depends on how you call them.