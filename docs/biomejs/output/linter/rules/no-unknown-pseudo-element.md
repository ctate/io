# noUnknownPseudoElement

**Description:** Disallow unknown pseudo-element selectors.

**Diagnostic Category:** `lint/nursery/noUnknownPseudoElement`

**Since:** `v1.8.0`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: stylelint/selector-pseudo-element-no-unknown

Disallow unknown pseudo-element selectors. This rule ignores vendor-prefixed pseudo-element selectors. For details on known CSS pseudo-elements, see the MDN web docs.

## Examples

### Invalid

```css
a::pseudo {}
```
```
code-block.css:1:4 lint/nursery/noUnknownPseudoElement ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unexpected unknown pseudo-elements: pseudo
> 1 │ a::pseudo {}
  │ ^^^^^^
2 │ 
ℹ See MDN web docs for more details.
ℹ Use a known pseudo-element instead, such as:
- after
- backdrop
- before
- etc.
```

```css
a::PSEUDO {}
```
```
code-block.css:1:4 lint/nursery/noUnknownPseudoElement ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unexpected unknown pseudo-elements: PSEUDO
> 1 │ a::PSEUDO {}
  │ ^^^^^^
2 │ 
ℹ See MDN web docs for more details.
ℹ Use a known pseudo-element instead, such as:
- after
- backdrop
- before
- etc.
```

```css
a::element {}
```
```
code-block.css:1:4 lint/nursery/noUnknownPseudoElement ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unexpected unknown pseudo-elements: element
> 1 │ a::element {}
  │ ^^^^^^
2 │ 
ℹ See MDN web docs for more details.
ℹ Use a known pseudo-element instead, such as:
- after
- backdrop
- before
- etc.
```

### Valid

```css
a:before {}
```

```css
a::before {}
```

```css
::selection {}
```

```css
input::-moz-placeholder {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options