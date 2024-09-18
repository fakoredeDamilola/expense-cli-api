#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const add_1 = require("./commands/add");
const update_1 = require("./commands/update");
const delete_1 = require("./commands/delete");
const list_1 = require("./commands/list");
const summary_1 = require("./commands/summary");
const budget_1 = require("./commands/budget");
const program = new commander_1.Command();
program
    .name("expense-tracker-cli")
    .description("A simple expense tracker")
    .version("1.0.0");
program.addCommand(add_1.addCommand);
program.addCommand(update_1.updateCommand);
program.addCommand(delete_1.deleteCommand);
program.addCommand(list_1.listCommand);
program.addCommand(summary_1.summaryCommand);
program.addCommand(budget_1.budgetCommand);
program.parse(process.argv);
