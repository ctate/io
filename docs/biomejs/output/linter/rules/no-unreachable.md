# noUnreachable

**Description:** Disallow unreachable code

**Diagnostic Category:** `lint/correctness/noUnreachable`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: no-unreachable

## Examples

### Invalid

```js
function example() {
    return;
    neverCalled();
}
```

Diagnostic:
```
code-block.js:3:5 lint/correctness/noUnreachable ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This code will never be reached ...
1 │ function example() {
2 │     return;
> 3 │     neverCalled();
4 │ }
ℹ ... because this statement will return from the function beforehand
1 │ function example() {
> 2 │     return;
^
3 │     neverCalled();
4 │ }
```

```js
function example() {
    for(let i = 0; i < 10; ++i) {
        break;
    }
}
```

Diagnostic:
```
code-block.js:2:28 lint/correctness/noUnreachable ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This code will never be reached ...
1 │ function example() {
> 2 │     for(let i = 0; i < 10; ++i) {
                           ^
3 │         break;
4 │     }
ℹ ... because this statement will break the flow of the code beforehand
1 │ function example() {
2 │     for(let i = 0; i < 10; ++i) {
> 3 │         break;
^
4 │     }
}
```

```js
function example() {
    for(const key in value) {
        continue;
        neverCalled();
    }
}
```

Diagnostic:
```
code-block.js:4:9 lint/correctness/noUnreachable ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This code will never be reached ...
2 │     for(const key in value) {
3 │         continue;
> 4 │         neverCalled();
5 │     }
ℹ ... because this statement will continue the loop beforehand
1 │ function example() {
2 │     for(const key in value) {
> 3 │         continue;
^
4 │         neverCalled();
5 │     }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options