export interface ExpensesQueryParams {
  pageSize?: number;
  page?: number;
  startDate?: Date | null;
  endDate?: Date | null;
}