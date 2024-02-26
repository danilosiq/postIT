import React, { useState } from "react";
import "./myPost.css";
import { useDispatch, useSelector } from "react-redux";
import { publish, resetMessage } from "../../slices/photoSlices";
import Message from "../../components/Message";
import empy from "../../../public/empy.png"
import { uploads } from "../../utils/config";
import { useNavigate } from "react-router-dom";


const MyPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [photoP, setPhoto] = useState(null);
  const [blob, setBlob] = useState(null);
  const { message, error, loading } = useSelector((state) => state.photo);
  const { user: original } = useSelector((state) => state.auth);

  const handleFile = (e) => {
    const image = e.target.files[0];
    setBlob(URL.createObjectURL(image));
    setPhoto(image);
  };

  const handlePost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", photoP);

    dispatch(publish(formData));

    setTimeout(() => {
      dispatch(resetMessage());
      navigate(`/myperfil/${original._id}`);
    }, 2000);
  };
  return (
    <>
      <h1>Nova postagem</h1>
      <p>Compartilhe aqui um momento seu!</p>
      {error && <Message type="error" msg={error} />}
      {message && <Message type="success" msg={message} />}
      <div className="myPost">
        <div className="leftCamp">
          <form onSubmit={handlePost}>
            <div>
              <label>
                Título: <br />
                <input
                  type="text"
                  placeholder="Título"
                  className="inputCamp"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>

              <label>
                Imagem:
                <br />
                <input
                  type="file"
                  className="inputCamp"
                  onChange={handleFile}
                />
              </label>
            </div>
            <input type="submit" value="POST!" className="POSTbutton" />
          </form>
        </div>
        <div className="rightCamp">
          {photoP && <img src={blob} alt="Imagem selecionada" />}
          {!photoP && <img src={empy} alt="Imagem selecionada" />}
        </div>
      </div>
    </>
  );
};

export default MyPost;
