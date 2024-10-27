# UploadFile Class

Define path operation function parameters as type `UploadFile` to receive files from requests. 

Import it from FastAPI:

```python
from fastapi import UploadFile
```

Attributes of `UploadFile`:

- file
- filename
- size
- headers
- content_type
- read
- write
- seek
- close