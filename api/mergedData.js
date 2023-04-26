import { getSpiritBottles, getSingleSpirit, deleteSingleSpirit } from './spiritsData';
import { getSingleBottle, deleteBottle } from './bottlesData';

const viewBottleDetails = (bottleFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBottle(bottleFirebaseKey)
    .then((bottleObject) => {
      getSingleSpirit(bottleObject.spirit_id)
        .then((spiritObject) => {
          resolve({ spiritObject, ...bottleObject });
        });
    }).catch((error) => reject(error));
});

const viewSpiritDetails = (spiritFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleSpirit(spiritFirebaseKey), getSpiritBottles(spiritFirebaseKey)])
    .then(([spiritObject, spiritBottlesArray]) => {
      resolve({ ...spiritObject, bottles: spiritBottlesArray });
    }).catch((error) => reject(error));
});

const deleteSpiritBottles = (spiritId) => new Promise((resolve, reject) => {
  getSpiritBottles(spiritId).then((bottlesArray) => {
    console.warn(bottlesArray, 'Spirit Bottles');
    const deleteBottlePromises = bottlesArray.map((bottle) => deleteBottle(bottle.firebaseKey));

    Promise.all(deleteBottlePromises).then(() => {
      deleteSingleSpirit(spiritId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewBottleDetails, viewSpiritDetails, deleteSpiritBottles };
