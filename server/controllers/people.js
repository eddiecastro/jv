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

module.exports = {
  peopleGetByPage,
  peopleGetAll
};

