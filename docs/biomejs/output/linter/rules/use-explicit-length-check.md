# useExplicitLengthCheck

## Description
Enforce explicitly comparing the `length`, `size`, `byteLength` or `byteOffset` property of a value. This rule enforces a specific style for length comparisons to enhance clarity.

### Diagnostic Category
`lint/style/useExplicitLengthCheck`

### Sources
Same as: `unicorn/explicit-length-check`

### Zero Comparison Examples
Enforce comparison with `=== 0` when checking for zero length.

#### Invalid
```js
const isEmpty = !foo.length;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmpty = foo.length == 0;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmpty = foo.length < 1;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmpty = 0 === foo.length;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmpty = 0 == foo.length;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmpty = 1 > foo.length;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
// Negative style is disallowed too
const isEmpty = !(foo.length > 0);
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmptySet = !foo.size;
```
**Warning**: Use `.size === 0` when checking `.size` is zero.

#### Valid
```js
const isEmpty = foo.length === 0;
```

### Non-Zero Comparison Examples
Enforce comparison with `> 0` when checking for non-zero length.

#### Invalid
```js
const isNotEmpty = foo.length !== 0;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const isNotEmpty = foo.length != 0;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const isNotEmpty = foo.length >= 1;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const isNotEmpty = 0 !== foo.length;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const isNotEmpty = 1 <= foo.length;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const isNotEmpty = Boolean(foo.length);
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
if (foo.length) {}
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const biome = foo.length ? 1 : 2;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
while (foo.length) {}
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
do {} while (foo.length);
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
for (; foo.length; ) {};
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

#### Valid
```js
const isNotEmpty = foo.length > 0;
```
```js
if (foo.length > 0 || bar.length > 0) {}
```

### Caveats
This rule assumes that the `length`/`size` property is always numeric, even if it actually is not. For example:
```js
const foo1 = { size: "small" }; if (foo1.size) {}
```
**Warning**: Use `.size > 0` when checking `.size` is not zero.

To properly handle this case, type inference would be required, which is not supported by Biome at the moment. We recommend disabling this rule when working with non-numeric `length`/`size` properties.

### Related Links
- Disable a rule
- Configure the rule fix
- Rule options