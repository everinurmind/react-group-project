import React from 'react';
import { useSelector } from 'react-redux';

function DisplayMissions() {
  const { missions } = useSelector((store) => store.missions);
  return (
    <div className="missions">
      <h2>My Missions</h2>
      <ul>
        {missions.map((mission) => (mission.reserved
        && <li key={mission.mission_id}>{mission.mission_name}</li>))}
      </ul>
    </div>
  );
}

export default DisplayMissions;
