import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { ConfigProvider } from "./context/ConfigContext";

function App() {
  return (
    <div>
      <Header />

      <ConfigProvider>
        <Home />
      </ConfigProvider>
    </div>
  );
}

export default App;
