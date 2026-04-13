import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import MisiekPage from "./pages/MisiekPage";
import AkzPage from "./pages/AkzPage";
import "../styles/fonts.css";

export default function App() {
  return (
    <BrowserRouter basename="/speedwayposter">
      <Routes>
        <Route path="/" element={<Navigate to="/misiek" replace />} />
        <Route path="/misiek" element={<MisiekPage />} />
        <Route path="/akz" element={<AkzPage />} />
      </Routes>
    </BrowserRouter>
  );
}