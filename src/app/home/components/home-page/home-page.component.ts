import { Component, OnInit } from '@angular/core';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { HomeService } from '../../services/home.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  isShowReviewRoom = false;

  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private homeService: HomeService,
    private googleAuthService: GoogleAuthService,
  ) {}


  ngOnInit(): void {
    const ownerId = this.googleAuthService.getCurrentUser().userFirestoreId;
    this.homeService
      .checkShowReviewRoom()
      .subscribe(data => {
        data.forEach(x => {
          if(x["ownerId"] === ownerId) {
            this.isShowReviewRoom = true;
          }
        });
      });
  }

  /*
   * 進入功能頁面 
   */
  nextPage(nextUrl: string) {
    this.routeUrlRecordService.nextPage(nextUrl, {});
  }

}
