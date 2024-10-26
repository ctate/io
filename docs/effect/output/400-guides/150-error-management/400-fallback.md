# Fallback

Explore techniques for handling failures and fallbacks in Effect, including `orElse` to try alternate effects, `orElseFail` and `orElseSucceed` to modify failures, and `firstSuccessOf` to retrieve the result of the first successful effect. Learn how to gracefully handle errors and create fallback mechanisms in your Effect programs.

## orElse

We can attempt one effect, and if it fails, we can try another effect using the `Effect.orElse` combinator:

```ts
import { Effect } from "effect"

const success = Effect.succeed("success")
const failure = Effect.fail("failure")
const fallback = Effect.succeed("fallback")

const program1 = Effect.orElse(success, () => fallback)
console.log(Effect.runSync(program1)) // Output: "success"

const program2 = Effect.orElse(failure, () => fallback)
console.log(Effect.runSync(program2)) // Output: "fallback"
```

## orElseFail / orElseSucceed

These two operators modify the original failure by replacing it with constant succeed or failure values.

The `Effect.orElseFail` will always replace the original failure with the new one:

```ts
import { Effect } from "effect"

class NegativeAgeError {
  readonly _tag = "NegativeAgeError"
  constructor(readonly age: number) {}
}

class IllegalAgeError {
  readonly _tag = "IllegalAgeError"
  constructor(readonly age: number) {}
}

const validate = (
  age: number
): Effect.Effect<number, NegativeAgeError | IllegalAgeError> => {
  if (age < 0) {
    return Effect.fail(new NegativeAgeError(age))
  } else if (age < 18) {
    return Effect.fail(new IllegalAgeError(age))
  } else {
    return Effect.succeed(age)
  }
}
```

```ts
const program1 = Effect.orElseFail(validate(3), () => "invalid age")
```

The `Effect.orElseSucceed` function will always replace the original failure with a success value, so the resulting effect cannot fail:

```ts
const program2 = Effect.orElseSucceed(validate(3), () => 0)
```

## firstSuccessOf

The `firstSuccessOf` operator simplifies running a series of effects and returns the result of the first one that succeeds. If none of the effects succeed, the resulting effect will fail with the error of the last effect in the series.

This operator utilizes `Effect.orElse` to combine multiple effects into a single effect.

In the following example, we attempt to retrieve a configuration from different nodes. If retrieving from the primary node fails, we successively try retrieving from the next available nodes until we find a successful result:

```ts
import { Effect, Console } from "effect"

interface Config {
  // ...
}

const makeConfig = (/* ... */): Config => ({})

const remoteConfig = (name: string): Effect.Effect<Config, Error> =>
  Effect.gen(function* () {
    if (name === "node3") {
      yield* Console.log(`Config for ${name} found`)
      return makeConfig()
    } else {
      yield* Console.log(`Unavailable config for ${name}`)
      return yield* Effect.fail(new Error())
    }
  })

const masterConfig = remoteConfig("master")

const nodeConfigs = ["node1", "node2", "node3", "node4"].map(remoteConfig)

const config = Effect.firstSuccessOf([masterConfig, ...nodeConfigs])

console.log(Effect.runSync(config))
/*
Output:
Unavailable config for master
Unavailable config for node1
Unavailable config for node2
Config for node3 found
{}
*/
```

Warning: If the collection provided to the `Effect.firstSuccessOf` function is empty, it will throw an `IllegalArgumentException` error.