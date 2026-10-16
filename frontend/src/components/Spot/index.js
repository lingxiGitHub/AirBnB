import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import HeartButton from "../HeartButton";
import { formatPrice, formatRating } from "../../utils/format";
import "./SpotCard.css";

function Spot({ spot }) {
    const [imgFailed, setImgFailed] = useState(false);
    const location = [spot.city, spot.state].filter(Boolean).join(", ");

    return (
        <div className="spot-card">
            <div className="spot-photo">
                {spot.previewImage && !imgFailed ? (
                    <img
                        src={spot.previewImage}
                        alt={spot.name}
                        loading="lazy"
                        onError={() => setImgFailed(true)}
                    />
                ) : (
                    <div className="spot-photo-fallback"><FiHome /></div>
                )}
                <HeartButton spotId={spot.id} />
            </div>

            <div className="spot-summary">
                <div className="spot-title-row">
                    <span className="spot-location">{location || spot.name}</span>
                    {spot.avgRating !== undefined && (
                        <span className="spot-rating">
                            <FaStar className="star-icon" /> {formatRating(spot.avgRating)}
                        </span>
                    )}
                </div>
                <div className="spot-name muted">{spot.name}</div>
                <div className="spot-price">
                    <strong>{formatPrice(spot.price)}</strong> night
                </div>
            </div>
        </div>
    );
}

export default Spot;
