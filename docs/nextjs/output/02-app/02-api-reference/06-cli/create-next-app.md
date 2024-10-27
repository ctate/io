# create-next-app

Create Next.js apps using one command with the create-next-app CLI.

The `create-next-app` CLI allows you to create a new Next.js application using the default template or an example from a public GitHub repository. It is the easiest way to get started with Next.js.

## Basic Usage

```bash
npx create-next-app@latest [project-name] [options]
```

## Reference

The following options are available:

- `-h` or `--help`: Show all available options
- `-v` or `--version`: Output the version number
- `--no-*`: Negate default options. E.g. `--no-eslint`
- `--ts` or `--typescript`: Initialize as a TypeScript project (default)
- `--js` or `--javascript`: Initialize as a JavaScript project
- `--tailwind`: Initialize with Tailwind CSS config (default)
- `--eslint`: Initialize with ESLint config
- `--app`: Initialize as an App Router project
- `--src-dir`: Initialize inside a `src/` directory
- `--turbopack`: Enable Turbopack by default for development
- `--import-alias <alias-to-configure>`: Specify import alias to use (default "@/*")
- `--empty`: Initialize an empty project
- `--use-npm`: Explicitly tell the CLI to bootstrap the application using npm
- `--use-pnpm`: Explicitly tell the CLI to bootstrap the application using pnpm
- `--use-yarn`: Explicitly tell the CLI to bootstrap the application using Yarn
- `--use-bun`: Explicitly tell the CLI to bootstrap the application using Bun
- `-e` or `--example [name] [github-url]`: An example to bootstrap the app with
- `--example-path <path-to-example>`: Specify the path to the example separately
- `--reset-preferences`: Explicitly tell the CLI to reset any stored preferences
- `--skip-install`: Explicitly tell the CLI to skip installing packages
- `--yes`: Use previous preferences or defaults for all options

## Examples

### With the Default Template

To create a new app using the default template, run the following command in your terminal:

```bash
npx create-next-app@latest
```

You will then be asked the following prompts:

```
What is your project named?  my-app
Would you like to use TypeScript?  No / Yes
Would you like to use ESLint?  No / Yes
Would you like to use Tailwind CSS?  No / Yes
Would you like your code inside a `src/` directory?  No / Yes
Would you like to use App Router? (recommended)  No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)?  No / Yes
```

Once you've answered the prompts, a new project will be created with your chosen configuration.

### With an Official Next.js Example

To create a new app using an official Next.js example, use the `--example` flag. For example:

```bash
npx create-next-app@latest --example [example-name] [your-project-name]
```

You can view a list of all available examples along with setup instructions in the Next.js repository.

### With Any Public GitHub Example

To create a new app using any public GitHub example, use the `--example` option with the GitHub repo's URL. For example:

```bash
npx create-next-app@latest --example "https://github.com/.../" [your-project-name]
```