import { Link } from "react-router-dom";
import "./TripCard.css";

function formatDate(inputDate, withYear = true) {
    return new Date(inputDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        ...(withYear && { year: 'numeric' })
    });
}

export default function TripCard({ booking, large, children }) {
    const spot = booking.Spot;
    const dates = `${formatDate(booking.startDate, false)} – ${formatDate(booking.endDate)}`;

    if (large) {
        return (
            <div className="trip-card-large">
                <Link to={`/spots/${booking.spotId}`} className="trip-card-large-link">
                    <img src={spot.previewImage} alt={spot.name} />
                    <div className="trip-card-large-body">
                        <div className="trip-city">{spot.city}</div>
                        <div className="muted">{spot.name}</div>
                        <div className="trip-dates">{dates}</div>
                        <div className="muted">Hosted by {spot.Owner.firstName}</div>
                    </div>
                </Link>
                {children}
            </div>
        );
    }

    return (
        <Link to={`/spots/${booking.spotId}`} className="trip-card">
            <img className="trip-card-img" src={spot.previewImage} alt={spot.name} />
            <div className="trip-card-body">
                <div className="trip-city">{spot.city}</div>
                <div className="muted">Hosted by {spot.Owner.firstName}</div>
                <div className="muted">{dates}</div>
            </div>
        </Link>
    );
}
