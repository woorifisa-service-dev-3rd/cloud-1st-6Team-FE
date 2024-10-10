import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import "./GptMain.css";
import axios from "axios"; // axios import 추가

const GptMain = () => {
    const [age, setAge] = useState("");
    const [mood, setMood] = useState("");
    const [gender, setGender] = useState("");
    const [foodType, setFoodType] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const API_KEY = import.meta.env.VITE_API_KEY; // Vite 환경 변수에서 API 키 가져오기



    const getWeather = async (lat, lon) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            const weatherDescription = res.data.weather[0].description;
            const temperature = res.data.main.temp;

            // 날씨 정보 콘솔 출력
            console.log(`현재 위치: ${lat}, ${lon}`);
            console.log(`날씨: ${weatherDescription}`);
            console.log(`온도: ${temperature}°C`);  
        } catch (err) {
            console.error("날씨 정보를 가져오는 중 오류 발생:", err);
            setErrorMessage("날씨 정보를 가져오는 데 실패했습니다."); // 오류 메시지 설정
        }
    };
    useEffect(() => {
        let isMounted = true; // 컴포넌트가 마운트 상태인지 확인
    
        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (isMounted) {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;
                    getWeather(lat, lon); // 현재 위치의 날씨 정보를 가져오는 함수 호출
                }
            },
            (error) => {
                if (isMounted) {
                    console.error("Geolocation error:", error);
                    setErrorMessage("위치 정보를 가져오는 데 실패했습니다.");
                }
            }
        );
    
        // cleanup 함수에서 마운트 상태 변경
        return () => {
            isMounted = false;
        };
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            prompt: `나는 ${age}살 이야, 나의 현재 기분은 ${mood}이야, 나의 성별은 ${gender}이야, 내가 먹고싶은 음식의 종류는 ${foodType}이야, 지금의 날씨는 ${weatherDescription}이고, 현재 온도는 ${temperature}이야`,
        };

        const token = localStorage.getItem("token");

        try {
            const response = await fetch("https://localhost:8080/api/food-recommendation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (data.status === "200") {
                navigate("/gpt-response", { state: data });
            } else {
                setErrorMessage(data.msg);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("서버와 연결할 수 없습니다.");
        }
    };

    return (
        <DefaultLayout>
            <div className="gpt-main-container">
                <h2>개점메추</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                            min={1}
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
