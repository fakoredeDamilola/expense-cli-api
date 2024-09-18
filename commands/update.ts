import { Command } from "commander";
import { updateExpenseDetails, updateExpenseFile } from "../services/service";
import { parseNumber } from "../utils/functions";

export const updateCommand = new Command("update")
  .description("Update an existing expense")
  .option("-i, --id <ID>", "Expense ID")
  .option("-d, --description <description>", "Expense Description")
  .option("-a, --amount <amount>", "Expense Amount")
  .action((options) => {
    const id = parseNumber(options.id);
    const amount = parseNumber(options.amount);
    const updateExpense = updateExpenseDetails({ ...options, id, amount });
    if (updateExpense) {
      updateExpenseFile(updateExpense);
    }
  });
