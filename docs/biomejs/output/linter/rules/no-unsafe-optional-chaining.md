# noUnsafeOptionalChaining

Disallow the use of optional chaining in contexts where the undefined value is not allowed.

**Diagnostic Category:** `lint/correctness/noUnsafeOptionalChaining`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `no-unsafe-optional-chaining` documentation

The optional chaining (?.) expression can short-circuit with a return value of undefined. Therefore, treating an evaluated optional chaining expression as a function, object, number, etc., can cause TypeError or unexpected results. Also, parentheses limit the scope of short-circuiting in chains.

## Examples

### Invalid

```js
1 in obj?.foo;
```
```
code-block.js:1:9 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ 1 in obj?.foo;
  │        ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ 1 in obj?.foo;
  │        ^^^^^^^^^
2 │ 
```

```cjs
with (obj?.foo);
```
```
code-block.cjs:1:10 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ with (obj?.foo);
  │         ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ with (obj?.foo);
  │         ^^^^^^^^^
2 │ 
```

```js
for (bar of obj?.foo);
```
```
code-block.js:1:16 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ for (bar of obj?.foo);
  │                ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ for (bar of obj?.foo);
  │                ^^^^^^^^^
2 │ 
```

```js
bar instanceof obj?.foo;
```
```
code-block.js:1:19 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ bar instanceof obj?.foo;
  │                   ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ bar instanceof obj?.foo;
  │                   ^^^^^^^^^
2 │ 
```

```js
const { bar } = obj?.foo;
```
```
code-block.js:1:20 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ const { bar } = obj?.foo;
  │                    ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ const { bar } = obj?.foo;
  │                    ^^^^^^^^^
2 │ 
```

```js
(obj?.foo)();
```
```
code-block.js:1:5 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ (obj?.foo)();
  │     ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ (obj?.foo)();
  │          ^^^^
2 │ 
```

```js
(baz?.bar).foo;
```
```
code-block.js:1:5 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ (baz?.bar).foo;
  │     ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ (baz?.bar).foo;
  │          ^^^^^
2 │ 
```

### Valid

```js
(obj?.foo)?.();
obj?.foo();
(obj?.foo ?? bar)();
obj?.foo.bar;
obj.foo?.bar;
foo?.()?.bar;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options