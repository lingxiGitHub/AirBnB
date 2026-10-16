import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from '../../store/session';
import { clearFavorites } from "../../store/favorites";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotModal from "../CreateSpot";

function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const wrapRef = useRef();

    useEffect(() => {
        if (!showMenu) return;

        const closeOnOutside = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setShowMenu(false);
        };

        document.addEventListener('click', closeOnOutside);
        return () => document.removeEventListener("click", closeOnOutside);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const goTo = (path) => {
        closeMenu();
        history.push(path);
    };

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        dispatch(clearFavorites());
        closeMenu();
        history.push("/");
    };

    const initial = user ? user.firstName[0].toUpperCase() : null;

    return (
        <div className="profile-wrap" ref={wrapRef}>
            <button
                className={"profile-button" + (showMenu ? " open" : "")}
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Main navigation menu"
            >
                <FiMenu className="profile-menu-icon" />
                {user ? (
                    <span className="avatar avatar-sm">{initial}</span>
                ) : (
                    <FaUserCircle className="profile-anon" />
                )}
            </button>

            {showMenu && (
                <ul className="profile-dropdown">
                    {user ? (
                        <>
                            <li className="dropdown-header">
                                Hi, {user.firstName}
                                <div className="muted">{user.email}</div>
                            </li>
                            <li className="dropdown-strong" onClick={() => goTo("/trips")}>Trips</li>
                            <li className="dropdown-strong" onClick={() => goTo("/wishlists")}>Wishlists</li>
                            <li className="dropdown-divider" />
                            <OpenModalMenuItem
                                itemText="Airbnb your home"
                                modalComponent={<CreateSpotModal />}
                                onItemClick={closeMenu}
                            />
                            <li className="dropdown-divider" />
                            <li onClick={logout}>Log out</li>
                        </>
                    ) : (
                        <>
                            <OpenModalMenuItem
                                itemText="Log in"
                                className="dropdown-strong"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                            <li className="dropdown-divider" />
                            <OpenModalMenuItem
                                itemText="Airbnb your home"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </>
                    )}
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
