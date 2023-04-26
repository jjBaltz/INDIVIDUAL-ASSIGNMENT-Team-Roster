import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getSpirits } from '../../api/spiritsData';
import { createBottle, updateBottle } from '../../api/bottlesData';

const initialState = {
  description: '',
  image: '',
  price: '',
  sale: false,
  title: '',
};

function BottleForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [spirits, setSpirits] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getSpirits(user.uid).then(setSpirits);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateBottle(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createBottle(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Bottle</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Bottle Type" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter A Type"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Bottle Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Image of Bottle"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Bottle Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* AUTHOR SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Spirit">
        <Form.Select
          aria-label="Spirit"
          name="spirit_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.spirit_id}
          required
        >
          <option value="">Select A Spirit</option>
          {
            spirits.map((spirit) => (
              <option
                key={spirit.firebaseKey}
                value={spirit.firebaseKey}
              >
                {spirit.type_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="sale"
        name="sale"
        label="On Sale?"
        checked={formInput.sale}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            sale: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Bottle</Button>
    </Form>
  );
}

BottleForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    sale: PropTypes.bool,
    title: PropTypes.string,
    spirit_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

BottleForm.defaultProps = {
  obj: initialState,
};

export default BottleForm;
