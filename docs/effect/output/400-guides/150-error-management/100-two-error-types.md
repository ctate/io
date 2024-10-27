# Two Types of Errors

Just like any other program, Effect programs may fail for expected or unexpected reasons. The difference between a non-Effect program and an Effect program is in the detail provided when the program fails. Effect attempts to preserve as much information as possible about the cause of the failure, resulting in detailed, comprehensive, and human-readable failure messages.

In an Effect program, there are two possible ways for a program to fail:

- **Expected Errors**: These are errors that developers anticipate as part of normal program execution.

- **Unexpected Errors**: These are errors that occur unexpectedly and are not part of the intended program flow.

## Expected Errors

These errors, also referred to as failures, typed errors, or recoverable errors, are anticipated by developers during normal program execution. They serve a similar purpose to checked exceptions and play a role in defining the program's domain and control flow.

Expected errors are tracked at the type level by the Effect data type in the "Error" channel. For example, it is evident from the type that the program can fail with an error of type `HttpError`:

```
Effect<string, HttpError>
```

## Unexpected Errors

Unexpected errors, also referred to as defects, untyped errors, or unrecoverable errors, are not anticipated during normal program execution. Unlike expected errors, which are part of a program's domain and control flow, unexpected errors resemble unchecked exceptions and lie outside the expected behavior of the program.

Since these errors are not expected, Effect does not track them at the type level. However, the Effect runtime does keep track of these errors and provides several methods to aid in recovering from unexpected errors.