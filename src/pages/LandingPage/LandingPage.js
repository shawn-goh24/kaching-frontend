import { Button, Grid, Text } from "@nextui-org/react";
import React from "react";
import appImg from "../../assets/appImg.png";
import useMediaQuery from "../../hooks/useMediaQuery";

import FeatureCard from "./FeatureCard";

export default function LandingPage() {
  // check if screen is md or lower
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  return (
    <>
      <Grid.Container justify="center">
        {/* <div style={{ height: "60vh" }}> */}
        <Grid xs={12} justify="center" css={{ marginTop: 100 }}>
          <Text
            h1
            size={isSmallScreen ? 50 : 90}
            css={{
              textAlign: "center",
              marginBottom: 0,
              textGradient: "45deg, $purple500 30%, $blue600 100%",
            }}
          >
            Administer your finances <br /> without a fuss
          </Text>
        </Grid>
        <Grid xs={12} justify="center">
          <Text h2 size={isSmallScreen && 14} weight="light" color="#889096">
            Manage your own finance
          </Text>
        </Grid>
        <Grid xs={12} justify="center" css={{ margin: "50px 0 130px 0" }}>
          <Button auto size="lg">
            Get started
          </Button>
        </Grid>
        <Grid xs={12} sm={8} justify="center">
          <img src={appImg} alt="appImg" width="100%" />
        </Grid>
      </Grid.Container>
      <Grid.Container justify="center" style={{ margin: "150px 0" }}>
        <Grid xs={12} justify="center">
          <h1>Features at glance</h1>
        </Grid>
        <Grid xs={12} sm={3} justify="center" style={{ padding: "20px" }}>
          <FeatureCard
            iconText="track"
            text={"Track your expenses to keep within your budget"}
          />
        </Grid>
        <Grid xs={12} sm={3} justify="center" style={{ padding: "20px" }}>
          <FeatureCard
            iconText="overview"
            text={"Overall view of transactions throughout the year"}
          />
        </Grid>
        <Grid xs={12} sm={3} justify="center" style={{ padding: "20px" }}>
          <FeatureCard iconText="bill" text={"Bill reminders via email"} />
        </Grid>
      </Grid.Container>
      <footer style={{ textAlign: "center", color: "grey" }}>
        For project purpose only
      </footer>
    </>
  );
}
