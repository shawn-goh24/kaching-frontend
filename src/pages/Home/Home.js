import React from "react";
import { useParams } from "react-router-dom";

export default function Home() {
  const { id } = useParams();
  return (
    <>
      <h1>Home</h1>
      <h3>User: {id}</h3>
    </>
  );
}
