# Introduction

## Accessibility

Rules focused on preventing accessibility problems.
| Rule name | Description | Properties |
| --- | --- | --- |
| noAccessKey | Enforce that the `accessKey` attribute is not used on any HTML element. | Recommended, Unsafe fix, JSX rule |
| noAriaHiddenOnFocusable | Enforce that aria-hidden="true" is not set on focusable elements. | Recommended, Unsafe fix, JSX rule |
| noAriaUnsupportedElements | Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes. | Recommended, Unsafe fix, JSX rule |
| noAutofocus | Enforce that autoFocus prop is not used on elements. | Recommended, Unsafe fix, JSX rule |
| noBlankTarget | Disallow `target="_blank"` attribute without `rel="noreferrer"` | Recommended, Safe fix, JSX rule |
| noDistractingElements | Enforces that no distracting elements are used. | Recommended, Unsafe fix, JSX rule |
| noHeaderScope | The scope prop should be used only on `<th>` elements. | Recommended, Unsafe fix, JSX rule |
| noInteractiveElementToNoninteractiveRole | Enforce that non-interactive ARIA roles are not assigned to interactive HTML elements. | Recommended, Unsafe fix, JSX rule |
| noLabelWithoutControl | Enforce that a label element or component has a text label and an associated input. | Recommended, JSX rule |
| noNoninteractiveElementToInteractiveRole | Enforce that interactive ARIA roles are not assigned to non-interactive HTML elements. | Recommended, Unsafe fix, JSX rule |
| noNoninteractiveTabindex | Enforce that `tabIndex` is not assigned to non-interactive HTML elements. | Recommended, Unsafe fix, JSX rule |
| noPositiveTabindex | Prevent the usage of positive integers on `tabIndex` property | Recommended, Unsafe fix, JSX rule |
| noRedundantAlt | Enforce `img` alt prop does not contain the word "image", "picture", or "photo". | Recommended, JSX rule |
| noRedundantRoles | Enforce explicit `role` property is not the same as implicit/default role property on an element. | Recommended, Unsafe fix, JSX rule |
| noSvgWithoutTitle | Enforces the usage of the `title` element for the `svg` element. | Recommended, JSX rule |
| useAltText | Enforce that all elements that require alternative text have meaningful information to relay back to the end user. | Recommended, JSX rule |
| useAnchorContent | Enforce that anchors have content and that the content is accessible to screen readers. | Recommended, Unsafe fix, JSX rule |
| useAriaActivedescendantWithTabindex | Enforce that `tabIndex` is assigned to non-interactive HTML elements with `aria-activedescendant`. | Recommended, Unsafe fix, JSX rule |
| useAriaPropsForRole | Enforce that elements with ARIA roles must have all required ARIA attributes for that role. | Recommended, JSX rule |
| useButtonType | Enforces the usage of the attribute `type` for the element `button` | Recommended, JSX rule |
| useFocusableInteractive | Elements with an interactive role and interaction handlers must be focusable. | Recommended, JSX rule |
| useGenericFontNames | Disallow a missing generic family keyword within font families. | Recommended, CSS rule |
| useHeadingContent | Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers. | Recommended, JSX rule |
| useHtmlLang | Enforce that `html` element has `lang` attribute. | Recommended, JSX rule |
| useIframeTitle | Enforces the usage of the attribute `title` for the element `iframe`. | Recommended, JSX rule |
| useKeyWithClickEvents | Enforce onClick is accompanied by at least one of the following: `onKeyUp`, `onKeyDown`, `onKeyPress`. | Recommended, JSX rule |
| useKeyWithMouseEvents | Enforce `onMouseOver` / `onMouseOut` are accompanied by `onFocus` / `onBlur`. | Recommended, JSX rule |
| useMediaCaption | Enforces that `audio` and `video` elements must have a `track` for captions. | Recommended, JSX rule |
| useSemanticElements | It detects the use of `role` attributes in JSX elements and suggests using semantic elements instead. | Recommended, JSX rule |
| useValidAnchor | Enforce that all anchors are valid, and they are navigable elements. | Recommended, JSX rule |
| useValidAriaProps | Ensures that ARIA properties `aria-*` are all valid. | Recommended, Unsafe fix, JSX rule |
| useValidAriaRole | Elements with ARIA roles must use a valid, non-abstract ARIA role. | Recommended, Unsafe fix, JSX rule |
| useValidAriaValues | Enforce that ARIA state and property values are valid. | Recommended, JSX rule |
| useValidLang | Ensure that the attribute passed to the `lang` attribute is a correct ISO language and/or country. | Recommended, JSX rule |

