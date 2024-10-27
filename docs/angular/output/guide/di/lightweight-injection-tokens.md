# Optimizing client application size with lightweight injection tokens

This document provides an overview of a dependency injection technique for library developers aimed at optimizing the bundle size of client applications through *lightweight injection tokens*.

Using tree-shakable providers allows you to manage the dependency structure among components and injectable services, ensuring that unused components or services can be removed from the bundle. However, Angular's storage of injection tokens may lead to unused components or services remaining in the bundle. This document outlines a design pattern that supports proper tree-shaking with lightweight injection tokens.

The lightweight injection token pattern is crucial for library developers, as it ensures that when an application utilizes only some features of the library, the unused code can be eliminated from the client's application bundle. It is the library developer's responsibility to prevent the retention of unused components.

## When tokens are retained

Consider a library providing a library-card component with an optional header:

```html
<lib-card>
  <lib-header>…</lib-header>
</lib-card>
```

In this implementation, the `<lib-card>` component uses `@ContentChild()` to access `<lib-header>`:

```typescript
@Component({
  selector: 'lib-header',
  …,
})
class LibHeaderComponent {}

@Component({
  selector: 'lib-card',
  …,
})
class LibCardComponent {
  @ContentChild(LibHeaderComponent) header: LibHeaderComponent|null = null;
}
```

Even if `<lib-header>` is not used, it may not be tree-shaken due to two references to `LibHeaderComponent`:

- One in the *type position*: `header: LibHeaderComponent;`
- One in the *value position*: `@ContentChild(LibHeaderComponent)`

The compiler treats these references differently:

- *Type position* references are erased after TypeScript conversion, having no impact on tree-shaking.
- *Value position* references must be retained at runtime, preventing tree-shaking.

Thus, the `LibHeaderComponent` token is retained, increasing the client application's size unnecessarily.

## When to use the lightweight injection token pattern

The tree-shaking issue arises when a component is used as an injection token, particularly in two scenarios:

- As a value position in a content query.
- As a type specifier for constructor injection.

For example:

```typescript
class MyComponent {
  constructor(@Optional() other: OtherComponent) {}

  @ContentChild(OtherComponent) other: OtherComponent|null;
}
```

Tokens used as type specifiers are removed during conversion, but those used for dependency injection remain needed at runtime, causing retention.

**Helpful Tip**: Libraries should use tree-shakable providers for all services, providing dependencies at the root level rather than in components or modules.

## Using lightweight injection tokens

The lightweight injection token pattern involves using a small abstract class as an injection token, with the actual implementation provided later. The abstract class is retained but has minimal impact on application size.

Example for `LibHeaderComponent`:

```typescript
abstract class LibHeaderToken {}

@Component({
  selector: 'lib-header',
  providers: [
    {provide: LibHeaderToken, useExisting: LibHeaderComponent}
  ],
  …,
})
class LibHeaderComponent extends LibHeaderToken {}

@Component({
  selector: 'lib-card',
  …,
})
class LibCardComponent {
  @ContentChild(LibHeaderToken) header: LibHeaderToken|null = null;
}
```

In this case, `LibCardComponent` does not reference `LibHeaderComponent` directly, allowing for full tree-shaking. The `LibHeaderToken` is retained as a small class declaration.

### Use the lightweight injection token for API definition

When a component injects a lightweight injection token, it may need to invoke a method in the injected class. The token is an abstract class, and the injectable component implements that class, allowing for type-safe communication.

Example:

```typescript
abstract class LibHeaderToken {
  abstract doSomething(): void;
}

@Component({
  selector: 'lib-header',
  providers: [
    {provide: LibHeaderToken, useExisting: LibHeaderComponent}
  ],
  …,
})
class LibHeaderComponent extends LibHeaderToken {
  doSomething(): void {
    // Implementation of `doSomething`
  }
}

@Component({
  selector: 'lib-card',
  …,
})
class LibCardComponent implements AfterContentInit {
  @ContentChild(LibHeaderToken) header: LibHeaderToken|null = null;

  ngAfterContentInit(): void {
    if (this.header !== null) {
      this.header?.doSomething();
    }
  }
}
```

The parent queries the token to get the child component and checks for its presence before invoking methods, ensuring no runtime reference exists if the child has been tree-shaken.

### Naming your lightweight injection token

Lightweight injection tokens are useful with components. The Angular style guide recommends naming components with the "Component" suffix. Maintain the relationship between the component and its token while distinguishing them by using the component base name with the suffix "Token" for lightweight injection tokens, e.g., "LibHeaderToken."