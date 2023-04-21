import React from 'react';
import { useSelector } from 'react-redux';

function DisplayRockets() {
  const { rockets } = useSelector((state) => state.rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  return (
    <div className="rockets">
      <h2>My Rockets</h2>
      <ul>
        {reservedRockets.length ? reservedRockets.map((rocket) => (
          <li key={rocket.rocket_id}>
            {rocket.rocket_name}
          </li>
        )) : <input className="not-reserved" placeholder="No Rockets Reserved" />}
      </ul>
    </div>
  );
}

export default DisplayRockets;
