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

  // useeffect to get all data from database
  useEffect(() => {
    getCategoriesApi();
  }, [accessToken, date]);

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
      setCategories(categories.data);
    }
  };

  // open edit transaction modal
  const openTransactionModal = (transaction) => {
    setOpenModal(true);
    setEditTransaction(transaction);
  };
  // handle edit on transaction
  const handleEditTransaction = async (
    transactionId,
    date,
    name,
    amount,
    categoryId
  ) => {
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

  // add transaction
  const handleAddTransaction = async (
    dateOfTransaction,
    name,
    amount,
    categoryId
  ) => {
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

      const selectedDate = new Date(date);
      const transactionDate = new Date(addTransaction.data.date);
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
  };
  // handle delete transaction
  const handleDelete = async (transactionId) => {
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
      setTransactions(deleteTransaction.data);
    }
  };

  // list of transactions by user
  const TransactionList = () => {
    if (transactions) {
      const transactionList = transactions.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date) || b.id - a.id;
      });

      return transactionList.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          openTransactionModal={openTransactionModal}
          openDeleteModal={openDeleteModal}
          currUser={currUser}
        />
      ));
    }
  };

  useEffect(() => {
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
        handleEdit={handleEditTransaction}
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
