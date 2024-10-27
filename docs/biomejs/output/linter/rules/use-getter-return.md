# useGetterReturn

Enforce `get` methods to always return a value.

**Diagnostic Category:** `lint/suspicious/useGetterReturn`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `getter-return` from ESLint documentation.

## Examples

### Invalid

```js
class Person {
    get firstName() {}
}
```
code-block.js:2:5 lint/suspicious/useGetterReturn ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This getter should return a value.  
1 │ class Person {  
2 │     get firstName() {}  
3 │ }  

```js
const obj = {
    get firstName() {
        return;
    }
}
```
code-block.js:3:9 lint/suspicious/useGetterReturn ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This return should return a value because it is located in a getter.  
1 │ const obj = {  
2 │     get firstName() {  
3 │         return;  
4 │     }  
5 │ }  

```js
class Option {
    get value() {
        if (this.hasValue) {
            log();
        } else {
            return null;
        }
    }
}
```
code-block.js:2:5 lint/suspicious/useGetterReturn ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This getter should return a value.  
1 │ class Option {  
2 │     get value() {  
3 │         if (this.hasValue) {  
4 │             log();  
5 │         } else {  
6 │             return null;  
7 │         }  
8 │     }  
9 │ }  

### Valid

```js
class Person {
    get firstName() {
        return this.fullname.split(" ")[0];
    }
}
```

```js
const obj = {
    get firstName() {
        return this.fullname.split(" ")[0];
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options