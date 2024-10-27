# noUnknownTypeSelector

**Description:** Disallow unknown type selectors.

**Diagnostic Category:** `lint/nursery/noUnknownTypeSelector`

**Since:** `v1.9.4`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: stylelint/selector-type-no-unknown

This rule disallows unknown type selectors, considering tags defined in the HTML, SVG, and MathML specifications as known. 

For details on known CSS type selectors, see the following resources:
- developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors
- developer.mozilla.org/ja/docs/Web/HTML/Element
- developer.mozilla.org/ja/docs/Web/SVG/Element
- developer.mozilla.org/ja/docs/Web/MathML/Element

This rule allows custom elements.

## Examples

### Invalid

```css
unknown {}
```
```
code-block.css:1:1 lint/nursery/noUnknownTypeSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unknown type selector is not allowed.

> 1 │ unknown {}
  │ ^^^^^^^^^^
2 │ 

ℹ See MDN web docs for more details.

ℹ Consider replacing the unknown type selector with valid one.
```

```css
unknown > ul {}
```
```
code-block.css:1:1 lint/nursery/noUnknownTypeSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unknown type selector is not allowed.

> 1 │ unknown > ul {}
  │ ^^^^^^^^^^
2 │ 

ℹ See MDN web docs for more details.

ℹ Consider replacing the unknown type selector with valid one.
```

```css
x-Foo {}
```
```
code-block.css:1:1 lint/nursery/noUnknownTypeSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unknown type selector is not allowed.

> 1 │ x-Foo {}
  │ ^^^^^
2 │ 

ℹ See MDN web docs for more details.

ℹ Consider replacing the unknown type selector with valid one.
```

### Valid

```css
input {}
```

```css
ul > li {}
```

```css
x-foo {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options