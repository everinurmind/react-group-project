import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/rocketsSlice';
import '../styles/Rockets.css';

function Rockets() {
  const dispatch = useDispatch();
  const { rockets } = useSelector((store) => store.rockets);

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
            <p>{rocket.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Rockets;
