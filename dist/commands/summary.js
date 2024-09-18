"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summaryCommand = void 0;
const commander_1 = require("commander");
const service_1 = require("../services/service");
const functions_1 = require("../utils/functions");
exports.summaryCommand = new commander_1.Command("summary")
    .description("Summary of expenses")
    .option("-m, --month <month>", "Expense month")
    .option("-c, --category <category>", "Expense Category")
    .action((options) => {
    const expenses = (0, service_1.getAllExpenses)(options.month, options.category);
    const totalAmount = (0, functions_1.getExpenseSummary)(expenses);
    if (!options.month) {
        console.log(`Total expenses: $${totalAmount}`);
    }
    else {
        const month = (0, functions_1.getMonthName)(options.month);
        console.log(`Total expenses for ${month}: $${totalAmount}`);
    }
});