## Complexity

Rules that focus on inspecting complex code that could be simplified.
| Rule name | Description | Properties |
| --- | --- | --- |
| noBannedTypes | Disallow primitive type aliases and misleading types. | Recommended, Safe fix, TypeScript rule |
| noEmptyTypeParameters | Disallow empty type parameters in type aliases and interfaces. | Recommended, TypeScript rule |
| noExcessiveCognitiveComplexity | Disallow functions that exceed a given Cognitive Complexity score. | JavaScript and super languages rule |
| noExcessiveNestedTestSuites | This rule enforces a maximum depth to nested `describe()` in test files. | Recommended, JavaScript and super languages rule |
| noExtraBooleanCast | Disallow unnecessary boolean casts | Recommended, Unsafe fix, JavaScript and super languages rule |
| noForEach | Prefer `for...of` statement instead of `Array.forEach`. | Recommended, JavaScript and super languages rule |
| noMultipleSpacesInRegularExpressionLiterals | Disallow unclear usage of consecutive space characters in regular expression literals | Recommended, Safe fix, JavaScript and super languages rule |
| noStaticOnlyClass | This rule reports when a class has no non-static members, such as for a class used exclusively as a static namespace. | Recommended, JavaScript and super languages rule |
| noThisInStatic | Disallow `this` and `super` in `static` contexts. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUselessCatch | Disallow unnecessary `catch` clauses. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUselessConstructor | Disallow unnecessary constructors. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUselessEmptyExport | Disallow empty exports that don't change anything in a module file. | Recommended, Safe fix, TypeScript rule |
| noUselessFragments | Disallow unnecessary fragments | Recommended, Unsafe fix, JSX rule |
| noUselessLabel | Disallow unnecessary labels. | Recommended, Safe fix, JavaScript and super languages rule |
| noUselessLoneBlockStatements | Disallow unnecessary nested block statements. | Recommended, Safe fix, JavaScript and super languages rule |
| noUselessRename | Disallow renaming import, export, and destructured assignments to the same name. | Recommended, Safe fix, JavaScript and super languages rule |
| noUselessStringConcat | Disallow unnecessary concatenation of string or template literals. | Unsafe fix, JavaScript and super languages rule |
| noUselessSwitchCase | Disallow useless `case` in `switch` statements. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUselessTernary | Disallow ternary operators when simpler alternatives exist. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUselessThisAlias | Disallow useless `this` aliasing. | Recommended, Safe fix, JavaScript and super languages rule |
| noUselessTypeConstraint | Disallow using `any` or `unknown` as type constraint. | Recommended, Safe fix, TypeScript rule |
| noUselessUndefinedInitialization | Disallow initializing variables to `undefined`. | Safe fix, JavaScript and super languages rule |
| noVoid | Disallow the use of `void` operators, which is not a familiar operator. | JavaScript and super languages rule |
| noWith | Disallow `with` statements in non-strict contexts. | Recommended, JavaScript and super languages rule |
| useArrowFunction | Use arrow functions over function expressions. | Recommended, Safe fix, JavaScript and super languages rule |
| useDateNow | Use `Date.now()` to get the number of milliseconds since the Unix Epoch. | Unsafe fix, JavaScript and super languages rule |
| useFlatMap | Promotes the use of `.flatMap()` when `map().flat()` are used together. | Recommended, Safe fix, JavaScript and super languages rule |
| useLiteralKeys | Enforce the usage of a literal access to properties over computed property access. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useOptionalChain | Enforce using concise optional chain instead of chained logical expressions. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useRegexLiterals | Enforce the use of the regular expression literals instead of the RegExp constructor if possible. | Recommended, Safe fix, JavaScript and super languages rule |
| useSimpleNumberKeys | Disallow number literal object member names which are not base10 or uses underscore as separator | Recommended, Safe fix, JavaScript and super languages rule |
| useSimplifiedLogicExpression | Discard redundant terms from logical expressions. | Unsafe fix, JavaScript and super languages rule |

