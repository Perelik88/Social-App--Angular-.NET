import { HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';
import { tap } from 'rxjs/internal/operators/tap';
import { BusyService } from '../services/busy-service';
import { delay } from 'rxjs/internal/operators/delay';
import { of } from 'rxjs';

const cache = new Map<string, HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  if (req.method === 'GET') {
    const cachedResponse = cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }
  }

  busyService.busy();
  return next(req).pipe(
    delay(500),
    tap(response => {
      if (req.method === 'GET') {
        cache.set(req.url, response);
      }
    }),
    finalize(() => busyService.idle())
  )
};
