# Manual Installation

## Overview

Using Biome's standalone CLI binary can be a great choice if you aren't already using Node.js or `npm` (or any other package manager). Or in other words, Biome shouldn't be the only reason for you to have a `package.json`.

## Supported Platforms

You have to pick the correct binary for your platform for Biome to work. The following table should help you do so.

| CPU Architecture | Windows       | macOS                        | Linux         | Linux (musl)       |
| ---------------- | ------------- | ---------------------------- | ------------- | ------------------ |
| `arm64`          | `win32-arm64` | `darwin-arm64` (M1 or newer) | `linux-arm64` | `linux-arm64-musl` |
| `x64`            | `win32-x64`   | `darwin-x64`                 | `linux-x64`   | `linux-x64-musl`   |

## Homebrew

Biome is available as a [Homebrew formula](https://formulae.brew.sh/formula/biome) for macOS and Linux users.

```shell
brew install biome
```

## Using a Published Binary

To install Biome, grab the executable for your platform from the [latest CLI release](https://github.com/biomejs/biome/releases) on GitHub and give it execution permission.

### macOS (arm, M1 or newer)

```shell
curl -L https://github.com/biomejs/biome/releases/download/cli%2Fv<version>/biome-darwin-arm64 -o biome
chmod +x biome
```

### Linux (x86_64)

```shell
curl -L https://github.com/biomejs/biome/releases/download/cli%2Fv<version>/biome-linux-x64 -o biome
chmod +x biome
```

### Windows (x86_64, Powershell)

```shell
Invoke-WebRequest -Uri "https://github.com/biomejs/biome/releases/download/cli%2Fv<version>/biome-win32-x64.exe" -OutFile "biome.exe"
```

Note: Make sure to replace `<version>` with the Biome version you want to install.

## Next Steps

Now you can use Biome by simply running `./biome`. Follow our [Getting Started guide](https://github.com/biomejs/biome/blob/main/docs/guides/getting-started.md) for more information.