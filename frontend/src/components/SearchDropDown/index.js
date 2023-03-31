import "./SearchDropDown.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import OpenModalMenuItem from "../Navigation";



export default function SearchDropDown({ searchResults, showMenu, closeMenu }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const ulRef = useRef();



    const ulClassName = "search-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>


            <ul
                className={ulClassName} ref={ulRef}
            >
                {searchResults && (searchResults.map((result) => {

                    return (
                        <li
                            onClick={
                                async () => {
                                    await closeMenu();
                                    history.push("/success")
                                }
                            }
                        >
                            {result.name}

                        </li>
                    )
                })

                )
                }



            </ul>
        </>



    )
}