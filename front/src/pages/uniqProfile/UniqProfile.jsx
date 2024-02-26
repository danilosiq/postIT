import React, { useEffect } from "react";
import "./UniqProfile.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profile, resetMessage, getUserDetails } from "../../slices/userSlices";
import { uploads } from "../../utils/config";
import { getUserPhotos } from "../../slices/photoSlices";


const UniqProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

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

  const { user: original } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);
  return (
    <div className="myProfile">
      <div className="leftcamp">
        <div className="card">
          <img src={`${uploads}/users/${user.userImage}`} alt="" />
          <h2>{user.name}</h2>
          <p>{user.bio}</p>

          {USERloaging && (
            <Link to="/editProfile">
              <button className="EditBTT" disabled>
                Carregando
              </button>
            </Link>
          )}
          
        </div>
      </div>
      <div className="rightcamp">
        <h1>Meus posts:</h1>
        {PHOTOloading && <h2>Carregando...</h2>}
        <div className="postFormat">
          {photos &&
            Array.isArray(photos) &&
            photos.map((photo) => (
              <img
                src={`${uploads}/photos/${photo.image}`}
                key={photo.id}
                onClick={() => {
                  navigate(`/post/${photo._id}`);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UniqProfile;
