import React from "react";
import { Layout } from "antd";

export default ({ children }) => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#E3E9F5",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {children}
    </Layout>
  );
};
