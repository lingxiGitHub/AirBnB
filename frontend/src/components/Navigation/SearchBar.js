import "./Navigation.css";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { search_spots_thunk, reset } from "../../store/search";

export default function SearchBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [keyword, setKeyword] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        const term = keyword.trim();
        if (term.length === 0) return;

        await dispatch(reset());
        await dispatch(search_spots_thunk(term));
        history.push(`/search/${encodeURIComponent(term)}`);
        setKeyword("");
    };

    return (
        <form onSubmit={handleSearch} className="search-pill" role="search">
            <label className="search-field">
                <span className="search-label">Where</span>
                <input
                    className="search-input"
                    placeholder="Search by city or listing name"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    maxLength="100"
                />
            </label>
            <button type="submit" className="search-button" aria-label="Search">
                <FiSearch strokeWidth={3} />
                <span className="search-button-text">Search</span>
            </button>
        </form>
    );
}
