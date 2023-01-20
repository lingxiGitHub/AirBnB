import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import CreateSpotModal from '../CreateSpot';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
            <li>
                <ProfileButton user={sessionUser} />
            </li>

              <li>
                    <OpenModalButton
                        buttonText="Create Spot"
                        modalComponent={<CreateSpotModal />}
                    />
                </li>
                </>
        );
    } else {
        sessionLinks = (
            <>
                <li>
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                    <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />


                </li>

              
            </>
        );
    }

    return (
        <ul className='nav-bar'>
            <li>
                <NavLink exact to="/"><img width="60" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/8d32ea18423501.562c939db98fc.png" /></NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;