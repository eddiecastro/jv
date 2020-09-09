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
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
    maxHeight: 400,
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
  duplicatedItem: {
    maxWidth: 180
  }
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
      const likeness = .90
      for (let j = 0; j < data.length; j++) {
        if (checked.find(v => v === data[j]['id']))
          continue;
        if (i === j)
          continue;
        const similarity = calcSimilarity(data[i]['email'], data[j]['email']);

        if (similarity > likeness) {
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
    <Paper elevation={3} className={classes.root} square >
      {on && alikeItems ?
        <Grid container direction="column">
          <Typography variant="body1" align="center" >Possible duplicated people</Typography>
          {alikeItems.length ?
            alikeItems.map((person, idx) => {
              const { a, b } = person;
              return (
                <Grid key={idx} container direction="row" justify="center" >
                  <Grid item className={classes.duplicatedItem}>
                    <ListItem dense divider button key={person.id} >
                      <ListItemText 
                        primary={a.name} 
                        primaryTypographyProps={{ noWrap: true }} 
                        secondary={a.email} 
                        secondaryTypographyProps={{ noWrap: true }} />
                    </ListItem>
                  </Grid>
                  <Grid item className={classes.duplicatedItem}>
                    <ListItem dense divider button key={person.id} >
                      <ListItemText 
                        primary={b.name} 
                        primaryTypographyProps={{ noWrap: true }} 
                        secondary={b.email} 
                        secondaryTypographyProps={{ noWrap: true }} />
                    </ListItem>
                  </Grid>
                </Grid>
              );
            }) : null}
        </Grid> :
        <div className={classes.container} >
          <Typography variant="body1" align="center" >Check if there're duplicated records on people</Typography>
      
          <div className={classes.loadingContainer}>
            {loading ? <LinearProgress color="secondary" /> : null}
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
