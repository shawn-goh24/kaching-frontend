import React from "react";
import { useParams } from "react-router-dom";

export default function Settings() {
  const { id } = useParams();
  return (
    <>
      <h1>Settings</h1>
      <h3>User: {id}</h3>
    </>
  );
}
