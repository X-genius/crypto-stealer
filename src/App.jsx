import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import { makeStyles } from '@material-ui/core';
import Alert from './Components/Alert';
import { lazy, Suspense } from 'react';

const Homepage = lazy(() => import('./Pages/Homepage'));
const CoinPage = lazy(() => import('./Pages/CoinPage'));

const useStyles = makeStyles((theme) => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' Component={Homepage} exact />
            <Route path='/coins/:id' Component={CoinPage} />
          </Routes>
        </Suspense>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
