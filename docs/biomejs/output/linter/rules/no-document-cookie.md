# noDocumentCookie
Disallow direct assignments to `document.cookie`.

## Diagnostic Category
`lint/nursery/noDocumentCookie`

## Since
`v1.9.4`

This rule is part of the nursery group.

## Sources
- Same as: unicorn/no-document-cookie
- https://developer.mozilla.org/en-US/docs/Web/API/CookieStore

## Description
Disallow direct assignments to `document.cookie`.

It's not recommended to use document.cookie directly as it's easy to get the string wrong.
Instead, you should use the Cookie Store API.

## Examples

### Invalid

```javascript
document.cookie = "foo=bar";
```

```javascript
document.cookie += "; foo=bar";
```

### Valid

```javascript
const array = document.cookie.split("; ");
```

```javascript
await cookieStore
  .set({
    name: "foo",
    value: "bar",
    expires: Date.now() + 24 * 60 * 60,
    domain: "example.com",
})
```

```javascript
import Cookies from 'js-cookie';

Cookies.set('foo', 'bar');
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options