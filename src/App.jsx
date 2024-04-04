import { NextUIProvider } from "@nextui-org/react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";

import ListAnnonce from "./components/ListAnnonce";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventsLists from "./pages/EventsLists";
import Dashboard from "./pages/Orga/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/events" element={<EventsLists />} />
      <Route path="/orga" element={<Dashboard />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
