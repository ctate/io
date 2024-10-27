# HttpClient security

`HttpClient` supports two common HTTP security mechanisms: XSSI protection and XSRF/CSRF protection.

Tip: Consider adopting a Content Security Policy for your APIs.

## XSSI protection

Cross-Site Script Inclusion (XSSI) is a type of Cross-Site Scripting attack where an attacker loads JSON data from your API endpoints as `<script>`s on a controlled page. To prevent XSSI, serve JSON responses with a "non-executable prefix," commonly `)]}',\n`. This prefix prevents the JSON from being interpreted as executable JavaScript. `HttpClient` automatically strips this prefix when parsing JSON from a response.

## XSRF/CSRF protection

Cross-Site Request Forgery (XSRF or CSRF) is an attack technique that tricks an authenticated user into executing actions on your website unknowingly. 

`HttpClient` supports a mechanism to prevent XSRF attacks by reading a token from a cookie (default `XSRF-TOKEN`) and setting it as an HTTP header (`X-XSRF-TOKEN`). This ensures that the request comes from your client application.

By default, the interceptor sends this header on all mutating requests (like `POST`) to relative URLs, but not on GET/HEAD requests or requests with an absolute URL.

**Why not protect GET requests?**  
CSRF protection is only needed for requests that can change state on the backend. The web's same-origin policy prevents an attacking page from retrieving results of authenticated GET requests.

Your server must set a token in a JavaScript-readable session cookie called `XSRF-TOKEN` on page load or the first GET request. The server verifies that the cookie matches the `X-XSRF-TOKEN` HTTP header. The token must be unique for each user and verifiable by the server. Use a digest of your site's authentication cookie with a salt for added security.

To avoid collisions in environments with multiple Angular apps sharing the same domain, assign each application a unique cookie name.

**HttpClient supports only the client half of the XSRF protection scheme**  
Your backend service must set the cookie for your page and verify that the header is present on eligible requests. Failing to do so renders Angular's default protection ineffective.

### Configure custom cookie/header names

If your backend uses different names for the XSRF token cookie or header, use `withXsrfConfiguration` to override the defaults:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'CUSTOM_XSRF_TOKEN',
        headerName: 'X-Custom-Xsrf-Header',
      }),
    ),
  ]
};
```

### Disabling XSRF protection

To disable the built-in XSRF protection mechanism, use the `withNoXsrfProtection` feature:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withNoXsrfProtection(),
    ),
  ]
};
```