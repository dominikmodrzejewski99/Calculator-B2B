import {Component} from '@angular/core';
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
  incomeMonthly: any;
  form: FormGroup | any;
  kpirValue: any;
  public checklist: any;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      incomeMonthly: ['', Validators.required],
      costsMonthly: [''],
      flatRate: ['1', Validators.required],
      largeZUS: [],
      smallZUS: [],
      healthInsurance: []
    });
  }

  //todo powyzej 120 tysiecy
  //todo wybieranie jednej opcji

  calcKpir() {
    const incomeMonthlyValue = this.form.get('incomeMonthly').value; // dochod miesieczny
    const incomeYearlyValue = incomeMonthlyValue * 12; // dochod roczny
    const costsMonthly = this.form.get('costsMonthly').value // koszty miesiecznie
    const costsYearly = costsMonthly * 12; // koszty roczne

    let totalSocialContributions;
    if (this.form.value.largeZUS) {
      totalSocialContributions = 1316.54; // duzy zus
    } else if (this.form.value.smallZUS) {
      totalSocialContributions = 336.49; // maly zus todo sprawdzic czy te usrednienie jest legit
    } else {
      totalSocialContributions = 0; // tylko zdrowotna
    }

    const totalSocialContributionsYearly = totalSocialContributions * 12; // suma skladek spolecznych rocznie
    const baseHealthCareContribution = incomeYearlyValue - costsYearly - totalSocialContributionsYearly; // podstawa skladka zdrowotna
    const healthCareContributionYearly = baseHealthCareContribution * 0.09; // zdrowotna roczna
    const baseTax = incomeYearlyValue - costsYearly - totalSocialContributionsYearly; // podstawa roczna opodatkowania
    const taxYearly = (baseTax * 0.12) - 3600; // pit roczny przypadek do 120 tys
    const incomeYearlyNetto = incomeYearlyValue - healthCareContributionYearly - taxYearly // dochod roczny netto
    const incomeMonthlyNetto = incomeYearlyNetto / 12; // dochod miesieczny netto


    console.log(incomeYearlyValue, 'suma dochodow')
    console.log(totalSocialContributionsYearly, 'suma skladek')
    console.log(costsYearly, 'koszty')
    console.log(baseHealthCareContribution, 'zdrowotna podstawa wyliczenia');
    console.log(healthCareContributionYearly, 'zdrowotna roczna');
    console.log(taxYearly, 'pit roczny');
    console.log(incomeYearlyNetto, 'dochod netto roczny')
    console.log(incomeMonthlyNetto, 'dochod netto miesieczny');

    // const incomeMonthlyNetto = (incomeMonthlyValue - totalSocialContributions - costsMonthly) *

    this.kpirValue = incomeMonthlyNetto.toFixed(2) + ' zł';

  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.calcKpir();
    }
  }
}
