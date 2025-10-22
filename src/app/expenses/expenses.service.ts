import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpensesQueryParams } from './Models/ExpensesQueryParams';
import { PaginatedExpensesResponse } from './Models/PaginatedExpensesResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private apiUrl = 'http://localhost:5294/api/expenses';

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

    return this.http.get<PaginatedExpensesResponse>(this.apiUrl, { params: httpParams });
  }
}
