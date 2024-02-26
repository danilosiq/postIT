import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";

import { login, reset } from "../../slices/authSlices";

import Message from "../../components/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  useEffect(()=>{
    dispatch(reset())
  },[dispatch])

  return (
    <div className="loginContainer">
      <div className="leftCamp">
        <h1>Faça seu Login!</h1>

        <form className="formREGLOG" onSubmit={handleSubmit}>
          <div>
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
              />{" "}
              {error && <Message type="error" msg={error} />}
            </label>

            <p>
              Nao possui cadastro? <Link to="/register">Cadastre-se</Link>
            </p>
          </div>

          <input type="submit" value="Entrar" className="REGLOGbtt" />
        </form>
      </div>
      <div className="rightCamp">
        <img
          src="https://www.giantbomb.com/a/uploads/square_small/37/375443/3014518-clown.png"
          alt=""
          className="imgREGLOG"
        />
      </div>
    </div>
  );
};

export default Login;
