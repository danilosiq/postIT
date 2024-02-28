import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./Register.css";
import Message from "../../components/Message";
import ui from "/ui.png"

//redux
import { register, reset } from "../../slices/authSlices";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [COpassword, setCopassword] = useState("");
  const [ERRO, setERRO] = useState("");

  const dispatch = useDispatch()

  const {loading, error} = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password != COpassword) {
      setERRO("senhas diferentes");
      return;
    }

    const user = {
      name: username,
      email,
      password,
      COpassword,
      bio:""
    };

    
    dispatch(register(user))
   
  };

  useEffect(()=>{
    dispatch(reset())
  },[dispatch])

  return (
    <div className="RegisterContainer">
      <div className="leftCamp">
        <img
          src={ui}
          alt=""
          className="imgREGLOG"
        />
      </div>
      <div className="rightCamp">
        <h1>Cadastre-se!</h1>
        <form className="formREGLOG" onSubmit={handleSubmit}>
          <div>
            <label>
              Nome de Usuario: <br />
              <input
                type="text"
                placeholder="Usuario"
                className="inputCamp"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </label>
            <label>
              Email: <br />
              <input
                type="email"
                placeholder="Email"
                className="inputCamp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Senha: <br />
              <input
                type="password"
                placeholder="Senha"
                className="inputCamp"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Confirme a senha: <br />
              <input
                type="password"
                placeholder="Confirme a senha"
                className="inputCamp"
                value={COpassword}
                onChange={(e) => setCopassword(e.target.value)}
              />
              {error && <Message type="error" msg={error}/>}
            </label>

            <p>
              Ja possui cadastro? <Link to="/login">Entrar</Link>
            </p>
          </div>
          {!loading && <input type="submit" value="Entrar" className="REGLOGbtt" />}
          {loading && <input type="submit" value="Aguarde..." className="REGLOGbtt" disabled/>}
          
        </form>
      </div>
    </div>
  );
};

export default Register;
