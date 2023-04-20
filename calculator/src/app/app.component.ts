import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator';
  healthInsurance: any;
  smallZUS: any;
  largeZUS: any;
  flatRate: any;
  incomeMonthly: any;
  incomeStartYear: any;

  submit() {

  }
}
