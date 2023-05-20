import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import useCategories from "../../hooks/useCategories";
import CategoriesCard from "./CategoriesCard";
import CategoryActionModal from "../../components/form/CategoryActionModal";
import axios from "axios";

export default function EditCategory({ currUser, accessToken }) {
  const [categories, setCategories] = useCategories(currUser, accessToken);
  const [categoryModal, setCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();

  const handleEditCategory = async (
    categoryId,
    name,
    color,
    incomeExpenseId
  ) => {
    if (accessToken) {
      const response = await axios.put(
        `http://localhost:8080/category/edit/${categoryId}`,
        {
          name: name,
          color: `${color}`,
          incomeExpenseId: incomeExpenseId.value,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }

    setCategories({ selection: "get" });
  };

  const handleOpenCategoryModal = (category) => {
    setCategoryModal(true);
    setSelectedCategory(category);
  };

  const categoryList = () => {
    if (categories) {
      console.log(categories.length);
      return categories.map((category) => {
        return (
          <CategoriesCard
            key={category.id}
            category={category}
            setCategories={setCategories}
            handleOpenCategoryModal={handleOpenCategoryModal}
          />
        );
      });
    }
  };

  return (
    <>
      <Box display="flex" flexWrap="wrap">
        {categoryList()}
      </Box>
      <CategoryActionModal
        accessToken={accessToken}
        setCategoryModal={setCategoryModal}
        categoryModal={categoryModal}
        selectedCategory={selectedCategory}
        handleEditCategory={handleEditCategory}
      />
    </>
  );
}
