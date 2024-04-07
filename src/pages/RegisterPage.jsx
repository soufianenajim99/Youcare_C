import { useState } from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, Radio } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigate } from "react-router-dom";
import { useStateContext } from "@/contexts/contextprovider";
import axiosClient from "@/axiosClient";

const RegisterPage = () => {
  const [selectedOption, setSelectedOption] = useState("organisateur");
  function onValueChange(event) {
    setSelectedOption(event.target.value);
  }

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();

  const { user, setUser, setToken } = useStateContext();
  const { token } = useStateContext();
  if (token) {
    return <Navigate replace to="/" />;
  }

  const Submit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (selectedOption == "organisateur") {
      axiosClient
        .post("/orgas", payload)
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
    } else {
      axiosClient
        .post("/benes", payload)
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
    }
  };
  console.log(user);
  console.log("registerpage");
  return (
    <div className=" flex h-screen justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={Submit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">username</Label>
                <Input
                  ref={nameRef}
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                />
              </div>
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
              <div className="flex flex-col space-y-1.5">
                <RadioGroup
                  label="Choisire Votre Role"
                  orientation="horizontal"
                  ref={roleRef}
                >
                  <Radio value="organisateur" onChange={onValueChange}>
                    Organisateur
                  </Radio>
                  <Radio value="benevole" onChange={onValueChange}>
                    Benevole
                  </Radio>
                </RadioGroup>
              </div>
            </div>
            <Button className=" w-full mt-3">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
