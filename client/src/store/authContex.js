import { createContext, useEffect, useState } from "react";


export const authContext = createContext({
      isAuthenticated: false,
      user: null,
      token: null,
      authenticate: (user, token) => { },
      logout: () => { }
});

function AuthContextProvider({ children }) {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [user, setUser] = useState(null);
      const [token, setToken] = useState(null);


      useEffect(() => {
            async function fetchTokenAndUser() {
                  const token = await localStorage.getItem("token");
                  const user = await localStorage.getItem("user");

                  console.log("token from local storage : ", token);
                  console.log("user from local storage : ", user);

                  if (token && user) {
                        setIsAuthenticated(true);
                        setToken(token);
                        setUser(user);
                  }
            }

            fetchTokenAndUser();
      }, []);


      const authenticate = (user, token) => {
            
            console.log("authentication info : ", {
                  user,
                  token
            });

            setIsAuthenticated(true);
            setUser(user);
            setToken(token);

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
      }


      function logout() {
            setIsAuthenticated(false);
            setUser(null);
            setToken(null);

            localStorage.removeItem("token");
            localStorage.removeItem("user");
      }

      const value = {
            isAuthenticated,
            user,
            token,
            authenticate,
            logout
      }

      return (
            <authContext.Provider value={value}>
                  {children}
            </authContext.Provider>
      )
}

export default AuthContextProvider;