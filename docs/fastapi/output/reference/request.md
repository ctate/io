# Request Class

You can declare a parameter in a path operation function or dependency to be of type `Request` to access the raw request object directly, without any validation.

Import it from FastAPI:

```python
from fastapi import Request
```

Tip: To define dependencies compatible with both HTTP and WebSockets, use a parameter that takes an `HTTPConnection` instead of a `Request` or a `WebSocket`.