# useValidTypeof

**Description:**  
This rule verifies the result of `typeof $expr` unary expressions is being compared to valid values, either string literals containing valid type names or other `typeof` expressions.

**Diagnostic Category:** `lint/suspicious/useValidTypeof`

**Since:** `v1.0.0`

**Note:**  
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**  
Same as: valid-typeof

## Examples

### Invalid

```js
typeof foo === "strnig"
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:16  
Info: not a valid type name

```js
typeof foo == "undefimed"
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:15  
Info: not a valid type name

```js
typeof bar != "nunber"
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:15  
Info: not a valid type name

```js
typeof bar !== "fucntion"
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:16  
Info: not a valid type name

```js
typeof foo === undefined
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:16  
Info: not a string literal  
Unsafe fix: Compare the result of `typeof` with a valid type name

```js
typeof bar == Object
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:15  
Info: not a string literal  
Unsafe fix: Compare the result of `typeof` with a valid type name

```js
typeof foo === baz
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:16  
Info: not a string literal

```js
typeof foo == 5
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:15  
Info: not a string literal

```js
typeof foo == -5
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:15  
Info: not a string literal

### Valid

```js
typeof foo === "string"
```

```js
typeof bar == "undefined"
```

```js
typeof bar === typeof qux
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options