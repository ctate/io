# useSimplifiedLogicExpression

Discard redundant terms from logical expressions.

**Diagnostic Category:** `lint/complexity/useSimplifiedLogicExpression`

**Since:** `v1.0.0`

**Note:** This rule has an **unsafe** fix.

## Examples

### Invalid

```js
const boolExp = true;
const r = true && boolExp;
```
code-block.js:2:11 lint/complexity/useSimplifiedLogicExpression FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Logical expression contains unnecessary complexity.  
1 │ const boolExp = true;  
2 │ const r = true && boolExp;  
3 │  
ℹ Unsafe fix: Discard redundant terms from the logical expression.  
2 │ const r = true && boolExp;  

```js
const boolExp2 = true;
const r2 = boolExp || true;
```
code-block.js:2:12 lint/complexity/useSimplifiedLogicExpression FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Logical expression contains unnecessary complexity.  
1 │ const boolExp2 = true;  
2 │ const r2 = boolExp || true;  
3 │  
ℹ Unsafe fix: Discard redundant terms from the logical expression.  
2 │ const r2 = boolExp || true;  

```js
const nonNullExp = 123;
const r3 = null ?? nonNullExp;
```
code-block.js:2:12 lint/complexity/useSimplifiedLogicExpression FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Logical expression contains unnecessary complexity.  
1 │ const nonNullExp = 123;  
2 │ const r3 = null ?? nonNullExp;  
3 │  
ℹ Unsafe fix: Discard redundant terms from the logical expression.  
2 │ const r3 = null ?? nonNullExp;  

```js
const boolExpr1 = true;
const boolExpr2 = false;
const r4 = !boolExpr1 || !boolExpr2;
```
code-block.js:3:12 lint/complexity/useSimplifiedLogicExpression FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Logical expression contains unnecessary complexity.  
1 │ const boolExpr1 = true;  
2 │ const boolExpr2 = false;  
3 │ const r4 = !boolExpr1 || !boolExpr2;  
4 │  
ℹ Unsafe fix: Reduce the complexity of the logical expression.  
3 │ const r4 = !boolExpr1 || !boolExpr2;  

### Valid

```js
const boolExpr3 = true;
const boolExpr4 = false;
const r5 = !(boolExpr1 && boolExpr2);
const boolExpr5 = true;
const boolExpr6 = false;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options