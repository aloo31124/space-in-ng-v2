import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  Firestore,
  collection,
  collectionData,
  addDoc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-booking-check-form-page',
  templateUrl: './booking-check-form-page.component.html',
  styleUrls: ['./booking-check-form-page.component.scss']
})
export class BookingCheckFormPageComponent {

  selectDate = "";
  selectDay = "";
  selectTime = "";
  bookingType = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore,
  ) {
    this.getData();
  }

  ngOnInit(): void {
    // 提取日期参数
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectDate = params['selectDate'];
      this.selectTime = params['selectTime'];
      this.bookingType = params['bookingType'];

      const dayOfWeek = (new Date(this.selectDate)).getDay();
      //判斷星期
      switch(dayOfWeek) {        
        case 0:
          // 星期日
          this.selectDay = "(日)";
          break;
        case 1:
          // 星期一
          this.selectDay = "(一)";
          break;
        case 2:
          // 星期二
          this.selectDay = "(二)";
          break;
        case 3:
          // 星期三
          this.selectDay = "(三)";
          break;
        case 4:
          // 星期四
          this.selectDay = "(四)";
          break;
        case 5:
          // 星期五
          this.selectDay = "(五)";
          break;
        case 6:
          // 星期六
          this.selectDay = "(六)";
          break;
      }
    });
  }
  


  addData() {
    //console.log(f.value);

    const testData = { mail: 'newaloo31124@gmail.com', selectDate: this.selectDate, selectTime: this.selectTime, bookingType: this.bookingType }

    const collectionInstance = collection(this.firestore, 'UsersTest');
    addDoc(collectionInstance, testData)
      .then(() => {
        //console.log("success!! :)")
        alert("post success! selectDate : " + this.selectDate + " ,"  + this.selectTime);
        this.router.navigate(["review-booking/review-booking-calendar"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'UsersTest');
    collectionData(collectionInstance)
      .subscribe((data) => {
        console.log(data);
      });
  }

  selectMap() {
    this.router.navigate(["map"]);
  }
}
