# Form Data

When you need to receive form fields instead of JSON, use `Form`.

## Installation

To use forms, first install `python-multipart`. Create a virtual environment, activate it, and then install it:

```
$ pip install python-multipart
```

## Import `Form`

Import `Form` from `fastapi`:

### Python 3.9+

```Python
{!> ../../docs_src/request_forms/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_forms/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_forms/tutorial001.py!}
```

## Define `Form` Parameters

Create form parameters similarly to `Body` or `Query`:

### Python 3.9+

```Python
{!> ../../docs_src/request_forms/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_forms/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_forms/tutorial001.py!}
```

For example, in the OAuth2 "password flow," you must send `username` and `password` as form fields. The specification requires these fields to be named exactly `username` and `password`, sent as form fields, not JSON.

With `Form`, you can declare configurations similar to `Body`, including validation, examples, and aliases (e.g., `user-name` instead of `username`).

`Form` is a class that inherits directly from `Body`. To declare form bodies, use `Form` explicitly; otherwise, parameters will be interpreted as query parameters or body (JSON) parameters.

## About "Form Fields"

HTML forms send data to the server using a special encoding, different from JSON. FastAPI will read that data correctly.

Data from forms is typically encoded using the media type `application/x-www-form-urlencoded`. When forms include files, they are encoded as `multipart/form-data`.

You can read more about these encodings and form fields in the MDN web docs for POST.

**Warning:** You can declare multiple `Form` parameters in a path operation, but you cannot declare `Body` fields expected to receive JSON, as the request body will be encoded using `application/x-www-form-urlencoded` instead of `application/json`. This is part of the HTTP protocol.

## Recap

Use `Form` to declare form data input parameters.