## Correctness

Rules that detect code that is guaranteed to be incorrect or useless.
| Rule name | Description | Properties |
| --- | --- | --- |
| noChildrenProp | Prevent passing of children as props. | Recommended, JSX rule |
| noConstAssign | Prevents from having `const` variables being re-assigned. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noConstantCondition | Disallow constant expressions in conditions | Recommended, JavaScript and super languages rule |
| noConstantMathMinMaxClamp | Disallow the use of `Math.min` and `Math.max` to clamp a value where the result itself is constant. | Unsafe fix, JavaScript and super languages rule |
| noConstructorReturn | Disallow returning a value from a `constructor`. | Recommended, JavaScript and super languages rule |
| noEmptyCharacterClassInRegex | Disallow empty character classes in regular expression literals. | Recommended, JavaScript and super languages rule |
| noEmptyPattern | Disallows empty destructuring patterns. | Recommended, JavaScript and super languages rule |
| noFlatMapIdentity | Disallow to use unnecessary callback on `flatMap`. | Recommended, Safe fix, JavaScript and super languages rule |
| noGlobalObjectCalls | Disallow calling global object properties as functions | Recommended, JavaScript and super languages rule |
| noInnerDeclarations | Disallow `function` and `var` declarations that are accessible outside their block. | Recommended, JavaScript and super languages rule |
| noInvalidBuiltinInstantiation | Ensure that builtins are correctly instantiated. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noInvalidConstructorSuper | Prevents the incorrect use of `super()` inside classes. It also checks whether a call `super()` is missing from classes that extends other constructors. | Recommended, JavaScript and super languages rule |
| noInvalidDirectionInLinearGradient | Disallow non-standard direction values for linear gradient functions. | Recommended, CSS rule |
| noInvalidGridAreas | Disallows invalid named grid areas in CSS Grid Layouts. | Recommended, CSS rule |
| noInvalidNewBuiltin | Disallow `new` operators with global non-constructor functions. | Unsafe fix, JavaScript and super languages rule |
| noInvalidPositionAtImportRule | Disallow the use of `@import` at-rules in invalid positions. | Recommended, CSS rule |
| noInvalidUseBeforeDeclaration | Disallow the use of variables and function parameters before their declaration | Recommended, JavaScript and super languages rule |
| noNewSymbol | Disallow `new` operators with the `Symbol` object. | Unsafe fix, JavaScript and super languages rule |
| noNodejsModules | Forbid the use of Node.js builtin modules. | JavaScript and super languages rule |
| noNonoctalDecimalEscape | Disallow `\8` and `\9` escape sequences in string literals. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noPrecisionLoss | Disallow literal numbers that lose precision | Recommended, JavaScript and super languages rule |
| noRenderReturnValue | Prevent the usage of the return value of `React.render`. | Recommended, JSX rule |
| noSelfAssign | Disallow assignments where both sides are exactly the same. | Recommended, JavaScript and super languages rule |
| noSetterReturn | Disallow returning a value from a setter | Recommended, JavaScript and super languages rule |
| noStringCaseMismatch | Disallow comparison of expressions modifying the string case with non-compliant value. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noSwitchDeclarations | Disallow lexical declarations in `switch` clauses. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUndeclaredDependencies | Disallow the use of dependencies that aren't specified in the `package.json`. | JavaScript and super languages rule |
| noUndeclaredVariables | Prevents the usage of variables that haven't been declared inside the document. | JavaScript and super languages rule |
| noUnknownFunction | Disallow unknown CSS value functions. | Recommended, CSS rule |
| noUnknownMediaFeatureName | Disallow unknown media feature names. | Recommended, CSS rule |
| noUnknownProperty | Disallow unknown properties. | Recommended, CSS rule |
| noUnknownUnit | Disallow unknown CSS units. | Recommended, CSS rule |
| noUnmatchableAnbSelector | Disallow unmatchable An+B selectors. | Recommended, CSS rule |
| noUnnecessaryContinue | Avoid using unnecessary `continue`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUnreachable | Disallow unreachable code | Recommended, JavaScript and super languages rule |
| noUnreachableSuper | Ensures the `super()` constructor is called exactly once on every code path in a class constructor before `this` is accessed if the class has a superclass | Recommended, JavaScript and super languages rule |
| noUnsafeFinally | Disallow control flow statements in finally blocks. | Recommended, JavaScript and super languages rule |
| noUnsafeOptionalChaining | Disallow the use of optional chaining in contexts where the undefined value is not allowed. | Recommended, JavaScript and super languages rule |
| noUnusedFunctionParameters | Disallow unused function parameters. | Unsafe fix, JavaScript and super languages rule |
| noUnusedImports | Disallow unused imports. | Safe fix, JavaScript and super languages rule |
| noUnusedLabels | Disallow unused labels. | Recommended, Safe fix, JavaScript and super languages rule |
| noUnusedPrivateClassMembers | Disallow unused private class members | Unsafe fix, JavaScript and super languages rule |
| noUnusedVariables | Disallow unused variables. | Unsafe fix, JavaScript and super languages rule |
| noVoidElementsWithChildren | This rules prevents void elements (AKA self-closing elements) from having children. | Recommended, Unsafe fix, JSX rule |
| noVoidTypeReturn | Disallow returning a value from a function with the return type 'void' | Recommended, TypeScript rule |
| useArrayLiterals | Disallow Array constructors. | Unsafe fix, JavaScript and super languages rule |
| useExhaustiveDependencies | Enforce all dependencies are correctly specified in a React hook. | Recommended, JSX rule |
| useHookAtTopLevel | Enforce that all React hooks are being called from the Top Level component functions. | JSX rule |
| useImportExtensions | Enforce file extensions for relative imports. | Unsafe fix, JavaScript and super languages rule |
| useIsNan | Require calls to `isNaN()` when checking for `NaN`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useJsxKeyInIterable | Disallow missing key props in iterators/collection literals. | Recommended, JSX rule |
| useValidForDirection | Enforce "for" loop update clause moving the counter in the right direction. | Recommended, JavaScript and super languages rule |
| useYield | Require generator functions to contain `yield`. | Recommended, JavaScript and super languages rule |

