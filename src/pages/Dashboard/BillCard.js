import { Typography, Menu, MenuItem } from "@mui/material";
import { Card } from "@nextui-org/react";
import React from "react";

export default function BillCard({
  bill,
  handleDeleteModal,
  handleOpenEditBillModal,
}) {
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <>
      <Card
        isHoverable
        variant="bordered"
        onContextMenu={handleContextMenu}
        style={{ cursor: "context-menu" }}
        css={{
          margin: 3,
          width: "fit-content",
          height: "fit-content",
        }}
      >
        <Card.Body>
          <div>{bill.name}</div>
          <div>
            <Typography variant="subtitle2">
              Day {new Date(bill.date).getDate()} of the month
            </Typography>
          </div>
        </Card.Body>
      </Card>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? {
                top: contextMenu.mouseY,
                left: contextMenu.mouseX,
              }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenEditBillModal(bill);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleDeleteModal(bill);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
