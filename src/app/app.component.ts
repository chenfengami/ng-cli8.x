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
    this.appService.getUsers()
      .subscribe((res: any) => {
        console.log('users', res);
      });
  }
}
