import { Command } from "commander";
import { getAllExpenses } from "../services/service";
import { logDataToConsole, createCSVFile } from "../utils/functions";

export const listCommand = new Command("list")
  .description("List all expenses")
  .option("-m, --month <month>", "Expense month")
  .option("-c, --category <category>", "Expense Category")
  .option("-csv, --csv", "Export to CSV")
  .action((options) => {
    const expenses = getAllExpenses(options.month, options.category);
    if (options.csv) {
      createCSVFile(expenses);
    } else {
      logDataToConsole(expenses);
    }
  });
