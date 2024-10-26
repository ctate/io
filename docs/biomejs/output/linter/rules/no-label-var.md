# noLabelVar
Disallow labels that share a name with a variable

## Diagnostic Category: `lint/suspicious/noLabelVar`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `no-label-var`

## Examples

### Invalid

```js
const x1 = "test";
x1: expr;
```

```
code-block.js:2:1 lint/suspicious/noLabelVar 
  Do not use the x1 variable name as a label
  1 │ const x1 = "test";
> 2 │ x1: expr;
  │   ^ ^
  3 │ 
  The variable is declared here
> 1 │ const x1 = "test";
  │       ^ ^
  2 │ x1: expr;
  3 │ 
  Creating a label with the same name as an in-scope variable leads to confusion.
```

### Valid

```js
const x = "test";
z: expr;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options