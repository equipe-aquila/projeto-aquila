import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  loading: false,
  setLoading: () => null,
  isPrestador: false,
  setIsPrestador: () => null
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPrestador, setIsPrestador] = useState(
    JSON.parse(localStorage.getItem("isPrestador"))
  );
  const value = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    isPrestador,
    setIsPrestador
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
