import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/Rockets.css';

function Rockets() {
  const rockets = useSelector((state) => state.rockets);

  return (
    <div className="rocket">
      {rockets.map((rocket) => (
        <div key={rocket.rocket_id}>
          <h2>{rocket.rocket_name}</h2>
          <p>{rocket.rocket_type}</p>
          <img src={rocket.flickr_images[0]} alt={rocket.name} />
        </div>
      ))}
    </div>
  );
}

export default Rockets;
