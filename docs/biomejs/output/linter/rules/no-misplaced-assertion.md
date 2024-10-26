# noMisplacedAssertion

**Diagnostic Category: `lint/suspicious/noMisplacedAssertion`**

**Since**: `v1.8.0`
Sources: 
- Inspired from: jest/no-standalone-expect

Checks that the assertion function, for example `expect`, is placed inside an `it()` function call.

Placing (and using) the `expect` assertion function can result in unexpected behaviors when executing your testing suite.

The rule will check for the following assertion calls:

- `expect`
- `assert`
- `assertEquals`

However, the rule will ignore the following assertion calls:

- `expect.any`
- `expect.anything`
- `expect.closeTo`
- `expect.arrayContaining`
- `expect.objectContaining`
- `expect.stringContaining`
- `expect.stringMatching`
- `expect.extend`
- `expect.addEqualityTesters`
- `expect.addSnapshotSerializer`

If the assertion function is imported, the rule will check if they are imported from:

- `"chai"`
- `"node:assert"`
- `"node:assert/strict"`
- `"bun:test"`
- `"vitest"`
- Deno assertion module URL

Check the [options](#options) if you need to change the defaults.

## Examples

### Invalid

```js
describe("describe", () => {
    expect()
})
```

```js
import assert from "node:assert";
describe("describe", () => {
    assert.equal()
})
```

```js
import {test, expect} from "bun:test";
expect(1, 2)
```

```js
import {assertEquals} from "https://deno.land/std@0.220.0/assert/mod.ts";

assertEquals(url.href, "https://deno.land/foo.js");
Deno.test("url test", () => {
    const url = new URL("./foo.js", "https://deno.land/");
});
```

### Valid

```js
import assert from "node:assert";
describe("describe", () => {
    it("it", () => {
        assert.equal()
    })
})
```

```js
describe("describe", () => {
    it("it", () => {
        expect()
    })
})
```

```js
test.each([1, 2, 3])('test', (a, b, expected) => {
    expect(a + b).toBe(expected)
})
```

```js
import { waitFor } from '@testing-library/react';
await waitFor(() => {
  expect(111).toBe(222);
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options