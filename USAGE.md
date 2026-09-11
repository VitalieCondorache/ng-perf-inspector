# How to Use ng-perf-inspector

Integrating the HTTP Performance Interceptor into a modern, standalone-based Angular application is straightforward.

## Step 1: Register the Interceptor

In your application configuration file (typically `app.config.ts`), register the interceptor using Angular's `withInterceptors` function:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpPerfInterceptor } from './http-perf.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([httpPerfInterceptor])
    ),
    // ... other providers
  ]
};
```

## Step 2: Open Browser Console

Run your development server (ng serve), open your browser's Developer Tools (F12), and navigate through your app. 
You will see color-coded performance metrics and timing logs for every outgoing HTTP request.
