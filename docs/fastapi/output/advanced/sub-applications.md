# Sub Applications - Mounts

To create two independent FastAPI applications with their own OpenAPI and documentation UIs, you can have a main app and "mount" one or more sub-applications.

## Mounting a FastAPI Application

"Mounting" refers to adding an independent application at a specific path, which handles all operations under that path.

### Top-level Application

First, create the main FastAPI application and its path operations:

```Python
# Example code for top-level application
```

### Sub-application

Next, create your sub-application and its path operations. This sub-application is a standard FastAPI application that will be mounted:

```Python
# Example code for sub-application
```

### Mount the Sub-application

In your top-level application, mount the sub-application at the desired path, for example, `/subapi`:

```Python
# Example code for mounting the sub-application
```

### Check the Automatic API Docs

Run the FastAPI command with your file:

```console
$ fastapi dev main.py
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

Open the documentation at http://127.0.0.1:8000/docs to see the automatic API docs for the main app, which includes only its own path operations.

Then, access the sub-application docs at http://127.0.0.1:8000/subapi/docs to view its automatic API docs, which include only its own path operations under the `/subapi` prefix.

Both user interfaces will function correctly, allowing interaction with each specific app or sub-app.

### Technical Details: `root_path`

When mounting a sub-application, FastAPI communicates the mount path using a mechanism from the ASGI specification called `root_path`. This allows the sub-application to use the path prefix for its documentation UI. Sub-applications can also have their own mounted sub-applications, and FastAPI will manage all `root_path`s automatically. 

For more information on `root_path` and its explicit usage, refer to the section about Behind a Proxy.