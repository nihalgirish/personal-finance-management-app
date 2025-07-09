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
    let category = categoryInput.value.trim().toLowerCase(); // Normalize input
    const description = descriptionInput.value;

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive amount.');
        return;
    }

    // Normalize categories to handle plural/singular cases
    if (category === 'saving') {
        category = 'savings';
    } else if (category === 'expense') {
        category = 'expenses';
    }

    // Validate category
    if (category !== 'expenses' && category !== 'savings') {
        alert('Please select a valid category: "expenses" or "savings".');
        return;
    }

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
        if (transaction.category === 'expenses') {
            totalExpenses += transaction.amount;
        } else if (transaction.category === 'savings') {
            totalSavings += transaction.amount;
        }
    });

    // Update the displayed summary
    totalExpensesDiv.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
    totalSavingsDiv.textContent = `Total Savings: $${totalSavings.toFixed(2)}`;
}
