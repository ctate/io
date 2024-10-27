# Add the localize package

To utilize the localization features of Angular, use the Angular CLI to add the `@angular/localize` package to your project.

Run the following command to update the `package.json` and TypeScript configuration files:

<docs-code path="adev/src/content/examples/i18n/doc-files/commands.sh" visibleRegion="add-localize"/>

This command adds `types: ["@angular/localize"]` in the TypeScript configuration files and includes a reference to the type definition of `@angular/localize` at the top of the `main.ts` file.

For more information about `package.json` and `tsconfig.json` files, see Workspace npm dependencies and TypeScript Configuration.

If `@angular/localize` is not installed and you attempt to build a localized version of your project (e.g., using `i18n` attributes in templates), the Angular CLI will generate an error with steps to enable i18n for your project.

## Options

| OPTION           | DESCRIPTION | VALUE TYPE | DEFAULT VALUE |
|:---              |:---         |:---        |:---           |
| `--project`      | The name of the project. | `string` |  |
| `--use-at-runtime` | If set, `$localize` can be used at runtime. `@angular/localize` will be included in the `dependencies` section of `package.json` instead of `devDependencies`. | `boolean` | `false` |

For more available options, see `ng add` in Angular CLI.

## What's next

<docs-pill-row>
  <docs-pill href="guide/i18n/locale-id" title="Refer to locales by ID"/>
</docs-pill-row>

References:
- CLI Overview and Command Reference | Angular
- Workspace npm dependencies | Angular
- TypeScript Configuration: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html