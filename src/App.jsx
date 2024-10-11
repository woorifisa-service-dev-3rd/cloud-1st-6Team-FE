import { Routes, Route } from "react-router-dom";
import GptMain from "./components/GptMain"; // GptMain 컴포넌트 import
import GptResponse from "./components/GptResponse"; // GptResponse 컴포넌트 import
import './App.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/login/Login";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_GOOGLE_CLIENTID}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/gpt-main" element={<GptMain />} /> {/* GptMain 페이지 경로 추가 */}
          <Route path="/gpt-response" element={<GptResponse />} /> {/* GptResponse 페이지 경로 추가 */}
        </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
