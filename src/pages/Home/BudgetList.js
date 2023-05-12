import React, { useState } from "react";
import BudgetBar from "./BudgetBar";
import { Box } from "@mui/material";
import { combineExpenseCategoryAmounts } from "../../utils/utils";
import EditBudget from "../../components/form/EditBudget";
import DeleteBudgetModal from "../../components/form/DeleteBudgetModal";
import axios from "axios";

export default function BudgetList({
  budgets,
  setBudgets,
  transactions,
  accessToken,
  userCategories,
}) {
  const [editModal, openEditModal] = useState(false);
  const [deleteModal, openDeleteModal] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState();

  // open edit modal
  const handleEditModal = (budget) => {
    openEditModal(true);
    setBudgetToEdit(budget);
  };
  const handleEdit = async (budgetId, categoryId, amount) => {
    const newBudgets = await axios.put(
      `http://localhost:8080/budget/edit/${budgetId}`,
      {
        categoryId: categoryId,
        amount: +amount,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setBudgets(newBudgets.data);
  };

  // open delete modal
  const handleDeleteModal = (budget) => {
    openDeleteModal(true);
    setBudgetToEdit(budget);
  };
  const handleDelete = async (budgetId) => {
    const newBudgets = await axios.delete(
      `http://localhost:8080/budget/delete/${budgetId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setBudgets(newBudgets.data);
  };

  const getAmountSpent = (categoryName) => {
    if (transactions) {
      const mappedCategories = combineExpenseCategoryAmounts(transactions);
      // console.log(mappedCategories);
      for (const categoryBudget of mappedCategories) {
        // console.log(categoryBudget, categoryName);
        if (categoryBudget[0] === categoryName) {
          return categoryBudget[1];
        }
      }
      return 0;
    }
  };

  const barPercentage = (amount, budget) => {
    return (amount / budget) * 100;
  };

  const mappedBudget = () => {
    return budgets
      ? budgets.map((budget) => {
          const amount = getAmountSpent(budget.Category.name);
          // console.log(amount);
          return (
            <Box key={budget.Category.id} sx={{ margin: "20px 0" }}>
              <BudgetBar
                budget={budget}
                name={budget.Category.name}
                amount={amount}
                max={budget.amount}
                barPercentage={barPercentage(amount, budget.amount)}
                handleEditModal={handleEditModal}
                handleDeleteModal={handleDeleteModal}
                userCategories={userCategories}
              />
            </Box>
          );
        })
      : "";
  };

  return (
    <Box sx={{ height: "600px", overflowX: "scroll" }}>
      {mappedBudget()}
      <EditBudget
        title="Edit"
        openModal={editModal}
        setOpenModal={openEditModal}
        budgetToEdit={budgetToEdit}
        handleEdit={handleEdit}
        userCategories={userCategories}
      />
      <DeleteBudgetModal
        deleteModal={deleteModal}
        openDeleteModal={openDeleteModal}
        handleDelete={handleDelete}
        budgetToDelete={budgetToEdit}
      />
    </Box>
  );
}
