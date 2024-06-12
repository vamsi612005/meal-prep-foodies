import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, CssBaseline, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import bgimage from './Foody1.jpg';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Username: ', username, 'Password: ', password);

    try{
      await axios.post('http://localhost:5000/register', {
        username,
        email,
        password
      });
      history.push('/login');
    }catch(err){
      console.error(err);
    }
    
    // console.log(/Foody.jpg)
};

  return (
    <CssBaseline>
    <div style={{
        backgroundImage:`url(${bgimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width:'100vw',
    }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <CenteredBox>
      <form onSubmit={handleSubmit} method="POST">
        <Typography variant="h2" component="h2" fontFamily="monospace" sx={{ color: 'white' }}>
            Register
        </Typography>
        <br/>
        <Typography variant="h5" component="h5" fontFamily="monospace" sx={{ color: 'white' }}>
            Username:
        </Typography>
        <TextField
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        fullWidth
        required
        sx={{
          borderColor: '#808080',
          color: 'white',
          "& .MuiOutlinedInput-root": {
            '& fieldset':{
              borderColor: '#808080',
            },
            '& input': {
              color: 'white',
            },
          },
        }}/>
        <Typography variant="h5" component="h5" fontFamily="monospace" sx={{ color: 'white' }}>
            Email:
        </Typography>
        <TextField
        variant="outlined"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
        required
        sx={{
          borderColor: '#808080',
          color: 'white',
          "& .MuiOutlinedInput-root": {
            '& fieldset':{
              borderColor: '#808080',
            },
            '& input': {
              color: 'white',
            },
          },
        }}/>
        <Typography variant="h5" component="h5" fontFamily="monospace" sx={{ color: 'white' }}>
            Password:
        </Typography>
        <TextField
        variant="outlined"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
        required
        sx={{
          borderColor: '#808080',
          color:'white',
          "& .MuiOutlinedInput-root": {
            '& fieldset':{
              borderColor: '#808080',
            },
            '& input': {
              color: 'white',
            },
          },
        }}/>
        <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
      <br/>
      <br/>
      <Typography fontFamily='monospace' sx={{ color: 'white' }}>
        Have an account already?
      </Typography>
      <br/>
      <Link to="/login" style= {{ color: 'white', textDecoration: 'underline'}}>Sign in</Link>
      </form>
      </CenteredBox>
      </Box>
    </div>
    </CssBaseline>
  )
}

const CenteredBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent:'center',
  padding: '20px 50px 20px 50px',
  backgroundColor: 'rgba(0,0,0,0.6)',
  width:'fitContent',
  borderRadius: 10,
  backdropFilter:'blur(10px)',
});
