# Sass

Learn how to use Sass in your Next.js application.

## Introduction to Sass

Sass (Syntactically Awesome Style Sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS). It provides features such as variables, nested rules, and mixins, which help in writing maintainable and scalable CSS.

## Setting Up Sass in Next.js

To use Sass in your Next.js application, follow these steps:

1. **Install Sass**: Run the following command in your terminal:
   ```
   npm install sass
   ```

2. **Create a Sass file**: Create a `.scss` file in your styles directory. For example, `styles/Home.module.scss`.

3. **Import the Sass file**: Import the Sass file in your component or page:
   ```javascript
   import styles from '../styles/Home.module.scss';
   ```

4. **Use the styles**: Apply the styles in your JSX:
   ```jsx
   <div className={styles.container}>
     <h1 className={styles.title}>Welcome to Next.js with Sass!</h1>
   </div>
   ```

## Features of Sass

- **Variables**: Store values in variables for reuse.
- **Nesting**: Nest CSS selectors in a way that follows the same visual hierarchy of your HTML.
- **Mixins**: Create reusable chunks of CSS that can be included in other styles.
- **Partials**: Split your CSS into smaller, manageable files.

## Example of Sass Usage

Here’s a simple example of using Sass features:

```scss
// styles/Home.module.scss
$primary-color: #0070f3;

.container {
  background-color: $primary-color;
  padding: 20px;

  .title {
    color: white;
    font-size: 2rem;
  }
}
```

## Conclusion

Using Sass in your Next.js application enhances your styling capabilities and helps maintain a clean codebase. Follow the setup instructions and start leveraging Sass features for better styling management.