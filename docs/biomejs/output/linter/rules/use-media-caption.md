# useMediaCaption

Enforces that `audio` and `video` elements must have a `track` for captions.

**Diagnostic Category:** `lint/a11y/useMediaCaption`

**Since:** `v1.0.0`

**Note:** 
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** 
- Same as: jsx-a11y/media-has-caption

## Examples

### Invalid

```jsx
<video />
```
```
code-block.jsx:1:2 lint/a11y/useMediaCaption ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a track for captions when using audio or video elements.

> 1 │ <video />
   │ ^^^^^^^^^^
2 │ 

ℹ Captions support users with hearing-impairments. They should be a transcription or translation of the dialogue, sound effects, musical cues, and other relevant audio information.
```

```jsx
<audio>child</audio>
```
```
code-block.jsx:1:2 lint/a11y/useMediaCaption ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a track for captions when using audio or video elements.

> 1 │ <audio>child</audio>
   │ ^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Captions support users with hearing-impairments. They should be a transcription or translation of the dialogue, sound effects, musical cues, and other relevant audio information.
```

### Valid

```jsx
<audio>
    <track kind="captions" {...props} />
</audio>
```

```jsx
<video muted {...props}></video>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options