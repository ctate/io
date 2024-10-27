# Prepare component for translation

To prepare your project for translation, complete the following actions:

- Use the `i18n` attribute to mark text in component templates.
- Use the `i18n-` attribute to mark attribute text strings in component templates.
- Use the `$localize` tagged message string to mark text strings in component code.

## Mark text in component template

In a component template, the i18n metadata is the value of the `i18n` attribute.

```html
<element i18n="{i18n_metadata}">{string_to_translate}</element>
```

Place the `i18n` attribute on every element tag that contains fixed text you want to translate. The `i18n` attribute is recognized by Angular tools and compilers.

### `i18n` example

To mark a greeting for translation, add the `i18n` attribute to the `<h1>` tag.

### Using conditional statement with `i18n`

The following `<div>` tag will display translated text based on toggle status:

```html
<element i18n="{i18n_metadata}">{string_to_translate}</element>
```

### Translate inline text without HTML element

Use the `<ng-container>` element to associate translation behavior for specific text without changing its display.

```html
<ng-container i18n="{i18n_metadata}">Text to translate</ng-container>
```

## Mark element attributes for translations

In a component template, the i18n metadata is the value of the `i18n-{attribute_name}` attribute.

```html
<element i18n-{attribute_name}="{i18n_metadata}" {attribute_name}="{attribute_value}" />
```

Use `i18n-{attribute_name}` with any attribute of any element. The syntax to assign meaning, description, and custom ID is:

```html
i18n-{attribute_name}="{meaning}|{description}@@{id}"
```

### `i18n-title` example

To translate the title of an image, add the `i18n-title` attribute to the `img` tag.

## Mark text in component code

In component code, use the `$localize` tagged message string to mark a string for translation.

```typescript
$localize`string_to_translate`;
```

The i18n metadata is surrounded by colon characters and prepends the translation source text.

```typescript
$localize`:{i18n_metadata}:string_to_translate`;
```

### Include interpolated text

Include interpolations in a `$localize` tagged message string.

```typescript
$localize`string_to_translate ${variable_name}`;
```

### Name the interpolation placeholder

```typescript
$localize`string_to_translate ${variable_name}:placeholder_name:`;
```

### Conditional syntax for translations

```typescript
return this.show ? $localize`Show Tabs` : $localize`Hide tabs`;
```

## i18n metadata for translation

```html
{meaning}|{description}@@{custom_id}
```

### Add helpful descriptions and meanings

Provide additional information or context for the translator by adding a description of the text message as the value of the `i18n` attribute or `$localize` tagged message string.

```typescript
$localize`:An introduction header for this sample:Hello i18n!`;
```

### `h1` example

Specify that the `<h1>` tag must be translated as a header or referenced elsewhere.

```typescript
$localize`:site header|An introduction header for this sample:Hello i18n!`;
```

## ICU expressions

ICU expressions help you mark alternate text in component templates to meet conditions.

```html
{ component_property, icu_clause, case_statements }
```

### Mark plurals

Use the `plural` clause to mark expressions that may not be meaningful if translated word-for-word.

```html
{ component_property, plural, pluralization_categories }
```

### Mark alternates and nested expressions

The `select` clause marks choices for alternate text based on defined string values.

```html
{ component_property, select, selection_categories }
```

## What's next

Work with translation files: guide/i18n/translation-files

[ApiLocalizeInitLocalize]: api/localize/init/$localize '$localize | init - localize - API  | Angular'
[GuideI18nCommonPrepareMarkAlternatesAndNestedExpressions]: guide/i18n/prepare#mark-alternates-and-nested-expressions 'Mark alternates and nested expressions - Prepare templates for translation | Angular'
[GuideI18nCommonPrepareMarkPlurals]: guide/i18n/prepare#mark-plurals 'Mark plurals - Prepare component for translation | Angular'
[GuideI18nOptionalManageMarkedText]: guide/i18n/manage-marked-text 'Manage marked text with custom IDs | Angular'
[GithubAngularAngularBlobEcffc3557fe1bff9718c01277498e877ca44588dPackagesCoreSrcI18nLocaleEnTsL14L18]: https://github.com/angular/angular/blob/ecffc3557fe1bff9718c01277498e877ca44588d/packages/core/src/i18n/locale_en.ts#L14-L18 'Line 14 to 18 - angular/packages/core/src/i18n/locale_en.ts | angular/angular | GitHub'
[GithubUnicodeOrgIcuUserguideFormatParseMessages]: https://unicode-org.github.io/icu/userguide/format_parse/messages 'ICU Message Format - ICU Documentation | Unicode | GitHub'
[UnicodeCldrMain]: https://cldr.unicode.org 'Unicode CLDR Project'
[UnicodeCldrIndexCldrSpecPluralRules]: http://cldr.unicode.org/index/cldr-spec/plural-rules 'Plural Rules | CLDR - Unicode Common Locale Data Repository | Unicode'
[UnicodeCldrIndexCldrSpecPluralRulesTocChoosingPluralCategoryNames]: http://cldr.unicode.org/index/cldr-spec/plural-rules#TOC-Choosing-Plural-Category-Names 'Choosing Plural Category Names - Plural Rules | CLDR - Unicode Common Locale Data Repository | Unicode'