import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets, addReservation, deleteReservation } from '../redux/rockets/rocketsSlice';
import '../styles/Rockets.css';

function Rockets() {
  const dispatch = useDispatch();
  const { rockets } = useSelector((store) => store.rockets);

  const handleAdd = (id) => {
    dispatch(addReservation(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteReservation(id));
  };

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  return (
    <div className="rocket">
      {rockets.map((rocket) => (
        <div key={rocket.rocket_id}>
          <img src={rocket.flickr_images[0]} alt={rocket.name} />
          <div className="rocket-info">
            <h2>{rocket.rocket_name}</h2>
            <p>
              {rocket.reserved && <span className="reserved-badge">Reserved</span>}
              {rocket.description}
            </p>
            {rocket.reserved ? (
              <button id="cancel-reservation" type="button" onClick={() => handleDelete(rocket.rocket_id)}>Cancel Reservation</button>
            ) : (
              <button id="add-reservation" type="button" onClick={() => handleAdd(rocket.rocket_id)}>Reserve Rocket</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Rockets;
