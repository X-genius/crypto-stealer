import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';
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
const Signup = ({ handleClose }) => {
  const classes = useStyles();
  const { setAlert } = CryptoState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signupHandleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Passwords do not match',
        type: 'error',
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
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

      <TextField
        variant='outlined'
        label='Confirm Password'
        type='password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant='contained'
        size='large'
        className={classes.ButtonStyle}
        onClick={signupHandleSubmit}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Signup;
