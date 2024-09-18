import path from "path";
import { IExpense } from "../interfaces/IExpense";
import fs from "fs";
import { IBudget } from "../interfaces/IBudget";
import { createObjectCsvWriter } from "csv-writer";

const createFilePath = (file: string) => {
  return path.join(__dirname, `../data/${file}`);
};

function checkFileExistOrCreate(file: string, type: "json" | "csv" = "json") {
  if (!fs.existsSync(createFilePath(file))) {
    if (type === "json") {
      fs.writeFileSync(createFilePath(file), JSON.stringify([]));
    } else {
      fs.writeFileSync(createFilePath(file), "");
    }
  }
  return true;
}

function getLastID(data: IExpense[]) {
  const lastId = data[data.length - 1]?.id ?? 0;
  return lastId + 1;
}

function readDataFromFile(file: string) {
  return JSON.parse(fs.readFileSync(createFilePath(file), "utf8"));
}

function writeDataToFile(file: string, data: IExpense) {
  fs.writeFileSync(createFilePath(file), JSON.stringify(data, null, 2));
}

function findExpenseByID(data: IExpense[], id?: number) {
  const expense = data.find((expense: IExpense) => expense.id === id);

  return expense;
}

function parseNumber(input: string): number | never {
  const id = Number(input);
  if (isNaN(id)) {
    throw new Error(
      `Invalid value provided: ${input}. value must be a number.`
    );
  }
  return id;
}

function logDataToConsole(expenses: IExpense[]) {
  const formattedExpenses = expenses.map((expense: IExpense) => ({
    id: expense.id,
    description: expense.description,
    amount: `$${expense.amount}`,
  }));
  console.table(formattedExpenses);
}

function getExpenseSummary(expenses: IExpense[]) {
  const totalAmount = expenses.reduce(
    (acc, expense) => acc + (expense.amount ?? 0),
    0
  );
  return totalAmount;
}

function createCSVFile(expenses: IExpense[]) {
  checkFileExistOrCreate("expenses.csv");
  const formatExpense = expenses.map((expense: IExpense) => ({
    ...expense,
    amount: `$${expense.amount}`,
    createdAt: formatDate(expense.createdAt),
    updatedAt: formatDate(expense.updatedAt),
  }));

  const csvWriter = createObjectCsvWriter({
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

function getMonthName(month: string) {
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

function getMonthNumber(month: string) {
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
  return months.findIndex(
    (value) => value.toLowerCase() === month.toLowerCase()
  );
}

function createNewEntryInFile(file: string, entry: IExpense | IBudget) {
  const data = readDataFromFile(file);
  const id = getLastID(data);
  const newEntry = { ...entry, id };
  data.push(newEntry);
  writeDataToFile(file, data);
  return newEntry;
}

function formatDate(dateString: string): string {
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

export {
  getLastID,
  checkFileExistOrCreate,
  readDataFromFile,
  writeDataToFile,
  findExpenseByID,
  parseNumber,
  logDataToConsole,
  getExpenseSummary,
  getMonthName,
  createNewEntryInFile,
  getMonthNumber,
  createCSVFile,
};
