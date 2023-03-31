import "./Navigation.css";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { search_spots_thunk } from "../../store/search";
import SearchDropDown from "../SearchResult";
import { useEffect, useRef } from "react";
import { reset } from "../../store/search";


export default function SearchBar() {

    const dispatch = useDispatch()
    const history = useHistory()
    const { params } = useParams()
    const [keyword, setKeyword] = useState("");

    const searchResults = Object.values(useSelector((state) => {
        return state.search
    }))

    console.log("--->", searchResults)


    const handleSearch = async (e) => {
        e.preventDefault();
        if (keyword.trim().length === 0) {
            return;
        }

        await dispatch(reset())
        await dispatch(search_spots_thunk(keyword));


        history.push(`/search/${keyword}`);
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
                    onChange={(e) => {
                        setKeyword(e.target.value)
                    }}
                    maxLength="100"
                />
                <button
                    type="submit"
                    className="search-button">
                    search
                </button>

                {/* <SearchDropDown
                    searchResults={searchResults}
                /> */}


            </form>

        </>
    )
}
