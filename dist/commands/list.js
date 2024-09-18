"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCommand = void 0;
const commander_1 = require("commander");
const service_1 = require("../services/service");
const functions_1 = require("../utils/functions");
exports.listCommand = new commander_1.Command("list")
    .description("List all expenses")
    .option("-m, --month <month>", "Expense month")
    .option("-c, --category <category>", "Expense Category")
    .option("-csv, --csv", "Export to CSV")
    .action((options) => {
    const expenses = (0, service_1.getAllExpenses)(options.month, options.category);
    if (options.csv) {
        (0, functions_1.createCSVFile)(expenses);
    }
    else {
        (0, functions_1.logDataToConsole)(expenses);
    }
});
