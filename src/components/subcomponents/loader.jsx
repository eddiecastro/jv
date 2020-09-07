import React from "react";
import { observer } from 'mobx-react';
import clsx from "clsx";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: '100%',
    minHeight: '100%',
    backgroundColor: 'transparent',
    zIndex: theme.zIndex.drawer + 1,
  },
  backdrop: {
    opacity: .5,
    backgroundColor: theme.palette.grey[800],
  },
  loading: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: -50,
    marginLeft: -50,
  }
}));

function Loader({ load, backdrop }) {
  const classes = useStyles();

  if (load) {
    return (
      <div className={clsx(classes.container, backdrop && classes.backdrop)} >
        <CircularProgress className={classes.loading} size={100} thickness={5} color="secondary" />
      </div>
    );
  }
  return null;
}

Loader.propTypes = {
  load: PropTypes.bool.isRequired,
  backdrop: PropTypes.bool
};

export default observer(Loader);