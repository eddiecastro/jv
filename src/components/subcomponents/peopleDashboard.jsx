import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios';

import PeopleList from './peopleList.jsx';
import DivSize from './divSize.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
}));

const getPagerInitialValues = () => ({
  page: 1,
  perPage: 50
});

export default function PeopleDashboard() {
  const classes = useStyles();
  const [people, setPeople] = useState(null);
  const [paging, setPaging] = useState(null);
  const [pager, setPager] = useState(getPagerInitialValues());
  const [size, setSize] = useState(0);

  const fetchPeople = useCallback(async () => {
    axios({ url: 'people/all', params: { ...pager } })
      .then(({ data: { data, paging } }) => {
        setPeople(data);
        setPaging(paging);
      })
      .catch(error => console.log(error))
      .then(kk => console.log(kk));

  }, [pager]);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const handleResize = useCallback((newSize) => setSize(newSize), [])

  return (
    <div className={classes.root}>
      <main>
        <Container>
          <DivSize onSize={handleResize}>
            <div>
              {size}
            </div>
            <PeopleList people={people} pager={pager} />
          </DivSize>
        </Container>
      </main>
    </div>

  );
}
