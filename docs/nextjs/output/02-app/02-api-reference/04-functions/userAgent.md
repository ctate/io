# userAgent

The `userAgent` helper extends the Web Request API with additional properties and methods to interact with the user agent object from the request.

```ts
import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const { device } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  url.searchParams.set('viewport', viewport)
  return NextResponse.rewrite(url)
}
```

```js
import { NextResponse, userAgent } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl
  const { device } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  url.searchParams.set('viewport', viewport)
  return NextResponse.rewrite(url)
}
```

## Properties

### `isBot`
A boolean indicating whether the request comes from a known bot.

### `browser`
An object containing information about the browser used in the request.
- `name`: Browser's name or `undefined`.
- `version`: Browser's version or `undefined`.

### `device`
An object containing information about the device used in the request.
- `model`: Device model or `undefined`.
- `type`: Device type (e.g., `console`, `mobile`, `tablet`, `smarttv`, `wearable`, `embedded`, or `undefined`).
- `vendor`: Device vendor or `undefined`.

### `engine`
An object containing information about the browser's engine.
- `name`: Engine's name (e.g., `Amaya`, `Blink`, `EdgeHTML`, `Flow`, `Gecko`, `Goanna`, `iCab`, `KHTML`, `Links`, `Lynx`, `NetFront`, `NetSurf`, `Presto`, `Tasman`, `Trident`, `w3m`, `WebKit`, or `undefined`).
- `version`: Engine's version or `undefined`.

### `os`
An object containing information about the operating system.
- `name`: OS name or `undefined`.
- `version`: OS version or `undefined`.

### `cpu`
An object containing information about the CPU architecture.
- `architecture`: CPU architecture (e.g., `68k`, `amd64`, `arm`, `arm64`, `armhf`, `avr`, `ia32`, `ia64`, `irix`, `irix64`, `mips`, `mips64`, `pa-risc`, `ppc`, `sparc`, `sparc64`, or `undefined`).