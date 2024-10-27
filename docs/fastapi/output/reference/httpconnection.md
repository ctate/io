`HTTPConnection` class

To define dependencies compatible with both HTTP and WebSockets, use a parameter that accepts an `HTTPConnection` instead of a `Request` or a `WebSocket`.

Import it from fastapi.requests:

```python
from fastapi.requests import HTTPConnection
```