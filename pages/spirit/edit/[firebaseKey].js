import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleSpirit } from '../../../api/spiritsData';
import SpiritForm from '../../../components/forms/SpiritForm';

export default function EditSpirit() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleSpirit(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<SpiritForm obj={editItem} />);
}
