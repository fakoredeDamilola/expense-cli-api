import { IAddOptions } from "../interfaces/IAddOptions";
import { IBudget } from "../interfaces/IBudget";
import { IBudgetOptions } from "../interfaces/IBudgetOptions";
import { IExpense } from "../interfaces/IExpense";
import {
  checkFileExistOrCreate,
  createNewEntryInFile,
  findExpenseByID,
  getMonthNumber,
  readDataFromFile,
  writeDataToFile,
} from "../utils/functions";

const addExpenseDetails = (options: IAddOptions) => {
  const newExpense = {
    id: 1,
    description: options.description,
    amount: options.amount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: options.category,
  };
  return newExpense;
};

const addExpenseToFile = (expense: IExpense) => {
  const file = "expenses.json";
  checkFileExistOrCreate(file);
  return createNewEntryInFile(file, expense);
};

const updateExpenseDetails = (options: IAddOptions) => {
  const expenseData = readDataFromFile("expenses.json");
  const findExpense = findExpenseByID(expenseData, options?.id);

  if (findExpense) {
    findExpense.description = options.description;
    findExpense.amount = options.amount;
    findExpense.updatedAt = new Date().toISOString();
    return findExpense;
  }
};

const updateExpenseFile = (expense: IExpense) => {
  const file = "expenses.json";
  const expenseData = readDataFromFile(file);
  const expenseIndex = expenseData.findIndex(
    (exp: IExpense) => exp.id === expense.id
  );
  expenseData.splice(expenseIndex, 1, expense);
  writeDataToFile(file, expenseData);
};

const deleteExpense = (id: number) => {
  const file = "expenses.json";
  const expenseData = readDataFromFile(file);
  const expenseIndex = expenseData.findIndex((exp: IExpense) => exp.id === id);
  expenseData.splice(expenseIndex, 1);
  writeDataToFile(file, expenseData);
};

const getAllExpenses = (month?: string, category?: string) => {
  const expenses = readDataFromFile("expenses.json");
  if (!month && !category) {
    return expenses;
  } else {
    let filteredExpenses = expenses;
    if (category) {
      filteredExpenses = filteredExpenses.filter(
        (expense: IExpense) => expense.category === category
      );
    }
    if (month) {
      filteredExpenses = filteredExpenses.filter(
        (expense: IExpense) =>
          new Date(expense.updatedAt).getMonth() + 1 === parseInt(month)
      );
    }

    return filteredExpenses;
  }
};

const addBudgetDetails = (options: IBudgetOptions) => {
  const newBudget = {
    id: 1,
    amount: options.amount,
    month: options.month,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newBudget;
};

const addBudgetToFile = (budget: IBudget) => {
  const file = "budget.json";
  checkFileExistOrCreate(file);
  return createNewEntryInFile(file, budget);
};

const budgetExist = (createdAt: string) => {
  checkFileExistOrCreate("budget.json");
  const budgetData = readDataFromFile("budget.json");
  const findBudget = budgetData.find((budget: IBudget) => {
    const budgetMonthNo = getMonthNumber(budget.month);
    return new Date(createdAt).getMonth() === budgetMonthNo;
  });
  return findBudget;
};

export {
  addExpenseDetails,
  addExpenseToFile,
  updateExpenseDetails,
  updateExpenseFile,
  deleteExpense,
  getAllExpenses,
  addBudgetDetails,
  addBudgetToFile,
  budgetExist,
};
