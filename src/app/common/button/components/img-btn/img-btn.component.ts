import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-btn',
  templateUrl: './img-btn.component.html',
  styleUrls: ['./img-btn.component.scss']
})
export class ImgBtnComponent {

  @Input() imgUrl = "";
  @Input() btnText = "開發中功能";
  @Input() btnRouterLink = "";

}
