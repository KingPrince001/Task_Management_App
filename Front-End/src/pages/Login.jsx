import LoginForm from "../components/login/LoginForm";
import RedirectMessage from "../components/common/RedirectMessage";
import LoginAnimate from '../assets/animated_svgs/authentication-animate.svg';

function Login() {
  return (
  <div style={{display:'flex', gap:'90px',margin:'40px 50px', alignItems:'center'}}>
       <div className="login-animate">
<img src={LoginAnimate} alt="Login Animation" style={{height:'80vh'}} />
    </div>
    <div>
      <LoginForm />
      <div style={{marginTop:'20px'}}>
      <RedirectMessage message="Dont't have an account?" destination="Create Account" link="/register"/>
      </div>
     
    </div>
 
    </div>
  )
}

export default Login;
