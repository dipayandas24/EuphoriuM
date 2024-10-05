import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; 
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Cookies from "js-cookie";  

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(Cookies.get("user") || null)
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
      } else {
        Cookies.remove("user");
      }
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
        return user;  
      })
      .catch((error) => {
        throw error; 
      });
  };

  const logout = () => {
    signOut(auth).then(() => {
      setCurrentUser(null);
      Cookies.remove("user");
    }).catch((error) => {
      console.error("Logout error: ", error);
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
