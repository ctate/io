# Testing Pipes

You can test pipes without the Angular testing utilities.

## Testing the `TitleCasePipe`

A pipe class has one method, `transform`, which manipulates the input value into a transformed output value. The `transform` implementation rarely interacts with the DOM. Most pipes have no dependence on Angular other than the `@Pipe` metadata and an interface.

Consider a `TitleCasePipe` that capitalizes the first letter of each word. Here's an implementation with a regular expression.

```plaintext
app/shared/title-case.pipe.ts
```

Anything that uses a regular expression is worth testing thoroughly. Use simple Jasmine to explore the expected cases and the edge cases.

```plaintext
app/shared/title-case.pipe.spec.ts
```

## Writing DOM Tests to Support a Pipe Test

These tests evaluate the pipe in isolation and cannot confirm if the `TitleCasePipe` works properly when applied in application components. Consider adding component tests such as this one:

```plaintext
app/hero/hero-detail.component.spec.ts (pipe test)
```