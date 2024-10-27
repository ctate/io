# noSelfAssign

**Description:** Disallow assignments where both sides are exactly the same.

**Diagnostic Category:** `lint/correctness/noSelfAssign`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**
- Same as: no-self-assign (https://eslint.org/docs/latest/rules/no-self-assign)
- Same as: self_assignment (https://rust-lang.github.io/rust-clippy/master/#/self_assignment)

Self assignments have no effect and are likely errors due to incomplete refactoring.

## Examples

### Invalid

```js
a = a;
```
code-block.js:1:5 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ a is assigned to itself.  
1 │ a = a;  
  │    ^  
2 │  

ℹ This is where is assigned.  
1 │ a = a;  
  │    ^  
2 │  

```js
[a] = [a];
```
code-block.js:1:8 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ a is assigned to itself.  
1 │ [a] = [a];  
  │       ^  
2 │  

ℹ This is where is assigned.  
1 │ [a] = [a];  
  │       ^  
2 │  

```js
({a: b} = {a: b});
```
code-block.js:1:15 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ b is assigned to itself.  
1 │ ({a: b} = {a: b});  
  │              ^  
2 │  

ℹ This is where is assigned.  
1 │ ({a: b} = {a: b});  
  │              ^  
2 │  

```js
a.b = a.b;
```
code-block.js:1:9 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ b is assigned to itself.  
1 │ a.b = a.b;  
  │        ^  
2 │  

ℹ This is where is assigned.  
1 │ a.b = a.b;  
  │      ^  
2 │  

```js
a[b] = a[b];
```
code-block.js:1:10 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ b is assigned to itself.  
1 │ a[b] = a[b];  
  │         ^  
2 │  

ℹ This is where is assigned.  
1 │ a[b] = a[b];  
  │      ^  
2 │  

```js
a[b].foo = a[b].foo;
```
code-block.js:1:17 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ foo is assigned to itself.  
1 │ a[b].foo = a[b].foo;  
  │                ^  
2 │  

ℹ This is where is assigned.  
1 │ a[b].foo = a[b].foo;  
  │      ^  
2 │  

```js
a['b'].foo = a['b'].foo;
```
code-block.js:1:21 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ foo is assigned to itself.  
1 │ a['b'].foo = a['b'].foo;  
  │                    ^  
2 │  

ℹ This is where is assigned.  
1 │ a['b'].foo = a['b'].foo;  
  │       ^  
2 │  

### Valid

```js
a &= a;
var a = a;
let a = a;
const a = a;
[a, b] = [b, a];
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)