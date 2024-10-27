# useNumberNamespace

Use the `Number` properties instead of global ones.

**Diagnostic Category: `lint/style/useNumberNamespace`**

**Since**: `v1.5.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: `unicorn/prefer-number-properties`

Use the `Number` properties instead of global ones.

ES2015 moved some globals into the `Number` properties for consistency.

The rule doesn't report the globals `isFinite` and `isNaN` because they have a slightly different behavior to their corresponding `Number`'s properties `Number.isFinite` and `Number.isNaN`. You can use the dedicated rules `noGlobalIsFinite` and `noGlobalIsNan` to enforce the use of `Number.isFinite` and `Number.isNaN`.

## Examples

### Invalid

```js
parseInt("1"); // true
```
code-block.js:1:1 lint/style/useNumberNamespace FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Use Number.parseInt instead of the equivalent global.  
> 1 │ parseInt("1"); // true  
>  │ ^  
ℹ ES2015 moved some globals into the Number namespace for consistency.  
ℹ Safe fix: Use Number.parseInt instead.  

```js
parseFloat("1.1"); // true
```
code-block.js:1:1 lint/style/useNumberNamespace FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Use Number.parseFloat instead of the equivalent global.  
> 1 │ parseFloat("1.1"); // true  
>  │ ^  
ℹ ES2015 moved some globals into the Number namespace for consistency.  
ℹ Safe fix: Use Number.parseFloat instead.  

```js
NaN; // true
```
code-block.js:1:1 lint/style/useNumberNamespace FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Use Number.NaN instead of the equivalent global.  
> 1 │ NaN; // true  
>  │ ^  
ℹ ES2015 moved some globals into the Number namespace for consistency.  
ℹ Safe fix: Use Number.NaN instead.  

```js
Infinity; // true
```
code-block.js:1:1 lint/style/useNumberNamespace FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Use Number.POSITIVE_INFINITY instead of the equivalent global.  
> 1 │ Infinity; // true  
>  │ ^  
ℹ ES2015 moved some globals into the Number namespace for consistency.  
ℹ Safe fix: Use Number.POSITIVE_INFINITY instead.  

```js
-Infinity; // true
```
code-block.js:1:2 lint/style/useNumberNamespace FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Use Number.NEGATIVE_INFINITY instead of the equivalent global.  
> 1 │ -Infinity; // true  
>  │ ^  
ℹ ES2015 moved some globals into the Number namespace for consistency.  
ℹ Safe fix: Use Number.NEGATIVE_INFINITY instead.  

### Valid

```js
Number.parseInt("1"); // false
```

```js
Number.parseFloat("1.1"); // false
```

```js
Number.NaN; // false
```

```js
Number.POSITIVE_INFINITY; // false
```

```js
Number.NEGATIVE_INFINITY; // false
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options