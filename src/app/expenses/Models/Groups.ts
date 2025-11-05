import { Expense } from "./Expense";

export class Group{
    id: number;
    name: string;
    expenses?: Expense[];

    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
    }
}