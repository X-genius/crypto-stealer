import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';

const useStyles = makeStyles((theme) => ({
  Banner: {
    backgroundImage: 'url(./bannerImage.jpg)',
  },
  BannerContainer: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
  },
  TagLine: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  TagLineHeading: {
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'Montserrat',
  },
  TagLineSubHeading: {
    color: 'darkgrey',
    textTransform: 'capitalize',
    fontFamily: 'Montserrat',
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.Banner}>
      <Container className={classes.BannerContainer}>
        <div className={classes.TagLine}>
          <Typography variant='h2' className={classes.TagLineHeading}>
            Crypto Stealer
          </Typography>
          <Typography variant='subtitle2' className={classes.TagLineSubHeading}>
            Get all the Info regarding your favourite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
