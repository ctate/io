# OAuth2 Scopes

OAuth2 scopes can be used directly with FastAPI, allowing for a fine-grained permission system integrated into your OpenAPI application and API documentation. This mechanism is utilized by major authentication providers like Facebook, Google, GitHub, Microsoft, and Twitter to provide specific permissions to users and applications.

## Overview

OAuth2 scopes are defined as a list of strings separated by spaces, representing permissions. In OpenAPI, security schemes can declare and use these scopes. Common examples include:
- `users:read`
- `users:write`
- `instagram_basic` (Facebook/Instagram)
- `https://www.googleapis.com/auth/drive` (Google)

## Global View

The following changes are made to the examples in the main Tutorial - User Guide for OAuth2 with Password (and hashing), Bearer with JWT tokens, now using OAuth2 scopes.

### OAuth2 Security Scheme

Declare the OAuth2 security scheme with available scopes, such as `me` and `items`. The `scopes` parameter receives a dictionary with each scope as a key and its description as the value.

### JWT Token with Scopes

Modify the token path operation to return the requested scopes. The `OAuth2PasswordRequestForm` includes a `scopes` property with a list of strings representing the scopes received in the request.

### Declare Scopes in Path Operations and Dependencies

Declare that the path operation for `/users/me/items/` requires the scope `items` using `Security` from FastAPI. The `Security` function allows for declaring dependencies and specifying scopes.

### Use SecurityScopes

Update the dependency `get_current_user` to include a parameter of type `SecurityScopes`, which contains all required scopes.

### Use the Scopes

The `security_scopes` parameter will have a property `scopes` with a list of all required scopes. An `HTTPException` can be raised if the required scopes are not included in the token.

### Verify the Username and Data Shape

Verify that a `username` is provided and extract the scopes. Validate the data with a Pydantic model, ensuring it matches the expected structure.

### Verify the Scopes

Check that all required scopes are included in the token received. Raise an `HTTPException` if any required scopes are missing.

### Dependency Tree and Scopes

The dependency tree illustrates how scopes are inherited through dependencies. Each path operation can declare its own required scopes, which are then checked against the token.

### More Details About SecurityScopes

`SecurityScopes` can be used at any point in the dependency tree, allowing for flexible scope management across different path operations.

## Check It

In the API docs, you can authenticate and specify which scopes to authorize. If no scopes are selected, access to certain endpoints will be restricted based on the permissions granted.

## About Third Party Integrations

When building an OAuth2 application for third-party integrations, consider using the implicit flow or code flow for enhanced security. FastAPI provides utilities for various OAuth2 authentication flows in `fastapi.security.oauth2`.

## Security in Decorator Dependencies

You can define a list of `Security` dependencies in the decorator's `dependencies` parameter, similar to how `Depends` is used.