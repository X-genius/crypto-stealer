import React, { useEffect, useState } from 'react';
import { CoinList } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../utils/utils';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  CoinsTableContainer: {
    textAlign: 'center',
  },
  CoinsTableHeading: {
    margin: 18,
    fontFamily: 'Montserrat',
  },
  SearchStyle: {
    marginBottom: 20,
    width: '100%',
  },
  LinearProgressStyle: {
    backgroundColor: 'gold',
  },
  TableHeadStyle: {
    backgroundColor: '#EEBC1D',
  },
  TableCellForHeadingStyle: {
    color: 'black',
    fontWeight: 700,
    fontFamily: 'Montserrat',
  },
  row: {
    backgroundColor: '#16171a',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#131111',
    },
    fontFamily: 'Montserrat',
  },
  TableCellCoinStyle: {
    display: 'flex',
    gap: 15,
  },
  CryptoImageStyle: {
    marginBottom: 10,
  },
  CryptoTextStyle: {
    display: 'flex',
    flexDirection: 'column',
  },
  SymbolStyle: {
    textTransform: 'uppercase',
    fontSize: 22,
  },
  CryptoNameStyle: {
    color: 'darkgrey',
  },
  Profit: {
    color: 'rgb(14, 203, 129)',
    fontWeight: 500,
  },
  Loss: {
    color: 'red',
    fontWeight: 500,
  },
  PaginationList: {
    '& .MuiPaginationItem-root': {
      color: 'gold',
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});

const CoinsTable = () => {
  const classes = useStyles();
  const navigator = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { symbol, currency } = CryptoState();

  const fetchCoinList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toUpperCase().includes(search) ||
        coin.symbol.toUpperCase().includes(search) ||
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  useEffect(() => {
    fetchCoinList();
    //eslint-disable-next-line
  }, [currency]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container className={classes.CoinsTableContainer}>
        <Typography variant='h4' className={classes.CoinsTableHeading}>
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label='Search For a Crypto Currency..'
          variant='outlined'
          className={classes.SearchStyle}
          onChange={(event) => {
            setPage(1);
            setSearch(event.target.value);
          }}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress className={classes.LinearProgressStyle} />
          ) : (
            <Table>
              <TableHead className={classes.TableHeadStyle}>
                <TableRow>
                  {['Coin', 'Price', '24th Change', 'Market Cap'].map(
                    (head) => (
                      <TableCell
                        className={classes.TableCellForHeadingStyle}
                        key={head}
                        align={head === 'Coin' ? '' : 'right'}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigator(`/coins/${row.id}`)}
                        key={row.name}
                        className={classes.row}
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          className={classes.TableCellCoinStyle}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height='50'
                            className={classes.CryptoImageStyle}
                          />
                          <div className={classes.CryptoTextStyle}>
                            <span className={classes.SymbolStyle}>
                              {row.symbol}
                            </span>
                            <span className={classes.CryptoNameStyle}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell align='right'>
                          {symbol}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align='right'
                          className={profit > 0 ? classes.Profit : classes.Loss}
                        >
                          {profit && '+'}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align='right'>
                          {symbol}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {handleSearch()?.length > 10 ? (
          <Pagination
            count={(handleSearch()?.length / 10).toFixed(0)}
            style={{
              padding: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
            classes={{ ul: classes.PaginationList }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        ) : (
          <></>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
