# OAuth2 with Password (and Hashing), Bearer with JWT Tokens

This documentation outlines how to secure an application using JWT tokens and secure password hashing.

## About JWT

JWT (JSON Web Tokens) is a standard for encoding a JSON object into a compact string. A JWT looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

JWTs are not encrypted but are signed, allowing verification of the issuer. Tokens can have expiration times, after which users must re-authenticate. Modifications to the token can be detected due to signature mismatches.

## Install `PyJWT`

To generate and verify JWT tokens in Python, install `PyJWT`:

```console
$ pip install pyjwt
```

If using digital signature algorithms like RSA or ECDSA, install the cryptography library with:

```console
$ pip install "pyjwt[crypto]"
```

## Password Hashing

Hashing converts a password into a non-reversible string. The same password always produces the same hash, but the original password cannot be retrieved from the hash. This protects user passwords in case of database theft.

## Install `passlib`

`PassLib` is a Python package for handling password hashes, supporting various secure algorithms. The recommended algorithm is "Bcrypt". Install it as follows:

```console
$ pip install "passlib[bcrypt]"
```

## Hash and Verify Passwords

Import necessary tools from `passlib` and create a PassLib context for hashing and verifying passwords. Implement utility functions for hashing, verifying, and authenticating users.

### Example Code

```Python
# Example code for hashing and verifying passwords
```

## Handle JWT Tokens

Import the required modules and create a random secret key for signing JWT tokens. Use the command:

```console
$ openssl rand -hex 32
```

Set the `SECRET_KEY` variable with the generated key and define the `ALGORITHM` as `"HS256"`. Create a utility function to generate access tokens.

### Example Code

```Python
# Example code for handling JWT tokens
```

## Update Dependencies

Modify `get_current_user` to decode and verify the JWT token. If the token is invalid, return an HTTP error.

### Example Code

```Python
# Example code for updating dependencies
```

## Update the `/token` Path Operation

Create a `timedelta` for token expiration and generate a JWT access token.

### Example Code

```Python
# Example code for updating the /token path operation
```

## Technical Details about the JWT "subject" `sub`

The `sub` key in a JWT identifies the user. It can also be used for other entities, such as cars or blog posts. To avoid ID collisions, prefix the `sub` value with a unique identifier.

## Check It

Run the server and access the documentation interface. Use the credentials:

- Username: `johndoe`
- Password: `secret`

The plaintext password is never exposed in the code, only the hashed version.

## Advanced Usage with Scopes

OAuth2 scopes allow you to define specific permissions for a JWT token. This can be used to restrict access to certain API functionalities.

## Recap

This guide provides the foundation for setting up a secure FastAPI application using OAuth2 and JWT. FastAPI offers flexibility and integrates well with packages like `passlib` and `PyJWT`, allowing for secure and standard protocol implementation without compromising on features or security.