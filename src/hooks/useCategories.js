import axios from "axios";
import { useEffect, useState } from "react";

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
      setCategory(user.data.Categories);
    }
  };

  const handleCategoryApi = async (obj) => {
    if (accessToken) {
      if (obj.selection === "delete") {
        await axios.delete(
          `http://localhost:8080/category/delete/${obj.categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        getCategoryApi();
      } else if (obj.selection === "get") {
        getCategoryApi();
      }
    }
  };

  useEffect(() => {
    getCategoryApi();
  }, []);

  return [category, handleCategoryApi];
}
