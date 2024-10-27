# Unwrapping data from an observable

Observables facilitate message passing within your application, useful for event handling, asynchronous programming, and managing multiple values. They can deliver single or multiple values of any type, either synchronously or asynchronously.

Utilize the built-in `AsyncPipe` to accept an observable as input and automatically subscribe to it. Without this pipe, your component would need to manually subscribe, extract resolved values, expose them for binding, and unsubscribe to avoid memory leaks. `AsyncPipe` reduces boilerplate code by maintaining the subscription and delivering values as they arrive.

Example: Binding an observable of message strings (`message$`) to a view using the `async` pipe.

Code Example:
```typescript
// src/app/hero-async-message.component.ts
```

For more information, visit the API description of AsyncPipe.