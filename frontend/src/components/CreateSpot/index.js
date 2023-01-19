import "./CreateSpot.css"
import { useState } from "react"
import { addSpot } from "../../store/spots"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

function CreateSpotModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setlng] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [url, setUrl] = useState("")
    const { closeModal } = useModal();


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
            url
        }
        dispatch(addSpot(newSpot)).then(closeModal).then(() => { history.push('/'); history.go(0); })
            ;
    }
    return (
        <>
            <p>this is for create a spot</p>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>

                <label>address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required

                    />
                </label>
                <label>city
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required

                    />
                </label>
                <label>state
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required

                    />
                </label>
                <label>country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required

                    />
                </label>
                <label>lat
                    <input
                        type="number"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required

                    />
                </label>
                <label>lng
                    <input
                        type="number"
                        value={lng}
                        onChange={(e) => setlng(e.target.value)}
                        required

                    />
                </label>
                <label>name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required

                    />
                </label>
                <label>description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required

                    />
                </label>
                <label>price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required

                    />
                </label>
                <label>url
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required

                    />
                </label>
                <button type="submit">Create</button>

            </form>
        </>
    )
}

export default CreateSpotModal;