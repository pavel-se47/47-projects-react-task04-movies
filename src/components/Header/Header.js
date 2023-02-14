import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import rout from '../../routes';

class Header extends Component {
  render() {
    return (
      <ul className="nav">
        <li>
          <NavLink to={rout.home}>Home</NavLink>
        </li>
        <li>
          <NavLink to={rout.search}>Movies</NavLink>
        </li>
      </ul>
    );
  }
}

export default Header;
