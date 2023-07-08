import LoginForm from "../components/login/LoginForm";
import RedirectMessage from "../components/common/RedirectMessage";

function Login() {
  return (
    <div>
      <LoginForm />
      <RedirectMessage message="Dont't have an account?" destination="Create Account" link="/register"/>
    </div>
  )
}

export default Login;
