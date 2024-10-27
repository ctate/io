# Biome VS Code Extension

Biome unifies your development stack by combining the functionality of separate tools. It uses a single configuration file, has fantastic performance, and works with any stack. This extension brings Biome to your editor so that you can:

- Format files on save or when issuing the Format Document command
- See lints while you type and apply code fixes
- Perform refactors

## Installation

You can install the code extension by heading to the extension's Visual Studio Code Market Place page or from within VS Code by either:

- Open the extensions tab (View → Extensions) and search for Biome.
- Open the Quick Open Overlay (Ctrl/Cmd+P or Go -> Go to File), enter `ext install biomejs.biome`, and hit enter.

## Getting Started

### Default Formatter

Configure Biome as the default formatter for supported files to ensure that VS Code uses Biome over other formatters that you may have installed. You can do so by opening a JavaScript or TypeScript file and then:

- Open the Command Palette (Ctrl/Cmd+Shift+P or View → Command Palette)
- Select Format Document With…
- Select Configure Default Formatter…
- Select Biome

You can also enable Biome for specific languages only:

- Open the `settings.json`: open the Command Palette (Ctrl/Cmd+Shift+P) and select Preferences: Open User Settings (JSON)
- Set the `editor.defaultFormatter` to `biomejs.biome` for the desired language

```json
{
	"editor.defaultFormatter": "<other formatter>",
	"[javascript]": {
		"editor.defaultFormatter": "biomejs.biome"
	}
}
```

This configuration sets Biome as the default formatter for JavaScript files. All other files will be formatted using `<other formatter>`.

## Configuration Resolution

The extension automatically loads the `biome.json` file from the workspace’s root directory.

## Biome Resolution

The extension tries to use Biome from your project's local dependencies (`node_modules/@biomejs/biome`). It is recommended to add Biome as a project dependency to ensure that NPM scripts and the extension use the same Biome version.

You can also explicitly specify the Biome binary the extension should use by configuring the `biome.lspBin` setting in your editor options.

If the project has no dependency on Biome and no explicit path is configured, the extension uses the Biome version included in its bundle.

## Usage

### Format Document

To format an entire document, open the Command Palette (Ctrl/Cmd+Shift+P) and select Format Document.

To format a text range, select the text you want to format, open the Command Palette (Ctrl/Cmd+Shift+P), and select Format Selection.

### Format on Save

Biome respects VS Code's Format on Save setting. To enable format on save, open the settings (File -> Preferences -> Settings), search for `editor.formatOnSave`, and enable the option.

### Fix on Save

Biome respects VS Code's Code Actions On Save setting. To enable fix on save, add

```json
{
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit"
  }
}
```

in vscode `settings.json`.

### Imports Sorting [Experimental]

The Biome VS Code extension supports imports sorting through the "Organize Imports" code action. By default, this action can be run using the Shift+Alt+O keyboard shortcut or is accessible through the Command Palette (Ctrl/Cmd+Shift+P) by selecting Organize Imports.

You can add the following to your editor configuration if you want the action to run automatically on save instead of calling it manually:

```json
{
	"editor.codeActionsOnSave":{
		"source.organizeImports.biome": "explicit"
	}
}
```

## Extension Settings

### `biome.lspBin`

The `biome.lspBin` option overrides the Biome binary used by the extension. The workspace folder is used as the base path if the path is relative.

### `biome.rename`

Enables Biome to handle renames in the workspace (experimental).

## Versioning

We follow the specs suggested by the official documentation:

Odd minor versions are dedicated to pre-releases, e.g. `*.5.*`. Even minor versions are dedicated to official releases, e.g. `*.6.*`.

## Troubleshooting

### I installed `@biomejs/biome`, but the extension shows a warning saying that it could not resolve library

The library `@biomejs/biome` specifies some optional dependencies that are installed based on your OS and architecture. It's possible that the extension can't resolve the binary when loading the extension due to your package manager.

**To resolve the issue**, try to install the binary manually. The warning should show you the binary that belongs to your machine.

**If you work in a team that uses different OSs/architectures**, it's advised to install all the binaries:

- `@biomejs/cli-darwin-arm64`
- `@biomejs/cli-darwin-x64`
- `@biomejs/cli-linux-arm64`
- `@biomejs/cli-linux-x64`
- `@biomejs/cli-win32-arm64`
- `@biomejs/cli-win32-x64`

### My `biome.json` file is ignored in a multi-root workspace

Currently, support for multi-root workspaces is limited, making `biome.json` files placed in individual root folders sometimes invisible to the extension. For now, you may need to set up an individual workspace for each folder that depends on Biome. You can track our progress on this issue.