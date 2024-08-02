import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  SelectButtonStyle: {
    border: '1px solid gold',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Montserrat',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'gold',
      color: 'black',
    },
    width: '22%',
  },
}));

const SelectButton = ({ children, onClick, selected }) => {
  const classes = useStyles();
  return (
    <span
      onClick={onClick}
      className={classes.SelectButtonStyle}
      style={{
        backgroundColor: selected ? 'gold' : '',
        color: selected ? 'black' : '',
        fontWeight: selected ? 700 : 500,
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
