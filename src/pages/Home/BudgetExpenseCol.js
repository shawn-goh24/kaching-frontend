import React, { useEffect, useState } from "react";
import { Tab, Box } from "@mui/material";
import PieChart from "./PieChart.js";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BudgetList from "./BudgetList.js";
import { Button } from "@nextui-org/react";

export default function BudgetExpenseCol({
  transactions,
  budgets,
  userCategories,
  accessToken,
  setBudgetModal,
  getBudgetApi,
}) {
  const [tabValue, setTabValue] = useState("1");

  // handle tab value to change between expense/income piechart tab
  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <TabContext
        value={tabValue}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Expense" value="1" />
            <Tab label="Income" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {transactions.length > 0 ? (
              <PieChart transactions={transactions} isExpense={true} />
            ) : (
              "No transcations"
            )}
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PieChart transactions={transactions} isExpense={false} />
          </Box>
        </TabPanel>
      </TabContext>
      <BudgetList
        budgets={budgets}
        transactions={transactions}
        userCategories={userCategories}
        accessToken={accessToken}
        getBudgetApi={getBudgetApi}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
        <Button onClick={() => setBudgetModal(true)}>Add new budget</Button>
      </Box>
    </>
  );
}
