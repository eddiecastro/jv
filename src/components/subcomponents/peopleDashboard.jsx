import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import PeopleList from './peopleList.jsx';
import DivSize from './divSize.jsx';
import Loader from './loader.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
}));

function PeopleDashboard() {
  const classes = useStyles();
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState(null);
  const [paging, setPaging] = useState(null);
  
  const fetchPeopleByPage = useCallback(async (page, perPage = 9) => {
    const result = await axios({ url: 'people/pages', params: { page, perPage } });
    console.log(result);
    const { data: { people, paging } } = result;
    setPeople(people);
    setPaging({
      pages: paging.paging.total_pages || 1,
    })
  }, []);

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

  const handleResize = useCallback((newSize) => setSize(newSize), []);

  if (loading)
    return <Loader load={loading} backdrop={true} />;

  return (
    <div className={classes.root}>
      <main>
        <Container>
          <DivSize onSize={nZ => handleResize(nZ)}>
            <div>
              {size}
            </div>
            <PeopleList people={people} paging={paging} onSelect={(page) => fetchPeopleByPage(page)} />
          </DivSize>
        </Container>
      </main>
    </div>

  );
}

export default PeopleDashboard;
