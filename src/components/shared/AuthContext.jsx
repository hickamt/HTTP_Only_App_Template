import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // If page is refreshed, this looks for local stored information
  const [user, setUser] = useState(() => {
    let userProfle = localStorage.getItem("userProfile");
    if (userProfle) {
      return JSON.parse(userProfle);
    }
    return null;
  });

  const navigate = useNavigate();

  // first API await is for authenticiation and the response is
  // an http only cookie
  // second API await is for a verified call to get and store the
  // users information which is attached to the cookie
  const login = async (payload) => {
    let apiResponse = await axios
      .post("http://localhost:5500/auth", payload, {
        withCredentials: true,
      })
    // .catch(function (error) {} // Need to properly catch & handle statusCodes from server

    localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
    console.log("API Response Data:", apiResponse.data);
    setUser(apiResponse.data);
    navigate("/");
  };

  // LOGOUT
  const logout = async () => {
    await axios.get("http://localhost:5500/logout"),
      {
        withCredentials: true,
      };
    /* Local Storage: Cleared but Cookies are not! */
    console.log("User Info Before Logout", user);

    user.accessToken = null;
    user.refreshToken = null;
    user.email = null;
    localStorage.removeItem("userProfile");
    setUser(null);

    console.log("User Info After Logout", user);
    navigate("/login");
  };

  // AuthContextProvider 'Wraps' the entire application/routes as the
  // singular 'Parent'
  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
