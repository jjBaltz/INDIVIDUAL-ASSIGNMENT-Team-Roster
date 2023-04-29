import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getSpirits } from '../api/spiritsData';
import SpiritCard from '../components/SpiritCard';
import { useAuth } from '../utils/context/authContext';

export default function Spirits() {
  const { user } = useAuth();
  const [spirits, setSpirits] = useState([]);

  const getAllSpirits = () => {
    getSpirits(user.uid).then(setSpirits);
  };

  useEffect(() => {
    getAllSpirits();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/spirit/newSpirit" passHref>
        <Button variant="add-btl">Add New Spirit</Button>
      </Link>
      <div className="text-center my-4 d-flex flex-wrap">
        {spirits.map((spirit) => (
          <SpiritCard key={spirit.firebaseKey} spiritObj={spirit} onUpdate={getAllSpirits} />
        ))}
      </div>
    </div>
  );
}
