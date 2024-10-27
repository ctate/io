# FastAPI CLI

FastAPI CLI is a command line program for serving FastAPI apps and managing FastAPI projects.

When you install FastAPI (e.g., with `pip install "fastapi[standard]"`), it includes the `fastapi-cli` package, which provides the `fastapi` command in the terminal.

To run your FastAPI app for development, use the `fastapi dev` command:

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

The `fastapi` command is FastAPI CLI. It takes the path to your Python program (e.g., `main.py`), detects the FastAPI instance (commonly named `app`), determines the import process, and serves it.

For production, use `fastapi run`.

Internally, FastAPI CLI uses Uvicorn, a high-performance, production-ready ASGI server.

## `fastapi dev`

Running `fastapi dev` initiates development mode. By default, auto-reload is enabled, reloading the server when code changes are made. This feature is resource-intensive and less stable, so it should only be used for development. It listens on the IP address `127.0.0.1` (localhost).

## `fastapi run`

Executing `fastapi run` starts FastAPI in production mode. By default, auto-reload is disabled. It listens on the IP address `0.0.0.0`, making it publicly accessible. This is the typical way to run it in production, such as in a container.

In most cases, a "termination proxy" should handle HTTPS, depending on your deployment setup.