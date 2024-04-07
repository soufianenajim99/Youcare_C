import Annonce from "@/components/Annonce";
import Searchinput from "@/components/ui/searchinput";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/contextprovider";
import Loading from "@/components/Loading";
import { Navigate } from "react-router-dom";

const EventsLists = () => {
  const [showPost, setShowPost] = useState(null);
  const [loading, setLoading] = useState(false);

  // axios.get(`http://127.0.0.1:8000/api/anno`).then((response) => {
  //   setShowPost(response.data);
  // });

  // const listEvents = showPost;

  async function getPosts() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/anno");
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
        <Searchinput className="" />
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
