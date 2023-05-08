import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import TransactionCard from "../../components/ui/TransactionCard";
import axios from "axios";
import EditTransaction from "../../components/form/EditTransaction";
import DeleteTransaction from "../../components/form/DeleteTransaction";

export default function TransactionCol({ currUser, accessToken }) {
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
      return transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          openTransactionModal={openTransactionModal}
          openDeleteModal={openDeleteModal}
        />
      ));
    }
  };

  return (
    <Box>
      {TransactionList()}
      <EditTransaction
        openModal={openModal}
        setOpenModal={setOpenModal}
        editTransaction={editTransaction}
        handleEdit={handleEdit}
        categories={categories}
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
