
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AIChat from "./pages/AIChat";
import PatientProtectedRoute from "./components/PatientProtectedRoute";
import PatientDashboard from "./pages/PatientDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PatientProtectedRoute />}>
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />}
        />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
