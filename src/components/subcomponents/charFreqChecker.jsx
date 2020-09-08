import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 400,
    maxHeight: 500
  },  
  emails: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: 'auto'
  },
  loadingContainer: {
    width: '100%',
    height: theme.spacing(4)
  },
  loading: {
    minWidth: '100%'
  },
  tableContainer: {
    maxHeight: 350,
    maxWidth: 350,
  },
  table: {
    width: 300,
    overflowY: 'scroll'
  },
  tableRow: {
    maxWidth: 100
  },
  tableCell: {}
}));

function CharFreqChecker({ data, onCheck }) {
  const classes = useStyles();
  const [loading, setLoading] = useState();
  const [on, setOn] = useState(false);
  const [freq, setFreq] = useState();

  const countFrequence = useCallback(() => {
    const freq = {};
    const freqArr = [];
    if (!data)
      return freq;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        const char = data[i].charAt(j);
        if (freq[char]) {
          freq[char]++;
        } else {
          freq[char] = 1;
        }
      }
    }
    for (let char in freq) {
      freqArr.push([char, freq[char]]);
    }
    freqArr.sort((a, b) => b[1] - a[1]);
    setFreq(freqArr);
  }, [data]);

  const handleClick = useCallback(async () => {
    setLoading(true);
    if (!data) {
      await onCheck();
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    countFrequence();
    setOn(true);
    setLoading(false);
  }, [onCheck, countFrequence, data]);

  useEffect(() => {
    if (!data)
      return;
    countFrequence()
  }, [data, countFrequence]);

  return (
    <Paper className={classes.root} variant="outlined" square >
      {on && freq ? 
        <TableContainer className={classes.tableContainer} >
          <Table className={classes.table} size="small" aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} align="center" >Characters frequency</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell} padding="checkbox">Char</TableCell>
                <TableCell className={classes.tableCell} padding="checkbox">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {freq.map((char) => (
                <TableRow key={char[0]}>
                  <TableCell className={classes.tableCell}component="th" scope="row" >{char[0]}</TableCell>
                  <TableCell className={classes.tableCell} >{char[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        : 
        <div className={classes.container} >
          <Typography variant="body1" align="center" >Characters frequency count over people emails</Typography>
          <div className={classes.loadingContainer}>
            {loading ? <LinearProgress className={classes.loading} /> : null}
          </div>
          
          <Button variant="contained" color="secondary" onClick={() => handleClick()} className={classes.button} disabled={!!loading} >Calculate</Button>
        </div>}
    </Paper>
  );
}

CharFreqChecker.propTypes = {
  data: PropTypes.array,
  onCheck: PropTypes.func
};

export default CharFreqChecker;
