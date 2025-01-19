import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import List from "./components/List";

const App = () => {
  return (
    <div className="bg-gray-100 container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
