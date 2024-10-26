# noCommentText

**Diagnostic Category: `lint/suspicious/noCommentText`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: react/jsx-no-comment-textnodes

Prevent comments from being inserted as text nodes

## Examples

### Invalid

```jsx
<div>// comment</div>;
```

```jsx
<div>/* comment */</div>;
```

```jsx
<div>/** comment */</div>;
```

```jsx
<div>text /* comment */</div>;
```

```jsx
<div>/* comment */ text</div>;
```

```jsx
<div>
    text
    // comment
</div>;
```

```jsx
<div>
    // comment
   text
</div>;
```

```jsx
<div>
    /* comment */
    text
</div>;
```

### Valid

```jsx
<>
   <div>{/* comment */}</div>;
   <div>{/** comment */}</div>;
   <div className={"cls" /* comment */}></div>;
   <div>text {/* comment */}</div>;
   <div>{/* comment */} text</div>;
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options