import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMissions } from '../redux/missionsSlice';

function Missions() {
  const dispatch = useDispatch();
  const {missions} = useSelector(store => store);

  useEffect(() => {
    dispatch(getMissions())
  }, [dispatch])


  return (
    <div>
      <h1>Hello there friends. This is the Missions page!</h1>
      {missions.map(mission => (
        <div key={mission.mission_id}>
          <h2>{mission.mission_name}</h2>
          <p>{mission.description}</p>
        </div>   
      ))}
    </div>
  );
}

export default Missions;
