const { fetchPeople } = require('../dataAccess');

async function peopleGetAll(req, res) {
  try {
    const params = { ...req.query };
    const { data, metadata: { paging } } = await fetchPeople(params);
    const response = data.map((person) => {
      return {
        name: person.display_name,
        email: person.email_address,
        jobTitle: person.title
      }
    });
    
    res.json({ data: response, paging });
  } catch (e) {
    console.log(`err on service => ${e}`);
  }
}

module.exports = {
  peopleGetAll
};

