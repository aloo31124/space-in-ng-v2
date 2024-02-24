import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  headerImageUrl = "";
  isMainHeader = false;
  isBackIndex = false;
  isHiddenBacke = false;

  constructor() {

    const urlContent = "assets/header/";

    if(window.innerWidth > 1500) {
      this.headerImageUrl 
        = urlContent + (this.isMainHeader?"main/bar-main-2000px.png":"secondary/bar-secondary-2000px.png");
    } else if( 500 <= window.innerWidth && window.innerWidth <= 1500) {
      this.headerImageUrl 
        = urlContent + (this.isMainHeader?"main/bar-main-1000px.png":"secondary/bar-secondary-1000px.png");
    } else {
      this.headerImageUrl 
        = urlContent + (this.isMainHeader?"main/bar-main-400px.png":"secondary/bar-secondary-400px.png");
    }    
    console.log(this.headerImageUrl );
  }

  back() { }

}
