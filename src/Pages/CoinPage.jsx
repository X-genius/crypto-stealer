import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../Config/api';
import { makeStyles, Typography } from '@material-ui/core';
import CoinInfo from '../Components/CoinInfo';
import { numberWithCommas } from '../utils/utils';

const useStyles = makeStyles((theme) => ({
  ContainerStyle: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  Sidebar: {
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey',
  },
  CryptoImage: {
    marginBottom: 20,
  },
  Heading: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  Description: {
    width: '100%',
    fontFamily: 'Montserrat',
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify',
  },
  MarketData: {
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start',
    },
  },
  SpanStyle: {
    display: 'flex',
  },
  FontFamilyStyle: {
    fontFamily: 'Montserrat',
  },
}));

const CoinPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { symbol, currency } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.ContainerStyle}>
      <div className={classes.Sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height='200'
          className={classes.CryptoImage}
        />

        <Typography variant='h3' className={classes.Heading}>
          {coin?.name}
        </Typography>

        <Typography variant='subtitle1' className={classes.Description}>
          {ReactHtmlParser(coin?.description.en.split('. ')[0])}.
        </Typography>

        <div className={classes.MarketData}>
          <span className={classes.SpanStyle}>
            <Typography variant='h5' className={classes.Heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' className={classes.FontFamilyStyle}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span className={classes.SpanStyle}>
            <Typography variant='h5' className={classes.Heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' className={classes.FontFamilyStyle}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span className={classes.SpanStyle}>
            <Typography variant='h5' className={classes.Heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' className={classes.FontFamilyStyle}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
