# noGlobalEval

Disallow the use of global `eval()`.

## Diagnostic Category: `lint/security/noGlobalEval`

### Since: `v1.5.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `no-eval`

The `eval()` function evaluates the passed string as a _JavaScript_ code.
The executed code can access and mutate variables in the scope where the function is called.

The use of `eval()` exposes to [security risks and performance issues](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!).
If the executed code is somehow affected by a malicious party,
then you may end up executing malicious code with the privileges of the caller.
Moreover, changing variables in the caller's scope is expensive in modern _JavaScript_ interpreters.

## Examples

### Invalid

```js
eval("var a = 0");
```

```js
(0, globalThis.eval)("var a = 0")
```

```js
f(eval);
```

```js
const aliasedEval = eval;
```

### Valid

```cjs
function f(eval) {
    eval("let a = 0;");
}
```

The rule is not able to detect cases where the global object is aliased:

```js
let foo = globalThis;
foo.eval("let a = 0;");
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options