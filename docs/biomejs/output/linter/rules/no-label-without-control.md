# noLabelWithoutControl

## Diagnostic Category: `lint/a11y/noLabelWithoutControl`

### Since: `v1.8.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: jsx-a11y/label-has-associated-control

Enforce that a label element or component has a text label and an associated input.

An "input" is considered one of the following elements: `input`, `meter`, `output`, `progress`, `select` or `textarea`.

There are two supported ways to associate a label with an input:

- Wrapping an input in a label element.
- Adding a `for` attribute (or `htmlFor` in React) to a label and assigning it a DOM ID string associated with an input on the page.

This rule checks that any `label` element (or an indicated custom component that will output a `label` element) meets one of these conditions:

- Wraps an `input` element (or an indicated custom component that will output an `input` element)
- Has a `for` or `htmlFor` attribute and that the `label` element/component has accessible text content.

## Examples

### Invalid

```jsx
<label for="js_id" />;
```

```jsx
<label for="js_id"><input /></label>;
```

```jsx
<label htmlFor="js_id" />;
```

```jsx
<label htmlFor="js_id"><input /></label>;
```

```jsx
<label>A label</label>;
```

```jsx
<div><label /><input /></div>;
```

### Valid

```jsx
<label for="js_id" aria-label="A label" />;
<label for="js_id" aria-labelledby="A label" />;
<label htmlFor="js_id" aria-label="A label" />;
<label htmlFor="js_id" aria-labelledby="A label" />;
<label>A label<input /></label>;
<label>A label<textarea /></label>;
<label><img alt="A label" /><input /></label>;
```

## Options

The rule supports the following options:

- `inputComponents` - An array of component names that should be considered the same as an `input` element.
- `labelAttributes` - An array of attributes that should be treated as the `label` accessible text content.
- `labelComponents` - An array of component names that should be considered the same as a `label` element.

Both options `inputComponents` and `labelComponents` don't have support for namespace components (e.g. `<Control.Input>`).

```json
{
    "//": "...",
    "options": {
        "inputComponents": ["CustomInput"],
        "labelAttributes": ["label"],
        "labelComponents": ["CustomLabel"]
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options