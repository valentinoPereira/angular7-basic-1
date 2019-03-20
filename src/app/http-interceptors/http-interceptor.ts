import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ApiProviderService } from '../services/api-provider.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private service: ApiProviderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.service.loading = true;

    // send cloned request with header to the next handler.
    return next.handle(req).pipe(
      tap(event => {
        // console.log('Event: ', event);
        // There may be other events besides the response.
        if (event instanceof HttpResponse) {
          this.service.loading = false;
        }
      })
    );
  }
}
