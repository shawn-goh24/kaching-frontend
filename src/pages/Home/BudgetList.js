import React, { useContext, useState } from "react";
import BudgetBar from "./BudgetBar";
import { Box } from "@mui/material";
import { combineExpenseCategoryAmounts } from "../../utils/utils";
import EditBudget from "../../components/form/EditBudget";
import DeleteBudgetModal from "../../components/form/DeleteBudgetModal";
import axios from "axios";
import useMediaQuery from "../../hooks/useMediaQuery";
import { AccessTokenContext } from "../../App";

export default function BudgetList({
  budgets,
  transactions,
  userCategories,
  getBudgetApi,
}) {
  const [editModal, openEditModal] = useState(false);
  const [deleteModal, openDeleteModal] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState();
  const isSmallHeight = useMediaQuery("(max-height: 960px)");

  const accessToken = useContext(AccessTokenContext);

  // open edit modal
  const handleEditModal = (budget) => {
    openEditModal(true);
    setBudgetToEdit(budget);
  };

  // handle edit on budget
  const handleEdit = async (budgetId, categoryId, amount) => {
    await axios.put(
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

    getBudgetApi();
  };

  // open delete modal
  const handleDeleteModal = (budget) => {
    openDeleteModal(true);
    setBudgetToEdit(budget);
  };

  // handle delete budget
  const handleDelete = async (budgetId) => {
    await axios.delete(`http://localhost:8080/budget/delete/${budgetId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    getBudgetApi();
  };

  // get total amount spent on the category within the budget column
  const getAmountSpent = (categoryName) => {
    if (transactions) {
      const mappedCategories = combineExpenseCategoryAmounts(transactions);
      for (const categoryBudget of mappedCategories) {
        if (categoryBudget[0] === categoryName) {
          return categoryBudget[1];
        }
      }
      return 0;
    }
  };

  // get percentage for progress bar
  const barPercentage = (amount, budget) => {
    return (amount / budget) * 100;
  };

  const mappedBudget = () => {
    return budgets
      ? budgets.map((budget) => {
          const amount = getAmountSpent(budget.Category.name);
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
    <Box
      sx={{
        maxHeight: `${isSmallHeight ? "35%" : "60%"}`,
        overflowY: { xs: "none", md: "scroll" },
      }}
    >
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
