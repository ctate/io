# useFlatMap

Promotes the use of `.flatMap()` when `map().flat()` are used together.

**Diagnostic Category:** `lint/complexity/useFlatMap`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:**
- Same as: `unicorn/prefer-array-flat-map`
- Same as: `map_flatten`

## Examples

### Invalid

```js
const array = ["split", "the text", "into words"];
array.map(sentence => sentence.split(' ')).flat();
```

```
code-block.js:2:1 lint/complexity/useFlatMap FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The call chain .map().flat() can be replaced with a single .flatMap() call.

1 │ const array = ["split", "the text", "into words"];
2 │ array.map(sentence => sentence.split(' ')).flat();
3 │ 

ℹ Safe fix: Replace the chain with .flatMap().
1 │ const array = ["split", "the text", "into words"];
2 │ - array.map(sentence => sentence.split(' ')).flat();
2 │ + array.flatMap(sentence => sentence.split(' '));
3 │ 
```

```js
const array = ["split", "the text", "into words"];
array.map(sentence => sentence.split(' ')).flat(1);
```

```
code-block.js:2:1 lint/complexity/useFlatMap FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The call chain .map().flat() can be replaced with a single .flatMap() call.

1 │ const array = ["split", "the text", "into words"];
2 │ array.map(sentence => sentence.split(' ')).flat(1);
3 │ 

ℹ Safe fix: Replace the chain with .flatMap().
1 │ const array = ["split", "the text", "into words"];
2 │ - array.map(sentence => sentence.split(' ')).flat(1);
2 │ + array.flatMap(sentence => sentence.split(' '));
3 │ 
```

### Valid

```js
const array = ["split", "the text", "into words"];
array.map(sentence => sentence.split(' ')).flat(2);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options