import "./EditProfile.css";
import { BsBrushFill } from "react-icons/bs";
import { uploads } from "../../utils/config";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile, resetMessage, updateUser } from "../../slices/userSlices";
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imagePrev, setImagePrev] = useState(null);
  const [imageNew, setImageNew] = useState(null);
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [limit, setLimit] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleFile = (e) => {
    const image = e.target.files[0];
    setImagePrev(URL.createObjectURL(image));
    setImageNew(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      name: username,
      email,
      password,
      bio: bio,
    };
    const formData = new FormData();
    formData.append("userImage", imageNew);
    formData.append("name", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("bio", bio);
    await dispatch(updateUser(formData));

    setTimeout(() => {
      dispatch(resetMessage());
      navigate(`/myperfil/${user._id}`);
    }, 1000);
  };

  const handleChangeBio = (e) => {
    const { value } = e.target;
    if (value.length <= 100) {
      setBio(e.target.value);
      setLimit("")
      console.log(limit);
    }
    if (value.length === 100) {
      setLimit("limite")
    }
  };

  return (
    <div className="EditContainer">
      <div className="left">
        <h2>Imagem:</h2>
        {(imagePrev || user?.userImage) && (
          <img
            src={imagePrev ? imagePrev : `${uploads}/users/${user.userImage}`}
            alt={user?.name}
          />
        )}
      </div>
      <div className="right">
        <h1>
          <BsBrushFill />
          Edite seu perfil
        </h1>
        {error && <Message type="error" msg={error} />}
        {message && <Message type="success" msg={message} />}

        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Nome de Usuário: <br />
              <input
                type="text"
                placeholder={user?.name}
                className="inputCamp"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Email: <br />
              <input
                type="email"
                placeholder={user?.email}
                className="inputCampEMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
              <hr />
            </label>
            <label>
              Bio: <br />
              <textarea
                name="bio"
                cols="30"
                rows="10"
                className="inputCamp"
                value={bio}
                onChange={handleChangeBio}
              ></textarea>
              <p className={limit}>{bio && bio.length} - 100</p>
            </label>

            <label>
              Imagem de Perfil: <br />
              <input type="file" className="inputCamp" onChange={handleFile} />
              <hr />
            </label>
            <label>
              Senha:
              <br />
              <input
                type="password"
                placeholder="Nova senha"
                className="inputCamp"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {!loading && (
            <input type="submit" value="Salvar" className="REGLOGbtt" />
          )}
          {loading && (
            <input
              type="submit"
              value="Aguarde..."
              className="REGLOGbtt"
              disabled
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
