// Array to store transactions
let transactions = [];

// DOM Elements
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const financeForm = document.getElementById('finance-form');
const totalExpensesDiv = document.getElementById('total-expenses');
const totalSavingsDiv = document.getElementById('total-savings');

// Event listener for form submission
financeForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevents page reload

    // Get form values
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;
    const description = descriptionInput.value;

    // Create a transaction object
    const transaction = {
        amount,
        category,
        description,
    };

    // Add transaction to the array
    transactions.push(transaction);

    // Update financial summary
    updateSummary();

    // Clear the form
    financeForm.reset();
});

// Function to update total expenses and savings
function updateSummary() {
    let totalExpenses = 0;
    let totalSavings = 0;

    // Loop through transactions and calculate total expenses/savings
    transactions.forEach(transaction => {
        if (transaction.category.toLowerCase() === 'expense') {
            totalExpenses += transaction.amount;
        } else if (transaction.category.toLowerCase() === 'savings') {
            totalSavings += transaction.amount;
        }
    });

    // Update the displayed summary
    totalExpensesDiv.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
    totalSavingsDiv.textContent = `Total Savings: $${totalSavings.toFixed(2)}`;
}
