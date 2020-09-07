import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  listContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
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
    <div>
      <List className={classes.listContainer}>
        {people && people.map((person) => (
          <ListItem dense divider button key={person.id} style={{ pointerEvents: 'none' }}>
            <ListItemAvatar>
              <Avatar variant='circle' className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${person.name} - ${person.email}`} secondary={person.jobTitle} />
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

    </div>
  );
}

PeopleList.propTypes = {
  people: PropTypes.array,
  paging: PropTypes.object,
  onSelect: PropTypes.func
};

export default PeopleList;
