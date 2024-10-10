"use client";

interface SpendPage {
  components: {
    // Quick balance overview
    balanceCard: {
      currentBalance: number;
      monthlyIncome: number;
      monthlyExpenses: number;
    };

    // Quick input form for new transactions
    transactionForm: {
      type: "income" | "expense";
      amount: number;
      category: string;
      date: Date;
      note?: string;
    };

    // List of recent transactions
    recentTransactions: {
      limit: 5;
      sortBy: "date";
      order: "desc";
    };

    // Quick actions
    quickActions: {
      categories: [
        "Groceries",
        "Transport",
        "Food",
        "Shopping",
        // Add more common categories
      ];
    };
  };
}

function page() {
  return (
    <div className="p-4 space-y-6">
      {/* Balance Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Current Balance</h2>
          <p className="text-3xl font-bold">$2,459.50</p>
          <div className="flex justify-between text-sm">
            <span>Income: $3,500</span>
            <span>Expenses: $1,040.50</span>
          </div>
        </div>
      </div>

      {/* Quick Input Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add Transaction</h2>
          <div className="form-control">
            <label className="label">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              className="input input-bordered"
            />
          </div>
          <select className="select select-bordered w-full">
            <option disabled selected>
              Category
            </option>
            <option>Groceries</option>
            <option>Transport</option>
            {/* Add more options */}
          </select>
          <button className="btn btn-primary">Add</button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Transactions</h2>
          <div className="divide-y">{/* Transaction items */}</div>
        </div>
      </div>
    </div>
  );
}

export default page;
