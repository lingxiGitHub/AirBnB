import "./SpotCard.css"

function Spot({ spot }) {



    return (
        <div className="spot-card">

            <img className="square" src={spot.previewImage} />

            <div className="spot-summary">
                <div className="top-line">

                    <div className="summary-item">{spot.name}</div>
                    <div id="right-rating">★ {spot.avgRating}</div>
                </div>

                <div className="summary-item"><strong>${spot.price.toLocaleString()}</strong> night</div>
            </div>

        </div>
    );
}


export default Spot;