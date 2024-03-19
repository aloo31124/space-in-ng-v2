import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-basic',
  templateUrl: './loading-basic.component.html',
  styleUrls: ['./loading-basic.component.scss']
})
export class LoadingBasicComponent {

  @Input() isLoading = true;

}
