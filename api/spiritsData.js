import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL SPIRITS
const getSpirits = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/spirits.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE SPIRIT
const createSpirit = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/spirits.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const setcode = { firebaseKey: data.name };
      fetch(`${endpoint}/spirits/${setcode.firebaseKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setcode),
      }).then(resolve);
    })
    .catch(reject);
});

const getSingleSpirit = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/spirits/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE SPIRIT
const deleteSingleSpirit = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/spirits/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE SPIRIT
const updateSpirit = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/spirits/${payload.firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET A SINGLE SPIRIT'S BOTTLES
const getSpiritBottles = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bottles.json?orderBy= "spirit_id" &equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getSpirits,
  getSingleSpirit,
  getSpiritBottles,
  updateSpirit,
  deleteSingleSpirit,
  createSpirit,
};
