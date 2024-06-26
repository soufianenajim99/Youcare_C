import React, { useContext } from "react";
import UserContext from "@/contexts/UserContext";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";

import { useStateContext } from "@/contexts/contextprovider";
import { Link } from "react-router-dom";
import axiosClient from "@/axiosClient";

export default function App() {
  // const [counter] = useContext(UserContext)
  const onLogout = (ev) => {
    localStorage.removeItem("ACCESS_TOKEN");
    console.log("logout printed");
    ev.preventDefault();
    axiosClient.get("/logout").then(({}) => {
      setUser(null);
      setToken(null);
    });
  };

  const { token, setUser, setToken } = useStateContext();
  // console.log(user);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  let value = useContext(UserContext);
  // console.log("llll");
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <Link to="/">YOUCARE</Link>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {token ? (
          <NavbarItem>
            <Link color="foreground" to="profile">
              Profile
            </Link>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Link color="foreground" href="#">
              Contact
            </Link>
          </NavbarItem>
        )}
        <NavbarItem isActive>
          <Link to="/events" aria-current="page">
            Events
          </Link>
        </NavbarItem>
        <NavbarItem>
          {value.organisateur ? (
            <Link to="/orga" color="foreground">
              Dashboard_Orga
            </Link>
          ) : (
            <Link to="/orga" color="foreground">
              Dashboard
            </Link>
          )}
        </NavbarItem>
        {value.organisateur && (
          <NavbarItem>
            <Link to="/mycond" color="foreground">
              My Condidatures
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      {token ? (
        <NavbarContent justify="end">
          {value ? (
            <span className=" py-10">{`Welcome  ${value.name}`}</span>
          ) : (
            <span className=" py-10">{`Welcome`}</span>
          )}

          <NavbarItem>
            <Button onClick={onLogout} color="danger">
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link to="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              <Link to="/register">Sign Up</Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
