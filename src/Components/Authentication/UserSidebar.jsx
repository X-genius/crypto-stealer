import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Button } from '@material-ui/core';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { numberWithCommas } from '../../utils/utils';
import { AiFillDelete } from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';

const useStyles = makeStyles({
  AvatarStyle: {
    height: 38,
    width: 38,
    cursor: 'pointer',
    backgroundColor: '#EEBC1D',
  },
  Container: {
    width: 350,
    padding: 25,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'monospace',
  },
  Profile: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    height: '92%',
  },
  Picture: {
    width: 200,
    height: 200,
    cursor: 'pointer',
    backgroundColor: '#EEBC1D',
    objectFit: 'contain',
  },
  UserDisplayName: {
    width: '100%',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bolder',
    wordWrap: 'break-word',
  },
  Logout: {
    height: '8%',
    width: '100%',
    backgroundColor: '#EEBC1D',
    marginTop: 20,
  },
  Watchlist: {
    flex: 1,
    width: '100%',
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    overflowY: 'scroll',
  },
  WatchlistSpan: {
    fontSize: 15,
    textShadow: '0 0 5px black',
  },
  Coin: {
    padding: 10,
    borderRadius: 5,
    color: 'black',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEBC1D',
    boxShadow: '0 0 3px black',
  },
  CoinSymbolPriceStyle: {
    display: 'flex',
    gap: 8,
  },
  AiDeleteFillStyle: {
    cursor: 'pointer',
  },
});

export default function UserSidebar() {
  const classes = useStyles();
  const { user, setAlert, coins, watchlist, symbol } = CryptoState();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: 'Logout Successful!',
      type: 'success',
    });
    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: 'success',
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            className={classes.AvatarStyle}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.Container}>
              <div className={classes.Profile}>
                <Avatar
                  className={classes.Picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span className={classes.UserDisplayName}>
                  {user.displayName || user.email}
                </span>

                <div className={classes.Watchlist}>
                  <span className={classes.WatchlistSpan}>Watchlist</span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id)) {
                      return (
                        <div className={classes.Coin}>
                          <span>{coin.name}</span>
                          <span className={classes.CoinSymbolPriceStyle}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              className={classes.AiDeleteFillStyle}
                              fontSize='16'
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    } else {
                      return <></>;
                    }
                  })}
                </div>
              </div>
              <Button
                variant='outlined'
                className={classes.Logout}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
