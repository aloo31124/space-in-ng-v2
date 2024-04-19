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
  isShowPayment = false;

  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private homeService: HomeService,
    private googleAuthService: GoogleAuthService,
  ) {}


  ngOnInit(): void {
    const userId = this.googleAuthService.getCurrentUser().userFirestoreId;

    // 取得該使用者 所有權限
    this.homeService
      .getAllPermission()
      .subscribe(data => {
        data.forEach(p => {
          if(p["userId"] === userId) {
            this.isShowPayment = true;
          }
        });
      });

    // 判斷是否顯示 [空間總覽]
    this.homeService
      .getAllRoom()
      .subscribe(data => {
        data.forEach(x => {
          if(x["ownerId"] === userId) {
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
