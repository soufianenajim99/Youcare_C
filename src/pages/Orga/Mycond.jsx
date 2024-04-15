import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import UserContext from "@/contexts/UserContext";
import axiosClient from "@/axiosClient";
import { useForm } from "react-hook-form";
import Spiner from "@/components/ui/spiner";
import { Button } from "@/components/ui/button";

const Mycond = () => {
  const [loading, setLoading] = useState(false);
  const [showEve, setShowEve] = useState(null);
  const handledelete = (id) => {
    axiosClient
      .post(`/refdem/${id}`)
      .then(setLoading(!loading))
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };
  const handleaccepte = (id) => {
    axiosClient
      .post(`/accdem/${id}`)
      .then(setLoading(!loading))
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };
  async function getPosts() {
    try {
      const response = await axiosClient.get(
        `http://127.0.0.1:8000/api/mycond`
      );
      setShowEve(response.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, [loading]);
  return (
    <div>
      <div className=" flex items-center justify-center mt-10 w-3/6 mx-auto">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Titre d'evenement</TableColumn>
            <TableColumn>Id de Benevole</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {loading ? (
              showEve.map((item, index) => (
                // <Annonce key={index} info={item} description={item.description} />
                <TableRow key={index}>
                  <TableCell>{item.titre}</TableCell>
                  <TableCell>{item.benevole_id}</TableCell>
                  {item.validated_at ? (
                    <TableCell className=" flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleaccepte(item.id)}
                        disabled
                      >
                        Cet Condidature est Accepter
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell className=" flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleaccepte(item.id)}
                      >
                        Accpeter
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handledelete(item.id)}
                      >
                        Refuser
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow key="2">
                <TableCell>
                  <Spiner />
                </TableCell>
                <TableCell>
                  <Spiner />
                </TableCell>
                <TableCell>
                  <Spiner />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Mycond;
