import "./Navigation.css";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { search_spots_thunk } from "../../store/search";

export default function SearchBar() {

    const dispatch = useDispatch()
    const history = useHistory()
    const { params } = useParams()
    const [keyword, setKeyword] = useState("");

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
                    onChange={(e) => setKeyword(e.target.value)}
                    maxLength="100"
                />
                <button type="submit" className="search-button">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>


            </form>

        </>
    )
}
