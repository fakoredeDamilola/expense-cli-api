import { Command } from "commander";
import {
  addExpenseDetails,
  addExpenseToFile,
  budgetExist,
  getAllExpenses,
} from "../services/service";
import { getExpenseSummary, parseNumber } from "../utils/functions";
import { IExpense } from "../interfaces/IExpense";

export const addCommand = new Command("add")
  .description("Add a new expense")
  .option("-d, --description <description>", "Expense Description")
  .option("-a, --amount <amount>", "Expense Amount")
  .option("-c, --category <category>", "Expense Category")
  .action((options) => {
    try {
      const amount = parseNumber(options.amount);
      if (!options.description) {
        throw new Error("Description is required");
      }
      const expense = addExpenseDetails({ ...options, amount });

      const budgetDetails = budgetExist(expense.createdAt);
      if (budgetDetails) {
        const expenses = getAllExpenses(
          `${new Date(expense.createdAt).getMonth() + 1}`
        );
        const totalAmount = getExpenseSummary(expenses) + amount;

        if (totalAmount > budgetDetails.amount) {
          console.log(
            `Cannot add new expense to this month, because total expenses for the month ${totalAmount} is greater than the budget ${budgetDetails.amount} for the month`
          );
        } else {
          const newExpense: unknown = addExpenseToFile(expense);
          console.log(
            `Expense added successfully (ID:${(newExpense as IExpense).id})`
          );
        }
      } else {
        const newExpense: unknown = addExpenseToFile(expense);
        console.log(
          `Expense added successfully (ID:${(newExpense as IExpense).id})`
        );
      }
    } catch (err) {
      console.error(err);
    }
  });
