# noUnmatchableAnbSelector

Disallow unmatchable An+B selectors.

**Diagnostic Category:** `lint/correctness/noUnmatchableAnbSelector`  
**Since:** `v1.8.0`  
This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/selector-anb-no-unmatchable

Selectors that always evaluate to 0 will not match any elements. For more details about the An+B syntax, see: w3.org/TR/css-syntax-3/#anb-microsyntax

## Examples

### Invalid

```css
a:nth-child(0) {}
```
code-block.css:1:13 lint/correctness/noUnmatchableAnbSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This selector will never match any elements.  
1 │ a:nth-child(0) {}  
   │            ^  
2 │  
ℹ Avoid using An+B selectors that always evaluate to 0.  
ℹ For more details, see the official spec for An+B selectors.

```css
a:nth-last-child(0n) {}
```
code-block.css:1:18 lint/correctness/noUnmatchableAnbSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This selector will never match any elements.  
1 │ a:nth-last-child(0n) {}  
   │                 ^^  
2 │  
ℹ Avoid using An+B selectors that always evaluate to 0.  
ℹ For more details, see the official spec for An+B selectors.

```css
a:nth-of-type(0n+0) {}
```
code-block.css:1:15 lint/correctness/noUnmatchableAnbSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This selector will never match any elements.  
1 │ a:nth-of-type(0n+0) {}  
   │              ^^^^  
2 │  
ℹ Avoid using An+B selectors that always evaluate to 0.  
ℹ For more details, see the official spec for An+B selectors.

```css
a:nth-last-of-type(0 of a) {}
```
code-block.css:1:20 lint/correctness/noUnmatchableAnbSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This selector will never match any elements.  
1 │ a:nth-last-of-type(0 of a) {}  
   │                   ^^^^^^  
2 │  
ℹ Avoid using An+B selectors that always evaluate to 0.  
ℹ For more details, see the official spec for An+B selectors.

### Valid

```css
a:nth-child(1) {}
```

```css
a:nth-last-child(1n) {}
```

```css
a:nth-of-type(1n+0) {}
```

```css
a:nth-last-of-type(1 of a) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options