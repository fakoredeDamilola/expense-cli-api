"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommand = void 0;
const commander_1 = require("commander");
const functions_1 = require("../utils/functions");
const service_1 = require("../services/service");
exports.deleteCommand = new commander_1.Command("delete")
    .description("Delete an expense")
    .option("-i, --id <id>", "Expense ID to delete")
    .action((options) => {
    const id = (0, functions_1.parseNumber)(options.id);
    (0, service_1.deleteExpense)(id);
});
