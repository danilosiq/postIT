import React, { useEffect, useState } from "react";
import "./Home.css"
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post";
import Error404 from "../../components/Error404";



const Home = () => {
  const [erro,setErro] = useState(false)
  const { loading, error } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch()


  
  return (
<>
    {error && <Error404/>}
    <div className="homeContainer">
      <h1>Home</h1>

      <div className="postscamp">
        <Post/>
      </div>
    </div>
  </>);
};

export default Home;
