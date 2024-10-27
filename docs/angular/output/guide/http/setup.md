# Setting up `HttpClient`

Before using `HttpClient` in your app, configure it with dependency injection.

## Providing `HttpClient` through dependency injection

Use the `provideHttpClient` helper function in your application `providers` in `app.config.ts`:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
  ]
};
```

For NgModule-based bootstrap, include `provideHttpClient` in your app's NgModule providers:

```ts
@NgModule({
  providers: [
    provideHttpClient(),
  ],
  // ... other application configuration
})
export class AppModule {}
```

Inject the `HttpClient` service in your components, services, or other classes:

```ts
@Injectable({providedIn: 'root'})
export class ConfigService {
  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }
}
```

## Configuring features of `HttpClient`

`provideHttpClient` accepts optional feature configurations to modify client behavior.

### `withFetch`

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
    ),
  ]
};
```

By default, `HttpClient` uses the `XMLHttpRequest` API. The `withFetch` feature switches to the `fetch` API, which is more modern but has limitations like no upload progress events.

### `withInterceptors(...)`

Configures interceptor functions for processing requests. See the interceptor guide for more information.

### `withInterceptorsFromDi()`

Includes older class-based interceptors in the `HttpClient` configuration. See the interceptor guide for more information. 

Note: Functional interceptors (via `withInterceptors`) are recommended for predictable ordering.

### `withRequestsMadeViaParent()`

This option allows requests to pass to the parent injector's `HttpClient` instance after processing through local interceptors. Ensure an instance of `HttpClient` exists in the parent injector to avoid runtime errors.

### `withJsonpSupport()`

Enables the `.jsonp()` method for GET requests via the JSONP convention for cross-domain data loading. Prefer using CORS for cross-domain requests when possible.

### `withXsrfConfiguration(...)`

Customizes `HttpClient`'s built-in XSRF security functionality. See the security guide for more information.

### `withNoXsrfProtection()`

Disables `HttpClient`'s built-in XSRF security functionality. See the security guide for more information.

## `HttpClientModule`-based configuration

Some applications may configure `HttpClient` using the older NgModule API. The following table relates NgModules from `@angular/common/http` to provider configuration functions:

| **NgModule**                            | `provideHttpClient()` equivalent              |
| --------------------------------------- | --------------------------------------------- |
| `HttpClientModule`                      | `provideHttpClient(withInterceptorsFromDi())` |
| `HttpClientJsonpModule`                 | `withJsonpSupport()`                          |
| `HttpClientXsrfModule.withOptions(...)` | `withXsrfConfiguration(...)`                  |
| `HttpClientXsrfModule.disable()`        | `withNoXsrfProtection()`                      |

**Important:** Use caution when using `HttpClientModule` in multiple injectors. Behavior of interceptors can be poorly defined. Prefer `provideHttpClient` for multi-injector configurations for stable behavior.