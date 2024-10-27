# useErrorMessage

**Description:** Enforce passing a message value when creating a built-in error.

**Diagnostic Category:** `lint/suspicious/useErrorMessage`

**Since:** `v1.8.0`

**Sources:** Same as: unicorn/error-message

This rule enforces a message value to be passed in when creating an instance of a built-in `Error` object, which leads to more readable and debuggable code.

## Examples

### Invalid

```js
throw Error();
```
Diagnostic: Provide an error message for the error.  
Providing meaningful error messages leads to more readable and debuggable code.

```js
throw Error('');
```
Diagnostic: Error message should not be an empty string.  
Providing meaningful error messages leads to more readable and debuggable code.

```js
throw new TypeError();
```
Diagnostic: Provide an error message for the error.  
Providing meaningful error messages leads to more readable and debuggable code.

```js
const error = new AggregateError(errors);
```
Diagnostic: Provide an error message for the error.  
Providing meaningful error messages leads to more readable and debuggable code.

### Valid

```js
throw Error('Unexpected property.');
```

```js
throw new TypeError('Array expected.');
```

```js
const error = new AggregateError(errors, 'Promises rejected.');
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options