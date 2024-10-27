# Prerendering (SSG)

Prerendering, or Static Site Generation (SSG), is the process of rendering pages to static HTML files during the build process. It offers performance benefits similar to server-side rendering (SSR) but with a reduced Time to First Byte (TTFB), enhancing user experience. The main difference is that prerendering serves static content without request-based rendering.

When the data for server-side rendering is consistent across users, prerendering is a valuable alternative, rendering pages in advance rather than dynamically for each request.

## How to Prerender a Page

To add SSR capabilities to your application, use the Angular CLI command:

```
ng add @angular/ssr
```

To create an application with prerendering capabilities from the start, use the command:

```
ng new --ssr
```

After adding SSR, generate static pages by running:

```
ng build
```

### Build Options for Prerender

The `prerender` option in the application builder can be a Boolean or an Object for detailed configuration. 

- If `false`, no prerendering occurs.
- If `true`, default values are used.
- If an Object, each option can be configured individually.

| Options          | Details                                                                                                                                                                   | Default Value |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `discoverRoutes` | Processes the Angular Router configuration to find all unparameterized routes for prerendering.                                                                         | `true`        |
| `routesFile`     | Path to a file containing a list of routes to prerender, useful for parameterized URLs.                                                                                 |               |

Example configuration:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "prerender": {
              "discoverRoutes": false
            }
          }
        }
      }
    }
  }
}
```

### Prerendering Parameterized Routes

To prerender parameterized routes, use the `routesFile` option. For example, for a route like `product/:id`, list these routes in a text file, each on a new line.

For apps with many parameterized routes, consider generating this file with a script before running `ng build`.

Example `routes.txt`:

```
/products/1
/products/555
```

Configure the builder to prerender these routes:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "prerender": {
              "routesFile": "routes.txt"
            }
          }
        }
      }
    }
  }
}
```

This setup configures `ng build` to prerender `/products/1` and `/products/555` at build time.