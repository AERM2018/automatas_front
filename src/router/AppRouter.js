import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { HomePage } from "../pages/HomePage";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/automatas" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/automatas" />} />
        </Routes>
      </div>
    </Router>
  );
};
