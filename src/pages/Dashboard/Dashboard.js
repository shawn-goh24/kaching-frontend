import React from "react";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const { id } = useParams();
  return (
    <>
      <h1>Dashboard</h1>
      <h3>User: {id}</h3>
    </>
  );
}
