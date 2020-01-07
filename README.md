# 官方ng-cli解决不同环境，接口地址对应不同域名、端口的解决方法
## angular.json进行配置
``` javascript
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "ng-cli:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "ng-cli:build:production"
            },
              // 开发环境
            "develop": {
              "proxyConfig": "src/proxy/proxy.conf.dev.json"
            },
              // 测试环境
            "test": {
              "proxyConfig": "src/proxy/proxy.conf.test.json"
            },
              // 线上环境
            "online": {
              "proxyConfig": "src/proxy/proxy.conf.online.json"
            }
          }
        },
```

## proxy 代理

```javascript
// develop environment
{
  "/api": {
    "target": "http://localhost:3000"
  }
}
// test environment
{
  "/api": {
    "target": "http://localhost:3001"
  }
}
// online environment
{
  "/api": {
    "target": "http://localhost:3002"
  }
}
```

## service

```typescript
// component.ts
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  title = 'ng-cli';

  constructor(
    private appService: AppService
  ) {}

  ngOnInit() {
    // getUsers
    this.appService.getUsers()
      .subscribe((res: any) => {
        console.log('users', res);
      });
  }
}

// service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    // develop代理到port: 3000
    // test代理到port: 3001
    // online代理到port: 3002
    return this.http.get('/api/users');
  }
}

```

# 非官方ng-cli配置

 

## process.env.SERVER_ENV

```javascript
  yarn add cross-env -D // 解决windows、macOs下的环境兼容问题

  // webpack.dev.config.js
  const SERVER_ENV = process.env.SERVER_ENV;
  const SERVER_DOMAIN = function(env) {
    switch(env) {
      // 线上环境
      case 'online':
        return 'http://localhost:3002';
      // 测试环境
      case 'test':
        return 'http://localhost:3001';
      // 开发环境（默认）
      case 'develop':
      default:
        return 'http://localhost:3000';
    }
  }
  // proxy: {
  	"/api": {
      "target": SERVER_DOMAIN(SERVER_ENV)
		}
  }
  
  //package.json
  {
    "scripts": {
      "start:develop": "cross-env SERVER_ENV=develop npm run server",
    	"start:test": "cross-env SERVER_ENV=test npm run server",
      "start:online": "cross-env SERVER_ENV=online npm run server"
      "server": "webpack-dev-server --config webpack.dec.config.js",
    }
  }
```

...weiwandaixu

