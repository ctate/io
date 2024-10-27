# noUndeclaredVariables

Prevents the usage of variables that haven't been declared inside the document.

**Diagnostic Category:** `lint/correctness/noUndeclaredVariables`

**Since:** `v1.0.0`  
**Sources:** Same as: no-undef (https://eslint.org/docs/latest/rules/no-undef)

If you need to allow-list some global bindings, you can use the `javascript.globals` configuration (https://biomejs.dev/reference/configuration/#javascriptglobals).

## Examples

### Invalid

```js
foobar;
```
Diagnostic: 
- code-block.js:1:1 lint/correctness/noUndeclaredVariables
- ⚠ The foobar variable is undeclared.
- ℹ By default, Biome recognizes browser and Node.js globals. You can ignore more globals using the javascript.globals configuration (https://biomejs.dev/reference/configuration/#javascriptglobals).

```js
// throw diagnostic for JavaScript files
PromiseLike;
```
Diagnostic: 
- code-block.js:2:1 lint/correctness/noUndeclaredVariables
- ⚠ The PromiseLike variable is undeclared.
- ℹ By default, Biome recognizes browser and Node.js globals. You can ignore more globals using the javascript.globals configuration (https://biomejs.dev/reference/configuration/#javascriptglobals).

### Valid

```ts
type B<T> = PromiseLike<T>
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)