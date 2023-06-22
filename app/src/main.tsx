import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "./context/configContext";
import { UserProvider } from "./context/userContext";
import Toolkits from "./pages/toolkits";
import Old from "./pages/old";
import Create from "./pages/create";

// import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/toolkits" element={<Toolkits />} />
          <Route path="/old" element={<Old />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </ConfigProvider>
);
