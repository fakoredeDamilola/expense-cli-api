"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetExist = exports.addBudgetToFile = exports.addBudgetDetails = exports.getAllExpenses = exports.deleteExpense = exports.updateExpenseFile = exports.updateExpenseDetails = exports.addExpenseToFile = exports.addExpenseDetails = void 0;
const functions_1 = require("../utils/functions");
const addExpenseDetails = (options) => {
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
exports.addExpenseDetails = addExpenseDetails;
const addExpenseToFile = (expense) => {
    const file = "expenses.json";
    (0, functions_1.checkFileExistOrCreate)(file);
    return (0, functions_1.createNewEntryInFile)(file, expense);
};
exports.addExpenseToFile = addExpenseToFile;
const updateExpenseDetails = (options) => {
    const expenseData = (0, functions_1.readDataFromFile)("expenses.json");
    const findExpense = (0, functions_1.findExpenseByID)(expenseData, options?.id);
    if (findExpense) {
        findExpense.description = options.description;
        findExpense.amount = options.amount;
        findExpense.updatedAt = new Date().toISOString();
        return findExpense;
    }
};
exports.updateExpenseDetails = updateExpenseDetails;
const updateExpenseFile = (expense) => {
    const file = "expenses.json";
    const expenseData = (0, functions_1.readDataFromFile)(file);
    const expenseIndex = expenseData.findIndex((exp) => exp.id === expense.id);
    expenseData.splice(expenseIndex, 1, expense);
    (0, functions_1.writeDataToFile)(file, expenseData);
};
exports.updateExpenseFile = updateExpenseFile;
const deleteExpense = (id) => {
    const file = "expenses.json";
    const expenseData = (0, functions_1.readDataFromFile)(file);
    const expenseIndex = expenseData.findIndex((exp) => exp.id === id);
    expenseData.splice(expenseIndex, 1);
    (0, functions_1.writeDataToFile)(file, expenseData);
};
exports.deleteExpense = deleteExpense;
const getAllExpenses = (month, category) => {
    const expenses = (0, functions_1.readDataFromFile)("expenses.json");
    if (!month && !category) {
        return expenses;
    }
    else {
        let filteredExpenses = expenses;
        if (category) {
            filteredExpenses = filteredExpenses.filter((expense) => expense.category === category);
        }
        if (month) {
            filteredExpenses = filteredExpenses.filter((expense) => new Date(expense.updatedAt).getMonth() + 1 === parseInt(month));
        }
        return filteredExpenses;
    }
};
exports.getAllExpenses = getAllExpenses;
const addBudgetDetails = (options) => {
    const newBudget = {
        id: 1,
        amount: options.amount,
        month: options.month,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    return newBudget;
};
exports.addBudgetDetails = addBudgetDetails;
const addBudgetToFile = (budget) => {
    const file = "budget.json";
    (0, functions_1.checkFileExistOrCreate)(file);
    return (0, functions_1.createNewEntryInFile)(file, budget);
};
exports.addBudgetToFile = addBudgetToFile;
const budgetExist = (createdAt) => {
    (0, functions_1.checkFileExistOrCreate)("budget.json");
    const budgetData = (0, functions_1.readDataFromFile)("budget.json");
    const findBudget = budgetData.find((budget) => {
        const budgetMonthNo = (0, functions_1.getMonthNumber)(budget.month);
        return new Date(createdAt).getMonth() === budgetMonthNo;
    });
    return findBudget;
};
exports.budgetExist = budgetExist;
