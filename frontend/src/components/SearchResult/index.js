import "./SearchResult.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { search_spots_thunk } from "../../store/search";
import { SpotGrid, SpotGridSkeleton } from "../SpotsList";
import { pluralize } from "../../utils/format";

export default function SearchResult() {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
        dispatch(search_spots_thunk(keyword)).catch(() => null).then(() => setIsLoaded(true));
    }, [dispatch, keyword]);

    const foundSpots = Object.values(useSelector(state => state.search));

    return (
        <main className="page search-page">
            {!isLoaded ? (
                <SpotGridSkeleton count={8} />
            ) : foundSpots.length > 0 ? (
                <>
                    <h1 className="search-heading">
                        {pluralize(foundSpots.length, "stay")} matching “{keyword}”
                    </h1>
                    <SpotGrid spots={foundSpots} />
                </>
            ) : (
                <div className="empty-state">
                    <FiSearch className="empty-icon" />
                    <h1>No exact matches</h1>
                    <p className="muted">
                        We couldn't find any stays for “{keyword}”. Try searching for a different city or listing name.
                    </p>
                    <Link to="/" className="btn btn-outline">Explore all stays</Link>
                </div>
            )}
        </main>
    );
}
