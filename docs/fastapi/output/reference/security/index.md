# Security Tools

To declare dependencies with OAuth2 scopes, use `Security()`. You must define the dependable, which is the callable passed as a parameter to `Depends()` or `Security()`.

Multiple tools are available to create these dependables, which integrate into OpenAPI for automatic documentation, client generation, and SDKs.

Import the following from `fastapi.security`:

```python
from fastapi.security import (
    APIKeyCookie,
    APIKeyHeader,
    APIKeyQuery,
    HTTPAuthorizationCredentials,
    HTTPBasic,
    HTTPBasicCredentials,
    HTTPBearer,
    HTTPDigest,
    OAuth2,
    OAuth2AuthorizationCodeBearer,
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
    OAuth2PasswordRequestFormStrict,
    OpenIdConnect,
    SecurityScopes,
)
```

## API Key Security Schemes

- APIKeyCookie
- APIKeyHeader
- APIKeyQuery

## HTTP Authentication Schemes

- HTTPBasic
- HTTPBearer
- HTTPDigest

## HTTP Credentials

- HTTPAuthorizationCredentials
- HTTPBasicCredentials

## OAuth2 Authentication

- OAuth2
- OAuth2AuthorizationCodeBearer
- OAuth2PasswordBearer

## OAuth2 Password Form

- OAuth2PasswordRequestForm
- OAuth2PasswordRequestFormStrict

## OAuth2 Security Scopes in Dependencies

- SecurityScopes

## OpenID Connect

- OpenIdConnect