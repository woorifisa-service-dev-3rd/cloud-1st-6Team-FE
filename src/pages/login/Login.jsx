import { useGoogleLogin } from '@react-oauth/google';
import GoogleLoginButton from '../../../components/GoogleButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigator = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
        const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
                authCode: codeResponse.code,
            },
            {
              withCredentials: "true"
            }
          );

        if (response.status < 400) {
          navigator("/gpt-main");
        }
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <>
        <GoogleLoginButton googleLogin={googleLogin}/>
    </>
  )
}

export default Login