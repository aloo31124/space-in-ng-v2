import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogItemModel } from '../../models/item.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent<T extends DialogItemModel> {

  // dialog 標題
  @Input() dialogTitle = "";

  //隱藏 彈跳視窗
  @Input() isHiddenDialog = false;

  //顯示選擇項目
  @Input() itemList: T[] = [];

  //被選擇項目
  selectItemId = "";
  //被選擇項目, 送出給使用者
  @Output() selectedItem = new EventEmitter<string>();

  //視窗再次關閉
  @Output() hideDialog = new EventEmitter<boolean>();

  /*
   *  視窗再次關閉
   */
  public hiddenDialog() {
    this.isHiddenDialog = true;
    this.hideDialog.emit(this.isHiddenDialog);
  }

  /*
   *  選擇選項, 變換該選項顏色給使用者識別
   */
  public clickItem(selectId: string) {
    this.selectItemId = selectId;
  }

  /*
   *  送出選擇項目, 並隱藏 dialog
   */
  emitSelectItem() {
    this.selectedItem.emit(this.selectItemId);
    this.hiddenDialog();
  }


}
