# noGlobalObjectCalls

Disallow calling global object properties as functions

ECMAScript provides several global objects that are intended to be used as-is.
Some of these objects look as if they could be constructors due their capitalization (such as Math and JSON) but will throw an error if you try to execute them as functions.

The ECMAScript 5 specification makes it clear that both Math and JSON cannot be invoked:
The Math object does not have a [[Call]] internal property; it is not possible to invoke the Math object as a function.

The ECMAScript 2015 specification makes it clear that Reflect cannot be invoked:
The Reflect object also does not have a [[Call]] internal method; it is not possible to invoke the Reflect object as a function.

The ECMAScript 2017 specification makes it clear that Atomics cannot be invoked:
The Atomics object does not have a [[Call]] internal method; it is not possible to invoke the Atomics object as a function.

And the ECMAScript Internationalization API Specification makes it clear that Intl cannot be invoked:
The Intl object does not have a [[Call]] internal method; it is not possible to invoke the Intl object as a function.

## Examples

### Invalid

```javascript
var math = Math();
```

```javascript
var newMath = new Math();
```

```javascript
var json = JSON();
```

```javascript
var newJSON = new JSON();
```

```javascript
var reflect = Reflect();
```

```javascript
var newReflect = new Reflect();
```

```javascript
var atomics = Atomics();
```

```javascript
var newAtomics = new Atomics();
```

```javascript
var intl = Intl();
```

```javascript
var newIntl = new Intl();
```

### Valid

```javascript
function area(r) {
    return Math.PI * r * r;
}

var object = JSON.parse("{}");

var value = Reflect.get({ x: 1, y: 2 }, "x");

var first = Atomics.load(foo, 0);

var segmenterFr = new Intl.Segmenter("fr", { granularity: "word" });
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options
- no-obj-calls