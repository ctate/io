# useHtmlLang

Enforce that `html` element has `lang` attribute.

**Diagnostic Category: `lint/a11y/useHtmlLang`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: jsx-a11y/html-has-lang

Enforce that `html` element has `lang` attribute.

## Examples

### Invalid

```jsx
<html></html>
```
```
code-block.jsx:1:1 lint/a11y/useHtmlLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a lang attribute when using the html element.

> 1 │ <html></html>
   │ ^^^^^^
2 │ 

ℹ Setting a lang attribute on HTML document elements configures the language used by screen readers when no user default is specified.
```

```jsx
<html lang={""}></html>
```
```
code-block.jsx:1:1 lint/a11y/useHtmlLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a lang attribute when using the html element.

> 1 │ <html lang={""}></html>
   │ ^^^^^^
2 │ 

ℹ Setting a lang attribute on HTML document elements configures the language used by screen readers when no user default is specified.
```

```jsx
<html lang={null}></html>
```
```
code-block.jsx:1:1 lint/a11y/useHtmlLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a lang attribute when using the html element.

> 1 │ <html lang={null}></html>
   │ ^^^^^^
2 │ 

ℹ Setting a lang attribute on HTML document elements configures the language used by screen readers when no user default is specified.
```

```jsx
<html lang={undefined}></html>
```
```
code-block.jsx:1:1 lint/a11y/useHtmlLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a lang attribute when using the html element.

> 1 │ <html lang={undefined}></html>
   │ ^^^^^^
2 │ 

ℹ Setting a lang attribute on HTML document elements configures the language used by screen readers when no user default is specified.
```

```jsx
<html lang={true}></html>
```
```
code-block.jsx:1:1 lint/a11y/useHtmlLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a lang attribute when using the html element.

> 1 │ <html lang={true}></html>
   │ ^^^^^^
2 │ 

ℹ Setting a lang attribute on HTML document elements configures the language used by screen readers when no user default is specified.
```

### Valid

```jsx
<html lang="en"></html>
```

```jsx
<html lang={language}></html>
```

```jsx
<html {...props}></html>
```

```jsx
<html lang={""} {...props}></html>
```

## Accessibility guidelines

- WCAG 3.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options