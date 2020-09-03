import React, { useState, useMemo } from 'react';
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

function PeopleList({ people, pager }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const pagedPeople = useMemo(() => {
    const pagedPeople = [];

    if (!people)
      return pagedPeople;

    for (let i = 0; i < people.length; i += 9) {
      pagedPeople.push(people.slice(i, i + 9))
    }

    return pagedPeople;
  }, [people]);


  if (!pagedPeople.length)
    return null;

  return (
    <div>
      <List className={classes.listContainer}>
        {pagedPeople[(page - 1)].map((person, idx) => (
          <ListItem dense divider button key={idx} style={{ pointerEvents: 'none' }}>
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
        <Pagination color="secondary" count={pagedPeople.length} page={page} onChange={(evt, val) => setPage(val)} className={classes.pager} />
      </div>

    </div>
  );
}

PeopleList.propTypes = {
  people: PropTypes.array,
  pager: PropTypes.object,
};

export default PeopleList;
