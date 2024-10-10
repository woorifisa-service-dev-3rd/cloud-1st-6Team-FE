import { Route, Routes } from "react-router-dom";
import './App.css'
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_GOOGLE_CLIENTID}>
        <Routes>
          <Route path="/login" element={<Login />}/>
          {/* <Route path="/register" element={<RegisterPage />}/> */}
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
