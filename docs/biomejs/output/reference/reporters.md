# Reporters

Control Biome's output with reporters.

Since version **v1.8.0**, Biome's CLI accepts a `--reporter` argument that allows changing how diagnostics and summary are printed to the terminal.

## Summary

```shell
biome check --reporter=summary
```

Formatter:
The following files need to be formatted:
- main.ts
- index.ts

Organize Imports:
The following files need to have their imports sorted:
- main.ts
- index.ts

Analyzer:
Some analyzer rules were triggered.

| Rule Name                                           | Diagnostics                          |
|-----------------------------------------------------|--------------------------------------|
| lint/suspicious/noImplicitAnyLet                    | 12 (12 error(s), 0 warning(s), 0 info(s)) |
| lint/suspicious/noDoubleEquals                      | 8 (8 error(s), 0 warning(s), 0 info(s))   |
| lint/suspicious/noRedeclare                         | 12 (12 error(s), 0 warning(s), 0 info(s)) |
| lint/suspicious/noDebugger                          | 20 (20 error(s), 0 warning(s), 0 info(s)) |

## JSON

**Caution:** This reporter is experimental and subject to changes in patch releases.

It emits the summary and diagnostics in a JSON format.

```shell
biome ci --reporter=json
```

## JSON Pretty

**Caution:** This reporter is experimental and subject to changes in patch releases.

Same as `--reporter=json`, it emits the summary and diagnostics in a JSON format, and the output is formatted using the current JSON formatting options (configuration file or defaults).

```shell
biome ci --reporter=json-pretty
```

## GitHub

Use this reporter in a GitHub workflow. When properly configured in a PR workflow, GitHub will print a message for each info/warning/error emitted.

```shell
biome ci --reporter=github
```

Error messages:
```
::error title=lint/suspicious/noDoubleEquals,file=main.ts,line=4,endLine=4,col=3,endColumn=5::Use === instead of ==
::error title=lint/suspicious/noDebugger,file=main.ts,line=6,endLine=6,col=1,endColumn=9::This is an unexpected use of the debugger statement.
::error title=lint/nursery/noEvolvingAny,file=main.ts,line=8,endLine=8,col=5,endColumn=6::This variable's type is not allowed to evolve implicitly, leading to potential any types.
```

## JUnit

```shell
biome check --reporter=junit
```

JUnit output example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Biome" tests="16" failures="16" errors="20" time="<TIME>">
  <testsuite name="main.ts" tests="1" disabled="0" errors="0" failures="1" package="org.biome">
      <testcase name="org.biome.lint.suspicious.noDoubleEquals" line="4" column="3">
          <failure message="Use === instead of ==. == is only allowed when comparing against `null`">line 3, col 2, Use === instead of ==. == is only allowed when comparing against `null`</failure>
      </testcase>
  </testsuite>
  <testsuite name="main.ts" tests="1" disabled="0" errors="0" failures="1" package="org.biome">
      <testcase name="org.biome.lint.suspicious.noDebugger" line="6" column="1">
          <failure message="This is an unexpected use of the debugger statement.">line 5, col 0, This is an unexpected use of the debugger statement.</failure>
      </testcase>
  </testsuite>
  <testsuite name="main.ts" tests="1" disabled="0" errors="0" failures="1" package="org.biome">
      <testcase name="org.biome.lint.nursery.noEvolvingAny" line="8" column="5">
          <failure message="This variable's type is not allowed to evolve implicitly, leading to potential any types.">line 7, col 4, This variable's type is not allowed to evolve implicitly, leading to potential any types.</failure>
      </testcase>
  </testsuite>
</testsuites>
```