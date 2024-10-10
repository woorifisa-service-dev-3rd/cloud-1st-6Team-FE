import axios from "axios";

export const login = async (idToken, accessToken) => {
  const data = {
    idToken: idToken,
    accessToken: accessToken
  }
  return await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
    data,
    {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: "true",
    }
  ).then(res => console.log(res));
} 