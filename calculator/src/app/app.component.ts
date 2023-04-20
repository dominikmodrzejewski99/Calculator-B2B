import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  form: FormGroup | any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      incomeStartYear: ['', Validators.required],
      incomeMonthly: ['', Validators.required],
      flatRate: ['1', Validators.required],
      largeZUS: [false],
      smallZUS: [false],
      healthInsurance: [false]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Do something with the form data
      console.log(this.form.value);
    }
  }

  submit() {

  }
}
