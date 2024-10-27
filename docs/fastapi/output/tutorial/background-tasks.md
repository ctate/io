# Background Tasks

You can define background tasks to be run after returning a response. This is useful for operations that need to happen after a request, but that the client doesn't have to wait for before receiving the response. Examples include:

- Email notifications sent after performing an action.
- Processing data, such as accepting a file and processing it in the background.

## Using BackgroundTasks

First, import `BackgroundTasks` and define a parameter in your path operation function with a type declaration of `BackgroundTasks`:

```Python
from fastapi import BackgroundTasks

@app.post("/send-notification/")
async def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(write_notification, email, message="some notification")
    return {"message": "Notification sent"}
```

FastAPI will create the object of type `BackgroundTasks` for you and pass it as that parameter.

## Create a Task Function

Create a function to be run as the background task. It can be an `async def` or normal `def` function. For example, a function that writes to a file:

```Python
def write_notification(email: str, message: str):
    with open("log.txt", "a") as log:
        log.write(f"Notification sent to {email}: {message}\n")
```

## Add the Background Task

Inside your path operation function, pass your task function to the background tasks object with the method `.add_task()`:

```Python
background_tasks.add_task(write_notification, email, message="some notification")
```

## Dependency Injection

Using `BackgroundTasks` works with the dependency injection system. You can declare a parameter of type `BackgroundTasks` at multiple levels: in a path operation function, in a dependency, or in a sub-dependency. FastAPI merges all background tasks and runs them afterwards.

### Example for Python 3.10+

```Python
@app.post("/process/")
async def process_data(background_tasks: BackgroundTasks):
    background_tasks.add_task(write_to_log, "Processing started")
    return {"message": "Processing started"}
```

### Example for Python 3.9+

```Python
@app.post("/process/")
async def process_data(background_tasks: BackgroundTasks):
    background_tasks.add_task(write_to_log, "Processing started")
    return {"message": "Processing started"}
```

### Example for Python 3.8+

```Python
@app.post("/process/")
async def process_data(background_tasks: BackgroundTasks):
    background_tasks.add_task(write_to_log, "Processing started")
    return {"message": "Processing started"}
```

In these examples, messages will be written to the `log.txt` file after the response is sent.

## Technical Details

The class `BackgroundTasks` comes from `starlette.background`. It is included directly in FastAPI, allowing you to import it from `fastapi` and avoid importing the alternative `BackgroundTask`. Using `BackgroundTasks` allows it to be used as a path operation function parameter, with FastAPI handling the rest.

## Caveat

For heavy background computation that doesn't need to run in the same process, consider using tools like Celery. They require more complex configurations and allow running background tasks in multiple processes and servers. For small tasks, like sending an email notification, use `BackgroundTasks`.

## Recap

Import and use `BackgroundTasks` with parameters in path operation functions and dependencies to add background tasks.