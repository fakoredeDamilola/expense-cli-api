import { Command } from "commander";
import { parseNumber } from "../utils/functions";
import { addBudgetDetails, addBudgetToFile } from "../services/service";
import { IBudget } from "../interfaces/IBudget";

export const budgetCommand = new Command("budget")
  .description("Add a new budget")
  .option("-m, --month <month>", "Budget Month")
  .option("-a, --amount <amount>", "Budget Amount")
  .action((options) => {
    try {
      if (!options.amount || !options.month) {
        throw new Error("Amount and Month is needed");
      }
      const amount = parseNumber(options.amount);

      const budget = addBudgetDetails({ ...options, amount });

      const newBudget: unknown = addBudgetToFile(budget);

      console.log(
        `Budget added successfully (ID:${(newBudget as IBudget).id})`
      );
    } catch (err) {
      console.error(err);
    }
  });
