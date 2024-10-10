import { useLocation } from "react-router-dom"; // URL에서 상태를 가져오기 위해 사용
import DefaultLayout from "../layouts/DefaultLayout";
import "./GptResponse.css"; // CSS 파일 따로 관리

const GptResponse = () => {
    const location = useLocation();
    const { status, msg, data } = location.state || {}; // GptMain에서 전달된 상태를 가져옴

    return (
        <DefaultLayout>
            <div className="gpt-response-container">
                {status === "200" ? ( // 상태가 200일 경우
                    <>
                        <h2>추천 결과</h2>
                        <div className="response-data">
                            <img src={data?.image} alt="추천 음식" className="food-image" />
                            <p className="food-response">{data?.response}</p>
                        </div>
                    </>
                ) : (
                    <h2>오류가 발생했습니다: {msg}</h2> // 상태가 200이 아닐 경우 오류 메시지 표시
                )}
            </div>
        </DefaultLayout>
    );
};

export default GptResponse;
