import { Link, NavLink } from "react-router-dom"

import "./SpotCard.css"

function Spot({ spot }) {



    return (
        <div className="spot-card">

            <img className="square" src={spot.previewImage} />

            <div className="spot-summary">
                <p className="summary-item">{spot.name}</p>
                <p id="star-sign">★{spot.avgRating}</p>
                <p className="summary-item">${spot.price} night</p>
            </div>

        </div>
    );
}


export default Spot;