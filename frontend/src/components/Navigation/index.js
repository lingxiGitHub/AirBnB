import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import CreateSpotModal from '../CreateSpot';
import SearchBar from './SearchBar';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    

    return (


   

        <ul className='nav-bar'>
            <li>
       
                <NavLink exact to="/"><img className="airbnb-icon" width="60" src="https://img.icons8.com/bubbles/256/airbnb.png" /></NavLink>
            </li>

            <SearchBar />
            {isLoaded && (
                <>
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>

                 
                   
                </>
            )}
        </ul>
    );
}

export default Navigation;