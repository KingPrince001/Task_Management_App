import RegisterForm from "../components/register/RegisterForm";
import RedirectMessage from "../components/common/RedirectMessage";
import RegisterAnimate from '../assets/animated_svgs/queue-animate.svg';

function Register() {
  return (
    <div style={{display:'flex',gap:'100px', marginTop:'', alignItems:'center'}}>
      <div>
        <img src={RegisterAnimate} alt="Register Animation" style={{height:'80vh'}} />
      </div>
    <div>
      <RegisterForm/>
      <RedirectMessage message="Already have an account?" destination="Sign In" link="/login"/>
    </div>
    </div>
  )
}

export default Register;
