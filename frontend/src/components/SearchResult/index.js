import "./SearchResult.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation";
import { search_spots_thunk } from "../../store/search";



export default function SearchResult() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(search_spots_thunk(keyword))
    }, [dispatch, keyword])

    const foundSpot = useSelector(state => state.search)
    const foundSpotArr = Object.values(foundSpot)
    // console.log("!!!!", foundSpotArr)

    return (
        <>


            {foundSpotArr && (

                <>
                    <div>
                        {foundSpotArr?.length > 0 ?

                            (
                                <div className='search-cap'>
                                    {foundSpotArr?.length} search results for {keyword}
                                </div>
                            ) : (
                                <div className='search-cap'>
                                    We couldn't find any results for {keyword}"
                                </div>)
                        }
                    </div>

                    <div className="search-box">
                        {
                            foundSpotArr.length > 0 && (

                                foundSpotArr.map((spot) => {
                                    // console.log(spot)
                                    return (
                                        <NavLink to={`/spots/${spot.id}`}>{spot.name} at {spot.city} {spot.state}</NavLink>
                                    )
                                })
                            )


                        }

                    </div>
                </>
            )
            }
        </>
    )
}