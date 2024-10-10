import { useGoogleLogin } from '@react-oauth/google';
import GoogleLoginButton from '../../../components/GoogleButton';
import axios from 'axios';

const Login = () => {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
        const tokens = await axios.post(
            'http://localhost:8080/api/auth/login', {
                authCode: codeResponse.code,
            });

        console.log(tokens);
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