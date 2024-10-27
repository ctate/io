# useArrayLiterals

**Description:** Disallow Array constructors.

**Diagnostic Category:** `lint/correctness/useArrayLiterals`

**Since:** `v1.7.2`

:::note
- This rule has an **unsafe** fix.
:::

**Sources:** Same as: no-array-constructor

Disallow Array constructors. Use of the Array constructor to construct a new array is generally discouraged in favor of array literal notation because of the single-argument pitfall and because the Array global may be redefined. The exception is when the Array constructor intentionally creates sparse arrays of a specified size by giving the constructor a single numeric argument.

## Examples

### Invalid

```js
Array();
```
Diagnostic: Don't use Array constructors. Use of the Array constructor is not allowed except creating sparse arrays of a specified size by giving a single numeric argument. The array literal notation [] is preferable.

```js
Array(0, 1, 2);
```
Diagnostic: Don't use Array constructors. Use of the Array constructor is not allowed except creating sparse arrays of a specified size by giving a single numeric argument. The array literal notation [] is preferable.

```js
new Array(0, 1, 2);
```
Diagnostic: Don't use Array constructors. Use of the Array constructor is not allowed except creating sparse arrays of a specified size by giving a single numeric argument. The array literal notation [] is preferable.

```js
Array(...args);
```
Diagnostic: Don't use Array constructors. Use of the Array constructor is not allowed except creating sparse arrays of a specified size by giving a single numeric argument. The array literal notation [] is preferable.

### Valid

```js
Array(500);
```

```js
[0, 1, 2];
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options