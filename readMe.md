Here is your README file written in Markdown:


# Expense Tracker CLI

## Overview

The **Expense Tracker CLI** is a simple command-line tool for managing and tracking expenses. It allows users to add, update, delete, list expenses, view a summary, and set a budget, all from the terminal.

## Features

- **Add Expense**: Add new expenses with details such as amount, description, and category.
- **Update Expense**: Modify existing expenses.
- **Delete Expense**: Remove an expense by its ID.
- **List Expenses**: Display a list of all recorded expenses.
- **Summary**: View a summary of total expenses categorized by type.
- **Set Budget**: Define a budget and track how expenses measure up to the set budget.

## Prerequisites

- Node.js (version 14.x or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/expense-tracker-cli.git
   cd expense-tracker-cli
   ```


2. Install dependencies:

   ```bash
   npm install
   ```

3. Make the CLI executable globally (optional):

   ```bash
   npm link
   ```

## Usage

Once installed, you can use the `expense-tracker-cli` to manage your expenses.

### Commands

1. **Add an expense:**

   ```bash
   expense-tracker-cli add --amount 50 --description "Lunch" --category "Food"
   ```

2. **Update an expense:**

   ```bash
   expense-tracker-cli update --id 1 --amount 60 --description "Dinner"
   ```

3. **Delete an expense:**

   ```bash
   expense-tracker-cli delete --id 1
   ```

4. **List all expenses:**

   ```bash
   expense-tracker-cli list
   ```

5. **View expense summary:**

   ```bash
   expense-tracker-cli summary
   ```

6. **Set a budget:**

   ```bash
   expense-tracker-cli budget --amount 1000
   ```

### Options

- `--amount`: Specify the amount for an expense or budget.
- `--description`: Provide a short description for an expense.
- `--category`: Define a category for the expense (e.g., Food, Transport, etc.).
- `--id`: Reference an expense by its ID for update or deletion.
