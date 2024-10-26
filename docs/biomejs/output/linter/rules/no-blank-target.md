# noBlankTarget

Disallow `target="_blank"` attribute without `rel="noreferrer"`

## Diagnostic Category: `lint/a11y/noBlankTarget`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Same as: react/jsx-no-target-blank

When creating anchor `a` element, there are times when its link has to be opened in a new browser tab
via `target="_blank"` attribute. This attribute has to paired with `rel="noreferrer"` or you're incur
in a security issue.

Refer to the noreferrer documentation and the noopener documentation

## Examples

### Invalid

```jsx
<a href='http://external.link' target='_blank'>child</a>
```

```jsx
<a href='http://external.link' target='_blank' rel="noopener">child</a>
```

```jsx
<a {...props} href='http://external.link' target='_blank' rel="noopener">child</a>
```

### Valid

```jsx
<a href='http://external.link' rel='noreferrer' target='_blank'>child</a>
```

```jsx
<a href='http://external.link' target='_blank' rel="noopener" {...props}>child</a>
```

## Options

The option `allowDomains` allows specific domains to use `target="_blank"` without `rel="noreferrer"`.
In the following configuration, it's allowed to use the domains `https://example.com` and `example.org`:

```json
{
    "//": "...",
    "options": {
        "allowDomains": ["https://example.com", "example.org"]
    }
}
```

```jsx
<>
  <a target="_blank" href="https://example.com"></a>
  <a target="_blank" href="example.org"></a>
</>
```

Biome doesn't check if the list contains valid URLs.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options