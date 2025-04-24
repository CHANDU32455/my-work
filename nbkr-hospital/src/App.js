// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Chatbot from "./components/Chatbot";
import EmergencyPage from "./pages/emergency";

import Overall from "./pages/Overall";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/overall" element={<Overall />} />
        <Route path="/emergency" element={<EmergencyPage />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
