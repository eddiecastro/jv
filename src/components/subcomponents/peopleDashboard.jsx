import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import PeopleList from './peopleList.jsx';
import CharFreqChecker from './charFreqChecker.jsx';
import AlikeChecker from './alikeChecker.jsx';
// import DivSize from './divSize.jsx';
import Loader from './loader.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(1)
  },
  cta: {
    minWidth: '100%',
  }
}));

function PeopleDashboard() {
  const classes = useStyles();
  // const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagePeople, setPagePeople] = useState(null);
  const [allPeople, setAllPeople] = useState(null);
  const [paging, setPaging] = useState(null);
  const [allEmails, setAllEmails] = useState(null);

  const fetchPeopleByPage = useCallback(async (page, perPage = 9) => {
    const result = await axios({ url: 'people/pages', params: { page, perPage } });
    const { data: { people, paging } } = result;
    setPagePeople(people);
    setPaging({
      pages: paging.paging.total_pages || 1,
    })
  }, []);

  const fetchAllPeople = useCallback(async () => {
    const result = await axios({ url: 'people/all' });
    const { data: { people } } = result;
    return people;
  }, []);

  const getPeople = useCallback(async () => {
    try {
      if (allPeople)
        return;
      const people = await fetchAllPeople();
      setAllPeople(people);
      if (people && people.length) {
        const emails = people.map(person => person.email);
        setAllEmails(emails);
      }
    } catch (e) {
      console.log(e);
    }
  }, [setAllPeople, fetchAllPeople, allPeople])

  const getEmails = useCallback(async () => {
    try {
      const emails = [];
      if (!allPeople) {
        const people = await fetchAllPeople();
        setAllPeople(people);
        if (people && people.length)
          people.map(person => emails.push(person.email));
      } else {
        allPeople.map(person => emails.push(person.email))
      }
      setAllEmails(emails);
    } catch (e) {
      console.log(e);
    }
  }, [allPeople, fetchAllPeople, setAllPeople])


  const fetchFirstPage = useCallback(async () => {
    try {
      setLoading(true);
      await fetchPeopleByPage(1);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [fetchPeopleByPage])

  useEffect(() => {
    fetchFirstPage()
  }, [fetchFirstPage]);

  // const handleResize = useCallback((newSize) => setSize(newSize), []);

  if (loading)
    return <Loader load={loading} backdrop={true} />;

  return (
    <Container maxWidth="md" className={classes.root} >
        <Grid container spacing={3} direction="row" justify="space-evenly" alignItems="center" >
          <Grid item xs={12} md={6} >
            <PeopleList people={pagePeople} paging={paging} onSelect={(page) => fetchPeopleByPage(page)} />
          </Grid>
          <Grid item container spacing={3} direction="column" justify="space-evenly" alignItems="center" xs={12} md={6} >
            <Grid item xs={12} className={classes.cta} >
              <CharFreqChecker data={allEmails} onCheck={getEmails} />
            </Grid>
            <Grid item xs={12} className={classes.cta} >
              <AlikeChecker data={allPeople} onCheck={getPeople} />
            </Grid>
          </Grid>
        </Grid>
    </Container>
  );
}

export default PeopleDashboard;
