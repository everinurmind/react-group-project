import React from 'react';
import { useSelector } from 'react-redux';

function DisplayMissions() {
  const { missions } = useSelector((store) => store.missions);
  const reservedMissions = missions.filter((mission) => mission.reserved);
  return (
    <div className="missions-profile">
      <h2>My Missions</h2>
      <ul>
        {reservedMissions.length ? reservedMissions.map((mission) => (
          <li className="row" key={mission.mission_id}>
            {mission.mission_name}
            <a target="_blank" rel="noreferrer" href={mission.url}>Read More</a>
          </li>
        )) : <input className="not-reserved" placeholder="No Missions Joined" />}
      </ul>
    </div>
  );
}

export default DisplayMissions;
