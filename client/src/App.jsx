import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRouter from "./pages/Public/PublicRouter";
import AdminRouter from "./pages/Admin/AdminRouter";
import AuthRouter from "./pages/Auth/AuthRouter";

import "./style.scss";


function App() {
  return (
    <div className="app">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<PublicRouter />} />
            <Route path="/admin/*" element={
              <AdminRouter />
            } />
            <Route path="/auth/*" element={<AuthRouter />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>

  );
}

export default App;
