import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL SPIRITS
const getSpirits = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/spirits.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// CREATE SPIRIT
const createSpirit = (authObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/spirits.json`, authObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/spirits/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const getSingleSpirit = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/spirits/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// DELETE SPIRIT
const deleteSingleSpirit = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/spirits/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// UPDATE SPIRIT
const updateSpirit = (spiritId) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/spirits/${spiritId.firebaseKey}.json`, spiritId)
    .then(() => getSpirits(spiritId.uid).then(resolve))
    .catch((error) => reject(error));
});

// GET A SINGLE SPIRIT'S BOTTLES
const getSpiritBottles = (spiritId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/bottles.json?orderBy= "spirit_id" &equalTo="${spiritId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getSpirits,
  getSingleSpirit,
  getSpiritBottles,
  updateSpirit,
  deleteSingleSpirit,
  createSpirit,
};
