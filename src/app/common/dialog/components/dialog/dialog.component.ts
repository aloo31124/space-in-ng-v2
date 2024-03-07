import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  //隱藏 彈跳視窗
  @Input() isHiddenDialog = false;

  //顯示選擇項目
  @Input() itemList: string[] = [];

  //被選擇項目
  @Output() selectedItem = new EventEmitter<string>();

  //視窗再次關閉
  @Output() hideDialog = new EventEmitter<boolean>();

  public hiddenDialog() {
    this.isHiddenDialog = true;
    this.hideDialog.emit(true);
  }

  public clickItem(selectName: string) {
    this.selectedItem.emit(selectName);
    this.hiddenDialog();
  }

}
