# useValidAnchor

Enforce that all anchors are valid, and they are navigable elements.

**Diagnostic Category: `lint/a11y/useValidAnchor`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `jsx-a11y/anchor-is-valid`

The anchor element (`<a></a>`) - also called **hyperlink** - is an important element that allows users to navigate pages, in the same page, same website or on another website.

With the advent of JSX libraries, it's now easier to attach logic to any HTML element, including anchors. This rule is designed to prevent users from attaching logic to anchors when the `href` provided is not valid. Avoid using `#` in the `href` when attaching logic to the anchor element. If the anchor has logic attached with an incorrect `href`, it is suggested to turn it into a `button`, as that is likely the intended use.

Anchor `<a></a>` elements should be used for navigation, while `<button></button>` should be used for user interaction.

**Reasons to avoid logic with an incorrect `href`:**

- It can disrupt the correct flow of user navigation (e.g., preventing a user from opening a link in another tab).
- It can create invalid links, making it difficult for crawlers to navigate the website, risking SEO penalties.

For a detailed explanation, check out the article on links vs buttons in modern web applications.

## Examples

### Invalid

```jsx
<a href={null}>navigate here</a>
```
Diagnostic: Provide a valid value for the attribute `href`.

```jsx
<a href={undefined}>navigate here</a>
```
Diagnostic: Provide a valid value for the attribute `href`.

```jsx
<a href>navigate here</a>
```
Diagnostic: Provide a valid value for the attribute `href`.

```jsx
<a href="javascript:void(0)">navigate here</a>
```
Diagnostic: Provide a valid value for the attribute `href`.

```jsx
<a onClick={something}>navigate here</a>
```
Diagnostic: Use a `button` element instead of an `a` element.

### Valid

```jsx
<a href="https://example.com" onClick={something}>navigate here</a>
```

```jsx
<a href={`https://www.javascript.com`}>navigate here</a>
```

```jsx
<a href={somewhere}>navigate here</a>
```

```jsx
<a {...spread}>navigate here</a>
```

## Accessibility guidelines

- WCAG 2.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options