import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  Carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  CarouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
  },
  BitcoinImage: {
    marginBottom: 10,
  },
  Profit: {
    color: 'rgb(14, 203, 129)',
    fontWeight: 500,
  },
  Loss: {
    color: 'red',
    fontWeight: 500,
  },
  CurrentPrice: {
    fontSize: 22,
    fontWeight: 500,
  },
}));

const Carousel = () => {
  const classes = useStyles();
  const { symbol, currency, trendingCoins, fetchTrendingCoins } = CryptoState();
  const carouselResponsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const carouselItems = trendingCoins.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.CarouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height='80'
          className={classes.BitcoinImage}
        />
        <span>
          {coin?.symbol}&nbsp;
          <span className={profit > 0 ? classes.Profit : classes.Loss}>
            {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className={classes.CurrentPrice}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  useEffect(() => {
    fetchTrendingCoins();
    //eslint-disable-next-line
  }, [currency]);

  return (
    <div className={classes.Carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={carouselResponsive}
        autoPlay
        items={carouselItems}
      />
    </div>
  );
};

export default Carousel;
