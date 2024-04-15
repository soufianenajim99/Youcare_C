import Annonce from "@/components/Annonce";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/contextprovider";
import Loading from "@/components/Loading";
import { Navigate } from "react-router-dom";
import axiosClient from "@/axiosClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const EventsLists = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPost, setShowPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(data.text);
    getPostsfil(data.text);
  };

  // axiosClient.get("/user").then(({ data }) => {
  //   setUser(data);
  // });

  // axios.get(`http://127.0.0.1:8000/api/anno`).then((response) => {
  //   setShowPost(response.data);
  // });

  // const listEvents = showPost;

  async function getPosts() {
    try {
      const response = await axiosClient.get("http://127.0.0.1:8000/api/anno");
      setShowPost(response.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPostsfil(data) {
    try {
      const response = await axiosClient.get(
        `http://127.0.0.1:8000/api/anno?input=${data}`
      );
      setShowPost(response.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const { token } = useStateContext();
  if (!token) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className=" my-32">
      <div className="flex items-center justify-center my-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-sm items-center space-x-2"
        >
          <Input
            type="text"
            placeholder="Type To Search for Something"
            {...register("text")}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className=" grid grid-cols-3 grid-rows-2 gap-8">
        {loading ? (
          showPost.map((item, index) => (
            <Annonce key={index} info={item} description={item.description} />
          ))
        ) : (
          <div className="grid col-start-1 col-end-5">
            <Loading className=" w-screen mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsLists;
