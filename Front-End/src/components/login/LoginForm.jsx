import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Typography } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import * as yup from 'yup';
import './login.css';
import { loginUser } from '../../redux/apiCall';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const success = await loginUser(dispatch, data);
    console.log(success)
    if (success) {
      navigate('/homePage');
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Typography variant="h4" component="h1">
          Welcome back to TaskPro.
        </Typography>
        <Typography variant="subtitle1" component="p">
          Get your day back to plan.
        </Typography>
      </div>

      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
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

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default LoginForm;
