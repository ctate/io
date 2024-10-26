# noAccessKey

## Diagnostic Category: `lint/a11y/noAccessKey`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-access-key

Enforce that the `accessKey` attribute is not used on any HTML element.

The `accessKey` assigns a keyboard shortcut to the current element. However, the `accessKey` value
can conflict with keyboard commands used by screen readers and keyboard-only users, which leads to
inconsistent keyboard actions across applications. To avoid accessibility complications,
this rule suggests users remove the `accessKey` attribute on elements.

### Examples

#### Invalid

```jsx
<input type="submit" accessKey="s" value="Submit" />
```

```jsx
<a href="https://webaim.org/" accessKey="w">WebAIM.org</a>
```

```jsx
<button accessKey="n">Next</button>
```

### Resources

- WebAIM: Keyboard Accessibility - Accesskey
- MDN `accesskey` documentation

### Related links

- Disable a rule
- Configure the rule fix
- Rule options