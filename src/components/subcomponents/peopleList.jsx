import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
    margin: 'auto',
  },  
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  pagerContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  pager: {
    margin: 'auto'
  }
}));

function PeopleList({ people, paging, onSelect }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState();

  const onPageSelet = useCallback(async (page) => {
    setLoading(true);
    await onSelect(page);
    setPage(page);
    setLoading(false);
  }, [onSelect]);

  if (!people || !paging)
    return null;

  return (
    <Paper elevation={3} className={classes.root} square>
      <List>
        {people && people.map((person) => (
          <ListItem dense divider button key={person.id} >
            <ListItemAvatar>
              <Avatar variant='circle' className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={`${person.name} - ${person.email}`} 
              primaryTypographyProps={{ noWrap: true }} 
              secondary={person.jobTitle} 
              secondaryTypographyProps={{ noWrap: true }} />
          </ListItem>
        ))}
      </List>
      <div className={classes.pagerContainer}>
        <Pagination 
          disabled={!!loading}
          color="secondary" 
          count={paging.pages} 
          page={page} 
          siblingCount={1} 
          boundaryCount={2}
          onChange={(evt, val) => onPageSelet(val)} 
          className={classes.pager} />
      </div>

    </Paper>
  );
}

PeopleList.propTypes = {
  people: PropTypes.array,
  paging: PropTypes.object,
  onSelect: PropTypes.func
};

export default PeopleList;
