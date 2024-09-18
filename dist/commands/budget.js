"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetCommand = void 0;
const commander_1 = require("commander");
const functions_1 = require("../utils/functions");
const service_1 = require("../services/service");
exports.budgetCommand = new commander_1.Command("budget")
    .description("Add a new budget")
    .option("-m, --month <month>", "Budget Month")
    .option("-a, --amount <amount>", "Budget Amount")
    .action((options) => {
    try {
        if (!options.amount || !options.month) {
            throw new Error("Amount and Month is needed");
        }
        const amount = (0, functions_1.parseNumber)(options.amount);
        const budget = (0, service_1.addBudgetDetails)({ ...options, amount });
        const newBudget = (0, service_1.addBudgetToFile)(budget);
        console.log(`Budget added successfully (ID:${newBudget.id})`);
    }
    catch (err) {
        console.error(err);
    }
});
