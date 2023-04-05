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
                    <h1 className="update-h1">Update Your Spot</h1>
                    <form
                        className="update-spot-form"
                        onSubmit={handleUpdate}
                    >
                        <div className="single-input">
                            <label>Address </label>
                            <input
                                placeholder="Address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="single-input">
                            <label>City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div className="single-input">
                            <label>State</label>
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>

                        <div className="single-input">
                            <label>Country</label>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>

                        <div className="single-input">

                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="single-input">
                            <label>Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="single-input last-input">
                            <label>Price</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="update-spot-button"
                        >Update</button>
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