# Interceptors

`HttpClient` supports middleware known as _interceptors_.

**TLDR:** Interceptors abstract common patterns like retrying, caching, logging, and authentication from individual requests.

`HttpClient` supports two types of interceptors: functional and DI-based. Functional interceptors are recommended for their predictable behavior, especially in complex setups. This guide primarily uses functional interceptors, with a section on [DI-based interceptors](#di-based-interceptors) at the end.

## Interceptors Overview

Interceptors are functions that run for each request, affecting the contents and flow of requests and responses. Multiple interceptors can be installed, forming a chain where each processes the request or response before passing it to the next.

Common use cases for interceptors include:

- Adding authentication headers to requests.
- Retrying failed requests with exponential backoff.
- Caching responses temporarily or until invalidated.
- Customizing response parsing.
- Logging server response times.
- Managing UI elements like loading spinners during network operations.
- Collecting and batching requests within a timeframe.
- Automatically failing requests after a timeout.
- Polling the server and refreshing results.

## Defining an Interceptor

An interceptor is a function that receives an outgoing `HttpRequest` and a `next` function for the next step in the chain. 

Example of a `loggingInterceptor`:

```typescript
export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  return next(req);
}
```

To use this interceptor, configure `HttpClient` to include it.

## Configuring Interceptors

Declare interceptors when configuring `HttpClient` through dependency injection using the `withInterceptors` feature:

```typescript
bootstrapApplication(AppComponent, {providers: [
  provideHttpClient(
    withInterceptors([loggingInterceptor, cachingInterceptor]),
  )
]});
```

Interceptors are processed in the order they are listed.

### Intercepting Response Events

An interceptor can transform the `Observable` stream of `HttpEvent`s returned by `next` to manipulate the response. Inspecting the `.type` of each event may be necessary to identify the final response object.

Example:

```typescript
export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(req.url, 'returned a response with status', event.status);
    }
  }));
}
```

## Modifying Requests

`HttpRequest` and `HttpResponse` instances are _immutable_. Interceptors cannot modify them directly but can clone these objects using the `.clone()` method.

Example of adding a header:

```typescript
const reqWithHeader = req.clone({
  headers: req.headers.set('X-New-Header', 'new header value'),
});
```

**CRITICAL:** The body of a request or response is **not** protected from deep mutations. Handle body mutations carefully to avoid issues with retries.

## Dependency Injection in Interceptors

Interceptors run in the _injection context_ of the injector that registered them and can use Angular's `inject` API to retrieve dependencies.

Example using an `AuthService`:

```typescript
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = inject(AuthService).getAuthToken();
  const newReq = req.clone({
    headers: req.headers.append('X-Authentication-Token', authToken),
  });
  return next(newReq);
}
```

## Request and Response Metadata

`HttpRequest`s have a `.context` object for storing metadata as an instance of `HttpContext`. This acts as a typed map with keys of type `HttpContextToken`.

### Defining Context Tokens

Define a new `HttpContextToken` to control caching:

```typescript
export const CACHING_ENABLED = new HttpContextToken<boolean>(() => true);
```

### Reading the Token in an Interceptor

An interceptor can read the token to apply caching logic:

```typescript
export function cachingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (req.context.get(CACHING_ENABLED)) {
    // apply caching logic
    return ...;
  } else {
    return next(req);
  }
}
```

### Setting Context Tokens When Making a Request

Provide values for `HttpContextToken`s when making a request:

```typescript
const data$ = http.get('/sensitive/data', {
  context: new HttpContext().set(CACHING_ENABLED, false),
});
```

### The Request Context is Mutable

The `HttpContext` is _mutable_. Changes made by an interceptor will persist across retries.

## Synthetic Responses

Interceptors can construct responses without invoking `next`, using the `HttpResponse` constructor:

```typescript
const resp = new HttpResponse({
  body: 'response body',
});
```

## DI-based Interceptors

`HttpClient` also supports DI-based interceptors defined as injectable classes. They implement the `HttpInterceptor` interface:

```typescript
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL: ' + req.url);
    return handler.handle(req);
  }
}
```

Configure DI-based interceptors through a multi-provider:

```typescript
bootstrapApplication(AppComponent, {providers: [
  provideHttpClient(
    withInterceptorsFromDi(),
  ),
  {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
]});
```

DI-based interceptors run in the order of their registration, which can be complex in extensive DI configurations.