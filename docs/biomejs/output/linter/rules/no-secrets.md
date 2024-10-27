# noSecrets

**Description**: Disallow usage of sensitive data such as API keys and tokens.

**Diagnostic Category**: `lint/nursery/noSecrets`

**Since**: `v1.9.0`

**Caution**: This rule is part of the nursery group.

**Sources**: Inspired from: no-secrets/no-secrets

This rule checks for high-entropy strings and matches common patterns for secrets, including AWS keys, Slack tokens, and private keys. It helps users identify potential secret leaks in their codebase.

## Detected Secrets

Patterns detected include:

- **JSON Web Token (JWT)**: Tokens in the format of `ey...`
- **Base64-encoded JWT**: Base64-encoded JWT tokens
- **Slack Token**: Tokens like `xox[baprs]-...`
- **Slack Webhook URL**: URLs like `https://hooks.slack.com/services/...`
- **GitHub Token**: Tokens with lengths between 35-40 characters
- **Twitter OAuth Token**: Tokens with lengths between 35-44 characters
- **Facebook OAuth Token**: Tokens up to 42 characters
- **Google OAuth Token**: Tokens in the format `ya29...`
- **AWS API Key**: Keys starting with `AKIA` followed by 16 alphanumeric characters
- **Passwords in URLs**: Passwords in URL credentials
- **Google Service Account**: JSON structure with service-account identifier
- **Twilio API Key**: Keys starting with `SK...` followed by 32 characters
- **RSA Private Key**: Key blocks starting with `-----BEGIN RSA PRIVATE KEY-----`
- **OpenSSH Private Key**: Key blocks starting with `-----BEGIN OPENSSH PRIVATE KEY-----`
- **DSA Private Key**: Key blocks starting with `-----BEGIN DSA PRIVATE KEY-----`
- **EC Private Key**: Key blocks starting with `-----BEGIN EC PRIVATE KEY-----`
- **PGP Private Key Block**: Key blocks starting with `-----BEGIN PGP PRIVATE KEY BLOCK-----`

## Entropy Check

A string entropy checker is used to catch potential secrets based on their randomness. The entropy checker is configurable through the Options.

## Disclaimer

This rule helps with common cases but is not exhaustive. Always review your code and consider additional security measures, such as automated secret scanning in your CI/CD and git pipeline.

## Recommendations

Recommended tools for comprehensive secret detection:

- SonarQube: Clean Code scanning solution with a secret scanner (Community version).
- Gitleaks: A mature secret scanning tool.
- Trufflehog: A tool for finding secrets in git history.
- Sensleak: A Rust-based solution for secret detection.

## Examples

### Invalid

```js
const secret = "AKIA1234567890EXAMPLE";
```

Potential secret found. Type of secret detected: AWS API Key. Storing secrets in source code is a security risk. Consider the following steps:
1. Remove the secret from your code.
2. Use environment variables or a secure secret management system.
3. If this is a false positive, consider adding an inline disable comment or tweaking the entropy threshold.

### Valid

```js
const nonSecret = "hello world";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options