## Nursery

New rules that are still under development.  
Nursery rules require explicit opt-in via configuration on stable versions because they may still have bugs or performance problems.  
They are enabled by default on nightly builds, but as they are unstable their diagnostic severity may be set to either error or warning, depending on whether we intend for the rule to be recommended or not when it eventually gets stabilized.  
Nursery rules get promoted to other groups once they become stable or may be removed.  
Rules that belong to this group **are not subject to semantic version**.
| Rule name | Description | Properties |
| --- | --- | --- |
| noCommonJs | Disallow use of CommonJs module system in favor of ESM style imports. | JavaScript and super languages rule |
| noDescendingSpecificity | Disallow a lower specificity selector from coming after a higher specificity selector. | CSS rule |
| noDocumentCookie | Disallow direct assignments to `document.cookie`. | JavaScript and super languages rule |
| noDocumentImportInPage | Prevents importing `next/document` outside of `pages/_document.jsx` in Next.js projects. | JSX rule |
| noDuplicateCustomProperties | Disallow duplicate custom properties within declaration blocks. | CSS rule |
| noDuplicateElseIf | Disallow duplicate conditions in if-else-if chains | JavaScript and super languages rule |
| noDuplicateProperties | Disallow duplicate properties within declaration blocks. | CSS rule |
| noDuplicatedFields | No duplicated fields in GraphQL operations. | GraphQL rule |
| noDynamicNamespaceImportAccess | Disallow accessing namespace imports dynamically. | JavaScript and super languages rule |
| noEnum | Disallow TypeScript enum. | TypeScript rule |
| noExportedImports | Disallow exporting an imported variable. | JavaScript and super languages rule |
| noHeadElement | Prevent usage of `<head>` element in a Next.js project. | JSX rule |
| noHeadImportInDocument | Prevent using the `next/head` module in `pages/_document.js` on Next.js projects. | JSX rule |
| noImgElement | Prevent usage of `<img>` element in a Next.js project. | JSX rule |
| noIrregularWhitespace | Disallows the use of irregular whitespace characters. | CSS rule |
| noMissingVarFunction | Disallow missing var function for css variables. | CSS rule |
| noNestedTernary | Disallow nested ternary expressions. | JavaScript and super languages rule |
| noOctalEscape | Disallow octal escape sequences in string literals | JavaScript and super languages rule |
| noProcessEnv | Disallow the use of `process.env`. | JavaScript and super languages rule |
| noRestrictedImports | Disallow specified modules when loaded by import or require. | JavaScript and super languages rule |
| noRestrictedTypes | Disallow user defined types. | Safe fix, TypeScript rule |
| noSecrets | Disallow usage of sensitive data such as API keys and tokens. | JavaScript and super languages rule |
| noStaticElementInteractions | Enforce that static, visible elements (such as `<div>`) that have click handlers use the valid role attribute. | JavaScript and super languages rule |
| noSubstr | Enforce the use of `String.slice()` over `String.substr()` and `String.substring()`. | Unsafe fix, JavaScript and super languages rule |

