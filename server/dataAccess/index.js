const config = require('../config');
const axios = require('axios');

async function fetchPeople({ page, perPage }) {
  const { salesLoftApi: { baseUrl, paths, apiKey, apiKeyPrefix } } = config;
  const options = {
    method: 'get',
    url: `${baseUrl}${paths.people}`,
    headers: {
      Authorization: ` ${apiKeyPrefix} ${apiKey}`
    },
    params: {
      per_page: perPage,
      page: page,
      include_paging_counts: true
    }
  };

  const response = axios(options)
    .then(res => {
      const { status, data } = res;
      const failed = status >= 400;

      if (failed) {
        throw new Error('error on people fetch')
      }
      return data;
    })
    .catch(error => {
      console.log(error);
    })

  return response;
}

module.exports = { fetchPeople }