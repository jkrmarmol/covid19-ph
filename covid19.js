const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const covidRouter = express.Router();

const body = {
  operationName: null,
  variables: {},
  query: "{\n  covidCaseStatus: covid_case_status {\n    active\n    all\n    asymptomatic\n    critical\n    died\n    mild\n    repatriate\n    recovered\n    severe\n    __typename\n  }\n  covidCaseLastUpdated: covid_case_last_updated {\n    updatedAt\n    __typename\n  }\n}\n"
}

covidRouter.get('/', async (req, res, next) => {
  try {
    const response = await fetch('https://dbph-gov-gql-bl4faseyeq-de.a.run.app/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (response.ok) {
      const json = await response.json();
      json.developer = {
        name: 'Kurt Russelle Marmol',
        github: 'github.com/jkrmarmol',
        contact: 'contact@jkrmarmol.com'
      }
      res.json(json)
    }
  } catch (err) {
      console.log(err)
    }
})

module.exports = covidRouter;