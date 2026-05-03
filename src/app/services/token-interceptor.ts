import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';

const exclude_array: string[] = ['/login', '/register', '/verifyEmail'];

function toExclude(url: string) {
  var length = exclude_array.length;
  for (var i = 0; i < length; i++) {
    if (url.search(exclude_array[i]) != -1) return true;
  }
  return false;
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  
  // Do not add header for login request
  if (toExclude(req.url)) {
    return next(req);
  }

  const jwt = authService.getToken();
  if (jwt) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`
      }
    });
    return next(cloned);
  }
  
  return next(req);
};
