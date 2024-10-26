# noConstantCondition
Disallow constant expressions in conditions

**Diagnostic Category: `lint/correctness/noConstantCondition`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-constant-condition

## Examples

### Invalid

```js
if (false) {
    doSomethingUnfinished();
}
```

```text
code-block.js:1:5 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ if (false) {
  │     ^
  2 │     doSomethingUnfinished();
  3 │ }
```

```js
if (Boolean(1)) {
    doSomethingAlways();
}
```

```text
code-block.js:1:5 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ if (Boolean(1)) {
  │     ^^^^^^^^^^^
  2 │     doSomethingAlways();
  3 │ }
```

```js
if (undefined) {
    doSomethingUnfinished();
}
```

```text
code-block.js:1:5 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ if (undefined) {
  │     ^
  2 │     doSomethingUnfinished();
  3 │ }
```

```js
for (;-2;) {
    doSomethingForever();
}
```

```text
code-block.js:1:7 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ for (;-2;) {
  │       ^
  2 │     doSomethingForever();
  3 │ }
```

```js
while (typeof x) {
    doSomethingForever();
}
```

```text
code-block.js:1:8 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ while (typeof x) {
  │        ^
  2 │     doSomethingForever();
  3 │ }
```

```js
var result = 0 ? a : b;
```

```text
code-block.js:1:14 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ var result = 0 ? a : b;
  │              ^
  2 │
```

### Valid

```js
if (x === 0) {
    doSomething();
}

for (;;) {
    doSomethingForever();
}

while (typeof x === "undefined") {
    doSomething();
}

do {
    doSomething();
} while (x);

var result = x !== 0 ? a : b;

// Exception
while (true) {
    if (x) { break; }
    x = f();
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options