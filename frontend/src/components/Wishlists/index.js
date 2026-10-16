import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { getFavorites } from "../../store/favorites";
import { SpotGrid, SpotGridSkeleton } from "../SpotsList";
import "../SearchResult/SearchResult.css";

export default function Wishlists() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const favorites = useSelector(state => state.favorites);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!user) return;
        dispatch(getFavorites()).catch(() => null).then(() => setIsLoaded(true));
    }, [dispatch, user]);

    // Entries are `true` for hearts toggled this session before a refetch; only render full spots
    const spots = Object.values(favorites).filter(spot => typeof spot === "object");

    return (
        <main className="page search-page">
            <h1 className="page-title">Wishlists</h1>
            {!user ? (
                <p className="muted">Log in to see the stays you've saved.</p>
            ) : !isLoaded ? (
                <SpotGridSkeleton count={4} />
            ) : spots.length ? (
                <SpotGrid spots={spots} />
            ) : (
                <div className="empty-state">
                    <FiHeart className="empty-icon" />
                    <h1>Create your first wishlist</h1>
                    <p className="muted">As you search, tap the heart icon to save your favorite places to stay.</p>
                    <Link to="/" className="btn btn-dark">Start exploring</Link>
                </div>
            )}
        </main>
    );
}
