// Array to store transactions dynamically (Expenses, Savings, Investments)
let transactions = [];

// DOM Elements for summary and form
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const transactionForm = document.getElementById('transaction-form');
const totalExpensesDiv = document.getElementById('total-expenses');
const totalSavingsDiv = document.getElementById('total-savings');
const totalIncomeDiv = document.getElementById('total-income');
const totalInvestmentsDiv = document.getElementById('total-investments');

// Event listener for form submission (Cost Calculator Form)
transactionForm.addEventListener('submit', function (e) {
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
    if (category !== 'expenses' && category !== 'savings' && category !== 'income' && category !== 'investments') {
        alert('Please select a valid category: "expenses", "income", "savings", or "investments".');
        return;
    }

    // Create a transaction object
    const transaction = {
        amount,
        category,
        description,
        month: new Date().toLocaleString('default', { month: 'long' }) // Get the current month
    };

    // Add transaction to the array
    transactions.push(transaction);

    // Update financial summary
    updateSummary();

    // Update Spending Trends Graph
    updateSpendingTrendsChart();

    // Clear the form
    transactionForm.reset();
});

// Function to update total expenses, savings, income, investments
function updateSummary() {
    let totalExpenses = 0;
    let totalSavings = 0;
    let totalIncome = 0;
    let totalInvestments = 0;

    // Loop through transactions and calculate totals
    transactions.forEach(transaction => {
        if (transaction.category === 'expenses') {
            totalExpenses += transaction.amount;
        } else if (transaction.category === 'savings') {
            totalSavings += transaction.amount;
        } else if (transaction.category === 'income') {
            totalIncome += transaction.amount;
        } else if (transaction.category === 'investments') {
            totalInvestments += transaction.amount;
        }
    });

    // Update the displayed summary
    totalExpensesDiv.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
    totalSavingsDiv.textContent = `Total Savings: $${totalSavings.toFixed(2)}`;
    totalIncomeDiv.textContent = `Total Income: $${totalIncome.toFixed(2)}`;
    totalInvestmentsDiv.textContent = `Total Investments: $${totalInvestments.toFixed(2)}`;
}

// Function to update the Spending Trends Graph
function updateSpendingTrendsChart() {
    const months = transactions.map(transaction => transaction.month);
    const expenses = transactions.filter(t => t.category === 'expenses').map(t => t.amount);
    const savings = transactions.filter(t => t.category === 'savings').map(t => t.amount);
    const investments = transactions.filter(t => t.category === 'investments').map(t => t.amount);

    const ctx = document.getElementById('spendingTrendsChart').getContext('2d');
    const spendingTrendsChart = new Chart(ctx, {
        type: 'line', // You can also use 'bar' for bar charts
        data: {
            labels: months,
            datasets: [{
                label: 'Expenses',
                data: expenses,
                borderColor: '#FF5733', // Red for expenses
                fill: false,
                tension: 0.1
            },
            {
                label: 'Savings',
                data: savings,
                borderColor: '#35A29F', // Green for savings
                fill: false,
                tension: 0.1
            },
            {
                label: 'Investments',
                data: investments,
                borderColor: '#97FEED', // Light blue for investments
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
