import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: token
            }
        });
    }

    return next(req);
};
