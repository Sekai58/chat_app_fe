import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  const auth = false;
  return (
    <div className={` min-h-screen bg-[#1a1919]`}>
      <BrowserRouter>
        {auth ? <Navbar /> : <></>}
        <div>
          <Routes>
            <Route
              path="/login"
              element={
                auth ? (
                  <Suspense>
                    <Navigate to="/" />
                  </Suspense>
                ) : (
                  <Suspense>
                    <Login />
                  </Suspense>
                )
              }
            ></Route>

            <Route
              path="/register"
              element={
                auth ? (
                  <Suspense>
                    <Navigate to="/" />
                  </Suspense>
                ) : (
                  <Suspense>
                    <Register />
                  </Suspense>
                )
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
