import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpensesQueryParams } from './Models/ExpensesQueryParams';
import { PaginatedExpensesResponse } from './Models/PaginatedExpensesResponse';
import { Observable } from 'rxjs';
import { Group } from './Models/Groups';
import { Expense, ExpenseWS } from './Models/Expense';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private apiUrl = 'http://localhost:5294/api/';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

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
      const formattedStartDate = this.datePipe.transform(params.startDate, 'yyyy-MM-dd');
      if (formattedStartDate) {
        httpParams = httpParams.set('startDate', formattedStartDate);
      }
    }
    if (params.endDate) {
      const formattedEndDate = this.datePipe.transform(params.endDate, 'yyyy-MM-dd');
      if (formattedEndDate) {
        httpParams = httpParams.set('endDate', formattedEndDate);
      }
    }
    
    console.log('httpparams: ', httpParams)
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
