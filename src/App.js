import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import Profile from './components/Profile';
import { setRockets } from './redux/rocketsSlice';

const fetchRockets = async (dispatch) => {
  const response = await fetch('https://api.spacexdata.com/v3/rockets');
  const data = await response.json();
  dispatch(setRockets(data));
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRockets(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/Rockets" element={<Rockets />} />
        <Route path="/Missions" element={<Missions />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
