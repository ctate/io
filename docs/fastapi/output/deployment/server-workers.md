# Server Workers - Uvicorn with Workers

## Overview

When deploying applications, you may want to replicate processes to utilize multiple cores and handle more requests. This guide shows how to use Uvicorn with worker processes using the `fastapi` or `uvicorn` commands.

## Multiple Workers

You can start multiple workers with the `--workers` command line option.

### Using FastAPI Command

To use the `fastapi` command:

```
$ fastapi run --workers 4 main.py
INFO    Using path main.py
INFO    Resolved absolute path /home/user/code/awesomeapp/main.py
INFO    Searching for package file structure from directories with __init__.py files
INFO    Importing from /home/user/code/awesomeapp
INFO    Importing module main
INFO    Found importable FastAPI app
INFO    Using import string main:app
INFO    Serving at: http://0.0.0.0:8000
INFO    API docs: http://0.0.0.0:8000/docs
INFO    Running in production mode, for development use: fastapi dev
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started parent process [27365]
INFO:     Started server process [27368]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27369]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27370]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27367]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Using Uvicorn Command

To use the `uvicorn` command directly:

```
$ uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4
INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
INFO:     Started parent process [27365]
INFO:     Started server process [27368]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27369]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27370]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Started server process [27367]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

The `--workers` option specifies the number of worker processes to start.

## Deployment Concepts

Using multiple workers helps with replication and can assist with restarts. Other deployment concepts to consider include:

- Security - HTTPS
- Running on startup
- Restarts
- Memory
- Previous steps before starting

## Containers and Docker

In the next chapter, strategies for handling deployment concepts in containers, such as Docker and Kubernetes, will be discussed. You will learn how to build your own image to run a single Uvicorn process.

## Recap

You can utilize multiple worker processes with the `--workers` option in the `fastapi` or `uvicorn` commands to leverage multi-core CPUs and run multiple processes in parallel. This setup is beneficial for your own deployment system while managing other deployment concepts.