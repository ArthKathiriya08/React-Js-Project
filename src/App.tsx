import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import ViewUsers from "./pages/ViewUsers";
import "./App.css";

// Main App component configuring application routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for Registration Page */}
        <Route path="/" element={<Register />} />
        {/* Route for Viewing Registered Users */}
        <Route path="/users" element={<ViewUsers />} />
        {/* Redirect any unknown route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;