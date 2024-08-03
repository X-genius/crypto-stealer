import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core';
import Alert from './Components/Alert';

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
        <Routes>
          <Route path='/' Component={Homepage} exact />
          <Route path='/coins/:id' Component={CoinPage} />
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
