import { useRef } from "react";

import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStateContext } from "@/contexts/contextprovider";
import axiosClient from "@/axiosClient";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { token, setToken, setUser } = useStateContext();
  if (token) {
    return <Navigate replace to="/" />;
  }

  const Submit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.authorisation.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  return (
    <div className=" flex h-screen justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to Your Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={Submit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  ref={emailRef}
                  type="email"
                  id="email"
                  placeholder="Enter your Email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">password</Label>
                <Input
                  ref={passwordRef}
                  type="password"
                  id="password"
                  placeholder="your password"
                />
              </div>
            </div>
            <Button className=" w-full mt-3">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
