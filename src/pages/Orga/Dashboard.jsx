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

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handledelete = (id) => {
    axiosClient
      .delete(`/delete/${id}`)
      .then(setLoading(!loading))
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };
  const onSubmit = (data) => {
    console.log(data.titre);
    const payload = {
      titre: data.titre,
      description: data.description,
      localisation: data.localisation,
      date: data.date,
      comps: data.comps,
    };
    axiosClient
      .post("/anno", payload)
      .then(setLoading(!loading))
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };
  let value = useContext(UserContext);
  // console.log(value.organisateur);
  let orga = {
    id: "3",
  };
  value.organisateur && (orga = value.organisateur);
  console.log(orga.id);

  const [showEve, setShowEve] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getPosts() {
    try {
      const response = await axiosClient.get(
        `http://127.0.0.1:8000/api/myanno/${orga.id}`
      );
      setShowEve(response.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, [orga.id, loading]);

  console.log(showEve);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="float-right">
            Ajouter Annonces
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="titre">Titre</Label>
                <Input
                  {...register("titre")}
                  type="text"
                  id="titre"
                  placeholder="Enter your titre"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">description</Label>
                <Input
                  {...register("description")}
                  type="text"
                  id="description"
                  placeholder="Enter your description"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="localisation">localisation</Label>
                <Input
                  {...register("localisation")}
                  type="text"
                  id="localisation"
                  placeholder="Enter your localisation"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">date</Label>
                <Input
                  {...register("date")}
                  type="date"
                  id="date"
                  placeholder="Enter your date"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="comps">comps</Label>
                <Input
                  {...register("comps")}
                  type="text"
                  id="comps"
                  placeholder="Enter your comps"
                />
              </div>
            </div>
            <Button className=" w-full mt-3">Ajouter Annonce</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className=" flex items-center justify-center mt-10 w-3/6 mx-auto">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Nom</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {loading ? (
              showEve.map((item, index) => (
                // <Annonce key={index} info={item} description={item.description} />
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.titre}</TableCell>
                  <TableCell className=" flex items-center gap-2">
                    <Button className="my-3">Editer</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handledelete(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
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

export default Dashboard;
