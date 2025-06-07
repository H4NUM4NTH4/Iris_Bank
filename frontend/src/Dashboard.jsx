import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Send,
  Receipt,
  PieChart,
  CreditCard,
  ArrowDownRight,
} from "lucide-react";
import TransferMoneyModal from "./TransferMoneyModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewStatements from "./ViewStatements";
import { Link } from "react-router-dom";
import { User, Settings } from "lucide-react";
import NavBar from "./Navbar";
// Import the iris image (place it in src/assets/iris-bg.jpg or similar)
import irisBg from "./assets/iris-bg.jpg";

function Dashboard() {
  const initialBalance = 10000.0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStatements, setShowStatements] = useState(false);
  const [balance, setBalance] = useState(initialBalance);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);

    const storedBalance = parseFloat(localStorage.getItem("balance"));
    const lastResetTimestamp = localStorage.getItem("lastReset");

    if (lastResetTimestamp) {
      const elapsedTime = Date.now() - lastResetTimestamp;
      if (elapsedTime >= 24 * 60 * 60 * 1000) {
        setBalance(initialBalance);
        setTransactions([]);
        localStorage.setItem("transactions", JSON.stringify([]));
        localStorage.setItem("balance", initialBalance.toFixed(2));
        localStorage.setItem("lastReset", Date.now());
      } else if (!isNaN(storedBalance)) {
        setBalance(storedBalance);
      }
    } else {
      localStorage.setItem("lastReset", Date.now());
    }
  }, []);

  const updateLocalStorage = (updatedTransactions, newBalance) => {
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    localStorage.setItem("balance", newBalance.toFixed(2));
  };

  const handleTransferClick = () => {
    setLoading(false);
    setIsModalOpen(true);
  };

  const handleViewStatements = () => {
    setShowStatements(true);
    setIsModalOpen(false);
  };

  const handleTransfer = (formData) => {
    const { receiverName, amount } = formData;
    const transferAmount = parseFloat(amount);

    if (transferAmount > balance) {
      toast.error("Insufficient balance for this transfer.");
      return;
    }

    setLoading(true);

    const newBalance = balance - transferAmount;
    setBalance(newBalance);

    const newTransaction = {
      description: `Transfer to ${receiverName}`,
      amount: `-₹${transferAmount.toFixed(2)}`,
      date: new Date().toLocaleString(),
    };

    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);

    updateLocalStorage(updatedTransactions, newBalance);

    setLoading(false);
  };

  const closeModalAfterToast = () => {
    setTimeout(() => {
      setIsModalOpen(false);
      setShowStatements(false);
    }, 2000);
  };

  return (
    <div
      className="min-h-screen w-full relative text-white font-poppins flex flex-col"
      style={{
        backgroundImage: `url(${irisBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Iris background image with black gradient overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Add NavBar at the top */}
      <NavBar
        onTransferMoney={handleTransferClick}
        onViewStatements={handleViewStatements}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {/* Main Account Balance Card */}
        <Card className="md:col-span-2 bg-black/30 backdrop-blur-sm border-gray-800/50 shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle>
              <div className="space-y-1">
                <div className="text-gray-400 text-base sm:text-lg font-semibold">
                  Account Balance
                </div>
                <div className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight mt-2">
                  ₹
                  {balance.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8">
            {/* Monthly Spending Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">Monthly Spending</span>
                <span className="text-gray-300 font-semibold">
                  ₹3,240.50 / ₹5,000
                </span>
              </div>
              <Progress value={65} className="h-2 sm:h-3 bg-gray-700" />
            </div>
            {/* Savings Goal Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">Savings Goal</span>
                <span className="text-gray-300 font-semibold">
                  ₹8,500 / ₹10,000
                </span>
              </div>
              <Progress value={85} className="h-2 sm:h-3 bg-gray-700" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="bg-black/30 backdrop-blur-sm border-gray-800/50 shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white text-base sm:text-lg font-semibold">
              Quick Actions
            </CardTitle>
            <p className="text-xs sm:text-sm text-gray-300/90">Common banking tasks</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={handleTransferClick}
                className="w-full h-24 sm:h-28 flex flex-col items-center justify-center gap-1 sm:gap-2 p-3 sm:p-4 border-gray-700 bg-gray-800/80 hover:bg-blue-600/20 hover:border-blue-500 transition rounded-xl group"
              >
                <div className="p-1.5 sm:p-2 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition">
                  <Send className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-center text-blue-400">
                  Send Money
                </span>
              </Button>

              {/* Pay Bills */}
              <Button
                variant="outline"
                className="w-full h-24 sm:h-28 flex flex-col items-center justify-center gap-1 sm:gap-2 p-3 sm:p-4 border-gray-700 bg-gray-800/80 hover:bg-green-600/20 hover:border-green-500 transition rounded-xl group"
              >
                <div className="p-1.5 sm:p-2 rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition">
                  <Receipt className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-center text-green-400">
                  Pay Bills
                </span>
              </Button>

              {/* Investments */}
              <Button
                variant="outline"
                className="w-full h-24 sm:h-28 flex flex-col items-center justify-center gap-1 sm:gap-2 p-3 sm:p-4 border-gray-700 bg-gray-800/80 hover:bg-purple-600/20 hover:border-purple-500 transition rounded-xl group"
              >
                <div className="p-1.5 sm:p-2 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition">
                  <PieChart className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-center text-purple-400">
                  Investments
                </span>
              </Button>

              {/* Cards */}
              <Button
                variant="outline"
                className="w-full h-24 sm:h-28 flex flex-col items-center justify-center gap-1 sm:gap-2 p-3 sm:p-4 border-gray-700 bg-gray-800/80 hover:bg-orange-600/20 hover:border-orange-500 transition rounded-xl group"
              >
                <div className="p-1.5 sm:p-2 rounded-full bg-orange-500/20 group-hover:bg-orange-500/30 transition">
                  <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-center text-orange-400">
                  Cards
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions Card */}
        <Card className="md:col-span-3 bg-black/30 backdrop-blur-sm border-gray-800/50 shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white text-base sm:text-lg font-semibold">
              Recent Transactions
            </CardTitle>
            <p className="text-xs sm:text-sm text-gray-300/90">Your latest financial activity</p>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <div className="space-y-4">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="bg-gray-800/50 rounded-lg p-1 sm:p-1.5">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-300 hover:text-white rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="income"
                      className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-300 hover:text-white rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm"
                    >
                      Income
                    </TabsTrigger>
                    <TabsTrigger
                      value="expenses"
                      className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-300 hover:text-white rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm"
                    >
                      Expenses
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-3">
                  {transactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.amount.startsWith('-') 
                            ? 'bg-red-500/20' 
                            : 'bg-green-500/20'
                        }`}>
                          <ArrowDownRight className={`h-4 w-4 ${
                            transaction.amount.startsWith('-') 
                              ? 'text-red-400' 
                              : 'text-green-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-400">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <span className={`text-sm font-semibold ${
                        transaction.amount.startsWith('-') 
                          ? 'text-red-400' 
                          : 'text-green-400'
                      }`}>
                        {transaction.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">No transactions yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {isModalOpen && (
        <TransferMoneyModal
          onClose={() => setIsModalOpen(false)}
          onTransfer={handleTransfer}
          loading={loading}
        />
      )}

      {showStatements && (
        <ViewStatements
          onClose={() => setShowStatements(false)}
          transactions={transactions}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Dashboard;
