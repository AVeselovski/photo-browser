import React, { useContext, useState } from "react";

const UiContext = React.createContext();

export function useUi() {
  return useContext(UiContext);
}

export function UiProvider({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function toggleNav() {
    setMobileNavOpen((mobileNavOpen) => !mobileNavOpen);
  }

  return <UiContext.Provider value={{ mobileNavOpen, toggleNav }}>{children}</UiContext.Provider>;
}
