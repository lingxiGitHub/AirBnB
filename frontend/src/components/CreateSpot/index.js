import "./CreateSpot.css"
import { useState } from "react"
import { addSpot } from "../../store/spots"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";

function CreateSpotModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState("37.77")
    const [lng, setlng] = useState("122.41")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [url, setUrl] = useState("")
    const { closeModal } = useModal();


    useEffect(() => {
        const validationErrors = []
        if (price && price < 0) { validationErrors.push("Price must be positive") }
        setErrors(validationErrors)

    }, [price])


    const handleSubmit = (e) => {
        e.preventDefault();

        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            url,
            preview: true
        }
        return dispatch(addSpot(newSpot))
            .then(createdSpotId => { history.push(`/spots/${createdSpotId}`); closeModal() })
            .catch(
                async (res) => {
                    const data = await res.json();
                    // console.log("data", data.errors)
                    if (data && data.errors) setErrors(data.errors);
                }
            )

    }


    return (
        <>
            <h1 className="create-spot-h1">Create Spot</h1>
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <ul className="red-errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>


                <input
                    className="first-input"
                    type="text"
                    placeholder="Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required

                />


                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required

                />


                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required

                />


                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required

                />


                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required

                />


                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required

                />


                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required

                />



                <input
                    className="last-input"
                    type="text"
                    placeholder="Photo Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required

                />

                <button type="submit">Create</button>

            </form>
        </>
    )
}

export default CreateSpotModal;