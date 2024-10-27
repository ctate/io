# Batching

Effect is a powerful TypeScript library designed to help developers easily create complex, synchronous, and asynchronous programs.

## Classic Approach to API Integration

In typical application development, when interacting with external APIs, databases, or other data sources, we often define functions that perform requests and handle their results or failures accordingly.

### Simple Model Setup

Here's a basic model that outlines the structure of our data and possible errors:

```typescript
export interface User {
  readonly _tag: "User";
  readonly id: number;
  readonly name: string;
  readonly email: string;
}

export class GetUserError {
  readonly _tag = "GetUserError";
}

export interface Todo {
  readonly _tag: "Todo";
  readonly id: number;
  readonly message: string;
  readonly ownerId: number;
}

export class GetTodosError {
  readonly _tag = "GetTodosError";
}

export class SendEmailError {
  readonly _tag = "SendEmailError";
}
```

### Defining API Functions

Let's define functions that interact with an external API, handling common operations such as fetching todos, retrieving user details, and sending emails.

```typescript
import { Effect } from "effect";
import * as Model from "./Model";

// Fetches a list of todos from an external API
export const getTodos = Effect.tryPromise({
  try: () =>
    fetch("https://api.example.demo/todos").then(
      (res) => res.json() as Promise<Array<Model.Todo>>
    ),
  catch: () => new Model.GetTodosError()
});

// Retrieves a user by their ID from an external API
export const getUserById = (id: number) =>
  Effect.tryPromise({
    try: () =>
      fetch(`https://api.example.demo/getUserById?id=${id}`).then(
        (res) => res.json() as Promise<Model.User>
      ),
    catch: () => new Model.GetUserError()
  });

// Sends an email via an external API
export const sendEmail = (address: string, text: string) =>
  Effect.tryPromise({
    try: () =>
      fetch("https://api.example.demo/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ address, text })
      }).then((res) => res.json() as Promise<void>),
    catch: () => new Model.SendEmailError()
  });

// Sends an email to a user by fetching their details first
export const sendEmailToUser = (id: number, message: string) =>
  getUserById(id).pipe(
    Effect.andThen((user) => sendEmail(user.email, message))
  );

// Notifies the owner of a todo by sending them an email
export const notifyOwner = (todo: Model.Todo) =>
  getUserById(todo.ownerId).pipe(
    Effect.andThen((user) =>
      sendEmailToUser(user.id, `hey ${user.name} you got a todo!`)
    )
  );
```

While this approach is straightforward and readable, it may not be the most efficient. Repeated API calls, especially when many todos share the same owner, can significantly increase network overhead and slow down your application.

### Using the API Functions

While these functions are clear and easy to understand, their use may not be the most efficient. For example, notifying todo owners involves repeated API calls which can be optimized.

```typescript
import { Effect } from "effect";
import * as API from "./API";

// Orchestrates operations on todos, notifying their owners
const program = Effect.gen(function* () {
  const todos = yield* API.getTodos;
  yield* Effect.forEach(todos, (todo) => API.notifyOwner(todo), {
    concurrency: "unbounded"
  });
});
```

This implementation performs an API call for each todo to fetch the owner's details and send an email. If multiple todos have the same owner, this results in redundant API calls.

### Improving Efficiency with Batch Calls

To optimize, consider implementing batch API calls if your backend supports them. This reduces the number of HTTP requests by grouping multiple operations into a single request, thereby enhancing performance and reducing load.

## Batching

Batching API calls can drastically improve the performance of your application by reducing the number of HTTP requests.

Let's assume that `getUserById` and `sendEmail` can be batched. This means that we can send multiple requests in a single HTTP call, reducing the number of API requests and improving performance.

### Step-by-Step Guide to Batching

1. **Structuring Requests:** Transform requests into structured data models, detailing input parameters, expected outputs, and possible errors.

2. **Defining Resolvers:** Resolvers handle multiple requests simultaneously, maximizing the utility of batching.

3. **Creating Queries:** Define queries that utilize batch-resolvers to perform operations.

### Declaring Requests

Define a structured model for the types of requests our data sources can handle.

```typescript
import { Request } from "effect";
import * as Model from "./Model";

// Define a request to get multiple Todo items which might fail with a GetTodosError
export interface GetTodos
  extends Request.Request<Array<Model.Todo>, Model.GetTodosError> {
  readonly _tag: "GetTodos";
}

// Create a tagged constructor for GetTodos requests
export const GetTodos = Request.tagged<GetTodos>("GetTodos");

// Define a request to fetch a User by ID which might fail with a GetUserError
export interface GetUserById
  extends Request.Request<Model.User, Model.GetUserError> {
  readonly _tag: "GetUserById";
  readonly id: number;
}

// Create a tagged constructor for GetUserById requests
export const GetUserById = Request.tagged<GetUserById>("GetUserById");

// Define a request to send an email which might fail with a SendEmailError
export interface SendEmail
  extends Request.Request<void, Model.SendEmailError> {
  readonly _tag: "SendEmail";
  readonly address: string;
  readonly text: string;
}

// Create a tagged constructor for SendEmail requests
export const SendEmail = Request.tagged<SendEmail>("SendEmail");

