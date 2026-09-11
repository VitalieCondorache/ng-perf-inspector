import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { tap } from 'rxjs';

export const httpPerfInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = performance.now();
  
  return next(req).pipe(
    tap({
      next: () => {
        if (!isDevMode()) return;
        
        const duration = (performance.now() - startTime).toFixed(2);
        console.log(
          `%c[Perf Inspector] %c${req.method} %c${req.url} took %c${duration}ms`,
          'color: #00ffcc; font-weight: bold;',
          'color: #ff00ff; font-weight: bold;',
          'color: inherit;',
          'color: #ffe600; font-weight: bold;'
        );
      },
      error: (error) => {
        if (!isDevMode()) return;
        
        const duration = (performance.now() - startTime).toFixed(2);
        console.error(
          `%c[Perf Inspector ERROR] %c${req.method} %c${req.url} failed after %c${duration}ms`,
          'color: #ff4444; font-weight: bold;',
          'color: #ff00ff; font-weight: bold;',
          'color: inherit;',
          'color: #ff4444; font-weight: bold;',
          error
        );
      }
    })
  );
};