import React from "react";
import { Text } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Explore";
import Form from "./pages/Form";
import Dashboard from "./pages/Dashboard";
import Info from "./pages/Info";

const App = () => {
  if (!window.ethereum) {
    return (
      <div className="w-full h-screen flex justify-center items-center gradient-bg-welcome">
        <h1 className="text-2xl text-white text-center">
          Metamask or other EIP-1102 / EIP-1193 compliant wallet not found,
          <br />
          Please install Metamask
        </h1>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/">
        <Route path="explore" element={<Home />} />
        <Route path="form" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy/:id" element={<Info />} />
      </Route>
    </Routes>
  );
};

export default App;
