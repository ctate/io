# Metadata and Docs URLs

You can customize several metadata configurations in your FastAPI application.

## Metadata for API

You can set the following fields used in the OpenAPI specification and the automatic API docs UIs:

- **title**: `str` - The title of the API.
- **summary**: `str` - A short summary of the API. Available since OpenAPI 3.1.0, FastAPI 0.99.0.
- **description**: `str` - A short description of the API. It can use Markdown.
- **version**: `string` - The version of the API (e.g., `2.5.0`).
- **terms_of_service**: `str` - A URL to the Terms of Service for the API.
- **contact**: `dict` - Contact information for the API, containing:
  - **name**: `str` - The identifying name of the contact person/organization.
  - **url**: `str` - The URL pointing to the contact information.
  - **email**: `str` - The email address of the contact person/organization.
- **license_info**: `dict` - License information for the API, containing:
  - **name**: `str` - REQUIRED if license_info is set. The license name used for the API.
  - **identifier**: `str` - An SPDX license expression for the API. Mutually exclusive with the url field. Available since OpenAPI 3.1.0, FastAPI 0.99.0.
  - **url**: `str` - A URL to the license used for the API.

You can set them as follows:

```Python
{!../../docs_src/metadata/tutorial001.py!}
```

You can write Markdown in the description field, and it will be rendered in the output.

With this configuration, the automatic API docs would look like:

![API Docs Example](image01.png)

## License Identifier

Since OpenAPI 3.1.0 and FastAPI 0.99.0, you can set the license_info with an identifier instead of a URL.

Example:

```Python
{!../../docs_src/metadata/tutorial001_1.py!}
```

## Metadata for Tags

You can add additional metadata for the different tags used to group your path operations with the parameter openapi_tags. It takes a list containing one dictionary for each tag.

Each dictionary can contain:

- **name**: (required) `str` - The same tag name used in the tags parameter in your path operations and APIRouter.
- **description**: `str` - A short description for the tag. It can have Markdown.
- **externalDocs**: `dict` - Describing external documentation with:
  - **description**: `str` - A short description for the external docs.
  - **url**: (required) `str` - The URL for the external documentation.

### Create Metadata for Tags

Create metadata for your tags and pass it to the openapi_tags parameter:

```Python
{!../../docs_src/metadata/tutorial004.py!}
```

You can use Markdown inside of the descriptions.

You don't have to add metadata for all the tags that you use.

### Use Your Tags

Use the tags parameter with your path operations (and APIRouter) to assign them to different tags:

```Python
{!../../docs_src/metadata/tutorial004.py!}
```

### Check the Docs

Now, if you check the docs, they will show all the additional metadata:

![Tags Metadata Example](image02.png)

### Order of Tags

The order of each tag metadata dictionary defines the order shown in the docs UI.

## OpenAPI URL

By default, the OpenAPI schema is served at /openapi.json. You can configure it with the parameter openapi_url.

Example:

```Python
{!../../docs_src/metadata/tutorial002.py!}
```

To disable the OpenAPI schema completely, set openapi_url=None, which will also disable the documentation user interfaces that use it.

## Docs URLs

You can configure the two documentation user interfaces included:

- **Swagger UI**: served at /docs.
  - Set its URL with the parameter docs_url.
  - Disable it by setting docs_url=None.
- **ReDoc**: served at /redoc.
  - Set its URL with the parameter redoc_url.
  - Disable it by setting redoc_url=None.

Example:

```Python
{!../../docs_src/metadata/tutorial003.py!}
```