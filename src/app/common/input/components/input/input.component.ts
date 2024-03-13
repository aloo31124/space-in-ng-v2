import { Component, Input } from '@angular/core';

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

}
