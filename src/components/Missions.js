import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMissions } from '../redux/missionsSlice';
import '../styles/missions.css';

function Missions() {
  const dispatch = useDispatch();
  const { missions } = useSelector((store) => store.missions);

  useEffect(() => {
    dispatch(getMissions());
  }, [dispatch]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="table-mission">Mission</th>
            <th className="table-description">Description</th>
            <th className="table-status">Status</th>
          </tr>
        </thead>

        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id}>
              <td className="mission-name">{mission.mission_name}</td>
              <td>{mission.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Missions;
