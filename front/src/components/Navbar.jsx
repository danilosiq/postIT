import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Navbar.css";

import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
  BsFillPersonPlusFill,
  BsFillPersonCheckFill,
  BsArrowBarRight,
} from "react-icons/bs";

//hooks
import { useAuth } from "../hook/useAtuth";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//redux
import { logout, reset } from "../slices/authSlices";
import { getAllPhotos, searchPhoto } from "../slices/photoSlices";

const Navbar = () => {
  const { auth } = useAuth();
  const [id, setID] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [query, setQuery] = useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setID(user._id);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchPhoto(query));
    setQuery("");
  };

  return (
    <nav>
      <h1>PostIT</h1>
      <ul>
        <li>
          <form onSubmit={handleSearch}>
            <BsSearch />
            <input
              type="text"
              placeholder="Pesquisar"
              value={query || ""}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </li>

        <Link to="/">
          <li onClick={() => dispatch(getAllPhotos())}>
            <BsHouseDoorFill />
            Inicio
          </li>
        </Link>

        {!auth ? (
          <>
            <Link to="/login">
              <li>
                <BsFillPersonCheckFill />
                Entrar
              </li>
            </Link>

            <Link to="/register">
              <li>
                <BsFillPersonPlusFill />
                Cadastre-se
              </li>
            </Link>
          </>
        ) : (
          ""
        )}

        {user && (
          <>
            <Link to="/mypost">
              <li>
                <BsFillCameraFill />
                Novo Post
              </li>
            </Link>

            <Link to={`/myperfil/${user._id}`}>
              <li>
                <BsFillPersonFill />
                Meu perfil
              </li>
            </Link>
            <li>
              <span onClick={handleLogout}>
                <BsArrowBarRight />
                Sair
              </span>
            </li>
          </>
        )}

        {auth && <></>}
      </ul>
    </nav>
  );
};

export default Navbar;
