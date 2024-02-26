import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//css
import "./App.css";

//hooks
import { useAuth } from "./hook/useAtuth";

//pages
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Footer from "./components/Footer";
import MyPost from "./pages/myPost/MyPost";
import MyProfile from "./pages/myProfile/MyProfile";
import EditProfile from "./pages/editProfile/EditProfile";
import UniqPost from "./pages/uniqPost/UniqPost";
import EditPost from "./pages/editPost/EditPost";
import UniqProfile from "./pages/uniqProfile/UniqProfile";


function App() {
  const { auth, loading } = useAuth();
  if (loading) {
    return <h1>carregando...</h1>;
  }
  
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!auth ? <Login /> : <Home />} />
            <Route path="/register" element={!auth ? <Register /> : <Home />} />
            <Route path="/mypost" element={auth ? <MyPost /> : <Login />} />
            <Route
              path="/myperfil/:id"
              element={auth ? <MyProfile /> : <Login />}
            />
            <Route
              path="/editProfile"
              element={auth ? <EditProfile /> : <Login />}
            />
            <Route path="/post/:id" element={auth ? <UniqPost /> : <Login />} />
            <Route
              path="/editpost/:id"
              element={auth ? <EditPost /> : <Login />}
            />
            <Route
              path="/uniqprofile/:id"
              element={auth ? <UniqProfile /> : <Login />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
