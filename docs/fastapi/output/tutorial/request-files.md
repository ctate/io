# Request Files

You can define files to be uploaded by the client using `File`.

To receive uploaded files, first install `python-multipart`.

Make sure you create a virtual environment, activate it, and then install it, for example:

```
$ pip install python-multipart
```

This is because uploaded files are sent as "form data".

## Import `File`

Import `File` and `UploadFile` from `fastapi`:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001.py!}
```

## Define `File` Parameters

Create file parameters the same way you would for `Body` or `Form`:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001.py!}
```

`File` is a class that inherits directly from `Form`. When you import `Query`, `Path`, `File`, and others from `fastapi`, those are functions that return special classes.

To declare File bodies, you need to use `File`, otherwise the parameters would be interpreted as query parameters or body (JSON) parameters.

The files will be uploaded as "form data". If you declare the type of your path operation function parameter as `bytes`, FastAPI will read the file for you and you will receive the contents as `bytes`. This will work well for small files, but for larger files, you might benefit from using `UploadFile`.

## File Parameters with `UploadFile`

Define a file parameter with a type of `UploadFile`:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial001_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial001_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001.py!}
```

Using `UploadFile` has several advantages over `bytes`:

- You don't have to use `File()` in the default value of the parameter.
- It uses a "spooled" file: a file stored in memory up to a maximum size limit, and after passing this limit, it will be stored on disk.
- This means it will work well for large files like images, videos, large binaries, etc., without consuming all the memory.
- You can get metadata from the uploaded file.
- It has a file-like `async` interface.
- It exposes a `SpooledTemporaryFile` object that you can pass directly to other libraries that expect a file-like object.

### `UploadFile` Attributes

- `filename`: A `str` with the original file name that was uploaded (e.g., `myimage.jpg`).
- `content_type`: A `str` with the content type (MIME type / media type) (e.g., `image/jpeg`).
- `file`: A `SpooledTemporaryFile` (a file-like object). This is the actual Python file object that you can pass directly to other functions or libraries that expect a "file-like" object.

`UploadFile` has the following `async` methods:

- `write(data)`: Writes `data` (`str` or `bytes`) to the file.
- `read(size)`: Reads `size` (`int`) bytes/characters of the file.
- `seek(offset)`: Goes to the byte position `offset` (`int`) in the file.
- `close()`: Closes the file.

As all these methods are `async`, you need to "await" them.

For example, inside of an `async` path operation function, you can get the contents with:

```Python
contents = await myfile.read()
```

If you are inside of a normal `def` path operation function, you can access the `UploadFile.file` directly:

```Python
contents = myfile.file.read()
```

## What is "Form Data"

HTML forms send data to the server using a special encoding, different from JSON. FastAPI will read that data from the right place instead of JSON.

Data from forms is normally encoded using the media type `application/x-www-form-urlencoded` when it doesn't include files. When the form includes files, it is encoded as `multipart/form-data`. If you use `File`, FastAPI will know it has to get the files from the correct part of the body.

You can declare multiple `File` and `Form` parameters in a path operation, but you can't declare `Body` fields that you expect to receive as JSON, as the request will have the body encoded using `multipart/form-data` instead of `application/json`.

## Optional File Upload

You can make a file optional by using standard type annotations and setting a default value of `None`:

### Python 3.10+

```Python
{!> ../../docs_src/request_files/tutorial001_02_an_py310.py!}
```

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial001_02_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial001_02_an.py!}
```

### Python 3.10+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001_02_py310.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001_02.py!}
```

## `UploadFile` with Additional Metadata

You can also use `File()` with `UploadFile` to set additional metadata:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial001_03_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial001_03_an.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial001_03.py!}
```

## Multiple File Uploads

You can upload several files at the same time, associated with the same "form field" sent using "form data". Declare a list of `bytes` or `UploadFile`:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial002_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial002_an.py!}
```

### Python 3.9+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial002_py39.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial002.py!}
```

You will receive a list of `bytes` or `UploadFile`s.

### Multiple File Uploads with Additional Metadata

You can use `File()` to set additional parameters for `UploadFile`:

### Python 3.9+

```Python
{!> ../../docs_src/request_files/tutorial003_an_py39.py!}
```

### Python 3.8+

```Python
{!> ../../docs_src/request_files/tutorial003_an.py!}
```

### Python 3.9+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial003_py39.py!}
```

### Python 3.8+ non-Annotated

Prefer to use the `Annotated` version if possible.

```Python
{!> ../../docs_src/request_files/tutorial003.py!}
```

## Recap

Use `File`, `bytes`, and `UploadFile` to declare files to be uploaded in the request, sent as form data.