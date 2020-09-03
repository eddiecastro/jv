import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios';

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

  const fetchPeople = async () => {
    axios({ url: 'people/all', params: { ...pager } })
      .then(res => {
        const { data: { data, paging } } = res;
        setPeople(data);
        setPaging(paging);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchPeople();
  }, [])

  console.log(people);
  console.log(paging);
  console.log(pager);

  return (
    <div className={classes.root}>
      <main>
        <Container>
          <div>
            hi
          </div>
        </Container>
      </main>
    </div>

  );
}
