import { Expense, ExpenseWS } from "./Expense";

export interface PaginatedExpensesResponse {
  data: ExpenseWS[];
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
