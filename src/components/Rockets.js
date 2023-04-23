import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets, addReservation, deleteReservation } from '../redux/rockets/rocketsSlice';
import '../styles/Rockets.css';

function Rockets() {
  const dispatch = useDispatch();
  const { rockets } = useSelector((store) => store.rockets);

  const [showDetailsMap, setShowDetailsMap] = useState(new Map());

  const handleDetailsClick = (id) => {
    setShowDetailsMap((prev) => {
      const newState = new Map(prev);
      newState.set(id, !newState.get(id));
      return newState;
    });
  };

  const handleAdd = (id) => {
    dispatch(addReservation(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteReservation(id));
  };

  useEffect(() => {
    if (rockets.length === 0) {
      dispatch(fetchRockets());
    } else {
      const newMap = new Map();
      rockets.forEach((rocket) => {
        newMap.set(rocket.rocket_id, false);
      });
      setShowDetailsMap(newMap);
    }
  }, [dispatch, rockets, rockets.length]);

  return (
    <div className="rocket">
      {rockets.map((rocket) => (
        <div key={rocket.rocket_id}>
          <img src={rocket.flickr_images[0]} alt={rocket.name} />
          <div className="rocket-info">
            <div className="item-title">
              <h2>{rocket.rocket_name}</h2>
              <button id="details-button" type="button" onClick={() => handleDetailsClick(rocket.rocket_id)}>
                {showDetailsMap.get(rocket.rocket_id) ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
            {showDetailsMap.get(rocket.rocket_id) && (
              <ul className="rocket-details">
                <li className="rocket-detail">
                  <strong>ID:</strong>
                  {rocket.rocket_id}
                </li>
                <li className="rocket-detail">
                  <strong>Active:</strong>
                  {rocket.active ? 'Yes' : 'No'}
                </li>
                <li className="rocket-detail">
                  <strong>Stages:</strong>
                  {rocket.stages}
                </li>
                <li className="rocket-detail">
                  <strong>Boosters:</strong>
                  {rocket.boosters}
                </li>
                <li className="rocket-detail">
                  <strong>Cost Per Launch:</strong>
                  $
                  {rocket.cost_per_launch}
                </li>
                <li className="rocket-detail">
                  <strong>Success Rate:</strong>
                  {rocket.success_rate_pct}
                  %
                </li>
                <li className="rocket-detail">
                  <strong>First Flight:</strong>
                  {rocket.first_flight}
                </li>
                <li className="rocket-detail">
                  <strong>Country:</strong>
                  {rocket.country}
                </li>
                <li className="rocket-detail">
                  <strong>Company:</strong>
                  {rocket.company}
                </li>
              </ul>
            )}
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
