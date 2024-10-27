# Exceptions - HTTPException and WebSocketException

These exceptions can be raised to indicate errors to the client.

When an exception is raised, the execution is aborted, allowing you to raise these exceptions from anywhere in the code to terminate a request and display the error to the client.

You can use:

- HTTPException
- WebSocketException

These exceptions can be imported directly from fastapi:

```python
from fastapi import HTTPException, WebSocketException
```

HTTPException

WebSocketException