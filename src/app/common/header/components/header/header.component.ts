import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerImageUrl = "";
  isMainHeader = false;
  isBackIndex = false;
  isHiddenBacke = false;
  // header 當前元素
  @ViewChild('header') headerElementRef!: ElementRef;

  constructor() {}

  ngOnInit() {
    //判斷 header 依照當設備前寬度,判斷所需取用之圖片
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
  } 
  
  ngAfterViewInit() {
    //射出 header 高度給父元件
    console.log(this.headerElementRef.nativeElement.offsetHeight);
  }

  back() { }

}