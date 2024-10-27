# Introduction

**Diagnostic Category: `lint/complexity/noThisInStatic`**

**Since**: `v1.3.1`

**Note**:
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: @mysticatea/no-this-in-static (https://github.com/mysticatea/eslint-plugin/blob/master/docs/rules/no-this-in-static.md)

Disallow `this` and `super` in `static` contexts.

In JavaScript, `this` in static contexts refers to the class instance, not an instance of the class. This can confuse developers from other languages. Similarly, `super` in static contexts refers to the parent class, not an instance of the class. This rule enforces using the class name to access static methods, making the code clearer and less prone to errors.

## Example

### Invalid

```js
class A {
    static CONSTANT = 0;

    static foo() {
        this.CONSTANT;
    }
}
```

Diagnostic:
```
code-block.js:5:9 lint/complexity/noThisInStatic FIXABLE
✖ Using this in a static context can be confusing.
4 │ static foo() {
> 5 │ this.CONSTANT;
   │ ^^^^
6 │ }
7 │ }
ℹ this refers to the class.
ℹ Unsafe fix: Use the class name instead.
3 │
4 │ static foo() {
5 │ A.CONSTANT;
6 │ }
7 │ }
```

```js
class B extends A {
    static bar() {
        super.CONSTANT;
    }
}
```

Diagnostic:
```
code-block.js:3:9 lint/complexity/noThisInStatic FIXABLE
✖ Using super in a static context can be confusing.
1 │ class B extends A {
2 │ static bar() {
> 3 │ super.CONSTANT;
   │ ^^^^^
4 │ }
5 │ }
ℹ super refers to a parent class.
ℹ Unsafe fix: Use the class name instead.
1 │ class B extends A {
2 │ static bar() {
3 │ A.CONSTANT;
4 │ }
5 │ }
```

### Valid

```js
class B extends A {
    static ANOTHER_CONSTANT = A.CONSTANT + 1;

    static foo() {
        A.CONSTANT;
        B.ANOTHER_CONSTANT;
    }

    bar() {
        this.property;
    }
}
```

```js
class A {
   static foo() {
       doSomething()
   }

   bar() {
     A.foo()
   }
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)