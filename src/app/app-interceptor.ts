import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AppInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const method = req.method;
    let setReq: HttpRequest<any>;
    // 请求method判断
    if (method === 'POST') {
      setReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: {
          app_id: '123',
          name: 'cf',
          age: 26
        }
      });
    } else {
      setReq = req;
    }
    return next.handle(setReq).pipe(mergeMap((event: HttpResponse<object>) => {
      const res = event.body;
      // status为1时代表请求参数有问题或者接口报错
      if (res && res['status'] === 1) {
        console.log('reserror');
        return of(event);
      }
      return this.handleData(event);
    })
      ,catchError((err: HttpErrorResponse) => this.handleData(err)
    ));
  }

  /**
   * @desc 对不同的状态码进行处理
   */
  handleData(event: HttpResponse<object> | HttpErrorResponse): Observable<any> {
    const status = event.status;
    switch(status) {
      case 404:
        console.log('请求的资源不存在！')
        return of(event);
      case 500:
        console.log('内部错误，请稍后重试！');
        return of(event);
      case 503:
        console.log('服务器正在维护，请稍等！');
        return of(event);
      default:
        return of(event);
    }
  }
}
