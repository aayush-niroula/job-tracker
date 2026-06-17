import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApplicationListPage from "./pages/ApplicationListPage";
import AddApplicationPage  from "./pages/AddApplicationPage";
import EditApplicationPage  from "./pages/EditApplicationPage";
import ApplicationDetailPage from "./pages/ApplicationDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ApplicationListPage />} />
        <Route path="/applications" element={<Navigate to="/" replace />} />
        <Route path="/applications/new" element={<AddApplicationPage />} />
        <Route path="/applications/:id" element={<ApplicationDetailPage />} />
        <Route
          path="/applications/:id/edit"
          element={<EditApplicationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;