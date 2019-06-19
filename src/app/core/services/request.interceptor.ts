import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig, withCredentials: true });
    return next.handle(request);
  }


/*
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true
  });
  return next.handle(request);
  }
*/
}
