// import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import axiosClient from "@/axiosClient";
import { useStateContext } from "@/contexts/contextprovider";

// import { useAuth } from "@/provider/authProvider";
const MainLayout = () => {
  // console.log(user);
  console.log("Main Layouts");
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
