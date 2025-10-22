import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expenses } from './expenses';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    Expenses
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    Expenses,
  ]
})
export class ExpensesModule { }
