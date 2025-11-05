import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Group } from '../Models/Groups';
import { ExpensesService } from '../expenses.service';
import { Expense, ExpenseWS } from '../Models/Expense';

@Component({
  selector: 'app-add-to-group-dialog',
  standalone: false,
  templateUrl: './add-to-group-dialog.html',
  styleUrl: './add-to-group-dialog.scss'
})
export class AddToGroupDialog {
  selectedGroup: Group | null;
  expenseId: number;
  expenseName: string;
  errorHappened: boolean;
  constructor(
    public dialogRef: MatDialogRef<AddToGroupDialog>,
    private expenseService: ExpensesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedGroup = data.expense.groupId != null ? new Group(data.expense.groupId, data.expense.groupName) : null;
    this.expenseId = data.expense.id;
    this.expenseName = data.expenseName;
    this.errorHappened = false;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    let groupId: number = this.selectedGroup?.id ?? 0;
    
    if(groupId == null) return;   //isso nunca deve ocorrer

    this.expenseService.addExpensetoGroup(this.expenseId, groupId).subscribe({
      next: (response: ExpenseWS) => {
        this.dialogRef.close({
          updated: true,
          groupId: this.selectedGroup?.id,
          groupName: this.selectedGroup?.name
        });
      },
      error: (err)=> {
        console.error('Error binding group to expense', err);
        this.errorHappened = true;
      }
    })
  }
}
