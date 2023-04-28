/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getSpiritBottles } from '../api/bottlesData';
import { useAuth } from '../utils/context/authContext';
import BottleCard from '../components/BottleCard';

function Home() {
  const [bottles, setBottles] = useState([]);
  const { user } = useAuth();

  const getAllBottles = () => {
    getSpiritBottles(user.uid).then(setBottles);
  };

  useEffect(() => {
    getAllBottles();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/bottle/newBottle" passHref>
        <Button variant="add-btl">Add A Bottle</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {bottles.map((bottle) => (
          <BottleCard key={bottle.firebaseKey} bottleObj={bottle} onUpdate={getAllBottles} />
        ))}
      </div>

    </div>
  );
}

export default Home;