// Combine all requests into a union type for easier management
export type ApiRequest = GetTodos | GetUserById | SendEmail;
```

### Declaring Resolvers

Configure how Effect resolves these requests using `RequestResolver`.

```typescript
import { Effect, RequestResolver, Request } from "effect";
import * as API from "./API";
import * as Model from "./Model";
import * as Requests from "./Requests";

// Assuming GetTodos cannot be batched, we create a standard resolver.
export const GetTodosResolver = RequestResolver.fromEffect(
  (request: Requests.GetTodos) => API.getTodos
);

// Assuming GetUserById can be batched, we create a batched resolver.
export const GetUserByIdResolver = RequestResolver.makeBatched(
  (requests: ReadonlyArray<Requests.GetUserById>) =>
    Effect.tryPromise({
      try: () =>
        fetch("https://api.example.demo/getUserByIdBatch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            users: requests.map(({ id }) => ({ id }))
          })
        }).then((res) => res.json()) as Promise<Array<Model.User>>,
      catch: () => new Model.GetUserError()
    }).pipe(
      Effect.andThen((users) =>
        Effect.forEach(requests, (request, index) =>
          Request.completeEffect(request, Effect.succeed(users[index]))
        )
      ),
      Effect.catchAll((error) =>
        Effect.forEach(requests, (request) =>
          Request.completeEffect(request, Effect.fail(error))
        )
      )
    )
);

// Assuming SendEmail can be batched, we create a batched resolver.
export const SendEmailResolver = RequestResolver.makeBatched(
  (requests: ReadonlyArray<Requests.SendEmail>) =>
    Effect.tryPromise({
      try: () =>
        fetch("https://api.example.demo/sendEmailBatch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            emails: requests.map(({ address, text }) => ({ address, text }))
          })
        }).then((res) => res.json() as Promise<void>),
      catch: () => new Model.SendEmailError()
    }).pipe(
      Effect.andThen(
        Effect.forEach(requests, (request) =>
          Request.completeEffect(request, Effect.void)
        )
      ),
      Effect.catchAll((error) =>
        Effect.forEach(requests, (request) =>
          Request.completeEffect(request, Effect.fail(error))
        )
      )
    )
);
```

### Defining Queries

Now that we've set up our resolvers, we're ready to define our queries.

```typescript
import { Effect } from "effect";
import * as Model from "./Model";
import * as Requests from "./Requests";
import * as Resolvers from "./Resolvers";

// Defines a query to fetch all Todo items
export const getTodos: Effect.Effect<
  Array<Model.Todo>,
  Model.GetTodosError
> = Effect.request(Requests.GetTodos({}), Resolvers.GetTodosResolver);

// Defines a query to fetch a user by their ID
export const getUserById = (id: number) =>
  Effect.request(
    Requests.GetUserById({ id }),
    Resolvers.GetUserByIdResolver
  );

// Defines a query to send an email to a specific address
export const sendEmail = (address: string, text: string) =>
  Effect.request(
    Requests.SendEmail({ address, text }),
    Resolvers.SendEmailResolver
  );

// Composes getUserById and sendEmail to send an email to a specific user
export const sendEmailToUser = (id: number, message: string) =>
  getUserById(id).pipe(
    Effect.andThen((user) => sendEmail(user.email, message))
  );

// Uses getUserById to fetch the owner of a Todo and then sends them an email notification
export const notifyOwner = (todo: Model.Todo) =>
  getUserById(todo.ownerId).pipe(
    Effect.andThen((user) =>
      sendEmailToUser(user.id, `hey ${user.name} you got a todo!`)
    )
  );
```

By using the `Effect.request` function, we integrate the resolvers with the request model effectively. This approach ensures that each query is optimally resolved using the appropriate resolver.

### Final Program

Assuming you've wired everything up correctly:

```typescript
import { Effect, Schedule } from "effect";
import * as Queries from "./Queries";

const program = Effect.gen(function* () {
  const todos = yield* Queries.getTodos;
  yield* Effect.forEach(todos, (todo) => Queries.notifyOwner(todo), {
    concurrency: "unbounded"
  });
}).pipe(Effect.repeat(Schedule.fixed("10 seconds")));
```

With this program, the `getTodos` operation retrieves the todos for each user. Then, the `Effect.forEach` function is used to notify the owner of each todo concurrently, without waiting for the notifications to complete.

The program incorporates a caching mechanism, which prevents the same `GetUserById` operation from being executed more than once within a span of 1 minute. This default caching behavior helps optimize the program's execution and reduces unnecessary requests to fetch user data.

### Customizing Request Caching

In real-world applications, effective caching strategies can significantly improve performance by reducing redundant data fetching. The Effect library provides flexible caching mechanisms that can be tailored for specific parts of your application or applied globally.

### Creating a Custom Cache

Here's how you can create a custom cache and apply it to part of your application.

```typescript
import { Effect, Schedule, Layer, Request } from "effect";
import * as Queries from "./Queries";

const program = Effect.gen(function* () {
  const todos = yield* Queries.getTodos;
  yield* Effect.forEach(todos, (todo) => Queries.notifyOwner(todo), {
    concurrency: "unbounded"
  });
}).pipe(
  Effect.repeat(Schedule.fixed("10 seconds")),
  Effect.provide(
    Layer.setRequestCache(
      Request.makeCache({ capacity: 256, timeToLive: "60 minutes" })
    )
  )
);
```