import {useSelector } from "react-redux";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);
  const [idUSER, setIDUSER] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setAuth(true);
      setIDUSER(user._id)
    } else {
      setAuth(false);
    }
    setLoading(false);
    
  }, [user]);
  return {auth, loading, idUSER}
};
