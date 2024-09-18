"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommand = void 0;
const commander_1 = require("commander");
const service_1 = require("../services/service");
const functions_1 = require("../utils/functions");
exports.updateCommand = new commander_1.Command("update")
    .description("Update an existing expense")
    .option("-i, --id <ID>", "Expense ID")
    .option("-d, --description <description>", "Expense Description")
    .option("-a, --amount <amount>", "Expense Amount")
    .action((options) => {
    const id = (0, functions_1.parseNumber)(options.id);
    const amount = (0, functions_1.parseNumber)(options.amount);
    const updateExpense = (0, service_1.updateExpenseDetails)({ ...options, id, amount });
    if (updateExpense) {
        (0, service_1.updateExpenseFile)(updateExpense);
    }
});
