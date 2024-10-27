# Dependencies - `Depends()` and `Security()`

## `Depends()`

Dependencies are managed using the `Depends()` function, which accepts a callable. 

Import it from `fastapi`:

```python
from fastapi import Depends
```

## `Security()`

For scenarios involving security (authorization, authentication, etc.), you can use dependencies with `Depends()`. However, to declare OAuth2 scopes, use `Security()` instead.

Import `Security()` from `fastapi`:

```python
from fastapi import Security
```