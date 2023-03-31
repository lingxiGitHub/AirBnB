import "./Navigation.css";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { search_spots_thunk } from "../../store/search";
import SearchDropDown from "../SearchDropDown";
import { useEffect, useRef } from "react";


export default function SearchBar() {

    const dispatch = useDispatch()
    const history = useHistory()
    const { params } = useParams()
    const [keyword, setKeyword] = useState("");
    // const searchResults = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 2 }, { id: 1 }, { id: 2 },]
    const searchResults = Object.values(useSelector((state)=>{
        return state.search
    }))

    console.log("--->",searchResults)

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
                setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);


    const handleSearch = async (e) => {
        e.preventDefault();
        if (keyword.trim().length === 0) {
            return;
        }
        // history.push(`/search/${keyword}`)
        const response = await dispatch(search_spots_thunk(keyword));
        if (response) {

            history.push(`/search/${keyword}`);
        }


        setKeyword("");
    };

    return (
        <>
            <form
                onSubmit={handleSearch}
                className="search-bar-form"
            >

                <input
                    placeholder="Search..."
                    value={keyword}
                    onClick={openMenu}
                    onChange={(e) => {
                        openMenu()
                        setKeyword(e.target.value)
                        // dispatch(search_spots_thunk(e.target.value))
                    }}
                    maxLength="100"
                />
                <button type="submit" className="search-button">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>

                <SearchDropDown
                    searchResults={searchResults}
                    showMenu={showMenu}
                    closeMenu={closeMenu}
                />


            </form>

        </>
    )
}
