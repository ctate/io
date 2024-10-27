# noUnsafeFinally

Disallow control flow statements in finally blocks.

**Diagnostic Category:** `lint/correctness/noUnsafeFinally`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** 
- Same as: no-unsafe-finally

JavaScript suspends the control flow statements of `try` and `catch` blocks until the execution of the finally block finishes. When `return`, `throw`, `break`, or `continue` is used in finally, control flow statements inside `try` and `catch` are overwritten, which is considered unexpected behavior.

## Examples

### Invalid

```js
(() => {
    try {
        return 1; // 1 is returned but suspended until finally block ends
    } catch(err) {
        return 2;
    } finally {
        return 3; // 3 is returned before 1, which we did not expect
    }
})();
```

code-block.js:7:9 lint/correctness/noUnsafeFinally ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unsafe usage of 'return'.

5 │ return 2;
6 │ }
7 │ return 3; // 3 is returned before 1, which we did not expect
8 │ }
9 │ })();

ℹ 'return' in 'finally' overwrites the control flow statements inside 'try' and 'catch'.

```js
(() => {
    try {
        throw new Error("Try"); // error is thrown but suspended until finally block ends
    } finally {
        return 3; // 3 is returned before the error is thrown, which we did not expect
    }
})();
```

code-block.js:5:9 lint/correctness/noUnsafeFinally ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unsafe usage of 'return'.

3 │ throw new Error("Try"); // error is thrown but suspended until finally block ends
4 │ }
5 │ return 3; // 3 is returned before the error is thrown, which we did not expect
6 │ }
7 │ })();

ℹ 'return' in 'finally' overwrites the control flow statements inside 'try' and 'catch'.

```js
(() => {
    try {
        throw new Error("Try")
    } catch(err) {
        throw err; // The error thrown from try block is caught and re-thrown
    } finally {
        throw new Error("Finally"); // Finally(...) is thrown, which we did not expect
    }
})();
```

code-block.js:7:9 lint/correctness/noUnsafeFinally ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unsafe usage of 'throw'.

5 │ throw err; // The error thrown from try block is caught and re-thrown
6 │ }
7 │ throw new Error("Finally"); // Finally(...) is thrown, which we did not expect
8 │ }
9 │ })();

ℹ 'throw' in 'finally' overwrites the control flow statements inside 'try' and 'catch'.

```js
(() => {
    label: try {
      return 0; // 0 is returned but suspended until finally block ends
    } finally {
      break label; // It breaks out the try-finally block, before 0 is returned.
    }
    return 1;
})();
```

code-block.js:5:7 lint/correctness/noUnsafeFinally ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unsafe usage of 'break'.

3 │ return 0; // 0 is returned but suspended until finally block ends
4 │ }
5 │ break label; // It breaks out the try-finally block, before 0 is returned.
6 │ return 1;

ℹ 'break' in 'finally' overwrites the control flow statements inside 'try' and 'catch'.

```js
function a() {
  switch (condition) {
    case 'a': {
      try {
        console.log('a');
        return;
      } finally {
        break;
      }
    }
    case 'b': {
      console.log('b');
    }
  }
}
```

code-block.js:8:9 lint/correctness/noUnsafeFinally ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unsafe usage of 'break'.

6 │ return;
7 │ }
8 │ break;

ℹ 'break' in 'finally' overwrites the control flow statements inside 'try' and 'catch'.

### Valid

```js
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        console.log("hola!");
    }
};
```

```js
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        let a = function() {
            return "hola!";
        }
    }
};
```

```js
let foo = function(a) {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        switch(a) {
            case 1: {
                console.log("hola!")
                break;
            }
        }
    }
};
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options