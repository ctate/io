# noExcessiveCognitiveComplexity

Disallow functions that exceed a given Cognitive Complexity score.

## Diagnostic Category
lint/complexity/noExcessiveCognitiveComplexity

## Since
v1.0.0

## Sources
- Same as: sonarjs/cognitive-complexity

## Description
The more complexity a function contains, the harder it is to understand later on. Reducing complexity helps to make code more maintainable, both by making it easier to understand as well as by reducing chances of accidental side-effects when making changes.

This rule calculates a complexity score for every function and disallows those that exceed a configured complexity threshold (default: 15).

The complexity score is calculated based on the Cognitive Complexity algorithm: https://redirect.sonarsource.com/doc/cognitive-complexity.html

## Examples

### Invalid

```javascript
function tooComplex() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            for (let z = 0; z < 10; z++) {
                if (x % 2 === 0) {
                    if (y % 2 === 0) {
                        console.log(x > y ? `${x} > ${y}` : `${y} > ${x}`);
                    }
                }
            }
        }
    }
}
```

### Error Message

code-block.js:1:10 lint/complexity/noExcessiveCognitiveComplexity 
 Excessive complexity of 21 detected (max: 15).
 
 1 │ function tooComplex() {
   │         ^
 2 │     for (let x = 0; x < 10; x++) {
 3 │         for (let y = 0; y < 10; y++) {
 
 Please refactor this function to reduce its complexity score from 21 to the max allowed complexity 15.

## Options

Allows to specify the maximum allowed complexity.

```json
{
    "//": "...",
    "options": {
        "maxAllowedComplexity": 15
    }
}
```

The allowed values range from 1 through 254. The default is 15.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options