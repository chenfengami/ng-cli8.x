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
    this.appService.getErrorRequest().subscribe(res => {
    });
    this.appService.getUsers().subscribe();
    this.appService.getNames().subscribe(res => {
    });
  }
}
