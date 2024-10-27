# Security

Security, authentication, and authorization are complex topics that often require significant effort and code, sometimes comprising over 50% of the total codebase. FastAPI offers tools to simplify these processes, allowing for standard implementation without extensive study of security specifications.

## In a hurry?

If you need to implement security with username and password authentication immediately, proceed to the next chapters.

## OAuth2

OAuth2 is a specification for handling authentication and authorization, covering various complex use cases, including third-party authentication (e.g., "login with Facebook, Google, Twitter, GitHub"). 

### OAuth 1

OAuth 1 is an older, more complex specification that included direct encryption methods. It is less popular today. OAuth2 does not specify encryption methods, assuming applications are served over HTTPS.

## OpenID Connect

OpenID Connect extends OAuth2, clarifying ambiguities to enhance interoperability. For instance, Google login utilizes OpenID Connect, while Facebook has its own version of OAuth2.

### OpenID (not "OpenID Connect")

OpenID was a separate specification aimed at similar goals as OpenID Connect but was not based on OAuth2. It is not widely used today.

## OpenAPI

OpenAPI (formerly Swagger) is the open specification for building APIs and is part of the Linux Foundation. FastAPI is built on OpenAPI, enabling automatic interactive documentation and code generation.

OpenAPI defines several security schemes:

- `apiKey`: An application-specific key from:
  - A query parameter
  - A header
  - A cookie
- `http`: Standard HTTP authentication systems, including:
  - `bearer`: A header `Authorization` with a value of `Bearer ` plus a token (inherited from OAuth2)
  - HTTP Basic authentication
  - HTTP Digest, etc.
- `oauth2`: Various OAuth2 security methods (called "flows"):
  - `implicit`
  - `clientCredentials`
  - `authorizationCode`
  - `password`: Suitable for direct application authentication.
- `openIdConnect`: Defines automatic discovery of OAuth2 authentication data, as specified in OpenID Connect.

## FastAPI Utilities

FastAPI provides tools in the `fastapi.security` module to simplify the use of these security mechanisms. Subsequent chapters will demonstrate how to add security to your API using these tools and how they integrate into the interactive documentation system.