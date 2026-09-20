let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const form = document.getElementById("expenseForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("expenseName").value;
    const amount = Number(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;

    const expense = {
    id: Date.now(),
    name: name,
    amount: amount,
    category: category,
};

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    form.reset();

    updateDisplay();

    showPage("history");
});


function updateDisplay() {

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    document.getElementById("totalExpense").textContent =
        "₹" + total;

    document.getElementById("historyTotal").textContent =
        total;

    document.getElementById("expenseCount").textContent =
        expenses.length;

    displayExpenses();
}


function displayExpenses() {

    const list = document.getElementById("expenseList");

    list.innerHTML = "";

    if (expenses.length === 0) {

        list.innerHTML =
            "<p style='text-align:center;color:#64748b;'>No expenses yet.</p>";

        return;
    }

    expenses.forEach(function(expense) {

        const item = document.createElement("div");

        item.className = "expense-item";

        item.innerHTML = `
            <div class="expense-info">
                <h3>${expense.name}</h3>
                <p>${expense.category}</p>
            </div>

            <div>
                <span class="amount">
                    ₹${expense.amount}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </div>
        `;

        list.appendChild(item);
    });
}


function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    updateDisplay();
}


function showPage(pageName) {

    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("add").classList.add("hidden");
    document.getElementById("history").classList.add("hidden");

    document.getElementById(pageName).classList.remove("hidden");

    updateDisplay();
}


updateDisplay();