import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginBody.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../../utils';

const LoginBody = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      return handleError('All fields are required!');
    }
    try {
      const url = 'http://localhost:8080/login';
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      const result = await response.json();
      const { success, message, jwtToken, fullname, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('LoggedInUser', fullname);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <div className='outerLoginBodyDiv'>
      <div className='innerLoginBodyDiv1'>
        <p className='innerParaLogin1'>Login Here!</p>
        <form className='innerLoginForm' onSubmit={(e) => handleLogin(e)}>
          <Box sx={{ '& > :not(style)': { m: 1, width: '70%', textAlign: 'center' } }} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Username" type='input' variant="standard" onChange={(e) => setUsername(e.target.value)} />
            <TextField id="standard-basic" label="Password" type='password' variant="standard" onChange={(e) => setPassword(e.target.value)} />
          </Box>
          <br />
          <Stack>
            <Button variant="contained" className='loginFormBtn' type='submit'>Login</Button>
          </Stack>
        </form>
        <br />
        <p className='innerParaLogin2'>Have not account? <Link to={'/signup'}>Click Me</Link></p>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default LoginBody
