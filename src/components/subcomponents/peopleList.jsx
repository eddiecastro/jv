Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore

@JJaciel
JJaciel
  /
  oowlish - dashboard
Private
1
00
Code
Issues
Pull requests
Actions
Projects
Security
Insights
Settings
oowlish - dashboard / src / dashboard / components / cityCustomers.jsx
@JacielVillalobos
JacielVillalobos pre eject
Latest commit 2f9fd78 18 days ago
History
1 contributor
102 lines(92 sloc)  3.44 KB

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import Grid from '@material-ui/core/Grid';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import EmailSharpIcon from '@material-ui/icons/EmailSharp';
import BusinessIcon from '@material-ui/icons/Business';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  customerInfoContainer: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  fieldIcon: {
    display: 'flex'
  },
  iconWrapper: {
    marginRight: theme.spacing(1)
  },
  listContainer: {
    maxWidth: 400
  },
  pagerContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  pager: {
    margin: 'auto'
  }
}));

function PeopleList({ people }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const paginatedCustomers = useMemo(() => {
    const pCustomers = [];

    for (let i = 0; i < customers.length; i += 5) {
      pCustomers.push(customers.slice(i, i + 5))
    }
    return pCustomers;
  }, [customers]);


  if (!paginatedCustomers.length)
    return null;

  return (
    <div>
      <List className={classes.listContainer}>
        {paginatedCustomers[(page - 1)].map((cust) => (
          <ListItem button onClick={() => onCustomerSelect(cust.id)} key={cust.id}>
            <ListItemAvatar>
              <Avatar variant='circle' className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <Grid container className={classes.customerInfoContainer}>
              <Grid item xs={12} className={classes.fieldIcon}>
                <SvgIcon fontSize="small" color="primary" component={EmojiPeopleIcon} className={classes.iconWrapper} />
                <Typography noWrap variant="body2" >{`${cust.firstName} ${cust.lastName}`}</Typography>
              </Grid>
              <Grid item xs={12} className={classes.fieldIcon}>
                <SvgIcon fontSize="small" color="primary" component={EmailSharpIcon} className={classes.iconWrapper} />
                <Typography noWrap variant="body2" >{`${cust.email}`}</Typography>
              </Grid>
              <Grid item xs={12} className={classes.fieldIcon}>
                <SvgIcon fontSize="small" color="primary" component={BusinessIcon} className={classes.iconWrapper} />
                <Typography noWrap variant="body2" >{`${cust.company}`}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <div className={classes.pagerContainer}>
        <Pagination color="secondary" count={paginatedCustomers.length} page={page} onChange={(evt, val) => setPage(val)} className={classes.pager} />
      </div>

    </div>
  );
}

PeopleList.propTypes = {
  customers: PropTypes.array,
  onCustomerSelect: PropTypes.func.isRequired,
};

export default PeopleList;
