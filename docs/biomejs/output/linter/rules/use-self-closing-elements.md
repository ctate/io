# useSelfClosingElements

Prevent extra closing tags for components without children.

**Diagnostic Category:** `lint/style/useSelfClosingElements`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: `@stylistic/jsx-self-closing-comp`

## Examples

### Invalid

```jsx
<div></div>
```
```
code-block.jsx:1:1 lint/style/useSelfClosingElements FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ JSX elements without children should be marked as self-closing. In JSX, it is valid for any element to be self-closing.

> 1 │ <div></div>
   │ ^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Use a SelfClosingElement instead

1 │ - <div></div>
   │ +
2 │  <div·/>
```

```jsx
<Component></Component>
```
```
code-block.jsx:1:1 lint/style/useSelfClosingElements FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ JSX elements without children should be marked as self-closing. In JSX, it is valid for any element to be self-closing.

> 1 │ <Component></Component>
   │ ^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Use a SelfClosingElement instead

1 │ - <Component></Component>
   │ +
2 │  <Component·/>
```

```jsx
<Foo.bar></Foo.bar>
```
```
code-block.jsx:1:1 lint/style/useSelfClosingElements FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ JSX elements without children should be marked as self-closing. In JSX, it is valid for any element to be self-closing.

> 1 │ <Foo.bar></Foo.bar>
   │ ^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Use a SelfClosingElement instead

1 │ - <Foo.bar></Foo.bar>
   │ +
2 │  <Foo.bar·/>
```

### Valid

```js
<div />
```

```js
<div>child</div>
```

```js
<Component />
```

```js
<Component>child</Component>
```

```js
<Foo.bar />
```

```js
<Foo.bar>child</Foo.bar>
```

## Options

### `ignoreHtmlElements`

**Since version 2.0.0.**

Default: `false`

This option allows you to specify whether to ignore checking native HTML elements.

In the following example, when the option is set to "true", it will not self-close native HTML elements.

```json
{
    "//":"...",
    "options": {
        "ignoreHtmlElements": true
    }
}
```

```jsx
<div></div>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options