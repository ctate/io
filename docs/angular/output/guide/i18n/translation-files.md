# Work with translation files

After preparing a component for translation, use the `extract-i18n` Angular CLI command to extract marked text into a source language file. Marked text includes text marked with `i18n`, attributes marked with `i18n-`*attribute*, and text tagged with `$localize`.

Follow these steps to create and update translation files:

1. Extract the source language file.
   - Optionally, change the location, format, and name.
2. Copy the source language file to create a translation file for each language.
3. Translate each translation file.
4. Translate plurals and alternate expressions separately.

## Extract the source language file

To extract the source language file:

1. Open a terminal window.
2. Change to the root directory of your project.
3. Run the CLI command.

The `extract-i18n` command creates a source language file named `messages.xlf` in the root directory. For more information about XLIFF, see XLIFF on Wikipedia.

Use the following command options to change the source language file location, format, and name:

- `--format`: Set the output file format.
- `--out-file`: Set the output file name.
- `--output-path`: Set the output directory path.

### Change the source language file location

To create a file in the `src/locale` directory, specify the output path as an option.

### Change the source language file format

The `extract-i18n` command supports the following translation formats:

- ARB: Application Resource Bundle (.arb)
- JSON: JavaScript Object Notation (.json)
- XLIFF 1.2: XML Localization Interchange File Format, version 1.2 (.xlf)
- XLIFF 2: XML Localization Interchange File Format, version 2 (.xlf)
- XMB: XML Message Bundle (.xmb, .xtb)

Specify the translation format with the `--format` command option.

### Change the source language file name

To change the name of the generated source language file, use the `--out-file` command option.

## Create a translation file for each language

To create a translation file for a locale:

1. Extract the source language file.
2. Copy the source language file to create a translation file for each language.
3. Rename the translation file to add the locale (e.g., `messages.xlf` → `messages.{locale}.xlf`).
4. Create a new directory at your project root named `locale`.
5. Move the translation file to the new directory.
6. Send the translation file to your translator.
7. Repeat for each language.

### Example for French

To create a French translation file:

1. Run the `extract-i18n` command.
2. Copy `messages.xlf` to `messages.fr.xlf`.
3. Move the `fr` translation file to the `src/locale` directory.
4. Send the `fr` translation file to the translator.

## Translate each translation file

1. Send each translation file to a translator.
2. The translator uses an XLIFF file editor to create and edit the translation.

### Translation process example for French

Open `messages.fr.xlf` and find the first `<trans-unit>` element. Duplicate the `<source>...</source>` element, rename it to `target`, and replace the content with the French text. Translate other text nodes without changing the IDs for translation units.

## Translate plurals

Add or remove plural cases as needed for each language. For language plural rules, see CLDR plural rules.

### Plural example

To translate a plural, translate the ICU format match values:

- `just now`
- `one minute ago`
- `<x id="INTERPOLATION" equiv-text="{{minutes}}"/> minutes ago`

## Translate alternate expressions

Angular extracts alternate `select` ICU expressions as separate translation units. When translating, move the placeholder if necessary, but do not remove it.

## Translate nested expressions

Angular treats nested expressions similarly to alternate expressions, extracting them into two translation units.

## What's next

For more information, see "Merge translations into the app."

[CliMain]: cli "CLI Overview and Command Reference | Angular"
[CliExtractI18n]: cli/extract-i18n "ng extract-i18n | CLI | Angular"
[GuideI18nCommonPrepare]: guide/i18n/prepare "Prepare component for translation | Angular"
[GuideI18nCommonTranslationFilesCreateATranslationFileForEachLanguage]: guide/i18n/translation-files#create-a-translation-file-for-each-language "Create a translation file for each language - Work with translation files | Angular"
[GuideI18nCommonTranslationFilesExtractTheSourceLanguageFile]: guide/i18n/translation-files#extract-the-source-language-file "Extract the source language file - Work with translation files | Angular"
[GuideI18nCommonTranslationFilesTranslateEachTranslationFile]: guide/i18n/translation-files#translate-each-translation-file "Translate each translation file - Work with translation files | Angular"
[GuideI18nCommonTranslationFilesTranslatePlurals]: guide/i18n/translation-files#translate-plurals "Translate plurals - Work with translation files | Angular"
[GuideI18nCommonTranslationFilesTranslateAlternateExpressions]: guide/i18n/translation-files#translate-alternate-expressions "Translate alternate expressions - Work with translation files | Angular"
[GuideI18nCommonTranslationFilesTranslateNestedExpressions]: guide/i18n/translation-files#translate-nested-expressions "Translate nested expressions - Work with translation files | Angular"
[GuideI18nExample]: guide/i18n/example "Example Angular Internationalization application | Angular"
[GuideI18nOptionalManageMarkedText]: guide/i18n/manage-marked-text "Manage marked text with custom IDs | Angular"
[GithubGoogleAppResourceBundleWikiApplicationresourcebundlespecification]: https://github.com/google/app-resource-bundle/wiki/ApplicationResourceBundleSpecification "ApplicationResourceBundleSpecification | google/app-resource-bundle | GitHub"
[GithubUnicodeOrgCldrStagingChartsLatestSupplementalLanguagePluralRulesHtml]: https://cldr.unicode.org/index/cldr-spec/plural-rules "Language Plural Rules - CLDR Charts | Unicode | GitHub"
[JsonMain]: https://www.json.org "Introducing JSON | JSON"
[OasisOpenDocsXliffXliffCoreXliffCoreHtml]: http://docs.oasis-open.org/xliff/xliff-core/xliff-core.html "XLIFF Version 1.2 Specification | Oasis Open Docs"
[OasisOpenDocsXliffXliffCoreV20Cos01XliffCoreV20Cose01Html]: http://docs.oasis-open.org/xliff/xliff-core/v2.0/cos01/xliff-core-v2.0-cos01.html "XLIFF Version 2.0 | Oasis Open Docs"
[UnicodeCldrDevelopmentDevelopmentProcessDesignProposalsXmb]: http://cldr.unicode.org/development/development-process/design-proposals/xmb "XMB | CLDR - Unicode Common Locale Data Repository | Unicode"
[WikipediaWikiXliff]: https://en.wikipedia.org/wiki/XLIFF "XLIFF | Wikipedia"