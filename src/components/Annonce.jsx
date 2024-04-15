import React from "react";
import { Button } from "@/components/ui/button";
import Snackbar from "@mui/material/Snackbar";

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
import axiosClient from "@/axiosClient";
import { Alert } from "@mui/material";

const Annonce = ({ info }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handlereserve = (id) => {
    setOpen(true);
    axiosClient
      .post(`/reserve/${id}`)
      .then(setLoading(!loading))
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
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

          <Button onClick={() => handlereserve(info.id)}>
            Reserverez une place
          </Button>
        </CardFooter>
      </Card>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Place Reserved succefuly
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Annonce;
