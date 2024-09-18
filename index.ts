#!/usr/bin/env node

import { Command } from "commander";
import { addCommand } from "./commands/add";
import { updateCommand } from "./commands/update";
import { deleteCommand } from "./commands/delete";
import { listCommand } from "./commands/list";
import { summaryCommand } from "./commands/summary";
import { budgetCommand } from "./commands/budget";

const program = new Command();

program
  .name("expense-tracker-cli")
  .description("A simple expense tracker")
  .version("1.0.0");

program.addCommand(addCommand);
program.addCommand(updateCommand);
program.addCommand(deleteCommand);
program.addCommand(listCommand);
program.addCommand(summaryCommand);
program.addCommand(budgetCommand);

program.parse(process.argv);
