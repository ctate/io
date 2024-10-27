# Edge Runtime

The Next.js Edge Runtime is used for Middleware and supports the following APIs:

## Network APIs

- **Blob**: Represents a blob
- **fetch**: Fetches a resource
- **FetchEvent**: Represents a fetch event
- **File**: Represents a file
- **FormData**: Represents form data
- **Headers**: Represents HTTP headers
- **Request**: Represents an HTTP request
- **Response**: Represents an HTTP response
- **URLSearchParams**: Represents URL search parameters
- **WebSocket**: Represents a websocket connection

## Encoding APIs

- **atob**: Decodes a base-64 encoded string
- **btoa**: Encodes a string in base-64
- **TextDecoder**: Decodes a Uint8Array into a string
- **TextDecoderStream**: Chainable decoder for streams
- **TextEncoder**: Encodes a string into a Uint8Array
- **TextEncoderStream**: Chainable encoder for streams

## Stream APIs

- **ReadableStream**: Represents a readable stream
- **ReadableStreamBYOBReader**: Represents a reader of a ReadableStream
- **ReadableStreamDefaultReader**: Represents a reader of a ReadableStream
- **TransformStream**: Represents a transform stream
- **WritableStream**: Represents a writable stream
- **WritableStreamDefaultWriter**: Represents a writer of a WritableStream

## Crypto APIs

- **crypto**: Provides access to the cryptographic functionality of the platform
- **CryptoKey**: Represents a cryptographic key
- **SubtleCrypto**: Provides access to common cryptographic primitives, like hashing, signing, encryption or decryption

## Web Standard APIs

- **AbortController**: Allows you to abort one or more DOM requests as and when desired
- **Array**: Represents an array of values
- **ArrayBuffer**: Represents a generic, fixed-length raw binary data buffer
- **Atomics**: Provides atomic operations as static methods
- **BigInt**: Represents a whole number with arbitrary precision
- **BigInt64Array**: Represents a typed array of 64-bit signed integers
- **BigUint64Array**: Represents a typed array of 64-bit unsigned integers
- **Boolean**: Represents a logical entity and can have two values: true and false
- **clearInterval**: Cancels a timed, repeating action established by setInterval()
- **clearTimeout**: Cancels a timed, repeating action established by setTimeout()
- **console**: Provides access to the browser's debugging console
- **DataView**: Represents a generic view of an ArrayBuffer
- **Date**: Represents a single moment in time in a platform-independent format
- **decodeURI**: Decodes a Uniform Resource Identifier (URI)
- **decodeURIComponent**: Decodes a URI component
- **DOMException**: Represents an error that occurs in the DOM
- **encodeURI**: Encodes a URI
- **encodeURIComponent**: Encodes a URI component
- **Error**: Represents an error when trying to execute a statement or accessing a property
- **EvalError**: Represents an error that occurs regarding the global function eval()
- **Float32Array**: Represents a typed array of 32-bit floating point numbers
- **Float64Array**: Represents a typed array of 64-bit floating point numbers
- **Function**: Represents a function
- **Infinity**: Represents the mathematical Infinity value
- **Int8Array**: Represents a typed array of 8-bit signed integers
- **Int16Array**: Represents a typed array of 16-bit signed integers
- **Int32Array**: Represents a typed array of 32-bit signed integers
- **Intl**: Provides access to internationalization and localization functionality
- **isFinite**: Determines whether a value is a finite number
- **isNaN**: Determines whether a value is NaN
- **JSON**: Provides functionality to convert JavaScript values to and from the JSON format
- **Map**: Represents a collection of values, where each value may occur only once
- **Math**: Provides access to mathematical functions and constants
- **Number**: Represents a numeric value
- **Object**: Represents the object that is the base of all JavaScript objects
- **parseFloat**: Parses a string argument and returns a floating point number
- **parseInt**: Parses a string argument and returns an integer of the specified radix
- **Promise**: Represents the eventual completion (or failure) of an asynchronous operation
- **Proxy**: Represents an object that defines custom behavior for fundamental operations
- **queueMicrotask**: Queues a microtask to be executed
- **RangeError**: Represents an error when a value is not in the set or range of allowed values
- **ReferenceError**: Represents an error when a non-existent variable is referenced
- **Reflect**: Provides methods for interceptable JavaScript operations
- **RegExp**: Represents a regular expression
- **Set**: Represents a collection of values, where each value may occur only once
- **setInterval**: Repeatedly calls a function with a fixed time delay
- **setTimeout**: Calls a function after a specified number of milliseconds
- **SharedArrayBuffer**: Represents a generic, fixed-length raw binary data buffer
- **String**: Represents a sequence of characters
- **structuredClone**: Creates a deep copy of a value
- **Symbol**: Represents a unique and immutable data type
- **SyntaxError**: Represents an error when trying to interpret syntactically invalid code
- **TypeError**: Represents an error when a value is not of the expected type
- **Uint8Array**: Represents a typed array of 8-bit unsigned integers
- **Uint8ClampedArray**: Represents a typed array of 8-bit unsigned integers clamped to 0-255
- **Uint32Array**: Represents a typed array of 32-bit unsigned integers
- **URIError**: Represents an error when a global URI handling function was used incorrectly
- **URL**: Represents an object providing static methods for creating object URLs
- **URLPattern**: Represents a URL pattern
- **URLSearchParams**: Represents a collection of key/value pairs
- **WeakMap**: Represents a collection of key/value pairs with weakly referenced keys
- **WeakSet**: Represents a collection of objects where each object may occur only once
- **WebAssembly**: Provides access to WebAssembly

## Next.js Specific Polyfills

- **AsyncLocalStorage**: Node.js API for async context

## Environment Variables

Use `process.env` to access Environment Variables for both next dev and next build.

## Unsupported APIs

The Edge Runtime has restrictions:

- Native Node.js APIs are not supported (e.g., cannot read/write to the filesystem).
- `node_modules` can be used if they implement ES Modules and do not use native Node.js APIs.
- Direct `require` calls are not allowed; use ES Modules instead.

The following JavaScript features are disabled:

- **eval**: Evaluates JavaScript code represented as a string
- **new Function(evalString)**: Creates a new function with the provided code
- **WebAssembly.compile**: Compiles a WebAssembly module from a buffer
- **WebAssembly.instantiate**: Compiles and instantiates a WebAssembly module from a buffer

Dynamic code evaluation statements that cannot be reached at runtime and cannot be removed by treeshaking may cause issues. You can relax checks for specific files in your Middleware configuration:

```javascript
export const config = {
  unstable_allowDynamic: [
    '/lib/utilities.js',
    '/node_modules/function-bind/**',
  ],
}
```

`unstable_allowDynamic` is a glob or an array of globs, ignoring dynamic code evaluation for specific files. Be warned that if these statements are executed on the Edge, they will throw and cause a runtime error.