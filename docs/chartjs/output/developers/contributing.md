# Contributing

New contributions to the library are welcome, but please follow these guidelines:

- Before opening a PR for major additions or changes, discuss the expected API and/or implementation by filing an issue or asking in the Chart.js Discord #dev channel. This will save development time by getting feedback upfront and make reviews faster by providing maintainers with more context and details.
- Consider whether your changes are useful for all users, or if creating a Chart.js plugin would be more appropriate.
- Ensure your code passes tests and adheres to `eslint` code standards. Use `pnpm test` to run both the linter and tests.
- Add unit tests and document new functionality in the `test/` and `docs/` directories respectively.
- Avoid breaking changes unless there is an upcoming major release. We encourage writing plugins for advanced features and prioritize backward compatibility.
- Prefer new methods to be private whenever possible. A method can be made private by defining it as a top-level function or prefixing it with `_` and adding `@private` JSDoc if inside a class. Public APIs take considerable time to review and become locked once implemented, limiting our ability to change them without breaking backward compatibility. Private APIs allow flexibility to address unforeseen cases.

## Joining the project

Active committers and contributors are invited to introduce themselves and request commit access to this project. We have a very active Discord community that you can join. If you think you can help, we'd love to have you!

## Building and Testing

Ensure development dependencies are installed. With Node and pnpm installed, after cloning the Chart.js repo to a local directory and navigating to that directory in the command line, run:

```bash
> pnpm install
```

This installs the local development dependencies for Chart.js.

The following commands are available from the repository root:

```bash
> pnpm run build             // build dist files in ./dist
> pnpm run autobuild         // build and watch for source changes
> pnpm run dev               // run tests and watch for source and test changes
> pnpm run lint              // perform code linting (ESLint, tsc)
> pnpm test                  // perform code linting and run unit tests with coverage
```

`pnpm run dev` and `pnpm test` can be appended with a string to match the spec filenames. For example: `pnpm run dev plugins` will start Karma in watch mode for `test/specs/**/*plugin*.js`.

### Documentation

We use Vuepress to manage the docs, which are contained as Markdown files in the docs directory. You can run the doc server locally using:

```bash
> pnpm run docs:dev
```

### Image-Based Tests

Some display-related functionality is difficult to test via typical Jasmine units. For this reason, we introduced image-based tests to assert that a chart is drawn pixel-for-pixel matching an expected image.

Generated charts in image-based tests should be as minimal as possible and focus only on the tested feature to prevent failure if another feature breaks (e.g., disable the title and legend when testing scales).

To create a new image-based test:

- Create a JS file or JSON file that defines chart config and generation options.
- Add this file in `test/fixtures/{spec.name}/{feature-name}.json`.
- Add a describe line to the beginning of `test/specs/{spec.name}.tests.js` if it doesn't exist yet.
- Run `pnpm run dev`.
- Click the "Debug" button (top/right): a test should fail with the associated canvas visible.
- Right-click on the chart and "Save image as..." `test/fixtures/{spec.name}/{feature-name}.png`, ensuring not to activate the tooltip or any hover functionality.
- Refresh the browser page (`CTRL+R`): the test should now pass.
- Verify test relevancy by changing the feature values slightly in the JSON file.

Tests should pass in both browsers. It is recommended to hide all text in image tests since it's difficult to get them to pass between different browsers. Hide all scales in image-based tests and disable animations. If tests still do not pass, adjust tolerance and/or threshold at the beginning of the JSON file, keeping them as low as possible.

When a test fails, the expected and actual images are shown. To see the images even when tests pass, set `"debug": true` in the JSON file.

## Bugs and Issues

Please report these on the GitHub page at github.com/chartjs/Chart.js. Do not use issues for support requests. For help using Chart.js, refer to the chart.js tag on Stack Overflow.

Well-structured, detailed bug reports are valuable for the project.

Guidelines for reporting bugs:

- Check the issue search to see if it has already been reported.
- Isolate the problem to a simple test case.
- Include a demonstration of the bug on a website such as JS Bin, JS Fiddle, or Codepen. If filing a bug against master, reference the latest code via the appropriate URL. Do not rely on these files for production purposes as they may be removed at any time.

Provide any additional details associated with the bug, including if it's browser or screen density specific, or only happens with a certain configuration or data.