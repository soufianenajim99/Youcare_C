import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import UserContext from "@/contexts/UserContext";
import { useRef } from "react";
import axiosClient from "@/axiosClient";

export function ProfilePage() {
  const nameRef = useRef();
  const emailRef = useRef();

  let value = useContext(UserContext);

  console.log(value);
  console.log("profile");

  const Submit = (ev) => {
    // ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
    };

    axiosClient.post("/update", payload).catch((err) => {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.errors);
      }
    });
  };

  return (
    <div className=" flex h-screen justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Update Informations</CardTitle>
          <CardDescription>Update your email / username.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={Submit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input ref={nameRef} id="name" placeholder={value.name} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  ref={emailRef}
                  type="email"
                  id="email"
                  placeholder={value.email}
                />
              </div>
            </div>
            <Button className=" w-full mt-3">Update</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
