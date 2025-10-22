import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expenses } from './expenses';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    Expenses
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule
  ],
  exports:[
    Expenses,
  ]
})
export class ExpensesModule { }
