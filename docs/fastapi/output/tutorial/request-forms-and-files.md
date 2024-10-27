# Request Forms and Files

You can define files and form fields simultaneously using `File` and `Form`.

To receive uploaded files and/or form data, first install `python-multipart`.

Make sure to create a virtual environment, activate it, and then install it:

```
$ pip install python-multipart
```

## Import `File` and `Form`

### Python 3.9+

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001.py!}
```

## Define `File` and `Form` parameters

Create file and form parameters similarly to how you would for `Body` or `Query`:

### Python 3.9+

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_forms_and_files/tutorial001.py!}
```

The files and form fields will be uploaded as form data, and you will receive the files and form fields. You can declare some files as `bytes` and others as `UploadFile`.

**Warning:** You can declare multiple `File` and `Form` parameters in a path operation, but you cannot declare `Body` fields that you expect to receive as JSON. The request will have the body encoded using `multipart/form-data` instead of `application/json`. This is part of the HTTP protocol, not a limitation of FastAPI.

## Recap

Use `File` and `Form` together when you need to receive data and files in the same request.