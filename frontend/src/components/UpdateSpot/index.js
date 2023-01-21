import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSpotThunk } from "../../store/spots"
import { useModal } from "../../context/Modal";
import "./UpdateSpot.css"


export default function UpdateSpot({ showEdit, setShowEdit, singleSpot }) {


    const dispatch = useDispatch()
    const [city, setCity] = useState(singleSpot.city)
    // console.log(city)
    const [state, setState] = useState(singleSpot.state)
    const [address, setAddress] = useState(singleSpot.address)
    const [country, setCountry] = useState(singleSpot.country)
    const [lat, setLat] = useState(singleSpot.lat)
    const [lng, setLng] = useState(singleSpot.lng)
    const [name, setName] = useState(singleSpot.name)
    const [description, setDescription] = useState(singleSpot.description)
    const [price, setPrice] = useState(singleSpot.price)
    const { closeModal } = useModal();

    // console.log("singleSpot", singleSpot)

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
            .then(() => closeModal())
        // setShowEdit(false)
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
                        className="update-spot-form"
                        onSubmit={handleUpdate}
                    >
                        <label>
                            <span>Address</span>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>City</span>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>State</span>
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Country</span>
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
                        <label>
                            <span>Name</span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Description</span>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Price</span>
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