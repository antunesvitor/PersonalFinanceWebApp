export interface ExpenseWS {
  id: number;
  value: number;
  date: string;
  description: string;
  groupId: number | null;
  groupName: string;
}

export class Expense {
  id: number;
  value: number;
  date: Date;
  description: string;
  groupId: number | null;
  groupName: string;

  constructor(expenseWS: ExpenseWS) {
    this.id = expenseWS.id;
    this.value = expenseWS.value;
    this.date = new Date(expenseWS.date);
    this.description = expenseWS.description;
    this.groupId = expenseWS.groupId;
    this.groupName = expenseWS.groupName;
  }
}