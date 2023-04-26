import axios from 'axios';
import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const dbUrl = clientCredentials.databaseURL;

const getSpiritBottles = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/bottles.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteBottle = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/bottles/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleBottle = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/bottles/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createBottle = (bottleObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/bottles.json`, bottleObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/bottles/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateBottle = (bottleObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/bottles/${bottleObj.firebaseKey}.json`, bottleObj)
    .then(resolve)
    .catch(reject);
});

export {
  updateBottle,
  createBottle,
  getSingleBottle,
  deleteBottle,
  getSpiritBottles,
};
