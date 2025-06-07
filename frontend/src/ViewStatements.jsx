import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { X, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import irisBg from "./assets/iris-bg.jpg";

const ViewStatements = ({ transactions, onClose }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm sm:max-w-xl md:max-w-4xl bg-black/40 border-white/10 text-white shadow-2xl relative">
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg">
          <img
            src={irisBg}
            alt="background"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95" />
        </div>

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 sm:pb-6 px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Transaction Statements
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-white/10 h-8 w-8 sm:h-9 sm:w-9"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </Button>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {loading ? (
            <div className="flex justify-center items-center h-48 sm:h-64">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <ScrollArea className="h-[400px] sm:h-[500px] pr-2 sm:pr-4">
              {transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-gray-400">
                  <p className="text-base sm:text-lg">No transactions found.</p>
                  <p className="text-sm">Please try again later.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow>
                      <TableHead className="text-gray-400 text-xs sm:text-sm">Date</TableHead>
                      <TableHead className="text-gray-400 text-xs sm:text-sm">
                        Description
                      </TableHead>
                      <TableHead className="text-gray-400 text-right text-xs sm:text-sm">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction, index) => (
                      <TableRow
                        key={index}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <TableCell className="text-gray-300 text-xs sm:text-sm">
                          {format(new Date(transaction.date), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="text-gray-300 text-xs sm:text-sm">
                          {transaction.description}
                        </TableCell>
                        <TableCell
                          className={`text-right font-medium text-xs sm:text-sm ${
                            transaction.amount > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          <div className="flex items-center justify-end gap-1">
                            {transaction.amount > 0 ? (
                              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            )}
                            ₹
                            {Math.abs(transaction.amount).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

ViewStatements.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewStatements;
