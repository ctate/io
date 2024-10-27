# Tutorial - User Guide

This tutorial demonstrates how to use FastAPI with its features, step by step. Each section builds on the previous ones but is structured to allow direct access to specific topics for solving API needs. It serves as a future reference for your requirements.

## Run the Code

All code blocks can be copied and used directly as they are tested Python files. To run any example, copy the code to a file named `main.py`, and start FastAPI with:

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

It is highly encouraged to write or copy the code, edit it, and run it locally. Using it in your editor showcases the benefits of FastAPI, including minimal code, type checks, and autocompletion.

## Install FastAPI

The first step is to install FastAPI. Create a virtual environment, activate it, and then install FastAPI:

```console
$ pip install "fastapi[standard]"
```

When you install with `pip install "fastapi[standard]"`, it includes default optional standard dependencies. If you prefer not to have those optional dependencies, you can install it with `pip install fastapi`.

## Advanced User Guide

An **Advanced User Guide** is available for later reading. It builds on this tutorial, using the same concepts while teaching additional features. It is recommended to first complete the **Tutorial - User Guide** to build a complete application, then extend it using ideas from the **Advanced User Guide**.