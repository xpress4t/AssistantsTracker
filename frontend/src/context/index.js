import React, { createContext, useContext, useState } from "react";

const GlobalState = createContext();

const GlobalStateContext = ({ children }) => {
  const [user, setUser] = useState(undefined);

  return (
    <GlobalState.Provider value={{ user, setUser }}>
      {children}
    </GlobalState.Provider>
  );
};

export default GlobalStateContext;

export const useGlobalState = () => {
  return useContext(GlobalState);
};
