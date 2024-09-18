import { Command } from "commander";
import { parseNumber } from "../utils/functions";
import { deleteExpense } from "../services/service";

export const deleteCommand = new Command("delete")
  .description("Delete an expense")
  .option("-i, --id <id>", "Expense ID to delete")

  .action((options) => {
    const id = parseNumber(options.id);
    deleteExpense(id);
  });
