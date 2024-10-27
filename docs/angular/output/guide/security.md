# Security

This topic describes Angular's built-in protections against common web-application vulnerabilities and attacks, such as cross-site scripting (XSS). It does not cover application-level security, such as authentication and authorization.

For more information about the attacks and mitigations described below, see the Open Web Application Security Project (OWASP) Guide.

## Reporting vulnerabilities

Angular is part of Google Open Source Software Vulnerability Reward Program. For vulnerabilities in Angular, please submit your report at bughunters.google.com/report.

For more information about how Google handles security issues, see Google's security philosophy.

## Best practices

1. **Keep current with the latest Angular library releases** - Regular updates may fix security defects. Check the Angular change log for security-related updates.
2. **Don't alter your copy of Angular** - Customized versions may lack important security fixes. Share improvements with the community via pull requests.
3. **Avoid Angular APIs marked as "_Security Risk_"** - Refer to the Trusting safe values section for more information.

## Preventing cross-site scripting (XSS)

Cross-site scripting (XSS) enables attackers to inject malicious code into web pages, potentially stealing user data or impersonating users. To block XSS attacks, prevent malicious code from entering the Document Object Model (DOM).

### Angular's cross-site scripting security model

Angular treats all values as untrusted by default. When a value is inserted into the DOM, Angular sanitizes and escapes untrusted values. If a value is already sanitized and considered safe, mark it as trusted.

Angular templates are considered trusted by default and should be treated as executable code. Avoid creating templates by concatenating user input and template syntax.

Utilize Content Security Policy (CSP) and Trusted Types for additional protection. Configure the content security policy for the application and enable trusted types enforcement.

### Sanitization and security contexts

Sanitization inspects untrusted values, turning them into safe values for the DOM. Angular defines the following security contexts:

- **HTML**: Used for interpreting values as HTML.
- **Style**: Used for binding CSS into the style property.
- **URL**: Used for URL properties.
- **Resource URL**: A URL loaded and executed as code.

Angular sanitizes untrusted values for HTML and URLs. Resource URLs cannot be sanitized due to arbitrary code.

### Sanitization example

Interpolated content is always escaped. Binding to `innerHTML` can cause XSS vulnerabilities if the value is controlled by an attacker. Angular automatically sanitizes unsafe values.

### Direct use of the DOM APIs and explicit sanitization calls

Avoid directly interacting with the DOM. Use Angular templates where possible. For unavoidable cases, use Angular's sanitization functions.

### Trusting safe values

To include executable code or display an iframe, mark a value as trusted using `DomSanitizer`. Be cautious, as trusting a malicious value introduces security vulnerabilities.

### Content security policy

Content Security Policy (CSP) prevents XSS. Configure your web server to return a `Content-Security-Policy` HTTP header. The minimal policy for a new Angular application is:

```
default-src 'self'; style-src 'self' 'nonce-randomNonceGoesHere'; script-src 'self' 'nonce-randomNonceGoesHere';
```

Ensure nonces are unique per request and not predictable. If you cannot generate nonces, allow inline styles by adding `'unsafe-inline'` to the `style-src` section.

### Enforcing Trusted Types

Use Trusted Types to help secure applications from XSS. Trusted Types can simplify code auditing. Configure your web server to emit HTTP headers with Angular policies.

### Use the AOT template compiler

The AOT template compiler prevents template injection vulnerabilities and improves performance. Always use it in production deployments.

### Server-side XSS protection

HTML constructed on the server is vulnerable to injection attacks. Use a templating language that escapes values to prevent XSS vulnerabilities.

## HTTP-level vulnerabilities

Angular helps prevent two common HTTP vulnerabilities: cross-site request forgery (CSRF) and cross-site script inclusion (XSSI).

### Cross-site request forgery

In CSRF, an attacker tricks a user into sending a malicious request. To prevent this, the application must ensure that requests originate from the real application. Use a randomly created authentication token in a cookie.

### `HttpClient` XSRF/CSRF security

`HttpClient` supports a mechanism to prevent XSRF attacks by reading a token from a cookie and setting it as an HTTP header. The server must verify the token.

### Configure custom cookie/header names

Override default cookie or header names using `withXsrfConfiguration`.

### Disabling XSRF protection

If the built-in XSRF protection doesn't work, disable it using `withNoXsrfProtection`.

For more information on CSRF, see OWASP's Cross-Site Request Forgery (CSRF) and Cross-Site Request Forgery Prevention Cheat Sheet.

### Cross-site script inclusion (XSSI)

XSSI can allow an attacker's website to read data from a JSON API. Angular's `HttpClient` library recognizes and strips the non-executable prefix from JSON responses.

## Auditing Angular applications

Angular applications must follow the same security principles as regular web applications and should be audited accordingly. Security-sensitive Angular APIs are marked in the documentation.