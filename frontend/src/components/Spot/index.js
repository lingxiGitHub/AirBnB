import { Link, NavLink } from "react-router-dom"

function Spot({ spot }) {



    return (
        <div className="spots-list">

            <img src={spot.previewImage} width="200" />
            <p>{spot.name}</p>
        </div>
    );
}


export default Spot;