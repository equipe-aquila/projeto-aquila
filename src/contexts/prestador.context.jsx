import { useEffect } from "react";
import { createContext, useState } from "react";
import useLocalStorage from "./UseLocalStorage";

export const PrestadorContext = createContext({
  selectedPrestador: null,
  setSelectedPrestador: () => null,
  selectedFunc: null,
  setSelectedFunc: () => null
});

export const PrestadorProvider = ({ children }) => {
  const [selectedPrestador, setSelectedPrestador] = useLocalStorage(
    "selectedPrestador",
    null
  );

  const [selectedFunc, setSelectedFunc] = useState(null);

  useEffect(() => {
    if (selectedPrestador && selectedPrestador.id) {
      setSelectedPrestador(selectedPrestador);
    }
  }, []);

  const value = {
    selectedPrestador,
    setSelectedPrestador,
    selectedFunc,
    setSelectedFunc
  };

  return (
    <PrestadorContext.Provider value={value}>
      {children}
    </PrestadorContext.Provider>
  );
};
