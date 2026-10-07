import type { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { tap } from 'rxjs';

const OK_STYLES = [
  'color: #22c55e; font-weight: bold',
  'color: #a855f7; font-weight: bold',
  'color: inherit',
  'color: #eab308; font-weight: bold',
];

const ERROR_STYLES = [
  'color: #ef4444; font-weight: bold',
  'color: #a855f7; font-weight: bold',
  'color: inherit',
  'color: #ef4444; font-weight: bold',
];

/**
 * Logs how long every HTTP request takes, straight to the console.
 *
 * It is a no-op outside development, so it is safe to register it unconditionally:
 * `provideHttpClient(withInterceptors([httpPerfInterceptor]))`.
 */
export const httpPerfInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isDevMode()) {
    return next(req);
  }

  const startedAt = performance.now();

  return next(req).pipe(
    tap({
      next: () => report('Perf', OK_STYLES, req, startedAt),
      error: (error: unknown) => report('Perf error', ERROR_STYLES, req, startedAt, error),
    }),
  );
};

function report(
  label: string,
  styles: string[],
  req: HttpRequest<unknown>,
  startedAt: number,
  error?: unknown,
): void {
  const duration = `${(performance.now() - startedAt).toFixed(1)}ms`;
  const line = `%c${label} %c${req.method} %c${req.url} %c${duration}`;
  const details: unknown[] = [line, ...styles];

  if (error === undefined) {
    console.log(...details);
    return;
  }

  details.push(error);
  console.error(...details);
}
