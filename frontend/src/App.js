import React from "react";
import { Text } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Explore";
import Form from "./pages/Form";

const App = () => {
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
	  <Route path="/">
		  	<Route path="explore" element={<Home />} />
		  	<Route path="form" element={<Form />} />
	  </Route>
    </Routes>
  );
};

export default App;
