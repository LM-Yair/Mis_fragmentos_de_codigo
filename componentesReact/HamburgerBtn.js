import React, {useContext} from 'react';
import NavContext from '../Context/NavContext';
import './HamburgerBtn.css';

const HamburgerBtn = () => {

  const { handleAnim, isActive } = useContext( NavContext );
  return(
    <button 
    onClick={ handleAnim } 
    className={ `hamburger hamburger--elastic ${ isActive && 'is-active' }` } 
    type="button">
      <span className="hamburger-box">
	<span className="hamburger-inner"></span>
      </span>
    </button>
  );
}

export default HamburgerBtn;
