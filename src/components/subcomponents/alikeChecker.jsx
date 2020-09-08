import React, { useState, useCallback, useEffect } from 'react';
import leven from 'leven';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 400,
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
  alikePair: {
    border: 1
  },
  loadingContainer: {
    width: '100%',
    height: theme.spacing(4)
  },
  loading: {
    minWidth: '100%'
  },
}));

function AlikeChecker({ data, onCheck }) {
  const classes = useStyles();
  const [loading, setLoading] = useState();
  const [on, setOn] = useState(false);
  const [alikeItems, setAlikeItems] = useState();

  const getAlikeItems = useCallback(() => {
    const alike = [];
    const checked = [];

    const calcSimilarity = (a, b) => {
      const longer = (a.length > b.length) ? b.length : a.length;
      return (longer - calcDist(a, b)) / parseFloat(longer);
    };
    // calculates edit distance between two strings. Levenshtein distance algorithm
    const calcDist = (a, b) => leven(a, b);

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (checked.find(v => v === data[j]['id']))
          continue;
        if (i === j)
          continue;
        const similarity = calcSimilarity(data[i]['email'], data[j]['email']);

        if (similarity > .90) {
          alike.push({ a: data[i], b: data[j], s: similarity });
        }
      }
      checked.push(data[i]['id']);
    }
    setAlikeItems(alike);

  }, [data])

  const handleClick = useCallback(async () => {
    setLoading(true);
    if (!data) {
      await onCheck();
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    setOn(true);
    setLoading(false);
  }, [onCheck, data]);

  useEffect(() => {
    if (!data)
      return;
    getAlikeItems()
  }, [data, getAlikeItems]);


  return (
    <Paper className={classes.root} variant="outlined" square >
      {on && alikeItems ?
        <Grid container direction="column" >
          {alikeItems.length ?
            alikeItems.map((person, idx) => {
              const { a, b } = person;
              return (
                <Grid key={idx} container direction="row" className={classes.alikePair}>
                  <Grid item>
                    <ListItem dense divider button key={person.id} >
                      <ListItemText primary={a.name} secondary={a.email} />
                    </ListItem>
                  </Grid>
                  <Grid item>
                    <ListItem dense divider button key={person.id} >
                      <ListItemText primary={b.name} secondary={b.email} />
                    </ListItem>
                  </Grid>
                </Grid>
              );
            }) : null}
        </Grid> :
        <div className={classes.container} >
          <Typography variant="body1" >Duplicated people</Typography>
          <div className={classes.loadingContainer}>
            {loading ? <LinearProgress className={classes.loading} /> : null}
          </div>

          <Button variant="contained" color="secondary" onClick={() => handleClick()} className={classes.button} disabled={!!loading} >Check</Button>
        </div>}
    </Paper>
  );
}

AlikeChecker.propTypes = {
  data: PropTypes.array,
  onCheck: PropTypes.func
};

export default AlikeChecker;
