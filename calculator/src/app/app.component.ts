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
  flatRate: any;
  incomeMonthly: any;
  incomeYear: any;
  resultYear: any;
  form: FormGroup | any;
  healthInsuranceValue:any;
  taxBase:any;
  pit:any;
  result:any;
  socialContributions:any;
  kpirValue: any;

  constructor(private fb: FormBuilder) { }

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
    this.resultYear = 0;
    this.incomeYear = 0;
    this.result = 0
    this.pit = 0;

    if (this.form.valid) {
      // Do something with the form data
      console.log(this.form.value);
      this.calcKpir();

      //roczne przychody
      this.incomeYear = 12 * this.form.value.incomeMonthly;
      console.log('roczne przychody' + this.incomeYear);


      //wysokość składek społecznych zależnych od Zus
      if (this.form.value.healthInsurance) {
        this.socialContributions = 0;
      }else if (this.form.value.smallZUS) {
        this.socialContributions = 12*341.72;
      } else {
        this.socialContributions = 12*1316.54;
      }

      console.log('spoleczne:' + this.socialContributions);

      //wysokość składki zdrowotnej
      if (this.incomeYear-this.socialContributions < 60000) {
        this.healthInsuranceValue = 376.16*12;
      } else if (this.incomeYear-this.socialContributions > 60000 && this.incomeYear-this.socialContributions < 300000){
        this.healthInsuranceValue = 626.93*12;
      } else {
        this.healthInsuranceValue = 1128.48*12;
      }
      console.log('zdrowotna:' + this.healthInsuranceValue);

      //podstawa podatkowa roczna
      this.taxBase = this.incomeYear-this.socialContributions-(this.healthInsuranceValue * 0.5);
      console.log('podstawa :' + this.taxBase);

      //pit roczny
      this.pit = this.taxBase * (this.form.value.flatRate/100);
      console.log('pit :' + this.pit);

      //roczny dochód
      this.resultYear = this.incomeYear - this.healthInsuranceValue - this.pit;
      console.log('roczny :' + this.resultYear);

      //miesieczny dochód
      this.result = (this.resultYear/12).toFixed(2);

    }
  }
}
