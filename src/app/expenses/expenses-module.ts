import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Expenses } from './expenses';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AddToGroupDialog } from './add-to-group-dialog/add-to-group-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

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
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    Expenses,
  ],
  providers:[
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DatePipe
  ]
})
export class ExpensesModule { }
