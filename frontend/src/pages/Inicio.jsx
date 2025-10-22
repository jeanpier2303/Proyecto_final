import React from "react";
import NavPrivate from "../components/NavPrivate";
import Footer from "../components/Footer";
import HomePrivate from "./HomePrivate";

const Dashboard = () => {
  return (
    <>
      <NavPrivate />
      <HomePrivate />
      <Footer />
    </>
  );
};

export default Dashboard;
