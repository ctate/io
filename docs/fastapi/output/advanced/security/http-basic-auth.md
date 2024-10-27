# HTTP Basic Auth

HTTP Basic Auth allows applications to authenticate users via a header containing a username and password. If the credentials are not provided, an HTTP 401 "Unauthorized" error is returned, along with a `WWW-Authenticate` header indicating `Basic` and an optional `realm` parameter. This prompts the browser to request the username and password.

## Simple HTTP Basic Auth

1. Import `HTTPBasic` and `HTTPBasicCredentials`.
2. Create a security scheme using `HTTPBasic`.
3. Use the security scheme with a dependency in your path operation.
4. It returns an object of type `HTTPBasicCredentials`, which contains the `username` and `password`.

When accessing the URL for the first time, the browser will prompt for credentials.

## Check the Username

To verify the username and password, use the Python standard module `secrets`. The `secrets.compare_digest()` function requires `bytes` or a `str` with ASCII characters. Convert the `username` and `password` to `bytes` using UTF-8 encoding before comparison.

Example:

```Python
if not (credentials.username == "stanleyjobson") or not (credentials.password == "swordfish"):
    # Return some error
    ...
```

Using `secrets.compare_digest()` protects against timing attacks.

### Timing Attacks

Timing attacks occur when attackers guess usernames and passwords. For instance, if an attacker tries `johndoe` and `love123`, the application may quickly return "Incorrect username or password" after the first character comparison. However, if they try `stanleyjobsox`, the application takes longer to respond, revealing that some characters were correct.

Attackers can exploit this timing difference to deduce correct characters, potentially guessing the username and password over time.

### Fix with `secrets.compare_digest()`

Using `secrets.compare_digest()` ensures that all comparisons take the same amount of time, regardless of the input. This mitigates the risk of timing attacks.

### Return the Error

If the credentials are incorrect, return an `HTTPException` with a status code of 401 and include the `WWW-Authenticate` header to prompt the browser for login credentials again.