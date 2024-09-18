"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommand = void 0;
const commander_1 = require("commander");
const service_1 = require("../services/service");
const functions_1 = require("../utils/functions");
exports.addCommand = new commander_1.Command("add")
    .description("Add a new expense")
    .option("-d, --description <description>", "Expense Description")
    .option("-a, --amount <amount>", "Expense Amount")
    .option("-c, --category <category>", "Expense Category")
    .action((options) => {
    try {
        const amount = (0, functions_1.parseNumber)(options.amount);
        if (!options.description) {
            throw new Error("Description is required");
        }
        const expense = (0, service_1.addExpenseDetails)({ ...options, amount });
        const budgetDetails = (0, service_1.budgetExist)(expense.createdAt);
        if (budgetDetails) {
            const expenses = (0, service_1.getAllExpenses)(`${new Date(expense.createdAt).getMonth() + 1}`);
            const totalAmount = (0, functions_1.getExpenseSummary)(expenses) + amount;
            if (totalAmount > budgetDetails.amount) {
                console.log(`Cannot add new expense to this month, because total expenses for the month ${totalAmount} is greater than the budget ${budgetDetails.amount} for the month`);
            }
            else {
                const newExpense = (0, service_1.addExpenseToFile)(expense);
                console.log(`Expense added successfully (ID:${newExpense.id})`);
            }
        }
        else {
            const newExpense = (0, service_1.addExpenseToFile)(expense);
            console.log(`Expense added successfully (ID:${newExpense.id})`);
        }
    }
    catch (err) {
        console.error(err);
    }
});
