import React, { useEffect, useState } from "react";
import "./myProfile.css";
import { useAuth } from "../../hook/useAtuth";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { uploads } from "../../utils/config";
import { useDispatch } from "react-redux";

import { profile, resetMessage, getUserDetails } from "../../slices/userSlices";
import { getUserPhotos } from "../../slices/photoSlices";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { idUSER } = useAuth();
  const [image,setimg] = useState()
  const {
    user,
    message: USERmessage,
    error: USERerror,
    loading: USERloaging,
  } = useSelector((state) => state.user);
  const {
    photos,
    message: PHOTOmessage,
    error: PHOTOerror,
    loading: PHOTOloading,
  } = useSelector((state) => state.photo);

  const { user:original } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch]);

  
  const profileIMG = () =>{
    if(user.userImage === undefined){
      setimg()
    }
  }



  return (
    
    <div className="myProfile">
      {id !== original._id ? navigate("/") :""}
      <div className="leftcamp">
        <div className="card">
          <h1>Meu perfil</h1>
          <img src={user.userImage ? `${uploads}/users/${user.userImage}`: "../../../public/aa.png"} alt="" />
          <h2>{user.name}</h2>
          <textarea name="" id="" cols="30" rows="10" value={user.bio} disabled></textarea>

          
          {USERloaging &&
            <Link to="/editProfile">
              <button className="EditBTT" disabled>Carregando</button>
            </Link>}
            {!USERloaging &&
            <Link to="/editProfile">
              <button className="EditBTT">Editar perfil</button>
            </Link>}
           
        </div>
      </div>
      <div className="rightcamp">
        <h1>Meus posts:</h1>
        {PHOTOloading && <h2>Carregando...</h2>}
        <div className="postFormat">
          {photos && Array.isArray(photos) &&
            photos.map((photo) => (
              <img
                src={`${uploads}/photos/${photo.image}`}
                key={photo.id}
                onClick={()=> {navigate(`/post/${photo._id}`)}}
                className="cardMyposts"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
