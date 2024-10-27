# Template syntax

In Angular, a template is a chunk of HTML that uses special syntax to leverage Angular's features. Every Angular component has a **template** that defines the DOM rendered onto the page, allowing Angular to keep the page updated as data changes.

Templates are typically found in the `template` property of a `*.component.ts` file or in a `*.component.html` file. For more details, refer to the in-depth components guide.

## How do templates work?

Templates are based on HTML syntax, enhanced with features like built-in template functions, data binding, event listening, and variables. Angular compiles templates into JavaScript, optimizing rendering automatically.

### Differences from standard HTML

Key differences between templates and standard HTML include:

- Comments in template source code are not rendered.
- Component and directive elements can be self-closed (e.g., `<UserProfile />`).
- Certain attributes (i.e., `[]`, `()`) have special meanings. See binding docs and adding event listeners docs for more information.
- The `@` character is used for dynamic behavior, but can be escaped as `&commat;` or `&#64;`.
- Angular ignores unnecessary whitespace. See whitespace in templates for details.
- Angular may add comment nodes as placeholders for dynamic content, which can be ignored by developers.

Most HTML syntax is valid in templates, but `<script>` elements are not supported. For more information, see the Security page.

## What's next?

You might also be interested in the following topics:

- Binding dynamic text, properties, and attributes: Bind dynamic data to text, properties, and attributes.
- Adding event listeners: Respond to events in your templates.
- Two-way binding: Simultaneously bind a value and propagate changes.
- Control flow: Conditionally show, hide, and repeat elements.
- Pipes: Transform data declaratively.
- Slotting child content with ng-content: Control how components render content.
- Create template fragments with ng-template: Declare a template fragment.
- Grouping elements with ng-container: Group multiple elements or mark a rendering location.
- Variables in templates: Learn about variable declarations.
- Deferred loading with @defer: Create deferrable views with `@defer`.
- Expression syntax: Learn similarities and differences between Angular expressions and standard JavaScript.
- Whitespace in templates: Learn how Angular handles whitespace.