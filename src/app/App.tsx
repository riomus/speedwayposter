import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import MisiekPage from "./pages/MisiekPage";
import AkzPage from "./pages/AkzPage";
import Kh118Page from "./pages/Kh118Page";
import "../styles/fonts.css";

export default function App() {
  return (
    <BrowserRouter basename="/speedwayposter">
      <Routes>
        <Route path="/" element={<Navigate to="/misiek" replace />} />
        <Route path="/misiek" element={<MisiekPage />} />
        <Route path="/akz" element={<AkzPage />} />
        <Route path="/kh118" element={<Kh118Page />} />
      </Routes>
    </BrowserRouter>
  );
}