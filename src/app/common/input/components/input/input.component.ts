import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() inputTitle = "";
  @Input() inputTitleLimit = 10;
  @Input() inputContent = "";
  @Input() inputContentLimit = 10;
  @Input() isSelect = false;


  // 該 input 欄位被點選
  @Output() inputClick = new EventEmitter<string>();

  clickInput() {
    this.isSelect = !this.isSelect;
    this.inputClick.emit(this.inputTitle);
  }

}
