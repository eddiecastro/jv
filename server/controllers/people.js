const { fetchPeople } = require('../dataAccess');

async function peopleGetByPage(req, res) {
  try {

    const { page, perPage } = req.query;

    const { data, metadata: paging } = await fetchPeople({ page, perPage });

    const response = data.map((person) => {
      return {
        id: person.id,
        name: person.display_name,
        email: person.email_address,
        jobTitle: person.title
      }
    });

    res.json({ people: response, paging });
  } catch (e) {
    console.log(`err on service => ${e}`);
  }
}

async function peopleGetAll(req, res) {
  try {
    const response = [];
    const perPage = 100;
    const { data, metadata: { paging } } = await fetchPeople({ page: 1, perPage });

    if (data.length)
      data.map((person) => {
        return response.push({
          id: person.id,
          name: person.display_name,
          email: person.email_address,
        });
      });

    const { next_page, total_pages } = paging;

    for (let i = next_page; i <= total_pages; i++) {
      const { data } = await fetchPeople({ page: i, perPage });
      if (data.length)
        data.map((person) => {
          return response.push({
            id: person.id,
            name: person.display_name,
            email: person.email_address,
          });
        });
    }

    res.json({ people: response });
  } catch (e) {
    console.log(`err on service => ${e}`);
  }
}


module.exports = {
  peopleGetByPage,
  peopleGetAll
};

