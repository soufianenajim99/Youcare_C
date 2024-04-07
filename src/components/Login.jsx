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

const Login = () => {
  return (
    <div className=" flex h-screen justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to Your Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
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

export default Login;
