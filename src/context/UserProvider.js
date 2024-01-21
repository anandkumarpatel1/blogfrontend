import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem('user-token')

    if (user) {
      user = await JSON.parse(user);
      setUser(user);
      return
    }

    if(!token){
      navigate('/login')
    }

    navigate('/login')
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};
