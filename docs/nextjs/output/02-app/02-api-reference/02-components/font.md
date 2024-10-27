# Font Module

Optimizing loading web fonts with the built-in `next/font` loaders.

This API reference will help you understand how to use `next/font/google` and `next/font/local`. For features and usage, please see the Optimizing Fonts page.

## Font Function Arguments

For usage, review Google Fonts and Local Fonts.

| Key                                         | `font/google`       | `font/local`        | Type                       | Required          |
| ------------------------------------------- | ------------------- | ------------------- | -------------------------- | ----------------- |
| `src`                                       | Yes                 | Yes                 | String or Array of Objects | Yes               |
| `weight`                                    | Required/Optional   | Required/Optional   | String or Array            | Yes               |
| `style`                                     | -                   | -                   | String or Array            | Optional          |
| `subsets`                                   | -                   | -                   | Array of Strings           | Optional          |
| `axes`                                      | -                   | -                   | Array of Strings           | Optional          |
| `display`                                   | -                   | -                   | String                     | Optional          |
| `preload`                                   | -                   | -                   | Boolean                    | Optional          |
| `fallback`                                   | -                   | -                   | Array of Strings           | Optional          |
| `adjustFontFallback`                        | -                   | -                   | Boolean or String          | Optional          |
| `variable`                                  | -                   | -                   | String                     | Optional          |
| `declarations`                              | -                   | -                   | Array of Objects           | Optional          |

### `src`

The path of the font file as a string or an array of objects (with type `Array<{path: string, weight?: string, style?: string}>`) relative to the directory where the font loader function is called. 

Used in `next/font/local` - Required.

Examples:
- `src:'./fonts/my-font.woff2'`
- `src:[{path: './inter/Inter-Thin.ttf', weight: '100'},...]`
- If called in `app/page.tsx` using `src:'../styles/fonts/my-font.ttf'`, then `my-font.ttf` is in `styles/fonts` at the project root.

### `weight`

The font weight with the following possibilities:
- A string with possible values of the weights available for the specific font or a range of values if it's a variable font.
- An array of weight values if the font is not a variable google font. 

Used in `next/font/google` and `next/font/local` - Required if the font is not variable.

Examples:
- `weight: '400'`
- `weight: '100 900'`
- `weight: ['100','400','900']`

### `style`

The font style with the following possibilities:
- A string value with default value of `'normal'`.
- An array of style values if the font is not a variable google font.

Used in `next/font/google` and `next/font/local` - Optional.

Examples:
- `style: 'italic'`
- `style: ['italic','normal']`

### `subsets`

The font subsets defined by an array of string values. Fonts specified via `subsets` will have a link preload tag injected into the head when the `preload` option is true, which is the default.

Used in `next/font/google` - Optional.

Examples:
- `subsets: ['latin']`

### `axes`

Some variable fonts have extra axes that can be included. 

Used in `next/font/google` - Optional.

Examples:
- `axes: ['slnt']`

### `display`

The font display with possible string values of `'auto'`, `'block'`, `'swap'`, `'fallback'` or `'optional'` with default value of `'swap'`.

Used in `next/font/google` and `next/font/local` - Optional.

Examples:
- `display: 'optional'`

### `preload`

A boolean value that specifies whether the font should be preloaded or not. The default is `true`.

Used in `next/font/google` and `next/font/local` - Optional.

Examples:
- `preload: false`

### `fallback`

The fallback font to use if the font cannot be loaded. An array of strings of fallback fonts with no default.

Used in `next/font/google` and `next/font/local` - Optional.

Examples:
- `fallback: ['system-ui', 'arial']`

### `adjustFontFallback`

- For `next/font/google`: A boolean value that sets whether an automatic fallback font should be used to reduce Cumulative Layout Shift. The default is `true`.
- For `next/font/local`: A string or boolean `false` value that sets whether an automatic fallback font should be used. The default is `'Arial'`.

Used in `next/font/google` and `next/font/local` - Optional.

Examples:
- `adjustFontFallback: false`
- `adjustFontFallback: 'Times New Roman'`

### `variable`

A string value to define the CSS variable name to be used if the style is applied with the CSS variable method.

Used in `next/font/google` and `next/font/local` - Optional.

Examples:
- `variable: '--my-font'`

### `declarations`

An array of font face descriptor key-value pairs that define the generated `@font-face` further.

Used in `next/font/local` - Optional.

Examples:
- `declarations: [{ prop: 'ascent-override', value: '90%' }]`

## Applying Styles

You can apply the font styles in three ways:
- `className`
- `style`
- CSS Variables

### `className`

Returns a read-only CSS `className` for the loaded font to be passed to an HTML element.

```tsx
<p className={inter.className}>Hello, Next.js!</p>
```

### `style`

Returns a read-only CSS `style` object for the loaded font to be passed to an HTML element.

```tsx
<p style={inter.style}>Hello World</p>
```

### CSS Variables

To set your styles in an external style sheet and specify additional options, use the CSS variable method.

```tsx
import { Inter } from 'next/font/google'
import styles from '../styles/component.module.css'

const inter = Inter({
  variable: '--font-inter',
})
```

To use the font, set the `className` of the parent container to the font loader's `variable` value and the `className` of the text to the `styles` property from the external CSS file.

```tsx
<main className={inter.variable}>
  <p className={styles.text}>Hello World</p>
</main>
```

Define the `text` selector class in the `component.module.css` CSS file as follows:

```css
.text {
  font-family: var(--font-inter);
  font-weight: 200;
  font-style: italic;
}
```

## Using a font definitions file

Create a `fonts.ts` file in a `styles` folder at the root of your app directory.

```ts
import { Inter, Lora, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter()
const lora = Lora()
const sourceCodePro400 = Source_Sans_3({ weight: '400' })
const sourceCodePro700 = Source_Sans_3({ weight: '700' })
const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })

export { inter, lora, sourceCodePro400, sourceCodePro700, greatVibes }
```

You can now use these definitions in your code as follows:

```tsx
import { inter, lora, sourceCodePro700, greatVibes } from '../styles/fonts'

export default function Page() {
  return (
    <div>
      <p className={inter.className}>Hello world using Inter font</p>
      <p style={lora.style}>Hello world using Lora font</p>
      <p className={sourceCodePro700.className}>
        Hello world using Source_Sans_3 font with weight 700
      </p>
      <p className={greatVibes.className}>My title in Great Vibes font</p>
    </div>
  )
}
```

To make it easier to access the font definitions, define a path alias in your `tsconfig.json` or `jsconfig.json` files as follows:

```json
{
  "compilerOptions": {
    "paths": {
      "@/fonts": ["./styles/fonts"]
    }
  }
}
```

You can now import any font definition as follows:

```tsx
import { greatVibes, sourceCodePro400 } from '@/fonts'
```

## Version Changes

| Version   | Changes                                                               |
| --------- | --------------------------------------------------------------------- |
| `v13.2.0` | `@next/font` renamed to `next/font`. Installation no longer required. |
| `v13.0.0` | `@next/font` was added.                                               |