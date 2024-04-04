import React from "react";
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

import { useState } from "react";

const Annonce = ({ info }) => {
  const [showDesc, setShowDesc] = useState(false);
  let desc = info.description;
  // console.log(info.description);
  let descr = desc;

  if (!showDesc) {
    descr = desc.substring(0, 120) + "...";
  }
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{info.titre}</CardTitle>
          <CardDescription>{info.date}</CardDescription>
        </CardHeader>
        <CardContent>{`${descr}`}</CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setShowDesc(!showDesc);
            }}
          >
            {showDesc ? "View less" : "View more"}
          </Button>
          <Button>Reserverez une place</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Annonce;