## Performance

Rules catching ways your code could be written to run faster, or generally be more efficient.
| Rule name | Description | Properties |
| --- | --- | --- |
| noAccumulatingSpread | Disallow the use of spread (`...`) syntax on accumulators. | Recommended, JavaScript and super languages rule |
| noBarrelFile | Disallow the use of barrel file. | JavaScript and super languages rule |
| noDelete | Disallow the use of the `delete` operator. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noReExportAll | Avoid re-export all. | JavaScript and super languages rule |
| useTopLevelRegex | Require regex literals to be declared at the top level. | JavaScript and super languages rule |

## Security

Rules that detect potential security flaws.
| Rule name | Description | Properties |
| --- | --- | --- |
| noDangerouslySetInnerHtml | Prevent the usage of dangerous JSX props | Recommended, JSX rule |
| noDangerouslySetInnerHtmlWithChildren | Report when a DOM element or a component uses both `children` and `dangerouslySetInnerHTML` prop. | Recommended, JSX rule |
| noGlobalEval | Disallow the use of global `eval()`. | Recommended, JavaScript and super languages rule |

## Style

Rules enforcing a consistent and idiomatic way of writing your code.
| Rule name | Description | Properties |
| --- | --- | --- |
| noArguments | Disallow the use of `arguments`. | Recommended, JavaScript and super languages rule |
| noCommaOperator | Disallow comma operator. | Recommended, JavaScript and super languages rule |
| noDefaultExport | Disallow default exports. | JavaScript and super languages rule |
| noDoneCallback | Disallow using a callback in asynchronous tests and hooks. | JavaScript and super languages rule |
| noImplicitBoolean | Disallow implicit `true` values on JSX boolean attributes | Safe fix, JSX rule |
| noInferrableTypes | Disallow type annotations for variables, parameters, and class properties initialized with a literal expression. | Recommended, Safe fix, TypeScript rule |
| noNamespace | Disallow the use of TypeScript's `namespace`s. | TypeScript rule |
| noNamespaceImport | Disallow the use of namespace imports. | JavaScript and super languages rule |
| noNegationElse | Disallow negation in the condition of an `if` statement if it has an `else` clause. | Safe fix, JavaScript and super languages rule |
| noNonNullAssertion | Disallow non-null assertions using the `!` postfix operator. | Recommended, Unsafe fix, TypeScript rule |
| noParameterAssign | Disallow reassigning `function` parameters. | Recommended, JavaScript and super languages rule |
| noParameterProperties | Disallow the use of parameter properties in class constructors. | TypeScript rule |
| noRestrictedGlobals | This rule allows you to specify global variable names that you don’t want to use in your application. | JavaScript and super languages rule |
| noShoutyConstants | Disallow the use of constants which its value is the upper-case version of its name. | Unsafe fix, JavaScript and super languages rule |
| noUnusedTemplateLiteral | Disallow template literals if interpolation and special-character handling are not needed | Recommended, Unsafe fix, TypeScript rule |
| noUselessElse | Disallow `else` block when the `if` block breaks early. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noVar | Disallow the use of `var` | Recommended, Unsafe fix, JavaScript and super languages rule |
| noYodaExpression | Disallow the use of yoda expressions. | Safe fix, JavaScript and super languages rule |
| useAsConstAssertion | Enforce the use of `as const` over literal type and type annotation. | Recommended, Safe fix, TypeScript rule |
| useBlockStatements | Requires following curly brace conventions. | Unsafe fix, JavaScript and super languages rule |
| useCollapsedElseIf | Enforce using `else if` instead of nested `if` in `else` clauses. | Safe fix, JavaScript and super languages rule |
| useConsistentArrayType | Require consistently using either `T[]` or `Array<T>` | Unsafe fix, TypeScript rule |
| useConsistentBuiltinInstantiation | Enforce the use of `new` for all builtins, except `String`, `Number` and `Boolean`. | Unsafe fix, JavaScript and super languages rule |
| useConst | Require `const` declarations for variables that are only assigned once. | Recommended, Safe fix, JavaScript and super languages rule |
| useDefaultParameterLast | Enforce default function parameters and optional function parameters to be last. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useDefaultSwitchClause | Require the default clause in switch statements. | JavaScript and super languages rule |
| useEnumInitializers | Require that each enum member value be explicitly initialized. | Recommended, Safe fix, TypeScript rule |
| useExplicitLengthCheck | Enforce explicitly comparing the `length`, `size`, `byteLength` or `byteOffset` property of a value. | Unsafe fix, JavaScript and super languages rule |
| useExponentiationOperator | Disallow the use of `Math.pow` in favor of the `**` operator. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useExportType | Promotes the use of `export type` for types. | Recommended, Safe fix, TypeScript rule |
| useFilenamingConvention | Enforce naming conventions for JavaScript and TypeScript filenames. | JavaScript and super languages rule |
| useForOf | This rule recommends a `for-of` loop when in a `for` loop, the index used to extract an item from the iterated array. | JavaScript and super languages rule |
| useFragmentSyntax | This rule enforces the use of `<>...</>` over `<Fragment>...</Fragment>`. | Unsafe fix, JSX rule |
| useImportType | Promotes the use of `import type` for types. | Recommended, Safe fix, TypeScript rule |
| useLiteralEnumMembers | Require all enum members to be literal values. | Recommended, TypeScript rule |
| useNamingConvention | Enforce naming conventions for everything across a codebase. | Safe fix, TypeScript rule |
| useNodeAssertStrict | Promotes the usage of `node:assert/strict` over `node:assert`. | Safe fix, JavaScript and super languages rule |
| useNodejsImportProtocol | Enforces using the `node:` protocol for Node.js builtin modules. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useNumberNamespace | Use the `Number` properties instead of global ones. | Recommended, Safe fix, JavaScript and super languages rule |
| useNumericLiterals | Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals | Recommended, Unsafe fix, JavaScript and super languages rule |
| useSelfClosingElements | Prevent extra closing tags for components without children | Recommended, Unsafe fix, JavaScript and super languages rule |
| useShorthandArrayType | When expressing array types, this rule promotes the usage of `T[]` shorthand instead of `Array<T>`. | Unsafe fix, TypeScript rule |
| useShorthandAssign | Require assignment operator shorthand where possible. | Unsafe fix, JavaScript and super languages rule |
| useShorthandFunctionType | Enforce using function types instead of object type with call signatures. | Recommended, Safe fix, TypeScript rule |
| useSingleCaseStatement | Enforces switch clauses have a single statement, emits a quick fix wrapping the statements in a block. | Unsafe fix, JavaScript and super languages rule |
| useSingleVarDeclarator | Disallow multiple variable declarations in the same variable statement | Recommended, Unsafe fix, JavaScript and super languages rule |
| useTemplate | Prefer template literals over string concatenation. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useThrowNewError | Require `new` when throwing an error. | Unsafe fix, JavaScript and super languages rule |
| useWhile | Enforce the use of `while` loops instead of `for` loops when the initializer and update expressions are not needed. | Recommended, Safe fix, JavaScript and super languages rule |

