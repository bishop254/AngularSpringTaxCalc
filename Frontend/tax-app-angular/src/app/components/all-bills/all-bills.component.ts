import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BillServService } from 'src/app/services/bill-serv.service';
import { catchError, map, Observable, of } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-all-bills',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './all-bills.component.html',
  styleUrls: ['./all-bills.component.scss'],
})
export class AllBillsComponent implements OnInit {
  allBills$: Observable<Record<string, string>[]> = of([]);
  deleteBill$: Observable<null> = of(null);

  bills: Record<string, string>[] = [];

  constructor(
    private billServ: BillServService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills() {
    this.allBills$ = this.billServ.getAllBills().pipe(
      map((resp) => {
        this.snackBar.open(
          'Bills fetched successfully',
          'Fetching Bills Status',
          {
            duration: 3500,
          }
        );

        console.log(resp);

        return resp;
      }),
      catchError((error) => {
        this.snackBar.open(error.message, 'Fetching Bills Status', {
          duration: 3500,
        });
        return of([]);
      })
    );
  }

  editBill(id: string) {
    console.log(id);
  }

  deleteBill(id: string) {
    this.deleteBill$ = this.billServ.deleteBill(parseInt(id)).pipe(
      map((resp: any) => {
        console.log(resp);
        if (resp == null) {
          this.snackBar.open('Bill Deleted', 'Deletion Status', {
            duration: 3500,
          });
          this.loadBills();
          return null;
        } else {
          return null;
        }
      }),
      catchError((error) => {
        this.snackBar.open(error.message, 'Deletion Status', {
          duration: 3500,
        });
        return of(null);
      })
    );
  }
}
