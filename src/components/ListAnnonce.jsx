import React from "react";
import Annonce from "./Annonce";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/components/Loading";

const ListAnnonce = () => {
  const [showPost, setShowPost] = useState(null);
  const [loading, setLoading] = useState(false);
  async function getPosts() {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/anno?limit=6"
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
  return (
    <div className=" grid grid-cols-3 grid-rows-2 gap-8">
      {loading ? (
        showPost.map((item, index) => (
          <Annonce key={index} info={item} description={item.description} />
        ))
      ) : (
        <div className="grid col-start-1 col-end-5">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ListAnnonce;
