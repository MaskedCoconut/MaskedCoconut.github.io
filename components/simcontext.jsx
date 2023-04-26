import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    data: null,
  };

  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
