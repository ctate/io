# noUnnecessaryContinue

**Description:** Avoid using unnecessary `continue`.

**Diagnostic Category:** `lint/correctness/noUnnecessaryContinue`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

## Examples

### Invalid

```js
loop: for (let i = 0; i < 5; i++) {
  continue loop;
}
```
code-block.js:2:3 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
1 │ loop: for (let i = 0; i < 5; i++) {
2 │   continue loop;
3 │ }
ℹ Unsafe fix: Delete the unnecessary continue statement

```js
while (i--) {
  continue;
}
```
code-block.js:2:3 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
1 │ while (i--) {
2 │   continue;
3 │ }
ℹ Unsafe fix: Delete the unnecessary continue statement

```js
while (1) {
  continue;
}
```
code-block.js:2:3 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
1 │ while (1) {
2 │   continue;
3 │ }
ℹ Unsafe fix: Delete the unnecessary continue statement

```js
for (let i = 0; i < 10; i++) {
  if (i > 5) {
    console.log("foo");
    continue;
  } else if (i >= 5 && i < 8) {
    console.log("test");
  } else {
    console.log("test");
  }
}
```
code-block.js:4:5 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
2 │ if (i > 5) {
3 │   console.log("foo");
4 │   continue;
5 │ } else if (i >= 5 && i < 8) {
6 │   console.log("test");
ℹ Unsafe fix: Delete the unnecessary continue statement

```js
for (let i = 0; i < 9; i++) {
  continue;
}
```
code-block.js:2:3 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
1 │ for (let i = 0; i < 9; i++) {
2 │   continue;
3 │ }
ℹ Unsafe fix: Delete the unnecessary continue statement

```js
test2: do {
  continue test2;
} while (true);
```
code-block.js:2:2 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
1 │ test2: do {
2 │   continue test2;
3 │ } while (true);
ℹ Unsafe fix: Delete the unnecessary continue statement

### Valid

```js
while (i) {
  if (i > 5) {
    continue;
  }
  console.log(i);
  i--;
}

loop: while (1) {
  forLoop: for (let i = 0; i < 5; i++) {
    if (someCondition) {
      continue loop;
    }
  }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options