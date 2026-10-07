# ng-perf-inspector

[![npm version](https://img.shields.io/npm/v/ng-perf-inspector.svg)](https://www.npmjs.com/package/ng-perf-inspector)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A development-only HTTP interceptor that logs how long each Angular request takes. It prints a
colour-coded line to the console, and a red one (with the error) when a request fails.

Outside development builds the interceptor does nothing — it checks `isDevMode()` before touching
`performance` or the console — so you can register it unconditionally and leave it in.

## Install

```bash
npm install --save-dev ng-perf-inspector
```

`@angular/common`, `@angular/core` (>= 16) and `rxjs` (>= 7) are peer dependencies; your app
already ships them.

## Usage

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpPerfInterceptor } from 'ng-perf-inspector';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([httpPerfInterceptor]))],
};
```

Open the browser console and exercise the app. Each request logs a line like:

```
Perf GET /api/products 142.3ms
```

## What it does not do

It is deliberately small — one interceptor, nothing else. It does not measure template rendering and
it does not draw an overlay. For that, use Angular DevTools.

## License

MIT © Vitalie Condorache
