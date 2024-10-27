# Repository Management Tasks

These tasks can be performed to manage the FastAPI repository by team members.

This section is useful only to team members with permissions to manage the repository.

If you are a team member of FastAPI, you can help with everything on Help FastAPI - Get Help the same ways as external contributors. Additionally, there are some tasks that only you can perform.

## General Instructions

### Be Nice

First of all, be nice. 

When things are difficult, try to find the good side. Thank others for their effort and interest, even if you disagree. Use emojis to convey emotion. 

Avoid bitter sarcasm or passive-aggressive comments. Be direct and specific in your responses. For difficult conversations, you can ask @tiangolo to handle it directly.

## Edit PR Titles

- Start the PR title with an emoji from gitmoji.
- Use the emoji character, not the GitHub code.
- Start the title with a verb (e.g., Add, Refactor, Fix).
- Use imperative form (e.g., Add support for teleporting).
- Make the title descriptive about what it achieves.
- Do not finish the title with a period.
- For translations, start with 🌐 and then Add {language} translation for followed by the translated file path.

Once the PR is merged, a GitHub Action will use the PR title to update the latest changes automatically.

## Add Labels to PRs

Use a supported label from the latest-changes list of labels:

- `breaking`: Breaking Changes
- `security`: Security Fixes
- `feature`: Features
- `bug`: Fixes
- `refactor`: Refactors
- `upgrade`: Upgrades
- `docs`: Docs
- `lang-all`: Translations
- `internal`: Internal

Ensure that one of the above labels is added, as some tools may add labels that are not used in the release notes.

## Add Labels to Translation PRs

For translation PRs, add the `lang-all` label and a specific language label (e.g., `lang-es` for Spanish). Also, add the `awaiting-review` label to notify reviewers.

## Merge Translation PRs

For Spanish, the final review will be done by @tiangolo. For other languages, confirm:

- The title is correct.
- It has the labels `lang-all` and `lang-{lang code}`.
- The PR changes only one or two Markdown files for the same language.
- The translation maintains the original structure and content.
- Admonition sections are not changed or translated.

## First Translation PR

For the first translation of a language, it will include `docs/{lang code}/docs/index.md` and `docs/{lang code}/mkdocs.yml`. Create a GitHub Discussion for the new language and add the appropriate labels.

## Review PRs

If a PR lacks explanation, ask for more information. Ensure:

- A feature PR has documentation.
- Documentation includes source example files.
- Tests are included and pass after applying the PR.
- Coverage remains at 100%.

You can add commits to tweak the PR as needed.

## FastAPI People PRs

Monthly, a GitHub Action updates the FastAPI People data. If tests pass, you can merge it immediately.

## External Links PRs

Check that new links are in the correct category and language, are functional, and contain the required fields (author, link, title). Ensure the PR has the right labels before merging.

## Dependabot PRs

For direct dependencies, do not merge without review. For internal dependencies, merge if tests pass and there are no obvious breaking changes.

## Mark GitHub Discussions Answers

When a question in GitHub Discussions has been answered, mark the answer by clicking "Mark as answer". Filter discussions by unanswered questions.