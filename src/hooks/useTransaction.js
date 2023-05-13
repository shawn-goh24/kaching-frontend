import React from "react";

export default function useTransaction() {
  const [transactions, setTransactions] = useState("");

  const getUserTransactionsApi = async () => {
    const currentYear = new Date().getFullYear();
    if (accessToken) {
      let user = await axios.get(
        `http://localhost:8080/transaction/${currUser.id}/${currentYear}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTransactions(user.data);
    }
  };

  return [transactions];
}
