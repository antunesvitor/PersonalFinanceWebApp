import { Component, OnInit } from '@angular/core';
import { Expense } from './Models/Expense';
import { ExpensesService } from './expenses.service';
import { PaginatedExpensesResponse } from './Models/PaginatedExpensesResponse';

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
  pageSize = 100;
  isLoading = false;
  error: string | null = null;

  constructor(private expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.isLoading = true;
    this.error = null;

    this.expensesService.getExpenses({
      pageSize: this.pageSize,
      page: this.currentPage,
      startDate: '2025-01-01',
      endDate: '2025-01-31'
    }).subscribe({
      next: (response: PaginatedExpensesResponse) => {
        this.expenses = response.data.map(x=> new Expense(x))
        this.totalRecords = response.totalRecords;
        this.currentPage = response.currentPage;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading expenses:', err);
        this.error = 'Failed to load expenses. Please try again.';
        this.isLoading = false;
      }
    });
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadExpenses();
  }
}
