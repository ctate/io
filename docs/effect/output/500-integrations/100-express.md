---
title: Express Integration
navTitle: Express
excerpt: Explore integrating Effect with Express, a popular Node.js web framework. Learn to create a simple Express server with "Hello World!" response and understand basic routing with Effect and Express. Follow the guide to set up, run, and breakdown the provided examples.
bottomNavigation: pagination
---

In this guide, we'll explore how to integrate Effect with Express, a popular web framework for Node.js.

## Hello World Example

Let's start with a simple example that creates an Express server responding with "Hello World!" for requests to the root URL (/).

### Setup Steps

1. Create a new directory for your project and navigate to it using your terminal:

   ```bash
   mkdir express-effect-integration
   cd express-effect-integration
   ```

2. Initialize your project with npm. This will create a `package.json` file:

   ```bash
   npm init -y
   ```

3. Install the necessary dependencies:

   ```bash
   npm install effect express
   ```

   Install the necessary dev dependencies:

   ```bash
   npm install typescript @types/express --save-dev
   ```

   Now, initialize TypeScript:

   ```bash
   npx tsc --init
   ```

4. Create a new file, for example, `hello-world.ts`, and add the following code:

   ```ts
   import { Context, Layer, Effect, Runtime } from "effect"
   import express from "express"

   class Express extends Context.Tag("Express")<
     Express,
     ReturnType<typeof express>
   >() {}

   const IndexRouteLive = Layer.effectDiscard(
     Effect.gen(function* () {
       const app = yield* Express
       const runFork = Runtime.runFork(yield* Effect.runtime<never>())

       app.get("/", (_, res) => {
         runFork(Effect.sync(() => res.send("Hello World!")))
       })
     })
   )

   const ServerLive = Layer.scopedDiscard(
     Effect.gen(function* () {
       const port = 3001
       const app = yield* Express
       yield* Effect.acquireRelease(
         Effect.sync(() =>
           app.listen(port, () =>
             console.log(`Example app listening on port ${port}`)
           )
         ),
         (server) => Effect.sync(() => server.close())
       )
     })
   )

   const ExpressLive = Layer.sync(Express, () => express())

   const AppLive = ServerLive.pipe(
     Layer.provide(IndexRouteLive),
     Layer.provide(ExpressLive)
   )

   Effect.runFork(Layer.launch(AppLive))
   ```

5. Run your Express server:

   ```bash
   npx tsx hello-world.ts
   ```

   Visit http://localhost:3001 in your web browser, and you should see "Hello World!".

### Code Breakdown

- **Express Service**: We define an `Express` service to retrieve the Express app later on.

  ```ts
  class Express extends Context.Tag("Express")<
    Express,
    ReturnType<typeof express>
  >() {}
  ```

- **Main Route**: The main route, `IndexRouteLive`, is defined as a Layer.

  ```ts
  const IndexRouteLive = Layer.effectDiscard(
    Effect.gen(function* () {
      const app = yield* Express
      const runFork = Runtime.runFork(yield* Effect.runtime<never>())

      app.get("/", (_, res) => {
        runFork(Effect.sync(() => res.send("Hello World!")))
      })
    })
  )
  ```

- **Server Setup**: The server is created in a layer (`ServerLive`) and mounted at the end of our program.

  ```ts
  const ServerLive = Layer.scopedDiscard(
    Effect.gen(function* () {
      const port = 3001
      const app = yield* Express
      yield* Effect.acquireRelease(
        Effect.sync(() =>
          app.listen(port, () =>
            console.log(`Example app listening on port ${port}`)
          )
        ),
        (server) => Effect.sync(() => server.close())
      )
    })
  )
  ```

- **Mounting**: Finally, we mount the server by adding our route.

  ```ts
  const AppLive = ServerLive.pipe(
    Layer.provide(IndexRouteLive),
    Layer.provide(ExpressLive)
  )
  ```

## Basic Routing

In this example, we'll explore the basics of routing with Effect and Express. The goal is to create a simple web server with two routes: one that returns all todos and another that returns a todo by its ID.

```ts
import { Context, Effect, FiberSet, Layer } from "effect"
import express from "express"

class Express extends Context.Tag("Express")<
  Express,
  ReturnType<typeof express>
>() {}

const get = <A, E, R>(
  path: string,
  body: (
    req: express.Request,
    res: express.Response
  ) => Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    const app = yield* Express
    const run = yield* FiberSet.makeRuntime<R>()
    app.get(path, (req, res) => run(body(req, res)))
  })

const ServerLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const port = 3001
    const app = yield* Express
    yield* Effect.acquireRelease(
      Effect.sync(() =>
        app.listen(port, () =>
          console.log(`Example app listening on port ${port}`)
        )
      ),
      (server) => Effect.sync(() => server.close())
    )
  })
)

const ExpressLive = Layer.sync(Express, () => express())

interface Todo {
  readonly id: number
  readonly title: string
  readonly completed: boolean
}

class TodoRepository extends Context.Tag("TodoRepository")<
  TodoRepository,
  {
    readonly getTodos: Effect.Effect<Array<Todo>>
    readonly getTodo: (id: number) => Effect.Effect<Todo | null>
  }
>() {}

const IndexRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* TodoRepository

    yield* get("/", (_, res) =>
      Effect.gen(function* () {
        const todos = yield* repo.getTodos
        res.json(todos)
      })
    )
  })
)

const TodoByIdRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* TodoRepository

    yield* get("/todo/:id", (req, res) =>
      Effect.gen(function* () {
        const id = req.params.id
        const todo = yield* repo.getTodo(Number(id))
        res.json(todo)
      })
    )
  })
)

const RouterLive = Layer.mergeAll(IndexRouteLive, TodoByIdRouteLive)

const AppLive = ServerLive.pipe(
  Layer.provide(RouterLive),
  Layer.provide(ExpressLive)
)

const testData = [
  {
    id: 1,
    title: "delectus aut autem",
    completed: false
  },
  {
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false
  },
  {
    id: 3,
    title: "fugiat veniam minus",
    completed: false
  }
]

const TodoRepositoryTest = Layer.succeed(TodoRepository, {
  getTodos: Effect.succeed(testData),
  getTodo: (id) =>
    Effect.succeed(testData.find((todo) => todo.id === id) || null)
})

const Test = AppLive.pipe(Layer.provide(TodoRepositoryTest))

Effect.runFork(Layer.launch(Test))
```