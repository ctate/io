# About FastAPI Versions

FastAPI is in production use across many applications, with 100% test coverage. Development is ongoing, with frequent feature additions and bug fixes. Current versions are `0.x.x`, indicating potential breaking changes, in line with Semantic Versioning conventions.

You can create production applications with FastAPI now, ensuring you use a version compatible with your code.

## Pin Your FastAPI Version

Pin the FastAPI version to the specific latest version that works for your application. For example, if using version `0.112.0`, specify it in a `requirements.txt` file as:

```txt
fastapi[standard]==0.112.0
```

Alternatively, you can pin it with:

```txt
fastapi[standard]>=0.112.0,<0.113.0
```

This allows for versions `0.112.0` and above, but below `0.113.0` (e.g., `0.112.2` is acceptable).

Other package management tools like `uv`, Poetry, and Pipenv also support defining specific package versions.

## Available Versions

Check available versions in the Release Notes.

## About Versions

Following Semantic Versioning, any version below `1.0.0` may introduce breaking changes. FastAPI adheres to the convention that "PATCH" version changes are for bug fixes and non-breaking changes.

The "PATCH" is the last number in a version (e.g., in `0.2.3`, the PATCH version is `3`).

You can pin to a version like:

```txt
fastapi>=0.45.0,<0.46.0
```

Breaking changes and new features are introduced in "MINOR" versions.

The "MINOR" is the middle number in a version (e.g., in `0.2.3`, the MINOR version is `2`).

## Upgrading FastAPI Versions

Add tests for your application. FastAPI simplifies testing (thanks to Starlette); refer to the Testing documentation.

After adding tests, upgrade FastAPI to a more recent version and verify functionality by running your tests. If everything works and tests pass, pin FastAPI to the new version.

## About Starlette

Do not pin the version of Starlette. Different FastAPI versions will use specific newer versions of Starlette. Allow FastAPI to manage the correct Starlette version.

## About Pydantic

Pydantic includes tests for FastAPI, ensuring compatibility with new versions (above `1.0.0`). You can pin Pydantic to any version above `1.0.0` that suits your needs, for example:

```txt
pydantic>=2.7.0,<3.0.0
```