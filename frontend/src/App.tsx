import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";

const App: React.FC = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
