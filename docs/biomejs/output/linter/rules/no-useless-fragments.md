# noUselessFragments

**Description:** Disallow unnecessary fragments

**Diagnostic Category:** `lint/complexity/noUselessFragments`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** Same as: `react/jsx-no-useless-fragment`

## Examples

### Invalid

```jsx
<>
foo
</>
```
```
code-block.jsx:1:1 lint/complexity/noUselessFragments FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Avoid using unnecessary Fragment.

> 1 │ <>
   │ ^^
> 2 │ foo
> 3 │ </>
   │ ^^^
  
ℹ A fragment is redundant if it contains only one child, or if it is the child of a html element, and is not a keyed fragment.

ℹ Unsafe fix: Remove the Fragment

1 │ -
2 │ foo
3 │ -
```

```jsx
<React.Fragment>
foo
</React.Fragment>
```
```
code-block.jsx:1:1 lint/complexity/noUselessFragments FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Avoid using unnecessary Fragment.

> 1 │ <React.Fragment>
   │ ^^^^^^^^^^^^^^^^
> 2 │ foo
> 3 │ </React.Fragment>
   │ ^^^^^^^^^^^^^^^^
  
ℹ A fragment is redundant if it contains only one child, or if it is the child of a html element, and is not a keyed fragment.

ℹ Unsafe fix: Remove the Fragment

1 │ -
2 │ foo
3 │ -
```

```jsx
<>
    <>foo</>
    <SomeComponent />
</>
```
```
code-block.jsx:2:5 lint/complexity/noUselessFragments FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Avoid using unnecessary Fragment.

1 │ <>
> 2 │     <>foo</>
   │    ^^^^^^
3 │     <SomeComponent />
4 │ </>
  
ℹ A fragment is redundant if it contains only one child, or if it is the child of a html element, and is not a keyed fragment.

ℹ Unsafe fix: Remove the Fragment
```

```jsx
<></>
```
```
code-block.jsx:1:1 lint/complexity/noUselessFragments ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Avoid using unnecessary Fragment.

> 1 │ <></>
   │ ^^^^
  
ℹ A fragment is redundant if it contains only one child, or if it is the child of a html element, and is not a keyed fragment.
```

### Valid

```jsx
<>
    <Foo />
    <Bar />
</>
```

```jsx
<>foo {bar}</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options