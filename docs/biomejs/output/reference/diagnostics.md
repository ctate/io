# Diagnostics

Learn the different parts of Biome's diagnostics.

Biome's diagnostics provide comprehensive information to understand and fix errors. They are not limited to errors but also offer structured information, warnings, and tips. This documentation breaks down the various components of a diagnostic, helping you identify important aspects and uncover underlying details.

## Diagnostic Severity

The severity of a diagnostic can influence the CLI behavior. For instance, error diagnostics will cause the CLI to exit with an error code.

### Fatal

Fatal diagnostics are indicated by red text and are emitted when an unexpected error occurs within Biome. They carry the fatal tag.

### Error

Error diagnostics are also shown in red text. They should be addressed as they emit an error code when encountered by the CLI.

### Warning

Warning diagnostics are displayed in yellow text. While they should be addressed, they do not block the CLI from functioning.

### Information

Information diagnostics are presented in green text. They provide useful insights and do not hinder the CLI.

## Diagnostic Tags

Tags serve as metadata attached to a diagnostic, influencing client behavior in various ways.

### Verbose

Verbose diagnostics are typically hidden. They can be revealed in the CLI using the `--verbose` option.

### Internal

Internal diagnostics are emitted when an internal error occurs. Users are encouraged to report a bug upon encountering one.

### Fixable

Fixable diagnostics indicate situations that users can resolve. They are often associated with lint diagnostics that offer a code action.

### Deprecated

These diagnostics indicate the use of deprecated code.

## Diagnostic Category

Categories group diagnostics. A category may include a link, particularly for lint rules.

### Simple Category

This diagnostic belongs to the category "check," emitted during the execution of the `check` command.

### Category with Link

This diagnostic belongs to the category "lint/a11y/noAccessKey." The link directs users to the webpage for the lint rule "noAccessKey."

## Diagnostic Location

Diagnostics can have a "location," consisting of three optional parts:
- A resource, the origin of the diagnostic.
- Source code of the file.
- A span (or text range), typically the line and column within the file.

### Diagnostic File Path

The file path is usually the first piece of information displayed at the top left of the diagnostic.

### Diagnostic Source Code

This shows the source code associated with a file, without displaying line and column numbers.

### Diagnostic Line and Column

Line and column information is typically printed next to the file path and is shown only when source code is associated.

When diagnostics are printed in an IDE's terminal, clicking `path/to/file.js:2:2` opens the file and places the cursor at the beginning of the span.

## Diagnostic Advices

Diagnostics can also include advices, which are additional messages appended after the original message. These advices come in various forms and are usually printed unless they are verbose advices.