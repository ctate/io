# noUnknownFunction

**Description:** Disallow unknown CSS value functions.

**Diagnostic Category:** `lint/correctness/noUnknownFunction`

**Since:** `v1.8.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** 
- Same as: stylelint/function-no-unknown

This rule disallows unknown CSS value functions, ignoring double-dashed custom functions (e.g., `--custom-function()`).

**Data sources of known CSS value functions:**
- MDN reference on CSS value functions: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions
- MDN reference on CSS reference: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
- MDN browser compatibility data for CSS value functions: https://github.com/mdn/browser-compat-data/tree/main/css/types

## Examples

### Invalid

```css
a { transform: unknown(1); }
```

**Error Message:**
code-block.css:1:16 lint/correctness/noUnknownFunction ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Unexpected unknown function: **unknown**  
> 1 │ a { transform: unknown(1); }  
>   │               ^^^^^^^^  
ℹ Use a known function instead.  
ℹ See MDN web docs for more details.

### Valid

```css
a { transform: scale(1); }
```

## Related links

- Disable a rule: /linter/#disable-a-lint-rule
- Configure the rule fix: /linter#configure-the-rule-fix
- Rule options: /linter/#rule-options