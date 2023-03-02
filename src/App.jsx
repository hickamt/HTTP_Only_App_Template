import "./App.css";
import { Route, Routes } from "react-router-dom";

// Page Routes
import { AuthContextProvider } from "./components/shared/AuthContext";
import Layout from "./components/shared/Layout"; // All page routes are wrapped within the Nav Layout
import Home from "./pages/Home";
import Login from "./pages/Login";
import Employees from "./pages/Characters";

// Wrap each route to be protected in '<ProtectedRoute>'
import ProtectedRoute from "./components/shared/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute accessBy="non-authenticated">
                  <Login />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/employees"
              element={
                <ProtectedRoute accessBy="authenticated">
                  <Employees />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default App;
