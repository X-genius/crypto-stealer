import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  BoxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
  },
  ButtonStyle: {
    backgroundColor: '#EEBC1D',
  },
}));

const Login = ({ handleClose }) => {
  const classes = useStyles();
  const { setAlert } = CryptoState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: 'Please fill all the Fields',
        type: 'error',
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: 'success',
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
      return;
    }
  };

  return (
    <div className={classes.BoxContainer}>
      <TextField
        variant='outlined'
        type='email'
        label='Enter Email'
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        fullWidth
      />

      <TextField
        variant='outlined'
        label='Enter Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant='contained'
        size='large'
        className={classes.ButtonStyle}
        onClick={loginHandleSubmit}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
