# Zed extension

## Installation

Requires Zed >= v0.131.0.

This extension is available in the extensions view inside the Zed editor. Open zed: extensions and search for Biome.

## Configuration

By default, the biome.json file is required to be in the root of the workspace.

Otherwise, it can be configured through the LSP settings:

```jsonc
// settings.json
{
  "lsp": {
    "biome": {
      "settings": {
        "config_path": "<path>/biome.json"
      }
    }
  }
}
```

### Formatting

To use the language server as a formatter, specify biome as your formatter in the settings:

```jsonc
// settings.json
{
  "formatter": {
    "language_server": {
      "name": "biome"
    }
  }
}
```

### Enable biome only when biome.json is present

```jsonc
// settings.json
{
  "lsp": {
    "biome": {
      "settings": {
        "require_config_file": true
      }
    }
  }
}
```

### Project based configuration

If you'd like to exclude biome from running in every project:

1. Disable the biome language server in user settings:

```jsonc
// settings.json
{
  "language_servers": [ "!biome", "..." ]
}
```

2. Enable it in the project's local settings:

```jsonc
// <workspace>/.zed/settings.json
{
  "language_servers": [ "biome", "..." ]
}
```

The same can be configured on a per-language basis with the languages key.

### Run code actions on format:

```jsonc
// settings.json
{
  "code_actions_on_format": {
    "source.fixAll.biome": true,
    "source.organizeImports.biome": true
  }
}
```