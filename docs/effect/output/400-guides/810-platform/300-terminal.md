---
title: Terminal
excerpt: Running commands in a terminal
---

The `@effect/platform/Terminal` module provides an abstraction for interacting with standard input and output, including reading user input and displaying messages on the terminal.

## Basic Usage

The module provides a single `Terminal` tag, which serves as the entry point to reading from and writing to standard input and standard output.

```ts
import { Terminal } from "@effect/platform"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const terminal = yield* Terminal.Terminal

  // use `terminal` to interact with standard input and output
})
```

## Writing to standard output

```ts
import { Terminal } from "@effect/platform"
import { NodeRuntime, NodeTerminal } from "@effect/platform-node"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const terminal = yield* Terminal.Terminal
  yield* terminal.display("a message\n")
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeTerminal.layer)))
// Output: "a message"
```

## Reading from standard input

```ts
import { Terminal } from "@effect/platform"
import { NodeRuntime, NodeTerminal } from "@effect/platform-node"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const terminal = yield* Terminal.Terminal
  const input = yield* terminal.readLine
  console.log(`input: ${input}`)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeTerminal.layer)))
// Input: "hello"
// Output: "input: hello"
```

## Example: Number guessing game

This example demonstrates how to create a complete number-guessing game by reading input from the terminal and providing feedback to the user. The game continues until the user guesses the correct number.

```ts
import { Terminal } from "@effect/platform"
import type { PlatformError } from "@effect/platform/Error"
import { Effect, Option, Random } from "effect"
import { NodeRuntime, NodeTerminal } from "@effect/platform-node"

const secret = Random.nextIntBetween(1, 100)

const parseGuess = (input: string) => {
  const n = parseInt(input, 10)
  return isNaN(n) || n < 1 || n > 100 ? Option.none() : Option.some(n)
}

const display = (message: string) =>
  Effect.gen(function* () {
    const terminal = yield* Terminal.Terminal
    yield* terminal.display(`${message}\n`)
  })

const prompt = Effect.gen(function* () {
  const terminal = yield* Terminal.Terminal
  yield* terminal.display("Enter a guess: ")
  return yield* terminal.readLine
})

const answer: Effect.Effect<
  number,
  Terminal.QuitException | PlatformError,
  Terminal.Terminal
> = Effect.gen(function* () {
  const input = yield* prompt
  const guess = parseGuess(input)
  if (Option.isNone(guess)) {
    yield* display("You must enter an integer from 1 to 100")
    return yield* answer
  }
  return guess.value
})

const check = <A, E, R>(
  secret: number,
  guess: number,
  ok: Effect.Effect<A, E, R>,
  ko: Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    if (guess > secret) {
      yield* display("Too high")
      return yield* ko
    } else if (guess < secret) {
      yield* display("Too low")
      return yield* ko
    } else {
      return yield* ok
    }
  })

const end = display("You guessed it!")

const loop = (
  secret: number
): Effect.Effect<
  void,
  Terminal.QuitException | PlatformError,
  Terminal.Terminal
> =>
  Effect.gen(function* () {
    const guess = yield* answer
    return yield* check(
      secret,
      guess,
      end,
      Effect.suspend(() => loop(secret))
    )
  })

const game = Effect.gen(function* () {
  yield* display(
    `We have selected a random number between 1 and 100.
See if you can guess it in 10 turns or fewer.
We'll tell you if your guess was too high or too low.`
  )
  yield* loop(yield* secret)
})

NodeRuntime.runMain(game.pipe(Effect.provide(NodeTerminal.layer)))
```