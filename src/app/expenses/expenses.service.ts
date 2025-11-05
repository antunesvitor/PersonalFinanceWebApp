import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpensesQueryParams } from './Models/ExpensesQueryParams';
import { PaginatedExpensesResponse } from './Models/PaginatedExpensesResponse';
import { Observable } from 'rxjs';
import { Group } from './Models/Groups';
import { ThisReceiver } from '@angular/compiler';
import { Expense, ExpenseWS } from './Models/Expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private apiUrl = 'http://localhost:5294/api/';

  constructor(private http: HttpClient) { }

  getExpenses(params: ExpensesQueryParams): Observable<PaginatedExpensesResponse> {
    let httpParams = new HttpParams();

    // Add parameters if they exist
    if (params.pageSize) {
      httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    if (params.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params.startDate) {
      httpParams = httpParams.set('startDate', params.startDate);
    }
    if (params.endDate) {
      httpParams = httpParams.set('endDate', params.endDate);
    }

    return this.http.get<PaginatedExpensesResponse>(this.apiUrl + 'expenses/', { params: httpParams });
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl + 'groups/')
  }

  addExpensetoGroup(expenseId: number, groupId: number): Observable<ExpenseWS>{
    // throw new Error("Blah blah blah");
    return this.http.put<ExpenseWS>(this.apiUrl + `expenses/${expenseId}/add-to-group/${groupId}`, null);
  }
}
