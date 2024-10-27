# noShoutyConstants

**Description:** Disallow the use of constants which its value is the upper-case version of its name.

**Diagnostic Category:** `lint/style/noShoutyConstants`

**Since:** `v1.0.0`

:::note
- This rule has an **unsafe** fix.
:::

## Examples

### Invalid

```js
const FOO = "FOO";
console.log(FOO);
```

**Error Message:**
code-block.js:1:7 lint/style/noShoutyConstants FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Redundant constant declaration.

1 │ const FOO = "FOO";
2 │ console.log(FOO);

ℹ Used here.

1 │ const FOO = "FOO";
2 │ console.log(FOO);

ℹ You should avoid declaring constants with a string that's the same value as the variable name. It introduces a level of unnecessary indirection when it's only two additional characters to inline.

ℹ Unsafe fix: Use the constant value directly

1 │ - const FOO = "FOO";
2 │ - console.log(FOO);
3 │ + console.log("FOO");

### Valid

```js
let FOO = "FOO";
console.log(FOO);
```

```js
export const FOO = "FOO";
console.log(FOO);
```

```js
function f(FOO = "FOO") {
    return FOO;
}
```

## Related links

- Disable a rule: biomesjs.dev/linter/#disable-a-lint-rule
- Configure the rule fix: biomesjs.dev/linter#configure-the-rule-fix
- Rule options: biomesjs.dev/linter/#rule-options