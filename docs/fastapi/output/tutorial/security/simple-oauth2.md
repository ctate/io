# Simple OAuth2 with Password and Bearer

This documentation outlines the implementation of a complete security flow using OAuth2 with FastAPI.

## Get the `username` and `password`

Utilize FastAPI security utilities to obtain the `username` and `password`. According to OAuth2 specifications for the "password flow", the client must send `username` and `password` as form data. The field names must be exactly `username` and `password`.

### `scope`

The client can also send a form field named `scope`, which is a string of scopes separated by spaces. Common examples include:

- `users:read`
- `users:write`
- `instagram_basic`
- `https://www.googleapis.com/auth/drive`

In OAuth2, a "scope" is simply a string that declares a specific permission.

## Code to get the `username` and `password`

Use `OAuth2PasswordRequestForm` as a dependency in the path operation for `/token`:

```Python
from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordRequestForm

app = FastAPI()

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Your logic here
```

`OAuth2PasswordRequestForm` includes:

- `username`
- `password`
- Optional `scope`
- Optional `grant_type` (should be `password`)
- Optional `client_id`
- Optional `client_secret`

### Use the form data

The `OAuth2PasswordRequestForm` instance will have a `scopes` attribute containing a list of strings for each scope sent.

Retrieve user data from the database using the `username`. If the user does not exist, return an error using `HTTPException`:

```Python
from fastapi import HTTPException

user = fake_db.get(form_data.username)
if not user:
    raise HTTPException(status_code=400, detail="Incorrect username or password")
```

### Check the password

Use a password hashing system to verify the password. If the passwords do not match, return the same error.

#### Password hashing

Hashing converts a password into a non-reversible string. This ensures that even if the database is compromised, plaintext passwords are not exposed.

```Python
if not verify_password(form_data.password, user.hashed_password):
    raise HTTPException(status_code=400, detail="Incorrect username or password")
```

#### About `**user_dict`

`UserInDB(**user_dict)` allows passing user data as key-value arguments.

## Return the token

The response from the `token` endpoint must be a JSON object containing:

- `token_type`: should be `bearer`
- `access_token`: a string containing the access token

For this example, return the `username` as the token:

```Python
return {"access_token": form_data.username, "token_type": "bearer"}
```

## Update the dependencies

Create an additional dependency `get_current_active_user` that uses `get_current_user`. This ensures that only active users are retrieved.

```Python
@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user
```

## See it in action

Open the interactive docs at: http://127.0.0.1:8000/docs.

### Authenticate

Use the following credentials:

- User: `johndoe`
- Password: `secret`

### Get your own user data

Perform a `GET` request to `/users/me` to retrieve user data:

```JSON
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "full_name": "John Doe",
  "disabled": false,
  "hashed_password": "fakehashedsecret"
}
```

If logged out and the same operation is attempted, an HTTP 401 error will be returned:

```JSON
{
  "detail": "Not authenticated"
}
```

### Inactive user

Attempt to authenticate with an inactive user:

- User: `alice`
- Password: `secret2`

A "Inactive user" error will be returned:

```JSON
{
  "detail": "Inactive user"
}
```

## Recap

You now have the tools to implement a complete security system based on `username` and `password` for your API. The next chapter will cover secure password hashing and JWT tokens.