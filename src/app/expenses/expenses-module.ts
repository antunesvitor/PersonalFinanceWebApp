import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expenses } from './expenses';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AddToGroupDialog } from './add-to-group-dialog/add-to-group-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    Expenses,
    AddToGroupDialog,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    Expenses,
  ]
})
export class ExpensesModule { }
