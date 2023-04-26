/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSpiritBottles } from '../../api/spiritsData';
import { viewSpiritDetails } from '../../api/mergedData';
import BottleCard from '../../components/BottleCard';

export default function ViewSpirit() {
  const [spiritDetails, setSpiritDetails] = useState({});
  const [bottles, setBottles] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewSpiritDetails(firebaseKey).then(setSpiritDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getSpiritBottles(firebaseKey).then(setBottles);
  }, [firebaseKey]);

  return (
    <>
      <div className="d-flex">
        <div className="mt-5" />
        <div className="d-flex flex-column text-white mt-5 details">
          <h2>
            {spiritDetails.type_name}
            {spiritDetails.favorite ? ' 🤍' : ''}
          </h2>
        </div>
      </div>
      <br />
      <h3 className="text-white details text-left">Spirit&apos;s Bottle Collection</h3>
      <div className="d-flex flex-wrap">
        {bottles.map((bottle) => (
          <BottleCard key={bottle.firebaseKey} bottleObj={bottle} onUpdate={getSpiritBottles} />
        ))}
      </div>
    </>
  );
}
