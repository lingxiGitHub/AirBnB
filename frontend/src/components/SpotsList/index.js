import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom"
import Spot from "../Spot"
import { useDispatch, useSelector } from "react-redux";
import { loadSpots, getAllSpots } from "../../store/spots"
import { useState } from "react"

function SpotsList() {


    const allSpotsObj = useSelector((state) => {
        console.log("allSpotState", state)
        return state.spots.allSpots
    })

    const allSpots = allSpotsObj ? Object.values(allSpotsObj) : [];

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSpots()).then(() => setIsLoaded(true));
    }, [dispatch])

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        isLoaded && (

            <div className="spots-list">
                <h2>this is home</h2>
                {allSpots.map(spot => {
                    return (
                        <Link key={spot.id} to={`/rooms/${spot.id}`}>
                            <Spot spot={spot} />

                        </Link>)
                })}
            </div>
        )

    );
}


export default SpotsList;