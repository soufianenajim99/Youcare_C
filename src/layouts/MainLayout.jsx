// import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar";

// import { useAuth } from "@/provider/authProvider";
const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
