import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPhotos } from "../slices/photoSlices";
import { uploads } from "../utils/config";
import { useNavigate } from "react-router-dom";

import "./Post.css"

const Post = () => {
  const {
    photos,
    message: PHOTOmessage,
    error: PHOTOerror,
    loading: PHOTOloading,
  } = useSelector((state) => state.photo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPhotos());
  }, []);
  return (
    <div className="postCardHome">
        
      {Array.isArray(photos) &&
        photos.map((photo) => (

        <div className="card">
          <img
            src={`${uploads}/photos/${photo.image}`}
            alt=""
            onClick={() => {
              navigate(`/post/${photo._id}`);
            }}
            key={photo.id}
          />
          </div>
        ))}

        
    </div>
  );
};

export default Post;
