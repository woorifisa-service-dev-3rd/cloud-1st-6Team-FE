import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 네비게이션을 위한 import 추가
import DefaultLayout from "../layouts/DefaultLayout";
import "./GptMain.css"; // CSS 파일 따로 관리

const GptMain = () => {
    const [age, setAge] = useState("");
    const [mood, setMood] = useState("");
    const [gender, setGender] = useState("");
    const [foodType, setFoodType] = useState("");
    const navigate = useNavigate(); // navigate 훅 사용

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // GPT API 호출을 위한 POST 요청
        const requestBody = {
            prompt: `${age},${mood},${gender},${foodType}`,
        };
    
        // 로컬 스토리지 또는 상태에서 토큰 가져오기 (예: JWT 토큰)
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 'token' 키로 저장된 토큰 가져오기
    
        try {
            const response = await fetch("https://localhost:8080/api/food-recommendation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Authorization 헤더에 토큰 추가
                },
                body: JSON.stringify(requestBody), // requestBody를 JSON 형식으로 변환하여 전송
            });
    
            const data = await response.json(); // 응답을 JSON으로 파싱
            
            if (data.status === "200") {
                // 응답이 성공적일 경우 GptResponse 페이지로 네비게이션
                navigate("/gpt-response", { state: data });
            } else {
                console.error(data.msg); // 오류 메시지 출력
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    return (
        <DefaultLayout>
            <div className="gpt-main-container">
                <h2>음식 추천</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="age">나이</label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="나이를 입력하세요"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>기분</label>
                        <div className="button-group">
                            {["기쁨", "슬픔", "분노", "평온", "무기력"].map((moodOption) => (
                                <button
                                    type="button"
                                    key={moodOption}
                                    className={mood === moodOption ? "selected" : ""}
                                    onClick={() => setMood(moodOption)}
                                >
                                    {moodOption}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label>성별</label>
                        <div className="button-group">
                            {["남자", "여자"].map((genderOption) => (
                                <button
                                    type="button"
                                    key={genderOption}
                                    className={gender === genderOption ? "selected" : ""}
                                    onClick={() => setGender(genderOption)}
                                >
                                    {genderOption}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label>음식 종류</label>
                        <div className="button-group">
                            {["한식", "중식", "양식"].map((foodOption) => (
                                <button
                                    type="button"
                                    key={foodOption}
                                    className={foodType === foodOption ? "selected" : ""}
                                    onClick={() => setFoodType(foodOption)}
                                >
                                    {foodOption}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-button">추천받기</button>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default GptMain;
