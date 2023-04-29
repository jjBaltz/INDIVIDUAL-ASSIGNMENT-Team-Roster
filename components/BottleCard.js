import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteBottle } from '../api/bottlesData';

function BottleCard({ bottleObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisBottle = () => {
    if (window.confirm(`Delete ${bottleObj.title}?`)) {
      deleteBottle(bottleObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={bottleObj.image} alt={bottleObj.title} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>{bottleObj.title}</Card.Title>
        <p className="card-text bold">{bottleObj.favorite && <span>Favorite<br /></span> } ${bottleObj.price}</p>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/bottle/${bottleObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/bottle/edit/${bottleObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisBottle} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

BottleCard.propTypes = {
  bottleObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    favorite: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BottleCard;
