import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spot from "../Spot";
import { getAllSpots } from "../../store/spots";
import "./SpotList.css";

export function SpotGrid({ spots }) {
    return (
        <div className="spots-grid">
            {spots.map(spot => (
                <Link className="spot-link" key={spot.id} to={`/spots/${spot.id}`}>
                    <Spot spot={spot} />
                </Link>
            ))}
        </div>
    );
}

export function SpotGridSkeleton({ count = 12 }) {
    return (
        <div className="spots-grid">
            {Array.from({ length: count }, (_, i) => (
                <div key={i} className="skeleton-card">
                    <div className="skeleton skeleton-photo" />
                    <div className="skeleton skeleton-line" />
                    <div className="skeleton skeleton-line short" />
                </div>
            ))}
        </div>
    );
}

function SpotsList() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const allSpotsObj = useSelector(state => state.spots.allSpots);
    const allSpots = allSpotsObj ? Object.values(allSpotsObj) : [];

    useEffect(() => {
        dispatch(getAllSpots()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <main className="page spots-page">
            {isLoaded ? <SpotGrid spots={allSpots} /> : <SpotGridSkeleton />}
        </main>
    );
}

export default SpotsList;
