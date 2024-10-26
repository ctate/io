# Biome
Biome, toolchain of the web

## One toolchain for your web project
Format, lint, and more in a fraction of a second.

### Get started
* [Get started](https://github.com/biomejs/biome)
* [View on GitHub](https://github.com/biomejs/biome)

## Format code like Prettier, save time
Biome is a [fast formatter](https://github.com/biomejs/biome/tree/main/benchmark#formatting) for _JavaScript_, _TypeScript_, _JSX_, _TSX_, _JSON_, _CSS_ and _GraphQL_ that scores **[97% compatibility with _Prettier_](https://console.algora.io/challenges/prettier)**, **saving CI and developer time**.

Biome can even **format malformed code** as you write it in [your favorite editor](https://github.com/biomejs/biome).

### Example
* **CODE**
  * [Input](#)
* **OUTPUT**
  * [Output](#)
* **PERFORMANCE**
  * ~35x faster than Prettier when formatting 171,127 lines of code in 2,104 files with an Intel Core i7 1270P.

### Try the Biome formatter
```shell
npm i -D --save-exact @biomejs/biome
npx @biomejs/biome format --write ./src
```

## Fix problems, learn best practice
Biome is a [performant linter](https://github.com/biomejs/biome/tree/main/benchmark#linting) for _JavaScript_, _TypeScript_, _JSX_, _CSS_ and _GraphQL_ that features **[<NumberOfRules/> rules](https://github.com/biomejs/biome)** from ESLint, TypeScript ESLint, and [other sources](https://github.com/biomejs/biome).

**Biome outputs detailed and contextualized diagnostics** that help you to improve your code and become a better programmer!

### Try the Biome linter
```shell
npm i -D --save-exact @biomejs/biome
npx @biomejs/biome lint --write ./src
```

## Everything all at once
Not only can you format and lint your code separately, you can do it **all at once with a single command**!

Every tool integrates seamlessly with others to create **a cohesive toolchain** for web projects.

### Try the Biome toolchain
```shell
npm i -D --save-exact @biomejs/biome
npx @biomejs/biome check --write ./src
```

## Features
* **Fast**: Built with Rust and an innovative architecture inspired by rust-analyzer.
* **Simple**: Zero configuration needed to get started. Extensive options available for when you need them.
* **Scalable**: Designed to handle codebases of any size. Focus on growing product instead of your tools.
* **Optimized**: With tight internal integration we are able to reuse previous work and any improvement to one tool improves them all.
* **Actionable & Informative**: Avoid obscure error messages, when we tell you something is wrong, we tell you exactly where the problem is and how to fix it.
* **Batteries Included**: Out of the box support for all the language features you use today. First class support for TypeScript and JSX.

## Try Biome
* [Install with package manager](https://github.com/biomejs/biome)
* [Integrate Biome in your editor](https://github.com/biomejs/biome)

## Community
* [Discord](https://biomejs.dev/chat)
* [GitHub](https://github.com/biomejs/biome)
* [Twitter](https://twitter.com/biomejs)
* [Mastodon](https://fosstodon.org/@biomejs)

## Sponsors
* [Sponsors](https://github.com/biomejs/biome)