"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastID = getLastID;
exports.checkFileExistOrCreate = checkFileExistOrCreate;
exports.readDataFromFile = readDataFromFile;
exports.writeDataToFile = writeDataToFile;
exports.findExpenseByID = findExpenseByID;
exports.parseNumber = parseNumber;
exports.logDataToConsole = logDataToConsole;
exports.getExpenseSummary = getExpenseSummary;
exports.getMonthName = getMonthName;
exports.createNewEntryInFile = createNewEntryInFile;
exports.getMonthNumber = getMonthNumber;
exports.createCSVFile = createCSVFile;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const csv_writer_1 = require("csv-writer");
const createFilePath = (file) => {
    return path_1.default.join(__dirname, `../data/${file}`);
};
function checkFileExistOrCreate(file, type = "json") {
    if (!fs_1.default.existsSync(createFilePath(file))) {
        if (type === "json") {
            fs_1.default.writeFileSync(createFilePath(file), JSON.stringify([]));
        }
        else {
            fs_1.default.writeFileSync(createFilePath(file), "");
        }
    }
    return true;
}
function getLastID(data) {
    const lastId = data[data.length - 1]?.id ?? 0;
    return lastId + 1;
}
function readDataFromFile(file) {
    return JSON.parse(fs_1.default.readFileSync(createFilePath(file), "utf8"));
}
function writeDataToFile(file, data) {
    fs_1.default.writeFileSync(createFilePath(file), JSON.stringify(data, null, 2));
}
function findExpenseByID(data, id) {
    const expense = data.find((expense) => expense.id === id);
    return expense;
}
function parseNumber(input) {
    const id = Number(input);
    if (isNaN(id)) {
        throw new Error(`Invalid value provided: ${input}. value must be a number.`);
    }
    return id;
}
function logDataToConsole(expenses) {
    const formattedExpenses = expenses.map((expense) => ({
        id: expense.id,
        description: expense.description,
        amount: `$${expense.amount}`,
    }));
    console.table(formattedExpenses);
}
function getExpenseSummary(expenses) {
    const totalAmount = expenses.reduce((acc, expense) => acc + (expense.amount ?? 0), 0);
    return totalAmount;
}
function createCSVFile(expenses) {
    checkFileExistOrCreate("expenses.csv");
    const formatExpense = expenses.map((expense) => ({
        ...expense,
        amount: `$${expense.amount}`,
        createdAt: formatDate(expense.createdAt),
        updatedAt: formatDate(expense.updatedAt),
    }));
    const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
        path: createFilePath("expenses.csv"),
        header: [
            { id: "id", title: "ID" },
            { id: "description", title: "Description" },
            { id: "amount", title: "Amount" },
            { id: "createdAt", title: "Created At" },
            { id: "updatedAt", title: "Updated At" },
            { id: "category", title: "Category" },
        ],
    });
    csvWriter.writeRecords(formatExpense).then(() => {
        console.log("successfully created CSV");
    });
}
function getMonthName(month) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const monthIndex = parseInt(month) - 1;
    return months[monthIndex];
}
function getMonthNumber(month) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return months.findIndex((value) => value.toLowerCase() === month.toLowerCase());
}
function createNewEntryInFile(file, entry) {
    const data = readDataFromFile(file);
    const id = getLastID(data);
    const newEntry = { ...entry, id };
    data.push(newEntry);
    writeDataToFile(file, data);
    return newEntry;
}
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
}
