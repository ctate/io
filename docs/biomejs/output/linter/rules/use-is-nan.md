# useIsNan

**Description:** Require calls to `isNaN()` when checking for `NaN`.

**Diagnostic Category:** `lint/correctness/useIsNan`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** Same as: `use-isnan`

In JavaScript, `NaN` is a special value of the `Number` type, representing "not-a-number" values. It is unique in that it is not equal to anything, including itself. Therefore, comparisons to `NaN` yield confusing results:
- `NaN === NaN` evaluates to false
- `NaN !== NaN` evaluates to true

Use `Number.isNaN()` or global `isNaN()` functions to test for `NaN`. Note that `Number.isNaN()` does not perform coercion, making it a more reliable method.

## Examples

### Invalid

```js
123 == NaN
```
Diagnostic: Use the Number.isNaN function to compare with NaN.

```js
123 != NaN
```
Diagnostic: Use the Number.isNaN function to compare with NaN.

```js
switch(foo) { case (NaN): break; }
```
Diagnostic: 'case NaN' can never match. Use Number.isNaN before the switch.

```js
Number.NaN == "abc"
```
Diagnostic: Use the Number.isNaN function to compare with NaN.

### Valid

```js
if (Number.isNaN(123) !== true) {}

foo(Number.NaN / 2)

switch(foo) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options