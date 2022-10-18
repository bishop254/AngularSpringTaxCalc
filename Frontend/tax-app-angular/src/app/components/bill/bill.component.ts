import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillServService } from '../../services/bill-serv.service';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AllBillsComponent } from '../all-bills/all-bills.component';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  netPayFromCalculator$!: Observable<number>;

  netSalary!: FormControl;
  billForm!: FormGroup;

  allBills: Record<string, string | number>[] = [];

  balance: number = 0;

  dataSavedStatus$!: Observable<any>;

  constructor(
    private billServ: BillServService,
    private snackBar: MatSnackBar
  ) {
    this.netSalary = new FormControl(0, [Validators.required]);

    this.billForm = new FormGroup({
      billName: new FormControl('', [
        Validators.required,
        Validators.pattern(`/\b(?=.[^dW])+\b/`),
      ]),
      billAmount: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    this.netPayFromCalculator$ = this.billServ.netSalaryObservable$.pipe(
      map((resp) => {
        if (resp) {
          this.netSalary.setValue(resp);
          this.balance = resp;
          return resp;
        }
        this.netSalary.setValue(0);
        return 0;
      })
    );
  }

  calculateBalance(event?: Event) {
    let temp = 0;
    this.allBills.forEach((bill) => {
      temp += bill['amount'] as number;
    });
    this.balance = this.netSalary.value - temp;
    return this.balance;
  }

  addBill(event?: Event) {
    let newBill: Record<string, string | number> = {
      name: this.billForm.controls['billName'].value,
      amount: this.billForm.controls['billAmount'].value,
    };

    let billExists = false;

    billExists =
      this.allBills.filter(
        (bill) =>
          (bill['name'] as string).toLowerCase() ==
          (newBill['name'] as string).toLowerCase()
      ).length > 0
        ? true
        : false;

    if (billExists == false) {
      if ((newBill['amount'] as number) > 0) {
        this.allBills.push(newBill);
        this.billForm.reset();
        this.snackBar.open('New Bill Added', 'Bill Status', { duration: 3000 });
      } else {
        this.snackBar.open(
          'Bill Amount is null OR a duplicate entry',
          'Bill Status',
          { duration: 3500 }
        );
        console.log('bill is null');
      }
    }

    this.balance = this.calculateBalance();
  }

  saveBill(bill: Record<string, string | number>) {
    let data = {
      name: bill['name'],
      amount: bill['amount'],
    };

    this.dataSavedStatus$ = this.billServ.saveBillToBackend(data).pipe(
      map((resp) => {
        if (resp) {
          this.snackBar.open('Bill saved to our DB', 'API Save Status', {
            duration: 3000,
          });

          return true;
        }
        this.snackBar.open(
          'Something went wrong saving our new bill',
          'API Save Status',
          {
            duration: 3000,
          }
        );
        return false;
      }),
      catchError((error: any) => {
        this.snackBar.open(error.message, 'API Save Status', {
          duration: 3000,
        });
        return of(false);
      })
    );
  }

  saveAllBills(bills: Record<string, string | number>[]) {
    console.log(bills);

    this.dataSavedStatus$ = this.billServ.saveAllBillsToBackend(bills).pipe(
      map((resp) => {
        if (resp) {
          this.snackBar.open('All Bills saved to our DB', 'API Save Status', {
            duration: 3000,
          });

          return true;
        }
        this.snackBar.open(
          'Something went wrong saving our new bill',
          'API Save Status',
          {
            duration: 3000,
          }
        );
        return false;
      }),
      catchError((error: any) => {
        this.snackBar.open(error.message, 'API Save Status', {
          duration: 3000,
        });
        return of(false);
      })
    );
  }

  deleteBill(bill: Record<string, string | number>) {
    let idx = this.allBills.indexOf(bill);
    this.allBills.splice(idx, 1);
    this.calculateBalance();
    this.snackBar.open('Bill deleted from list', 'Bill Deletion Status', {
      duration: 3000,
    });
  }
}
