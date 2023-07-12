import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button } from '@mui/material';
import { AccountCircle, Email, Lock, LockOpen } from '@mui/icons-material';
import * as yup from 'yup';
import './registerform.css'
import { registerUser } from "../../redux/apiCall";
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";


const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    )
    .required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterForm = () => {
  const navigate = useNavigate();
	const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
	const {username,email,password} = data;
	registerUser(dispatch,{username,email,password});
};

 

  return (
    <div className='register-form'>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('username')}
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.username}
          helperText={errors.username?.message}
          InputProps={{
            startAdornment: <AccountCircle />,
          }}
        />

        <TextField
          {...register('email')}
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            startAdornment: <Email />,
          }}
        />

        <TextField
          {...register('password')}
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            startAdornment: <Lock />,
          }}
        />

        <TextField
          {...register('confirm_password')}
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.confirm_password}
          helperText={errors.confirm_password?.message}
          InputProps={{
            startAdornment: <LockOpen />,
          }}
        />

        <Button type="submit" variant="contained" fullWidth color="primary">
          Create Account
        </Button>
      </form>
      <ToastContainer position="top-center" />
   
    </div>
  );
};

export default RegisterForm;
