# GraphQL

FastAPI is based on the ASGI standard, making it easy to integrate any GraphQL library compatible with ASGI. You can combine normal FastAPI path operations with GraphQL in the same application.

**GraphQL** solves specific use cases and has advantages and disadvantages compared to common web APIs. Evaluate if the benefits for your use case compensate for the drawbacks.

## GraphQL Libraries

Here are some GraphQL libraries with ASGI support that can be used with FastAPI:

- Strawberry
  - Documentation for FastAPI available.
- Ariadne
  - Documentation for FastAPI integration available.
- Tartiflette
  - Tartiflette ASGI provides ASGI integration.
- Graphene
  - starlette-graphene3 is available for integration.

## GraphQL with Strawberry

Strawberry is the recommended library for working with GraphQL due to its design, which closely aligns with FastAPI's type annotations. While other libraries may be preferred based on specific use cases, Strawberry is a strong suggestion.

Example of integrating Strawberry with FastAPI:

```Python
{!../../docs_src/graphql/tutorial001.py!}
```

Learn more about Strawberry in the Strawberry documentation and the documentation for Strawberry with FastAPI.

## Older `GraphQLApp` from Starlette

Previous versions of Starlette included a `GraphQLApp` class for integration with Graphene. This class has been deprecated, but you can migrate to starlette-graphene3, which covers the same use case with an almost identical interface.

**Tip:** If you need GraphQL, consider using Strawberry, as it is based on type annotations rather than custom classes and types.

## Learn More

Learn more about GraphQL in the official GraphQL documentation. You can also read more about each of the libraries described above in their respective documentation.