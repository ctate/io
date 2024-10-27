# FastAPI in Containers - Docker

When deploying FastAPI applications, a common approach is to build a **Linux container image** using **Docker**. This allows for deployment in various environments. Advantages of using Linux containers include **security**, **replicability**, and **simplicity**.

## What is a Container

Containers are a lightweight way to package applications with all dependencies while keeping them isolated. They run using the host's Linux kernel, consuming minimal resources compared to full virtual machines. Containers have their own isolated processes, file systems, and networks, simplifying deployment and security.

## What is a Container Image

A **container image** is a static version of all files, environment variables, and the default command for a container. It is not running or executed; it is merely packaged files and metadata. A **container** refers to the running instance of the image, which can create or change files and environment variables, but these changes do not persist in the underlying image.

## Container Images

Docker is a primary tool for creating and managing container images. There is a public Docker Hub with pre-made official container images for various tools and applications, such as Python, PostgreSQL, MySQL, MongoDB, and Redis. Using pre-made images simplifies the process of combining different tools.

## Containers and Processes

A container image includes metadata about the default program to run when the container starts. A container runs as long as the main process is active. While a container typically has a single process, it can start subprocesses, but it cannot run without at least one active process.

## Build a Docker Image for FastAPI

To build a Docker image for FastAPI from scratch using the official Python image:

### Package Requirements

Create a `requirements.txt` file with package names and versions, for example:

```
fastapi[standard]>=0.113.0,<0.114.0
pydantic>=2.7.0,<3.0.0
```

Install dependencies with:

```
$ pip install -r requirements.txt
```

### Create the FastAPI Code

1. Create an `app` directory.
2. Create an empty `__init__.py` file.
3. Create a `main.py` file with the following content:

```Python
from typing import Union
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
```

### Dockerfile

Create a `Dockerfile` in the project directory:

```Dockerfile
FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

CMD ["fastapi", "run", "app/main.py", "--port", "80"]
```

### Behind a TLS Termination Proxy

If running behind a TLS Termination Proxy, add `--proxy-headers`:

```Dockerfile
CMD ["fastapi", "run", "app/main.py", "--proxy-headers", "--port", "80"]
```

### Build the Docker Image

To build the container image, navigate to the project directory and run:

```
$ docker build -t myimage .
```

### Start the Docker Container

Run a container based on your image:

```
$ docker run -d --name mycontainer -p 80:80 myimage
```

## Check it

Access the application at:

```
http://127.0.0.1/items/5?q=somequery
```

You should see:

```JSON
{"item_id": 5, "q": "somequery"}
```

## Interactive API docs

Access the interactive API documentation at:

```
http://127.0.0.1/docs
```

## Alternative API docs

Access the alternative documentation at:

```
http://127.0.0.1/redoc
```

## Build a Docker Image with a Single-File FastAPI

If your FastAPI application is a single file, adjust the `Dockerfile` accordingly:

```Dockerfile
FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./main.py /code/

CMD ["fastapi", "run", "main.py", "--port", "80"]
```

## Deployment Concepts

Containers simplify the process of building and deploying applications. Key deployment concepts include:

- HTTPS
- Running on startup
- Restarts
- Replication
- Memory
- Previous steps before starting

## HTTPS

HTTPS is typically handled externally by another tool, such as Traefik, or by a cloud provider.

## Running on Startup and Restarts

Container management tools like Docker and Kubernetes can easily enable containers to run on startup and restart on failure.

## Replication - Number of Processes

In a cluster, replication is managed at the cluster level rather than within individual containers. Use a single Uvicorn process per container to simplify management.

## Load Balancer

A load balancer distributes requests among multiple containers running the application.

## One Process per Container

For optimal performance, use a single Uvicorn process per container, especially in a clustered environment.

## Containers with Multiple Processes

In some cases, you may want multiple Uvicorn worker processes within a single container. Use the `--workers` option to specify the number of workers.

## Memory

Define memory limits for containers to ensure efficient resource usage, especially for memory-intensive applications.

## Previous Steps Before Starting

Use separate containers for initialization tasks or run them in the same container before starting the main application process.

## Base Docker Image

Avoid using deprecated base images. Instead, build your own image from scratch based on the official Python image.

## Deploy the Container Image

Deploy the container image using various methods, including Docker Compose, Kubernetes, or cloud services.

## Docker Image with `uv`

For projects managed with `uv`, refer to their Docker guide for integration.

## Recap

Using container systems simplifies handling deployment concepts. Build a container image from scratch based on the official Python Docker image to maximize productivity and minimize build times.