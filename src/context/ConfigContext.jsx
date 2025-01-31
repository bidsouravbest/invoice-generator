import { createContext, useEffect, useState } from "react";

const ConfigContext = createContext();

const ConfigProvider = ({ children }) => {
  const [configValues, setConfigValues] = useState({});

  useEffect(() => {
    fetch("/config/config.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setConfigValues(data);
      })
      .catch((err) => {
        console.log("Error in fetching config: ", err);
      });
  }, []);

  return (
    <ConfigContext.Provider value={configValues}>
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigProvider, ConfigContext };
