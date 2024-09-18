import { IExpense } from "../interfaces/IExpense";
import {
  addExpenseDetails,
  addExpenseToFile,
  updateExpenseDetails,
} from "./service";
import fs from "fs";
jest.mock("fs");

describe("Expense Management function", () => {
  test(" The add Expense Details", () => {
    const options = {
      description: "This is a test",
      amount: 10,
    };
    const newExpense = addExpenseDetails(options);

    expect(newExpense.amount).toBe(options.amount);
    expect(newExpense).toHaveProperty("id");
    expect(newExpense).toHaveProperty("createdAt");
    expect(newExpense).toHaveProperty("updatedAt");
  });
  describe("addExpenseToFile", () => {
    const mockExpense: IExpense = {
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
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));
      (fs.writeFileSync as jest.Mock).mockImplementation();

      const result = addExpenseToFile(mockExpense);

      expect(fs.existsSync).toHaveBeenCalledTimes(1);
      expect(fs.existsSync).toHaveBeenCalledWith(
        expect.stringContaining(mockFilePath)
      );

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining(mockFilePath),
        JSON.stringify([])
      );
      expect(result).toEqual({ ...mockExpense, id: 1 });
    });
    it("should append the expense to an existing file", () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      const existingData: IExpense[] = [
        {
          description: "Breakfast",
          amount: 10,
          createdAt: "2023-09-17",
          updatedAt: "2023-09-17",
          id: 1,
        },
      ];
      (fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(existingData)
      );

      (fs.writeFileSync as jest.Mock).mockImplementation();

      const result = addExpenseToFile(mockExpense);

      expect(fs.writeFileSync).not.toHaveBeenCalledWith(
        expect.stringContaining("expenses.json"),
        JSON.stringify([])
      );

      const updatedData = [...existingData, { ...mockExpense, id: 2 }];
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("expenses.json"),
        JSON.stringify(updatedData, null, 2)
      );

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

      (fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(initialExpenses)
      );

      const updatedExpense = updateExpenseDetails({
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
