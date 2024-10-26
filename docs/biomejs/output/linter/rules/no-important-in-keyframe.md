# noImportantInKeyframe

Disallow invalid `!important` within keyframe declarations

## Diagnostic Category: `lint/suspicious/noImportantInKeyframe`

### Since: `v1.8.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/keyframe-declaration-no-important

Disallow invalid `!important` within keyframe declarations

Using `!important` within keyframes declarations is completely ignored in some browsers.

## Examples

### Invalid

```css
@keyframes foo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1 !important;
    }
}
```

```text
code-block.css:6:18 lint/suspicious/no-important-in-keyframe ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Using !important within keyframes declaration is completely ignored in some browsers.
    4 │    }
    5 │    to {
  > 6 │      opacity: 1 !important;
    │                 ^^^^^^^^^
    7 │    }
    8 │  }
  ℹ Consider removing useless !important declaration.
```

### Valid

```css
@keyframes foo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options