import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMissions, joinMission, leaveMission } from '../redux/missions/missionsSlice';
import '../styles/missions.css';

function Missions() {
  const dispatch = useDispatch();
  const { missions } = useSelector((store) => store.missions);

  const handleJoin = (id) => {
    dispatch(joinMission(id));
  };

  const handleLeave = (id) => {
    dispatch(leaveMission(id));
  };

  useEffect(() => {
    if (missions.length === 0) {
      dispatch(getMissions());
    }
  }, [dispatch, missions.length]);

  return (
    <section className="missions">
      <table>
        <thead>
          <tr>
            <th className="table-mission">Mission</th>
            <th className="table-description">Description</th>
            <th className="table-status-member">Status</th>
            <td className="table-status-join" />
          </tr>
        </thead>

        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id}>
              <td className="mission-name">{mission.mission_name}</td>
              <td>{mission.description}</td>
              <td>
                {mission.reserved
                  ? <p className="active-member member">Active Member</p>
                  : <p className="not-member member">NOT A MEMBER</p>}
              </td>
              <td>
                {mission.reserved
                  ? <button type="button" className="leave-btn btn" onClick={() => handleLeave(mission.mission_id)}>Leave Mission</button>
                  : <button type="button" className="join-btn btn" onClick={() => handleJoin(mission.mission_id)}>Join Mission</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Missions;
