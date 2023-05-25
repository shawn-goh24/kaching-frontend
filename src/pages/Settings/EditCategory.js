import { Box } from "@mui/material";
import React, { useState } from "react";
import useCategories from "../../hooks/useCategories";
import CategoriesCard from "./CategoriesCard";
import CategoryActionModal from "../../components/form/CategoryActionModal";
import axios from "axios";
import { Button, Modal, Text } from "@nextui-org/react";

export default function EditCategory({ currUser, accessToken }) {
  const [categories, setCategories] = useCategories(currUser, accessToken);
  const [categoryModal, setCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState();

  // close delete modal
  const closeHandler = () => {
    setDeleteModal(false);
  };
  // open delete modal
  const handleDeleteModal = (cat) => {
    setDeleteModal(true);
    setCategoryToDelete(cat);
  };
  // delete category
  const handleDelete = (id) => {
    setCategories({ categoryId: id, selection: "delete" });
  };

  // edit category
  const handleEditCategory = async (
    categoryId,
    name,
    color,
    incomeExpenseId
  ) => {
    if (accessToken) {
      await axios.put(
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

  // open edit modal
  const handleOpenCategoryModal = (category) => {
    setCategoryModal(true);
    setSelectedCategory(category);
  };

  const categoryList = () => {
    if (categories) {
      return categories.map((category) => {
        return (
          <CategoriesCard
            key={category.id}
            category={category}
            setCategories={setCategories}
            handleOpenCategoryModal={handleOpenCategoryModal}
            handleDeleteModal={handleDeleteModal}
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
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={deleteModal}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text h1>Delete Bill</Text>
        </Modal.Header>
        <Modal.Body>
          <Text h2>Are you sure you want to delete?</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto light onPress={closeHandler}>
            Back
          </Button>
          <Button
            auto
            color="warning"
            onPress={() => {
              closeHandler();
              handleDelete(categoryToDelete.id);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
