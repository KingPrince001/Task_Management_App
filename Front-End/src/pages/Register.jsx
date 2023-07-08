import RegisterForm from "../components/register/RegisterForm";
import RedirectMessage from "../components/common/RedirectMessage";

function Register() {
  return (
    <div>
      <RegisterForm/>
      <RedirectMessage message="Already have an account?" destination="Sign In" link="/login"/>
    </div>
  )
}

export default Register;
