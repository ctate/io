# noStaticOnlyClass

**Description:** This rule reports when a class has no non-static members, such as for a class used exclusively as a static namespace.

**Diagnostic Category:** `lint/complexity/noStaticOnlyClass`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**
- Same as: @typescript-eslint/no-extraneous-class
- Same as: unicorn/no-static-only-class

Users coming from an OOP paradigm may wrap utility functions in a class instead of placing them at the top level of an ECMAScript module. This is generally unnecessary in JavaScript and TypeScript projects.

- Wrapper classes add cognitive complexity without structural improvements.
- IDEs provide poorer suggestions for static class or namespace imported properties.
- Static analysis for unused variables is more difficult when they are all on the class.

## Examples

### Invalid

```js
class X {
  static foo = false;
  static bar() {};
}
```

**Error:**
code-block.js:1:1 lint/complexity/noStaticOnlyClass ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Avoid classes that contain only static members.  
ℹ Prefer using simple functions instead of classes with only static members.

```js
class StaticConstants {
  static readonly version = 42;

  static isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}
```

**Error:**
code-block.js:2:10 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ 'readonly' modifier can only be used in TypeScript files.

### Valid

```js
const X = {
  foo: false,
  bar() {}
};
```

```js
export const version = 42;

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function logHelloWorld() {
  console.log('Hello, world!');
}
```

```js
class Empty {}
```

## Notes on Mutating Variables

Be cautious with exporting mutable variables. Class properties can be mutated externally, while exported variables are constant. Writing to an exported variable is rare and often considered a code smell. Use getter and setter functions if necessary:

```js
export class Utilities {
  static mutableCount = 1;
  static incrementCount() {
    Utilities.mutableCount += 1;
  }
}
```

**Error:**
code-block.js:1:8 lint/complexity/noStaticOnlyClass ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Avoid classes that contain only static members.  
ℹ Prefer using simple functions instead of classes with only static members.

Instead, do this:

```js
let mutableCount = 1;

export function getMutableCount() {
  return mutableCount;
}

export function incrementCount() {
  mutableCount += 1;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options