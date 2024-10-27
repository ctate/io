# useBlockStatements

**Description:** Requires following curly brace conventions.

**Diagnostic Category:** `lint/style/useBlockStatements`

**Since:** `v1.0.0`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: `curly` (https://eslint.org/docs/latest/rules/curly)

JavaScript allows the omission of curly braces when a block contains only one statement. However, it is considered best practice to never omit curly braces around blocks, even when they are optional, as it can lead to bugs and reduces code clarity.

## Examples

### Invalid

```js
if (x) x;
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
if (x) {
  x;
} else y;
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
if (x) {
  x;
} else if (y) y;
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
for (;;);
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
for (p in obj);
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
for (x of xs);
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
do;
while (x);
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
while (x);
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
with (x);
```
**Error:** `with` statements are not allowed in strict mode.

## Related links

- Disable a rule (link)
- Configure the rule fix (link)
- Rule options (link)