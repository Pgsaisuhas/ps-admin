import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./auth/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ModeToggle, ModeToggleWrapper } from "./components/mode-toggle";
import DetailedPage from "./pages/DetailedPage";
import AddProblem from "./pages/AddProblem";

function App() {
  return (
    <BrowserRouter>
      <ModeToggleWrapper />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/detailed/:problemId" element={<DetailedPage />} />
          <Route path="/addproblem" element={<AddProblem />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
