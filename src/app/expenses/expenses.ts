import { Component, OnInit } from '@angular/core';
import { Expense } from './Models/Expense';
import { ExpensesService } from './expenses.service';
import { PaginatedExpensesResponse } from './Models/PaginatedExpensesResponse';
import { MatDialog } from '@angular/material/dialog';
import { AddToGroupDialog } from './add-to-group-dialog/add-to-group-dialog';
import { Group } from './Models/Groups';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-expenses',
  standalone: false,
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss'
})
export class Expenses implements OnInit {

  expenses: Expense[] = [];
  totalRecords = 0;
  currentPage = 1;
  pageSize = 10;
  isLoadingExpenses = false;
  errorExpenses: string | null = null;
  isLoadingGroups = false;
  errorGroups: string | null = null;
  groups: Group[] = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private expensesService: ExpensesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadGroups();
  }

  loadExpenses(): void {
    this.isLoadingExpenses = true;
    this.errorExpenses = null;

    this.expensesService.getExpenses({
      pageSize: this.pageSize,
      page: this.currentPage,
      startDate: this.range.value.start,
      endDate: this.range.value.end
    }).subscribe({
      next: (response: PaginatedExpensesResponse) => {
        this.expenses = response.data.map(x => new Expense(x))
        this.totalRecords = response.totalRecords;
        this.currentPage = response.currentPage;
        this.isLoadingExpenses = false;
      },
      error: (err) => {
        console.error('Error loading expenses:', err);
        this.errorExpenses = 'Failed to load expenses. Please try again.';
        this.isLoadingExpenses = false;
      }
    });
  }

  filterExpenses() {
    
  }

  loadGroups(){
    this.isLoadingGroups = true;
    this.expensesService.getGroups()
      .subscribe({
        next: (response: Group[]) => {
          this.groups = response;
          this.isLoadingGroups = false;
        },
        error: (err) => {
        console.error('Error loading groups:', err);
        this.errorExpenses = 'Failed to load groups. Please try again.';
        this.isLoadingExpenses = false;
      }
      })
  }

  addToGroup(expense: Expense) {
    const dialogRef = this.dialog.open(AddToGroupDialog, {
      width: '400px',
      data: {
        expenseName: expense.description,
        groups: this.groups,
        expense: expense
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.updated) {
        expense.groupName = result.groupName;
        expense.isUngrouped = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.loadExpenses();
  }
}
