# Test requests

To test external dependencies, mock the HTTP backend using the `@angular/common/http/testing` library. This allows you to simulate interactions with a remote server, capture requests, make assertions, and mock responses.

The testing library follows a pattern where the app executes code and makes requests first. The test then checks which requests were made, performs assertions, and provides responses by "flushing" each expected request. Finally, tests can verify that no unexpected requests were made.

## Setup for testing

Configure `TestBed` with `provideHttpClient()` and `provideHttpClientTesting()` in your test setup. This sets up `HttpClient` to use a test backend and provides `HttpTestingController` for interacting with it. Ensure `provideHttpClient()` is included **before** `provideHttpClientTesting()` to avoid breaking tests.

```typescript
TestBed.configureTestingModule({
  providers: [
    // ... other test providers
    provideHttpClient(),
    provideHttpClientTesting(),
  ],
});

const httpTesting = TestBed.inject(HttpTestingController);
```

Now, requests made in tests will hit the testing backend, allowing you to assert on those requests.

## Expecting and answering requests

You can write a test that expects a GET request and provides a mock response:

```typescript
TestBed.configureTestingModule({
  providers: [
    ConfigService,
    provideHttpClient(),
    provideHttpClientTesting(),
  ],
});

const httpTesting = TestBed.inject(HttpTestingController);
const service = TestBed.inject(ConfigService);
const config$ = this.configService.getConfig<Config>();
const configPromise = firstValueFrom(config$);

const req = httpTesting.expectOne('/api/config', 'Request to load the configuration');
expect(req.request.method).toBe('GET');
req.flush(DEFAULT_CONFIG);
expect(await configPromise).toEqual(DEFAULT_CONFIG);
httpTesting.verify();
```

Note: `expectOne` will fail if more than one matching request is made.

Alternatively, use an expanded form of `expectOne` to match the request method:

```typescript
const req = httpTesting.expectOne({
  method: 'GET',
  url: '/api/config',
}, 'Request to load the configuration');
```

The expectation APIs match against the full URL, including query parameters. Move the verification of outstanding requests into an `afterEach()` step:

```typescript
afterEach(() => {
  TestBed.inject(HttpTestingController).verify();
});
```

## Handling more than one request at once

To respond to duplicate requests, use the `match()` API, which returns an array of matching requests:

```typescript
const allGetRequests = httpTesting.match({method: 'GET'});
foreach (const req of allGetRequests) {
  // Handle responding to each request.
}
```

## Advanced matching

All matching functions accept a predicate function for custom matching logic:

```typescript
const requestsWithBody = httpTesting.expectOne(req => req.body !== null);
```

Use `expectNone` to assert that no requests match the given criteria:

```typescript
httpTesting.expectNone(req => req.method !== 'GET');
```

## Testing error handling

Test your app's responses to failed HTTP requests.

### Backend errors

To test backend error handling, flush requests with an error response:

```typescript
const req = httpTesting.expectOne('/api/config');
req.flush('Failed!', {status: 500, statusText: 'Internal Server Error'});
```

### Network errors

For network errors, use the `error()` method:

```typescript
const req = httpTesting.expectOne('/api/config');
req.error(new ProgressEvent('network error!'));
```