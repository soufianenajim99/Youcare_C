import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";

import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventsLists from "./pages/EventsLists";
import Dashboard from "./pages/Orga/Dashboard";
import { ContextProvider } from "./contexts/contextprovider";

import UserContext from "./contexts/UserContext";
import { useStateContext } from "./contexts/contextprovider";
import { jwtDecode } from "jwt-decode";
import { ProfilePage } from "./pages/ProfilePage";
import axiosClient from "./axiosClient";
import { useEffect, useState } from "react";
import Mycond from "./pages/Orga/Mycond";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/events" element={<EventsLists />} />
      <Route path="/orga" element={<Dashboard />} />
      <Route path="/mycond" element={<Mycond />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>
  )
);
let decodedToken = null;
const took = localStorage.getItem("ACCESS_TOKEN");
if (took) {
  decodedToken = jwtDecode(took);
} else {
  decodedToken = null;
}

function App() {
  const [showUser, setShowUser] = useState(null);
  async function getPosts() {
    try {
      const response = await axiosClient.get("http://127.0.0.1:8000/api/user");
      setShowUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  // const naaame = showUser.user.name;

  // console.log(showUser);
  let useer = {
    name: "loading...",
    email: "loading...",
  };
  showUser && (useer = showUser.user);
  // if (showUser !== "guest") {
  // console.log(useer);

  return (
    <>
      <UserContext.Provider value={useer}>
        <ContextProvider>
          <RouterProvider router={router} />
        </ContextProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
