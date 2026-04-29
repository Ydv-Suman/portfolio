import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Website from "./routes/website.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Website />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
