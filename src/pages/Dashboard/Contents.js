import { Grid } from "@mui/material";
import { Card, Text } from "@nextui-org/react";
import React from "react";

export default function Contents() {
  const MockItem = () => {
    return (
      <Card css={{ h: "$24", $$cardColor: "$colors$primary" }}>
        <Card.Body>Test</Card.Body>
      </Card>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{ border: "1px solid blue", backgroundColor: "SkyBlue" }}
      >
        Dashboard <br />
        Welcome to your dashboard
      </Grid>
      <Grid item xs={4}>
        <MockItem />
      </Grid>
      <Grid item xs={4}>
        <MockItem />
      </Grid>
      <Grid item xs={4}>
        <MockItem />
      </Grid>
      <Grid item xs={9}>
        <MockItem />
      </Grid>
      <Grid item xs={3}>
        <MockItem />
      </Grid>
      <Grid item xs={7}>
        <MockItem />
      </Grid>
      <Grid item xs={5}>
        <MockItem />
      </Grid>
    </Grid>
  );
}
