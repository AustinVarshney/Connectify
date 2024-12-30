import React, { useState } from 'react'
import './SignupBody.css'
import {Link, useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../../utils';

const SignupBody = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    if(!username || !fullname || !password){
      return handleError('All fields are required!');
    }
    try {
      const url = 'http://localhost:8080/signup';
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({fullname, username, password})
      })
      const result = await response.json();
      const {success, message, error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if(error){
        const details = error?.details[0].message;
        handleError(details);
      } else if(!success){
        handleError(message);
      }
      console.log(result); 
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className='outerLoginBodyDiv'>
      <div className='innerLoginBodyDiv1'>
        <p className='innerParaLogin1'>Signup Here!</p>
        <form className='innerLoginForm' onSubmit={(e) => handleSignup(e)}>
          <Box sx={{ '& > :not(style)': { m: 1, width: '70%', textAlign: 'center' } }} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Full Name" variant="standard" onChange={(e) => setFullname(e.target.value)}/>
            <TextField id="standard-basic" label="Username" variant="standard" type='input' onChange={(e) => setUsername(e.target.value)}/>
            <TextField id="standard-basic" label="Password" variant="standard" type='password' onChange={(e) => setPassword(e.target.value)}/>
          </Box>
          <br />
          <Stack>
            <Button variant="contained" className='loginFormBtn' type='submit'>Register</Button>
          </Stack>
        </form>
        <br />
        <p className='innerParaLogin2'>Have an account? <Link to={'/login'}>Click Me</Link></p>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default SignupBody
