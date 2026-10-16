import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaAirbnb } from 'react-icons/fa';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
import OpenModalButton from '../OpenModalButton';
import CreateSpotModal from '../CreateSpot';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <header className="site-header">
            <nav className="page nav-bar">
                <Link to="/" className="brand" aria-label="Home">
                    <FaAirbnb className="brand-mark" />
                    <span className="brand-word">airclone</span>
                </Link>

                <SearchBar />

                <div className="nav-right">
                    {isLoaded && (
                        <>
                            <OpenModalButton
                                className="host-link"
                                buttonText="Airbnb your home"
                                modalComponent={sessionUser ? <CreateSpotModal /> : <LoginFormModal />}
                            />
                            <ProfileButton user={sessionUser} />
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navigation;
