# Whitespace in templates

By default, Angular templates do not preserve unnecessary whitespace, which typically occurs in two scenarios: whitespace between elements and collapsible whitespace inside text.

## Whitespace between elements

Developers often format templates with newlines and indentation for readability:

```angular-html
<section>
  <h3>User profile</h3>
  <label>
    User name
    <input>
  </label>
</section>
```

This template contains whitespace between elements. The following snippet illustrates the whitespace using the hash (`#`) character:

```angular-html
<!-- Total Whitespace: 20 -->
<section>###<h3>User profile</h3>###<label>#####User name#####<input>###</label>#</section>
```

Preserving this whitespace would create unnecessary text nodes and increase rendering overhead. By ignoring whitespace between elements, Angular enhances performance during template rendering.

## Collapsible whitespace inside text

Web browsers collapse multiple consecutive whitespace characters into a single character:

```angular-html
<!-- Template -->
<p>Hello         world</p>
```

In the browser, this appears as:

```angular-html
<!-- Browser Output -->
<p>Hello world</p>
```

For more context, see "How whitespace is handled by HTML, CSS, and in the DOM" at developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace.

Angular prevents unnecessary whitespace from being sent to the browser by collapsing them during template compilation.

## Preserving whitespace

To preserve whitespace in a template, set `preserveWhitespaces: true` in the `@Component` decorator:

```angular-ts
@Component({
  /* ... */,
  preserveWhitespaces: true,
  template: `
    <p>Hello         world</p>
  `
})
```

Use this option sparingly, as it can lead to significantly more nodes during rendering, which may slow down your application.

Additionally, you can use the Angular-specific HTML entity `&ngsp;`, which produces a single space character preserved in the compiled output.