import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/auth.slice";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PoliceDashboard from "./pages/PoliceDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AskAI from "./pages/AskAI";
import SectionDetails from "./pages/SectionDetails";
import Section from "./pages/Section";
import Navbar from "./components/Navbar";
import Signup from "./pages/SignUp";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import GenerateFIR from "./pages/GenerateFIR";


import axios from "axios";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user)); // This fills the "N/A" fields with real data
        }
      } catch (err) {
        localStorage.removeItem("token"); // Token expired or invalid
      }
    };
    loadUser();
  }, [dispatch]);


  return (
    <>
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PoliceDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/sections" element={<Section />} />
          <Route path="/sections/:id" element={<SectionDetails />} />
          <Route path="/ask" element={<AskAI />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/generate-fir" element={<GenerateFIR />} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}
export default App;