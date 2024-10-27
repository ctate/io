# Testing

Thanks to Starlette, testing FastAPI applications is easy and enjoyable. It is based on HTTPX, which is designed based on Requests, making it familiar and intuitive. You can use pytest directly with FastAPI.

## Using `TestClient`

To use `TestClient`, first install `httpx`. Create a virtual environment, activate it, and then install it:

```
$ pip install httpx
```

Import `TestClient`. Create a `TestClient` by passing your FastAPI application to it. Create functions with a name that starts with `test_` (standard pytest conventions). Use the `TestClient` object the same way as you do with httpx. Write simple `assert` statements with standard Python expressions.

```Python
{!../../docs_src/app_testing/tutorial001.py!}
```

Notice that the testing functions are normal `def`, not `async def`. Calls to the client are also normal calls, not using `await`, allowing you to use pytest directly without complications.

You could also use `from starlette.testclient import TestClient`. FastAPI provides the same `starlette.testclient` as `fastapi.testclient` for convenience.

If you want to call async functions in your tests apart from sending requests to your FastAPI application, refer to the Async Tests in the advanced tutorial.

## Separating tests

In a real application, you would typically have your tests in a different file. Your FastAPI application might also be composed of several files/modules.

### FastAPI app file

Assuming a file structure as described in Bigger Applications:

```
.
├── app
│   ├── __init__.py
│   └── main.py
```

In `main.py`, you have your FastAPI app:

```Python
{!../../docs_src/app_testing/main.py!}
```

### Testing file

You could have a file `test_main.py` with your tests in the same Python package:

```
.
├── app
│   ├── __init__.py
│   ├── main.py
│   └── test_main.py
```

Because this file is in the same package, you can use relative imports to import the object `app` from the `main` module:

```Python
{!../../docs_src/app_testing/test_main.py!}
```

## Testing: extended example

Let's extend this example and add more details to see how to test different parts.

### Extended FastAPI app file

Continuing with the same file structure:

```
.
├── app
│   ├── __init__.py
│   ├── main.py
│   └── test_main.py
```

Assuming `main.py` has additional path operations, including a `GET` operation that could return an error and a `POST` operation that could return several errors, both requiring an `X-Token` header.

```Python
{!> ../../docs_src/app_testing/app_b_an_py310/main.py!}
```

```Python
{!> ../../docs_src/app_testing/app_b_an_py39/main.py!}
```

```Python
{!> ../../docs_src/app_testing/app_b_an/main.py!}
```

```Python
{!> ../../docs_src/app_testing/app_b_py310/main.py!}
```

```Python
{!> ../../docs_src/app_testing/app_b/main.py!}
```

### Extended testing file

Update `test_main.py` with the extended tests:

```Python
{!> ../../docs_src/app_testing/app_b/test_main.py!}
```

To pass information in the request, refer to HTTPX or Requests documentation. For example:

- To pass a path or query parameter, add it to the URL.
- To pass a JSON body, pass a Python object (e.g., a dict) to the `json` parameter.
- For Form Data, use the `data` parameter.
- For headers, use a dict in the `headers` parameter.
- For cookies, use a dict in the `cookies` parameter.

For more information about passing data to the backend, check the HTTPX documentation.

Note that the `TestClient` receives data that can be converted to JSON, not Pydantic models. If you have a Pydantic model in your test, use the `jsonable_encoder` described in JSON Compatible Encoder.

## Run it

After that, install `pytest`. Create a virtual environment, activate it, and install it:

```
$ pip install pytest
```

It will detect the files and tests automatically, execute them, and report the results. Run the tests with:

```
$ pytest

================ test session starts ================
platform linux -- Python 3.6.9, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /home/user/code/superawesome-cli/app
plugins: forked-1.1.3, xdist-1.31.0, cov-2.8.1
collected 6 items

test_main.py ......                            [100%]

================= 1 passed in 0.03s =================
```