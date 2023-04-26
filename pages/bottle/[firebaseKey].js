/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewBottleDetails } from '../../api/mergedData';

export default function ViewBottle() {
  const [bottleDetails, setBottleDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewBottleDetails(firebaseKey).then(setBottleDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={bottleDetails.image} alt={bottleDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {bottleDetails.title} by {bottleDetails.spiritObject?.type_name}
          {bottleDetails.spiritObject?.favorite ? ' 🤍' : ''}
        </h5>
        <p>{bottleDetails.description || ''}</p>
        <hr />
        <p>
          {bottleDetails.sale
            ? `🏷️ Sale $${bottleDetails.price}`
            : `$${bottleDetails.price}`}
        </p>
      </div>
    </div>
  );
}
