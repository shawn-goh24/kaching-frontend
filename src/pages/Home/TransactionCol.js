import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import TransactionCard from "../../components/ui/TransactionCard";
import axios from "axios";
import EditTransaction from "../../components/form/EditTransaction";
import DeleteTransaction from "../../components/form/DeleteTransaction";
import TransactionModal from "../../components/form/TransactionModal";

export default function TransactionCol({
  currUser,
  accessToken,
  setOpenAddTransactionModal,
  openAddTransactionModal,
}) {
  const [transactions, setTransactions] = useState("");
  const [categories, setCategories] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState("");
  const [deleteTransaction, setDeleteTransaction] = useState("");

  // get all transactions from the user
  const getUserTransactionsApi = async () => {
    if (accessToken) {
      let user = await axios.get(
        `http://localhost:8080/transaction/${currUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(user.data);
      setTransactions(user.data);
    }
  };

  // get all categories by user
  const getCategoriesApi = async () => {
    if (accessToken) {
      let categories = await axios.get(
        `http://localhost:8080/category/usercategories`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(categories.data);
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
      let editTransaction = await axios.put(
        `http://localhost:8080/transaction/edit/${transactionId}`,
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
      console.log(editTransaction.data);
      setTransactions(editTransaction.data);
    }
  };

  const handleAddTransaction = async (date, name, amount, categoryId) => {
    console.log("Add transaction");
    console.log(date, name, amount, categoryId);
    if (accessToken) {
      let addTransaction = await axios.post(
        `http://localhost:8080/transaction/add`,
        {
          userId: currUser.id,
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
      console.log(addTransaction.data);
      setTransactions((oldTransaction) => [
        ...oldTransaction,
        addTransaction.data,
      ]);
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
      let deleteTransaction = await axios.delete(
        `http://localhost:8080/transaction/delete/${transactionId}`,
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
    getUserTransactionsApi();
    getCategoriesApi();
  }, [accessToken]);

  // list of transactions by user
  const TransactionList = () => {
    if (transactions) {
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
    console.log("Inside useeffect");
    TransactionList();
  }, [transactions]);

  return (
    <Box>
      {TransactionList()}
      {/* <EditTransaction
        openModal={openModal}
        setOpenModal={setOpenModal}
        editTransaction={editTransaction}
        handleEdit={handleEdit}
        categories={categories}
      /> */}
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
        // handleEdit={handleEdit}
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
