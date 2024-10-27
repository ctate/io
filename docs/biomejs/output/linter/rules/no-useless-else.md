# noUselessElse

Disallow `else` block when the `if` block breaks early.

**Diagnostic Category:** `lint/style/noUselessElse`

**Since:** `v1.3.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**
- Inspired from: no-else-return documentation
- Inspired from: redundant_else documentation

Disallow `else` block when the `if` block breaks early.

If an `if` block breaks early using a breaking statement (`return`, `break`, `continue`, or `throw`), then the `else` block becomes useless. Its contents can be placed outside of the block.

### Examples

**Invalid**

```js
while (x > 0) {
    if (f(x)) {
        break;
    } else {
        x++;
    }
}
```

code-block.js:4:7 lint/style/noUselessElse FIXABLE 
✖ This else clause can be omitted because previous branches break early.

```js
function f(x) {
    if (x < 0) {
        return 0;
    } else {
        return x;
    }
}
```

code-block.js:4:7 lint/style/noUselessElse FIXABLE 
✖ This else clause can be omitted because previous branches break early.

```js
function f(x) {
    if (x < 0) {
        throw new RangeError();
    } else {
        return x;
    }
}
```

code-block.js:4:7 lint/style/noUselessElse FIXABLE 
✖ This else clause can be omitted because previous branches break early.

**Valid**

```js
function f(x) {
    if (x < 0) {
        return 0;
    }
    return x;
}
```

```js
function f(x) {
    if (x < 0) {
        console.info("negative number");
    } else if (x > 0) {
        return x;
    } else {
        console.info("number 0");
    }
}
```

**Related links**
- Disable a rule
- Configure the rule fix
- Rule options