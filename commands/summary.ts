import { Command } from "commander";
import { getAllExpenses } from "../services/service";
import { getExpenseSummary, getMonthName } from "../utils/functions";

export const summaryCommand = new Command("summary")
  .description("Summary of expenses")
  .option("-m, --month <month>", "Expense month")
  .option("-c, --category <category>", "Expense Category")
  .action((options) => {
    const expenses = getAllExpenses(options.month, options.category);
    const totalAmount = getExpenseSummary(expenses);
    if (!options.month) {
      console.log(`Total expenses: $${totalAmount}`);
    } else {
      const month = getMonthName(options.month);
      console.log(`Total expenses for ${month}: $${totalAmount}`);
    }
  });
