import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from '../calculator/calculator.component';
import { BillComponent } from '../bill/bill.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    CalculatorComponent,
    BillComponent,
    MatTabsModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  selectedIdx: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
