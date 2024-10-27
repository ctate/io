# noSubstr

**Description:** Enforce the use of `String.slice()` over `String.substr()` and `String.substring()`.

**Diagnostic Category:** `lint/nursery/noSubstr`

**Since:** `v1.8.2`

:::note
- This rule has an **unsafe** fix.
:::

:::caution
This rule is part of the nursery group.
:::

**Sources:** 
- Same as: unicorn/prefer-string-slice (https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md)

`String.slice()` is preferred over `String.substr()` and `String.substring()` due to its clearer behavior and consistent counterpart in arrays. 

Note that `String.substr`, `String.substring`, and `String.slice` behave differently with arguments. For detailed differences, refer to the MDN documentation:

- The difference between substring() and substr (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring#the_difference_between_substring_and_substr)
- Differences between substring() and slice (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring#differences_between_substring_and_slice)

## Examples

### Invalid

```js
foo.substr();
```
```
code-block.js:1:5 lint/nursery/noSubstr FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Avoid using substr and consider using slice instead.

> 1 │ foo.substr();
   │    ^^^^^^
2 │ 

ℹ slice is more commonly used and has a less surprising behavior.

ℹ See MDN web docs for more details.

ℹ Unsafe fix: Use .slice() instead.

1 │ -foo.substr();
   │ +foo.slice();
2 │ 
```

```js
foo.substring();
```
```
code-block.js:1:5 lint/nursery/noSubstr FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Avoid using substring and consider using slice instead.

> 1 │ foo.substring();
   │    ^^^^^^^^^^
2 │ 

ℹ slice is more commonly used and has a less surprising behavior.

ℹ See MDN web docs for more details.

ℹ Unsafe fix: Use .slice() instead.

1 │ -foo.substring();
   │ +foo.slice();
2 │ 
```

### Valid

```js
foo.slice(beginIndex, endIndex);
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)