# The Effect Type

The `Effect<Success, Error, Requirements>` type represents an **immutable** value that **lazily** describes a workflow or job.

This type encapsulates the logic of a program, defining whether it succeeds, providing a value of type `Success`, or fails, resulting in an error of type `Error`. Additionally, the program requires a collection of contextual data `Context<Requirements>` to execute.

Conceptually, you can think of `Effect<Success, Error, Requirements>` as an effectful version of the following function type:

```ts
type Effect<Success, Error, Requirements> = (
  context: Context<Requirements>
) => Error | Success
```

However, effects are not actually functions. They can model synchronous, asynchronous, concurrent, and resourceful computations.

## Type Parameters

The `Effect` type has three type parameters with the following meanings:

- **Success**: Represents the type of value that an effect can succeed with when executed. If this type parameter is `void`, it means the effect produces no useful information, while if it is `never`, it means the effect runs forever (or until failure).
- **Error**: Represents the expected errors that can occur when executing an effect. If this type parameter is `never`, it means the effect cannot fail, because there are no values of type `never`.
- **Requirements**: Represents the contextual data required by the effect to be executed. This data is stored in a collection named `Context`. If this type parameter is `never`, it means the effect has no requirements and the `Context` collection is empty.

In the Effect ecosystem, you may often encounter the type parameters of `Effect` abbreviated as `A`, `E`, and `R` respectively. This is just shorthand for the success value of type **A**, **E**rror, and **R**equirements.

`Effect` values are immutable, and all Effect functions produce new `Effect` values.

`Effect` values do not actually do anything; they are just values that model or describe effectful interactions.

An `Effect` can be interpreted by the Effect Runtime System into effectful interactions with the external world. Ideally, this occurs at a single entry point in our application where the effectful interactions are initiated, such as the starting point of your program's execution.