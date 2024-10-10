import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GptMain from "./components/GptMain"; // GptMain 컴포넌트 import
import GptResponse from "./components/GptResponse"; // GptResponse 컴포넌트 import
import DefaultLayout from "./layouts/DefaultLayout"; // DefaultLayout import
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout><h1>홈 페이지</h1></DefaultLayout>} />
        <Route path="/gpt-main" element={<GptMain />} /> {/* GptMain 페이지 경로 추가 */}
        <Route path="/gpt-response" element={<GptResponse />} /> {/* GptResponse 페이지 경로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
