import React from "react";
import diabo from "/diabo.png";
import "./ERRO.css";
import { logout, reset } from "../slices/authSlices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const Error404 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };
  return (
    <div className="erro404">
      <div>
        <img src={diabo} alt="" />
        <h1>PAGINA NÃO ENCONTRADA</h1>
        <p>
          parece a pagina onde voce quer acessar, ou nao existe, ou voce não tem
          permissão para acessar
        </p>
        <button onClick={handleLogout}>Voltar aos conformes</button>
      </div>
    </div>
  );
};

export default Error404;
