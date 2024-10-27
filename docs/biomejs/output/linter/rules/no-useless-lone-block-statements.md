# noUselessLoneBlockStatements

Disallow unnecessary nested block statements.

**Diagnostic Category:** `lint/complexity/noUselessLoneBlockStatements`

**Since:** `v1.3.3`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: no-lone-blocks (https://eslint.org/docs/latest/rules/no-lone-blocks)

Disallow unnecessary nested block statements.

In JavaScript, prior to ES6, standalone code blocks delimited by curly braces do not create a new scope and have no use. In ES6, code blocks may create a new scope if a block-level binding (let and const), a class declaration, or a function declaration (in strict mode) are present. A block is not considered redundant in these cases.

## Examples

### Invalid

```js
{}
```

code-block.js:1:1 lint/complexity/noUselessLoneBlockStatements ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This block statement doesn't serve any purpose and can be safely removed.  
1 │ {}  
  │ ^  
2 │  

ℹ Standalone block statements without any block-level declarations are redundant in JavaScript and can be removed to simplify the code.

```js
if (foo) {
  bar();
  {
    baz();
  }
}
```

code-block.js:3:3 lint/complexity/noUselessLoneBlockStatements FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This block statement doesn't serve any purpose and can be safely removed.  
1 │ if (foo) {  
2 │   bar();  
> 3 │   {  
  │ ^  
> 4 │     baz();  
> 5 │   }  
  │ ^  
6 │ }  
7 │  

ℹ Standalone block statements without any block-level declarations are redundant in JavaScript and can be removed to simplify the code.  
ℹ Safe fix: Remove redundant block.

1 │ if (foo) {  
2 │   bar();  
- ·  
- ·  
{  
3 │     baz();  
4 │   }  
5 │ }  

### Valid

```js
while (foo) {
  bar();
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)