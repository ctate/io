# noVoidTypeReturn

**Description:** Disallow returning a value from a function with the return type 'void'.

**Diagnostic Category:** `lint/correctness/noVoidTypeReturn`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Returning a value when the return type of a function is 'void' is an error, as 'void' indicates the absence of a value. Only returning without a value is allowed, as it’s a control flow statement.

## Examples

### Invalid

```ts
class A {
    f(): void {
        return undefined;
    }
}
```
Diagnostic: The function should not return a value because its return type is void.

```ts
const a = {
    f(): void {
        return undefined;
    }
}
```
Diagnostic: The function should not return a value because its return type is void.

```ts
function f(): void {
    return undefined;
}
```
Diagnostic: The function should not return a value because its return type is void.

```ts
export default function(): void {
    return undefined;
}
```
Diagnostic: The function should not return a value because its return type is void.

```ts
const g = (): void => {
    return undefined;
};
```
Diagnostic: The function should not return a value because its return type is void.

```ts
const h = function(): void {
    return undefined;
};
```
Diagnostic: The function should not return a value because its return type is void.

### Valid

```js
class A {
    f() {
        return undefined;
    }
}
```

```ts
class B {
    f(): void {}
}
```

```ts
function f(): void {
    return;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options