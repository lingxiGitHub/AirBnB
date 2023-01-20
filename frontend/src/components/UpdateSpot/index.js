import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleSpot, getSingleSpot } from "../../store/spots"
import { useParams } from 'react-router-dom';
import { updateSingleSpot, updateSpotThunk } from "../../store/spots"


export default function UpdateSpot({ showEdit, setShowEdit, singleSpot }) {


    const dispatch = useDispatch()
    const [city, setCity] = useState(singleSpot.city)
    console.log(city)
    const [state, setState] = useState(singleSpot.state)
    const [address, setAddress] = useState(singleSpot.address)
    const [country, setCountry] = useState(singleSpot.country)
    const [lat, setLat] = useState(singleSpot.lat)
    const [lng, setLng] = useState(singleSpot.lng)
    const [name, setName] = useState(singleSpot.name)
    const [description, setDescription] = useState(singleSpot.description)
    const [price, setPrice] = useState(singleSpot.price)

    console.log("singleSpot", singleSpot)

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedSpot = {
            id: singleSpot.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        dispatch(updateSpotThunk(updatedSpot))
        setShowEdit(false)
    }

    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {

        const currentUserId = sessionUser.id
        const spotOwnerId = singleSpot.ownerId


        if (currentUserId === spotOwnerId) {
            sessionLinks = (
                <>
                    <form
                        onSubmit={handleUpdate}
                    >
                        <label>address
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </label>
                        <label>city
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </label>
                        <label>state
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </label>
                        <label>country
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label>
                        {/* <label>lat
                    <input
                        type="text"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                <label>lng
                    <input
                        type="text"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    /> */}
                        {/* </label> */}
                        <label>name
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>description
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        <label>price
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        <button
                            type="submit"
                        >Submit</button>
                    </form>
                </>
            )
        } else if ((currentUserId !== spotOwnerId)) {
            sessionLinks = (
                <p>You are not the owner</p>
            )

        }
    } else {
        sessionLinks = (
            <div>
                Please log in to update the spot
            </div>
        )
    }


    return (
        <>
            {sessionLinks}
        </>

    )
}