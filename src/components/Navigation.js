import { NavLink } from 'react-router-dom';
import logo from '../logo/planet.png';
import '../styles/Navigation.css';

const Navigation = () => (
  <header>
    <img alt="logo" src={logo} />
    <h1>Space Travelers&apos; Hub</h1>
    <nav>
      <ul>
        <li>
          <NavLink to="/Rockets">Rockets</NavLink>
        </li>
        <li>
          <NavLink to="/Missions">Missions</NavLink>
        </li>
        <span />
        <li>
          <NavLink to="/Profile">My Profile</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
