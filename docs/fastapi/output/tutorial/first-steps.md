# First Steps

The simplest FastAPI file could look like this:

Copy that to a file `main.py`.

Run the live server:

```console
$ fastapi dev main.py
INFO    Using path main.py
INFO    Resolved absolute path /home/user/code/awesomeapp/main.py
INFO    Searching for package file structure from directories with __init__.py files
INFO    Importing from /home/user/code/awesomeapp

 ╭─ Python module file ─╮
 │                      │
 │  🐍 main.py          │
 │                      │
 ╰──────────────────────╯

INFO    Importing module main
INFO    Found importable FastAPI app

 ╭─ Importable FastAPI app ─╮
 │                          │
 │  from main import app   │
 │                          │
 ╰──────────────────────────╯

INFO    Using import string main:app

╭────────── FastAPI CLI - Development mode ───────────╮
│                                                     │
│  Serving at: http://127.0.0.1:8000                  │
│                                                     │
│  API docs: http://127.0.0.1:8000/docs               │
│                                                     │
│  Running in development mode, for production use:   │
│                                                     │
│  fastapi run                                        │
│                                                     │
╰─────────────────────────────────────────────────────╯

INFO:     Will watch for changes in these directories: ['/home/user/code/awesomeapp']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [2265862] using WatchFiles
INFO:     Started server process [2265873]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

In the output, there's a line with something like:

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

That line shows the URL where your app is being served on your local machine.

### Check it

Open your browser at http://127.0.0.1:8000.

You will see the JSON response as:

```JSON
{"message": "Hello World"}
```

### Interactive API docs

Now go to http://127.0.0.1:8000/docs.

You will see the automatic interactive API documentation (provided by Swagger UI).

### Alternative API docs

And now, go to http://127.0.0.1:8000/redoc.

You will see the alternative automatic documentation (provided by ReDoc).

### OpenAPI

**FastAPI** generates a "schema" with all your API using the **OpenAPI** standard for defining APIs.

#### "Schema"

A "schema" is a definition or description of something. Not the code that implements it, but just an abstract description.

#### API "schema"

In this case, OpenAPI is a specification that dictates how to define a schema of your API.

This schema definition includes your API paths, the possible parameters they take, etc.

#### Data "schema"

The term "schema" might also refer to the shape of some data, like a JSON content.

In that case, it would mean the JSON attributes and data types they have, etc.

#### OpenAPI and JSON Schema

OpenAPI defines an API schema for your API. And that schema includes definitions (or "schemas") of the data sent and received by your API using **JSON Schema**, the standard for JSON data schemas.

#### Check the `openapi.json`

If you are curious about how the raw OpenAPI schema looks like, FastAPI automatically generates a JSON (schema) with the descriptions of all your API.

You can see it directly at: http://127.0.0.1:8000/openapi.json.

It will show a JSON starting with something like:

```JSON
{
    "openapi": "3.1.0",
    "info": {
        "title": "FastAPI",
        "version": "0.1.0"
    },
    "paths": {
        "/items/": {
            "get": {
                "responses": {
                    "200": {
                        "description": "Successful Response",
                        "content": {
                            "application/json": {
...
```

#### What is OpenAPI for

The OpenAPI schema powers the two interactive documentation systems included.

There are dozens of alternatives, all based on OpenAPI. You could easily add any of those alternatives to your application built with **FastAPI**.

You could also use it to generate code automatically for clients that communicate with your API, such as frontend, mobile, or IoT applications.

## Recap, step by step

### Step 1: import `FastAPI`

`FastAPI` is a Python class that provides all the functionality for your API.

### Step 2: create a `FastAPI` "instance"

Here the `app` variable will be an "instance" of the class `FastAPI`. This will be the main point of interaction to create all your API.

### Step 3: create a *path operation*

#### Path

"Path" refers to the last part of the URL starting from the first `/`.

So, in a URL like:

```
https://example.com/items/foo
```

...the path would be:

```
/items/foo
```

A "path" is also commonly called an "endpoint" or a "route".

While building an API, the "path" is the main way to separate "concerns" and "resources".

#### Operation

"Operation" refers to one of the HTTP "methods":

* `POST`
* `GET`
* `PUT`
* `DELETE`
* `OPTIONS`
* `HEAD`
* `PATCH`
* `TRACE`

When building APIs, you normally use these specific HTTP methods to perform a specific action.

Normally you use:

* `POST`: to create data.
* `GET`: to read data.
* `PUT`: to update data.
* `DELETE`: to delete data.

In OpenAPI, each of the HTTP methods is called an "operation".

#### Define a *path operation decorator*

The `@app.get("/")` tells **FastAPI** that the function below is in charge of handling requests that go to:

* the path `/`
* using a `GET` operation

That `@something` syntax in Python is called a "decorator". A "decorator" takes the function below and does something with it.

In our case, this decorator tells **FastAPI** that the function below corresponds to the **path** `/` with an **operation** `get`.

You can also use the other operations:

* `@app.post()`
* `@app.put()`
* `@app.delete()`
* `@app.options()`
* `@app.head()`
* `@app.patch()`
* `@app.trace()`

You are free to use each operation (HTTP method) as you wish. **FastAPI** doesn't enforce any specific meaning.

### Step 4: define the **path operation function**

This is our "**path operation function**":

* **path**: is `/`.
* **operation**: is `get`.
* **function**: is the function below the "decorator" (below `@app.get("/")`).

This is a Python function. It will be called by **FastAPI** whenever it receives a request to the URL "`/`" using a `GET` operation.

### Step 5: return the content

You can return a `dict`, `list`, singular values as `str`, `int`, etc. You can also return Pydantic models. There are many other objects and models that will be automatically converted to JSON.

## Recap

* Import `FastAPI`.
* Create an `app` instance.
* Write a **path operation decorator** using decorators like `@app.get("/")`.
* Define a **path operation function**; for example, `def root(): ...`.
* Run the development server using the command `fastapi dev`.