import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../Config/api';
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../Config/days';
import SelectButton from './SelectButton';

const useStyles = makeStyles((theme) => ({
  Container: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
  CircularProgressStyle: {
    color: 'gold',
  },
  ButtonsStyle: {
    display: 'flex',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '100%',
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

const CoinInfo = ({ coin }) => {
  const classes = useStyles();
  const { currency } = CryptoState();
  const [days, setDays] = useState(1);
  const [historicData, setHistoricData] = useState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin?.id, days, currency));
    setHistoricData(data.prices);
  };

  useEffect(() => {
    if (coin) {
      fetchHistoricData();
    }
    //eslint-disable-next-line
  }, [coin, currency, days]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.Container}>
        {!historicData ? (
          <CircularProgress
            className={classes.CircularProgressStyle}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: '#EEBC1D',
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div className={classes.ButtonsStyle}>
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
