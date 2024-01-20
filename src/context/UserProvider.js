import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const navigate = useNavigate()

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let user = localStorage.getItem("user");

    if (user) {
      user = await JSON.parse(user);
      setUser(user);
      navigate('/')
      return
    }

    navigate('/login')
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};
