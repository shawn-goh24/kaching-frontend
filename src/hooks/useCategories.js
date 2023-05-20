import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useCategories(currUser, accessToken) {
  const [category, setCategory] = useState([]);

  const getCategoryApi = async () => {
    if (accessToken) {
      let user = await axios.get(
        `http://localhost:8080/user/category/${currUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCategory(user.data);
    }
  };

  const handleCategoryApi = async (categoryId, selection) => {
    if (accessToken) {
      if (selection === "delete") {
        let user = await axios.delete(
          `http://localhost:8080/category/delete/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        getCategoryApi();
      } else if (selection === "get") {
        getCategoryApi();
      }
    }
  };

  useEffect(() => {
    getCategoryApi();
  }, []);

  return [category.Categories, handleCategoryApi];
}
