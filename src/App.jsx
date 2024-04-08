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
const took = localStorage.getItem("ACCESS_TOKEN");
const decodedToken = jwtDecode(took);

function App() {
  return (
    <>
      <UserContext.Provider value={decodedToken}>
        <ContextProvider>
          <RouterProvider router={router} />
        </ContextProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