## Suspicious

Rules that detect code that is likely to be incorrect or useless.
| Rule name | Description | Properties |
| --- | --- | --- |
| noApproximativeNumericConstant | Use standard constants instead of approximated literals. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noArrayIndexKey | Discourage the usage of Array index in keys. | Recommended, JSX rule |
| noAssignInExpressions | Disallow assignments in expressions. | Recommended, JavaScript and super languages rule |
| noAsyncPromiseExecutor | Disallows using an async function as a Promise executor. | Recommended, JavaScript and super languages rule |
| noCatchAssign | Disallow reassigning exceptions in catch clauses. | Recommended, JavaScript and super languages rule |
| noClassAssign | Disallow reassigning class members. | Recommended, JavaScript and super languages rule |
| noCommentText | Prevent comments from being inserted as text nodes | Recommended, Unsafe fix, JSX rule |
| noCompareNegZero | Disallow comparing against `-0` | Recommended, Safe fix, JavaScript and super languages rule |
| noConfusingLabels | Disallow labeled statements that are not loops. | Recommended, JavaScript and super languages rule |
| noConfusingVoidType | Disallow `void` type outside of generic or return types. | Recommended, Unsafe fix, TypeScript rule |
| noConsole | Disallow the use of `console`. | Unsafe fix, JavaScript and super languages rule |
| noConsoleLog | Disallow the use of `console.log` | Unsafe fix, JavaScript and super languages rule |
| noConstEnum | Disallow TypeScript `const enum` | Recommended, Safe fix, TypeScript rule |
| noControlCharactersInRegex | Prevents from having control characters and some escape sequences that match control characters in regular expressions. | Recommended, JavaScript and super languages rule |
| noDebugger | Disallow the use of `debugger` | Recommended, Unsafe fix, JavaScript and super languages rule |
| noDoubleEquals | Require the use of `===` and `!==`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noDuplicateAtImportRules | Disallow duplicate `@import` rules. | Recommended, CSS rule |
| noDuplicateCase | Disallow duplicate case labels. | Recommended, JavaScript and super languages rule |
| noDuplicateClassMembers | Disallow duplicate class members. | Recommended, JavaScript and super languages rule |
| noDuplicateFontNames | Disallow duplicate names within font families. | Recommended, CSS rule |
| noDuplicateJsxProps | Prevents JSX properties to be assigned multiple times. | Recommended, JSX rule |
| noDuplicateObjectKeys | Disallow two keys with the same name inside objects. | Recommended, JSON rule |
| noDuplicateParameters | Disallow duplicate function parameter name. | Recommended, JavaScript and super languages rule |
| noDuplicateSelectorsKeyframeBlock | Disallow duplicate selectors within keyframe blocks. | Recommended, CSS rule |
| noDuplicateTestHooks | A `describe` block should not contain duplicate hooks. | Recommended, JavaScript and super languages rule |
| noEmptyBlock | Disallow CSS empty blocks. | Recommended, CSS rule |
| noEmptyBlockStatements | Disallow empty block statements and static blocks. | JavaScript and super languages rule |
| noEmptyInterface | Disallow the declaration of empty interfaces. | Recommended, Safe fix, TypeScript rule |
| noEvolvingTypes | Disallow variables from evolving into `any` type through reassignments. | TypeScript rule |
| noExplicitAny | Disallow the `any` type usage. | Recommended, Safe fix, TypeScript rule |
| noExportsInTest | Disallow using `export` or `module.exports` in files containing tests | Recommended, JavaScript and super languages rule |
| noExtraNonNullAssertion | Prevents the wrong usage of the non-null assertion operator (`!`) in TypeScript files. | Recommended, Safe fix, TypeScript rule |
| noFallthroughSwitchClause | Disallow fallthrough of `switch` clauses. | Recommended, JavaScript and super languages rule |
| noFocusedTests | Disallow focused tests. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noFunctionAssign | Disallow reassigning function declarations. | Recommended, JavaScript and super languages rule |
| noGlobalAssign | Disallow assignments to native objects and read-only global variables. | Recommended, JavaScript and super languages rule |
| noGlobalIsFinite | Use `Number.isFinite` instead of global `isFinite`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noGlobalIsNan | Use `Number.isNaN` instead of global `isNaN`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noImplicitAnyLet | Disallow use of implicit `any` type on variable declarations. | Recommended, TypeScript rule |
| noImportAssign | Disallow assigning to imported bindings | Recommended, JavaScript and super languages rule |
| noImportantInKeyframe | Disallow invalid `!important` within keyframe declarations | Recommended, CSS rule |
| noLabelVar | Disallow labels that share a name with a variable | Recommended, JavaScript and super languages rule |
| noMisleadingCharacterClass | Disallow characters made with multiple code points in character class syntax. | Recommended, Safe fix, JavaScript and super languages rule |
| noMisleadingInstantiator | Enforce proper usage of `new` and `constructor`. | Recommended, TypeScript rule |
| noMisplacedAssertion | Checks that the assertion function, for example `expect`, is placed inside an `it()` function call. | JavaScript and super languages rule |
| noMisrefactoredShorthandAssign | Disallow shorthand assign when variable appears on both sides. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noPrototypeBuiltins | Disallow direct use of `Object.prototype` builtins. | Recommended, Safe fix, JavaScript and super languages rule |
| noReactSpecificProps | Prevents React-specific JSX properties from being used. | Safe fix, JavaScript and super languages rule |
| noRedeclare | Disallow variable, function, class, and type redeclarations in the same scope. | Recommended, JavaScript and super languages rule |
| noRedundantUseStrict | Prevents from having redundant `"use strict"`. | Recommended, Safe fix, JavaScript and super languages rule |
| noSelfCompare | Disallow comparisons where both sides are exactly the same. | Recommended, JavaScript and super languages rule |
| noShadowRestrictedNames | Disallow identifiers from shadowing restricted names. | Recommended, JavaScript and super languages rule |
| noShorthandPropertyOverrides | Disallow shorthand properties that override related longhand properties. | Recommended, CSS rule |
| noSkippedTests | Disallow disabled tests. | Unsafe fix, JavaScript and super languages rule |
| noSparseArray | Disallow sparse arrays | Recommended, Unsafe fix, JavaScript and super languages rule |
| noSuspiciousSemicolonInJsx | It detects possible "wrong" semicolons inside JSX elements. | Recommended, JavaScript and super languages rule |
| noThenProperty | Disallow `then` property. | Recommended, JavaScript and super languages rule |
| noUnsafeDeclarationMerging | Disallow unsafe declaration merging between interfaces and classes. | Recommended, TypeScript rule |
| noUnsafeNegation | Disallow using unsafe negation. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useAwait | Ensure `async` functions utilize `await`. | JavaScript and super languages rule |
| useDefaultSwitchClauseLast | Enforce default clauses in switch statements to be last | Recommended, JavaScript and super languages rule |
| useErrorMessage | Enforce passing a message value when creating a built-in error. | JavaScript and super languages rule |
| useGetterReturn | Enforce `get` methods to always return a value. | Recommended, JavaScript and super languages rule |
| useIsArray | Use `Array.isArray()` instead of `instanceof Array`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useNamespaceKeyword | Require using the `namespace` keyword over the `module` keyword to declare TypeScript namespaces. | Recommended, Safe fix, TypeScript rule |
| useNumberToFixedDigitsArgument | Enforce using the digits argument with `Number#toFixed()`. | Unsafe fix, JavaScript and super languages rule |
| useValidTypeof | This rule verifies the result of `typeof $expr` unary expressions is being compared to valid values, either string literals containing valid type names or other `typeof` expressions | Recommended, Unsafe fix, JavaScript and super languages rule |

## Recommended rules

The recommended rules are:

<RecommendedRules />