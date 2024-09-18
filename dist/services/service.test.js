"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./service");
const fs_1 = __importDefault(require("fs"));
jest.mock("fs");
describe("Expense Management function", () => {
    test(" The add Expense Details", () => {
        const options = {
            description: "This is a test",
            amount: 10,
        };
        const newExpense = (0, service_1.addExpenseDetails)(options);
        expect(newExpense.amount).toBe(options.amount);
        expect(newExpense).toHaveProperty("id");
        expect(newExpense).toHaveProperty("createdAt");
        expect(newExpense).toHaveProperty("updatedAt");
    });
    describe("addExpenseToFile", () => {
        const mockExpense = {
            description: "Lunch",
            amount: 15.99,
            createdAt: "2024-09-18",
            updatedAt: "2024-09-18",
        };
        const mockFilePath = "expenses.json";
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should check if the file exists and create it if it doesn't", () => {
            fs_1.default.existsSync.mockReturnValue(false);
            fs_1.default.readFileSync.mockReturnValue(JSON.stringify([]));
            fs_1.default.writeFileSync.mockImplementation();
            const result = (0, service_1.addExpenseToFile)(mockExpense);
            expect(fs_1.default.existsSync).toHaveBeenCalledTimes(1);
            expect(fs_1.default.existsSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath));
            expect(fs_1.default.writeFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), JSON.stringify([]));
            expect(result).toEqual({ ...mockExpense, id: 1 });
        });
        it("should append the expense to an existing file", () => {
            fs_1.default.existsSync.mockReturnValue(true);
            const existingData = [
                {
                    description: "Breakfast",
                    amount: 10,
                    createdAt: "2023-09-17",
                    updatedAt: "2023-09-17",
                    id: 1,
                },
            ];
            fs_1.default.readFileSync.mockReturnValue(JSON.stringify(existingData));
            fs_1.default.writeFileSync.mockImplementation();
            const result = (0, service_1.addExpenseToFile)(mockExpense);
            expect(fs_1.default.writeFileSync).not.toHaveBeenCalledWith(expect.stringContaining("expenses.json"), JSON.stringify([]));
            const updatedData = [...existingData, { ...mockExpense, id: 2 }];
            expect(fs_1.default.writeFileSync).toHaveBeenCalledWith(expect.stringContaining("expenses.json"), JSON.stringify(updatedData, null, 2));
            expect(result).toEqual({ ...mockExpense, id: 2 });
        });
    });
    describe("updateExpenseDetails", () => {
        it("updates the expense details correctly", () => {
            const id = 1;
            const initialExpenses = [
                {
                    id: 1,
                    description: "Breakfast",
                    amount: 40,
                    createdAt: "2024-09-17",
                    updatedAt: expect.any(String),
                },
            ];
            fs_1.default.readFileSync.mockReturnValue(JSON.stringify(initialExpenses));
            const updatedExpense = (0, service_1.updateExpenseDetails)({
                id,
                description: "Bread",
                amount: 50,
            });
            // Ensure that the expense was updated correctly
            expect(updatedExpense?.description).toBe("Bread");
            expect(updatedExpense?.amount).toBe(50);
            expect(updatedExpense?.updatedAt).not.toBe(initialExpenses[0]?.updatedAt);
        });
    });
});
