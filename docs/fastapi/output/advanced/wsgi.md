# Including WSGI - Flask, Django, others

You can mount WSGI applications such as Flask and Django using `WSGIMiddleware`.

## Using `WSGIMiddleware`

Import `WSGIMiddleware` and wrap your WSGI application (e.g., Flask) with the middleware. Then, mount it under a specified path.

```Python
{!../../docs_src/wsgi/tutorial001.py!}
```

## Check it

Requests under the path `/v1/` will be handled by the Flask application, while the rest will be handled by FastAPI.

Accessing the following URLs will yield:

- For Flask: 
  - URL: http://localhost:8000/v1/
  - Response: 
    ```txt
    Hello, World from Flask!
    ```

- For FastAPI: 
  - URL: http://localhost:8000/v2
  - Response: 
    ```JSON
    {
        "message": "Hello World"
    }
    ```