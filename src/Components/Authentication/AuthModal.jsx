import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Button, Tab, Tabs } from '@material-ui/core';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: 'white',
    borderRadius: 10,
  },
  LoginButton: {
    width: 145,
    height: 40,
    backgroundColor: '#EEBC1D',
  },
  AppBarStyle: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  TabsStyle: {
    borderRadius: 10,
  },
  Google: {
    padding: 24,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 20,
    fontSize: 20,
  },
}));

export default function AuthModal() {
  const classes = useStyles();
  const { setAlert } = CryptoState();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const googleAuthProvider = new GoogleAuthProvider();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tabHandleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up and Login Successful. Welcome ${res.user.email}`,
          type: 'success',
        });
        handleClose();
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: err.message,
          type: 'error',
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant='contained'
        className={classes.LoginButton}
        onClick={handleOpen}
      >
        Login/Sign Up
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position='static' className={classes.AppBarStyle}>
              <Tabs
                value={value}
                onChange={tabHandleChange}
                variant='fullWidth'
                className={classes.TabsStyle}
              >
                <Tab label='Login' />
                <Tab label='Sign Up' />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <div className={classes.Google}>
              <span>OR</span>
              <GoogleButton
                style={{
                  width: '100%',
                  outline: 'none',
                }}
                onClick={signInWithGoogle}
              />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
