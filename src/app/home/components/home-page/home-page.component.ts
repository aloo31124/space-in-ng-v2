import { Component } from '@angular/core';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
  ) {}

  /*
   * 進入功能頁面 
   */
  nextPage(nextUrl: string) {
    this.routeUrlRecordService.nextPage(nextUrl, {});
  }

}
