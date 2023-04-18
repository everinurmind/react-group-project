import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMissions } from '../redux/missionsSlice';

function Missions() {
  const dispatch = useDispatch();
  // const {missions} = useSelector(store => store);
  useEffect(() => {
    dispatch(getMissions());
  }, [dispatch]);
  return (
    <div><h1>Hello there friends. This is the Missions page!</h1></div>
  );
}

export default Missions;
