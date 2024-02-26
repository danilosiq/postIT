import React, { useEffect, useState } from "react";
import "./EditPost.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPhotoById,
  resetMessage,
  updatePhoto,
  deletePhoto,
  likePhoto,
} from "../../slices/photoSlices";
import { BsCheck } from "react-icons/bs";
import { uploads } from "../../utils/config";
import {
  BsFillPencilFill,
  BsFillTrash3Fill,
  BsArrowReturnRight,
} from "react-icons/bs";
import Message from "../../components/Message";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [message, setmessage] = useState(false);
  const {
    photos,
    message: PHOTOmessage,
    error: PHOTOerror,
    loading: PHOTOloading,
  } = useSelector((state) => state.photo);

  const { user: original } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPhotoById(id));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    if (title === "") {
      setTitle(photos.title);
    }

    const photoData = {
      title: title,
      id: photos._id,
    };

    dispatch(updatePhoto(photoData));
    setTimeout(() => {
      dispatch(resetMessage());
      navigate(`/post/${photos._id}`);
    }, 2000);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setmessage(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setmessage(false);
    dispatch(deletePhoto(id));

    navigate(`/myperfil/${original._id}`);
  };

  

  return (
    <>
      {photos.userId == undefined ? <p>Carregando...</p> : ""}
      <h1>
        Edite sua postagem <BsFillPencilFill />
      </h1>
      <div className="editPost">
        {PHOTOerror && <p>{PHOTOerror}</p>}
        {photos.userId !== undefined && photos.userId !== original._id
          ? navigate("/")
          : !""}

        <div className="leftcamp">
          <form>
            <div>
              <label>
                Titulo: <br />
                <input
                  type="text"
                  value={title || ""}
                  placeholder={photos.title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="inputCamp"
                />
              </label>
              <br />
            </div>
            <button className="deletePostButton" onClick={sendMessage}>
              Excluir <BsFillTrash3Fill />
            </button>
            <button onClick={handleChange} className="POSTbutton">
              Confirmar <BsCheck />
            </button>
          </form>
          {PHOTOerror && <Message type="error" msg={PHOTOerror} />}
          {PHOTOmessage && <Message type="success" msg={PHOTOmessage} />}
        </div>

        <div className="rightcamp">
          <img src={`${uploads}/photos/${photos.image}`} alt="" />
        </div>
      </div>

      {message && (
        <div className="deleteMessageContainer">
          <div>
            <h1>Dejesa mesmo Ecluir esse Post?</h1>

            <button className="delete" onClick={handleDelete}>
              Excluir <BsFillTrash3Fill />
            </button>
            <button onClick={() => setmessage(false)} className="cancel">
              Cancelar <BsArrowReturnRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPost;
