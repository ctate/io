# noUselessThisAlias

Disallow useless `this` aliasing.

**Diagnostic Category:** `lint/complexity/noUselessThisAlias`  
**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:**  
- Inspired from: @typescript-eslint/no-this-alias

Disallow useless `this` aliasing. Arrow functions inherit `this` from their enclosing scope; this makes `this` aliasing useless in this situation.

## Examples

### Invalid

```js
class A {
    method() {
        const self = this;
        return () => {
            return self;
        }
    }
}
```

**Error:**  
code-block.js:3:15 lint/complexity/noUselessThisAlias FIXABLE  
✖ This aliasing of this is unnecessary.

**Safe fix:** Use `this` instead of an alias.

```js
class A {
    method() {
        return () => {
            return this;
        }
    }
}
```

### Valid

```js
class A {
    method() {
        const self = this;
        return function() {
            this.g();
            return self;
        }
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options