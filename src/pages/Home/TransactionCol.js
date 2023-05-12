import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TransactionCard from "../../components/ui/TransactionCard";
import axios from "axios";
import DeleteTransaction from "../../components/form/DeleteTransaction";
import TransactionModal from "../../components/form/TransactionModal";

export default function TransactionCol({
  currUser,
  accessToken,
  setOpenAddTransactionModal,
  openAddTransactionModal,
  date,
  transactions,
  setTransactions,
}) {
  // const [transactions, setTransactions] = useState("");
  const [categories, setCategories] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState("");
  const [deleteTransaction, setDeleteTransaction] = useState("");

  // // get all transactions from the user
  // const getUserTransactionsApi = async () => {
  //   if (accessToken) {
  //     const selectedDate = new Date(date);
  //     const month = selectedDate.getMonth() + 1;
  //     const year = selectedDate.getFullYear();
  //     let user = await axios.get(
  //       `http://localhost:8080/transaction/${currUser.id}/${month}/${year}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     // console.log(user.data);
  //     setTransactions(user.data);
  //   }
  // };

  // get all categories by user
  const getCategoriesApi = async () => {
    if (accessToken) {
      let categories = await axios.get(
        `http://localhost:8080/user/category/${currUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log(categories.data);
      setCategories(categories.data);
    }
  };

  // open edit transaction modal
  const openTransactionModal = (transaction) => {
    setOpenModal(true);
    setEditTransaction(transaction);
    console.log("edit item ", transaction.id);
  };
  // handle edit on transaction
  const handleEdit = async (transactionId, date, name, amount, categoryId) => {
    console.log(transactionId, date, name, amount, categoryId);
    if (accessToken) {
      const selectedDate = new Date(date);
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      let editTransaction = await axios.put(
        `http://localhost:8080/transaction/edit/${currUser.id}/${transactionId}/${month}/${year}`,
        {
          name: name,
          date: new Date(date),
          amount: +amount,
          categoryId: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTransactions(editTransaction.data);
    }
  };

  const handleAddTransaction = async (
    dateOfTransaction,
    name,
    amount,
    categoryId
  ) => {
    console.log("Add transaction");
    console.log(dateOfTransaction, name, amount, categoryId);
    if (accessToken) {
      let addTransaction = await axios.post(
        `http://localhost:8080/transaction/add`,
        {
          userId: currUser.id,
          name: name,
          date: new Date(dateOfTransaction),
          amount: +amount,
          categoryId: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(addTransaction.data);

      const selectedDate = new Date(date);
      const transactionDate = new Date(addTransaction.data.date);
      console.log(selectedDate);
      console.log(transactionDate);
      if (
        transactionDate.getMonth() === selectedDate.getMonth() &&
        transactionDate.getFullYear() === selectedDate.getFullYear()
      ) {
        setTransactions((oldTransaction) => [
          ...oldTransaction,
          addTransaction.data,
        ]);
      }
    }
  };

  // open delete transaction modal
  const openDeleteModal = (transaction) => {
    setDeleteModal(true);
    setDeleteTransaction(transaction);
    console.log("open item ", transaction.id);
  };
  // handle delete transaction
  const handleDelete = async (transactionId) => {
    console.log("delete item ", transactionId);
    if (accessToken) {
      const selectedDate = new Date(date);
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      let deleteTransaction = await axios.delete(
        `http://localhost:8080/transaction/delete/${currUser.id}/${transactionId}/${month}/${year}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(deleteTransaction.data);
      setTransactions(deleteTransaction.data);
    }
  };

  // useeffect to get all data from database
  useEffect(() => {
    // getUserTransactionsApi();
    getCategoriesApi();
  }, [accessToken, date]);

  // list of transactions by user
  const TransactionList = () => {
    if (transactions) {
      // console.log(transactions);
      const transactionList = transactions.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      return transactionList.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          openTransactionModal={openTransactionModal}
          openDeleteModal={openDeleteModal}
        />
      ));
    }
  };

  useEffect(() => {
    // console.log("Inside useeffect");
    TransactionList();
  }, [transactions]);

  return (
    <Box>
      {TransactionList()}
      <TransactionModal
        title="Edit"
        openModal={openModal}
        setOpenModal={setOpenModal}
        editTransaction={editTransaction}
        handleEdit={handleEdit}
        categories={categories}
      />
      <TransactionModal
        title="Add"
        openModal={openAddTransactionModal}
        setOpenModal={setOpenAddTransactionModal}
        editTransaction={null}
        categories={categories}
        handleAddTransaction={handleAddTransaction}
      />
      <DeleteTransaction
        transaction={deleteTransaction}
        openDeleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleDelete={handleDelete}
      />
    </Box>
  );
}
