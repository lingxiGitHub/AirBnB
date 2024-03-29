import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotModal from "../CreateSpot";
import OpenModalButton from "../OpenModalButton";
import Trips from "../Trips";
import { useHistory } from "react-router-dom";
import "./ProfileButton.css"



function ProfileButton({ user }) {

    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button
                className="log-in-right-corner-button"
                onClick={openMenu}>
                <i class="fas fa-bars"></i>
                <i className="fas fa-user-circle" />

            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                   
                        <li>{user.firstName} {user.lastName}</li>
                   

                        <OpenModalMenuItem
                            itemText="Trips"
                
                            onItemClick={async () => {
                                await closeMenu();
                                history.push("/trips")
                            }}
                        />

                        <li>Wishlists</li>

                        <OpenModalMenuItem
                            itemText="Create Spot"
                            modalComponent={<CreateSpotModal />}
                            onItemClick={closeMenu}
                        />

                        <li
                            onClick={logout}
                        >
                            Log Out
                        </li>
                    </>
                ) : (
                    <>
                        <OpenModalMenuItem

                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />


                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;