# useValidLang

Ensure that the attribute passed to the `lang` attribute is a correct ISO language and/or country.

**Diagnostic Category:** `lint/a11y/useValidLang`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: jsx-a11y/lang

## Examples

### Invalid

```jsx
<html lang="lorem" />
```

code-block.jsx:1:12 lint/a11y/useValidLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a valid value for the lang attribute.

1 │ <html lang="lorem" />
   │           ^^^^^^^^
2 │ 

ℹ Some valid languages:

- ab
- aa
- af
- sq
- am
- ar
- an
- hy
- as
- ay
- az
- ba
- eu
- bn
- dz

```jsx
<html lang="en-babab" />
```

code-block.jsx:1:12 lint/a11y/useValidLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a valid value for the lang attribute.

1 │ <html lang="en-babab" />
   │           ^^^^^^^^^
2 │ 

ℹ Some valid countries:

- AF
- AL
- DZ
- AS
- AD
- AO
- AI
- AQ
- AG
- AR
- AM
- AW
- AU
- AT
- AZ

```jsx
<html lang="en-GB-typo" />
```

code-block.jsx:1:12 lint/a11y/useValidLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a valid value for the lang attribute.

1 │ <html lang="en-GB-typo" />
   │           ^^^^^^^^^^^^^
2 │ 

### Valid

```jsx
<Html lang="en-babab" />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options