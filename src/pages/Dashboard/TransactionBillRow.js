import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Card, Modal, Text } from "@nextui-org/react";
import AddIcon from "@mui/icons-material/Add";
import { currencyFormatter } from "../../utils/utils";
import BillCard from "./BillCard";
import { IconButton } from "@mui/material";

export default function TransactionBillRow({
  currUser,
  ytdTransactions,
  setAddBillModal,
  billReminders,
  handleDelete,
  handleOpenEditBillModal,
}) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [billToDelete, setBillToDelete] = useState();

  const closeHandler = () => {
    setDeleteModal(false);
  };

  // get the list of recent transaction cards
  const recentTransactions = () => {
    return ytdTransactions
      ? ytdTransactions.map((transaction, index) => {
          if (index < 5) {
            return (
              <Card
                key={transaction.id}
                variant="bordered"
                css={{ margin: 3, width: "95%" }}
              >
                <Card.Body
                  css={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{transaction.name}</div>
                  <div style={{ marginRight: "50px" }}>
                    {currencyFormatter(currUser.mainCurrency).format(
                      transaction.amount
                    )}
                  </div>
                </Card.Body>
              </Card>
            );
          }
        })
      : undefined;
  };

  const handleDeleteModal = (bill) => {
    setDeleteModal(true);
    setBillToDelete(bill);
  };

  // get the list of bills card
  const billList = () => {
    return billReminders.map((bill) => {
      return (
        <BillCard
          key={bill.id}
          bill={bill}
          handleDeleteModal={handleDeleteModal}
          handleOpenEditBillModal={handleOpenEditBillModal}
        />
      );
    });
  };

  return (
    <>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} sm={7}>
          <Card>
            <Card.Header>Recent 5 Transactions</Card.Header>
            <Card.Body>{recentTransactions()}</Card.Body>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card css={{ height: "100%" }}>
            <Card.Header>
              Bill Reminders
              <IconButton onClick={() => setAddBillModal(true)}>
                <AddIcon />
              </IconButton>
            </Card.Header>
            <Card.Body
              css={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              {billReminders ? billList() : undefined}
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
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
              handleDelete(billToDelete.id);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
