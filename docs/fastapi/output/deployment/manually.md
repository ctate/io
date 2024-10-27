# Run a Server Manually

## Use the `fastapi run` Command

To serve your FastAPI application, use the following command:

```console
$ fastapi run main.py
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

 ╭─────────── FastAPI CLI - Production mode ───────────╮
 │                                                     │
 │  Serving at: http://0.0.0.0:8000                    │
 │                                                     │
 │  API docs: http://0.0.0.0:8000/docs                 │
 │                                                     │
 │  Running in production mode, for development use:   │
 │                                                     │
 │  fastapi dev                                        │
 │                                                     │
 ╰─────────────────────────────────────────────────────╯

INFO:     Started server process [2306215]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

This command is suitable for starting your FastAPI app in various environments, such as containers or servers.

## ASGI Servers

FastAPI is an ASGI web framework, which is a standard for building Python web frameworks and servers. To run a FastAPI application on a remote server, you need an ASGI server program like Uvicorn, which is included by default with the `fastapi` command.

Alternatives include:

- Uvicorn: High-performance ASGI server.
- Hypercorn: ASGI server compatible with HTTP/2 and Trio.
- Daphne: ASGI server built for Django Channels.
- Granian: Rust HTTP server for Python applications.
- NGINX Unit: Lightweight web application runtime.

## Server Machine and Server Program

The term "server" can refer to both the remote/cloud computer (physical or virtual machine) and the program running on that machine (e.g., Uvicorn). Common terms for the remote machine include server, machine, VM (virtual machine), and node.

## Install the Server Program

FastAPI comes with Uvicorn as its production server, which can be started with the `fastapi run` command. You can also install an ASGI server manually.

To install Uvicorn, create a virtual environment, activate it, and run:

```console
$ pip install "uvicorn[standard]"
```

Adding `standard` installs recommended extra dependencies, including `uvloop`, which enhances concurrency performance. Installing FastAPI with `pip install "fastapi[standard]"` also includes `uvicorn[standard]`.

## Run the Server Program

If you installed an ASGI server manually, use the following command to run your FastAPI application:

```console
$ uvicorn main:app --host 0.0.0.0 --port 80

INFO:     Uvicorn running on http://0.0.0.0:80 (Press CTRL+C to quit)
```

The command `uvicorn main:app` refers to:

- `main`: the file `main.py` (the Python module).
- `app`: the object created inside `main.py` with `app = FastAPI()`.

This is equivalent to:

```Python
from main import app
```

Each ASGI server has a similar command; refer to their documentation for specifics.

Uvicorn and other servers support a `--reload` option useful during development. However, it consumes more resources and is less stable, so it should not be used in production.

## Deployment Concepts

The examples provided run the server program (e.g., Uvicorn), starting a single process that listens on all IPs (`0.0.0.0`) on a predefined port (e.g., `80`). 

Consider additional factors for deployment, such as:

- Security - HTTPS
- Running on startup
- Restarts
- Replication (number of processes)
- Memory management
- Pre-start steps

Further details and strategies for handling these concepts will be covered in subsequent chapters.