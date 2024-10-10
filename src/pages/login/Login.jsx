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
            'http://localhost:8080/api/auth/login', {
                authCode: codeResponse.code,
            });

        if (response.status === "200") {
          navigator("/");
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