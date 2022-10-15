import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BillServService } from '../../services/bill-serv.service';
import { MainPageComponent } from '../main-page/main-page.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MainPageComponent],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  grossSalary!: FormControl;
  netSalary: number = 0;

  personalRelief = 0;
  // personalRelief = 2400;
  nssfRate = 1080;
  insuranceRelief = 0;
  // insuranceRelief = 210;
  nhifRate = 0;
  // nhifRate = 1400;
  netPay = 0;
  incomeTax = 0;
  taxBeforeRelief = 0;
  taxableAmount = 0;

  constructor(
    private billServ: BillServService,
    private mainPage: MainPageComponent
  ) {}

  ngOnInit(): void {
    this.grossSalary = new FormControl(0, [Validators.required]);
  }

  calculateTax(event: Event) {
    console.log(event);
    console.log(this.grossSalary.value);

    let taxableIncome: number = 0;

    //We check if GS is less than our Minumum TAX Rate.
    if (this.grossSalary.value < 24001) {
      if (this.grossSalary.value <= this.nssfRate) {
        this.taxableAmount = this.grossSalary.value;
        this.netSalary = this.grossSalary.value;
        return;
      } else {
        taxableIncome = this.grossSalary.value - this.nssfRate;
        this.taxableAmount = taxableIncome;
        this.netSalary = taxableIncome;
      }
      this.incomeTax = 0;
      this.nhifRate = 0;
      this.taxBeforeRelief = 0;
      this.personalRelief = 0;
      this.insuranceRelief = 0;
    } else {
      //Determine our tax band.
      taxableIncome = this.grossSalary.value - this.nssfRate;
      this.taxableAmount = taxableIncome;

      switch (true) {
        case this.taxableAmount <= 32333:
          let band2Remainder = this.taxableAmount - 24000;
          console.log(band2Remainder);

          let band2 =
            band2Remainder > 0
              ? band2Remainder * 0.25 + 2400
              : 0.1 * this.taxableAmount;

          this.insuranceRelief = 210;
          this.taxBeforeRelief = band2;

          this.personalRelief = this.taxBeforeRelief > 2400 ? 2400 : 0;
          this.nhifRate = 1400;
          this.incomeTax =
            this.taxBeforeRelief -
            this.insuranceRelief -
            this.personalRelief +
            this.nhifRate;

          this.netSalary = this.taxableAmount - this.incomeTax;
          break;

        case this.taxableAmount > 32333:
          let band3Tax = ((this.taxableAmount - 32333) * 0.3).toFixed(2);
          this.taxBeforeRelief = 2400 + 0.25 * 8233 + parseInt(band3Tax);
          this.personalRelief = 2400;
          this.insuranceRelief = 210;
          this.nhifRate = 1400;
          this.incomeTax =
            this.taxBeforeRelief -
            this.personalRelief -
            this.insuranceRelief +
            this.nhifRate;

          let temp = this.incomeTax.toFixed(2);
          this.netSalary = this.taxableAmount - parseInt(temp);
      }
    }
  }

  manageBill() {
    this.billServ.updateNetSalary(this.netSalary);

    this.mainPage.selectedIdx =
      this.mainPage.selectedIdx >= 0
        ? this.mainPage.selectedIdx + 1
        : this.mainPage.selectedIdx;
  }
}
