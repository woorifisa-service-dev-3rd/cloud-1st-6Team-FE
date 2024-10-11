import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // useNavigate 추가
import GptMain from "./components/GptMain"; // GptMain 컴포넌트 import
import GptResponse from "./components/GptResponse"; // GptResponse 컴포넌트 import
import DefaultLayout from "./layouts/DefaultLayout"; // DefaultLayout import
import './App.css';

const HomeButton = () => {
  const navigate = useNavigate(); // navigate 훅 사용

  return (
    <button onClick={() => navigate("/gpt-main")}>
      <h1>홈페이지</h1>
    </button>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout><HomeButton /></DefaultLayout>} /> {/* 홈페이지 버튼 추가 */}
        <Route path="/gpt-main" element={<GptMain />} /> {/* GptMain 페이지 경로 추가 */}
        <Route path="/gpt-response" element={<GptResponse />} /> {/* GptResponse 페이지 경로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
