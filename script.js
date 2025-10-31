const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const addExpenseBtn = document.getElementById("add-expense");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Render all expenses
function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    const div = document.createElement("div");
    div.classList.add("expense-item");
    div.innerHTML = `
      <span>${expense.name}</span>
      <span>₹${expense.amount}</span>
      <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(div);
    total += parseFloat(expense.amount);
  });

  totalAmount.textContent = total.toFixed(2);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Add a new expense
addExpenseBtn.addEventListener("click", () => {
  const name = expenseName.value.trim();
  const amount = expenseAmount.value.trim();

  if (name === "" || amount === "" || amount <= 0) {
    alert("Please enter a valid expense name and amount.");
    return;
  }

  expenses.push({ name, amount });
  expenseName.value = "";
  expenseAmount.value = "";
  renderExpenses();
});

// Delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Initial load
renderExpenses();
