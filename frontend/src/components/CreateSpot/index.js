import "./CreateSpot.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import ModalShell from "../../context/ModalShell";
import SpotFormFields from "./SpotFormFields";

function CreateSpotModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const newSpot = {
            address, city, state, country,
            lat: "37.77", lng: "122.41",
            name, description, price, url,
            preview: true
        };

        return dispatch(addSpot(newSpot))
            .then(createdSpotId => { history.push(`/spots/${createdSpotId}`); closeModal(); })
            .catch(async (res) => {
                const data = res && res.json ? await res.json() : {};
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    };

    return (
        <ModalShell title="Airbnb your home" width="640px">
            <form id="create-spot-form" className="spot-form" onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <ul className="form-errors">{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
                )}
                <SpotFormFields
                    values={{ address, city, state, country, name, description, price, url }}
                    set={{ address: setAddress, city: setCity, state: setState, country: setCountry, name: setName, description: setDescription, price: setPrice, url: setUrl }}
                    includePhoto
                />
                <button className="btn btn-primary btn-block spot-form-submit" type="submit">Publish listing</button>
            </form>
        </ModalShell>
    );
}

export default CreateSpotModal;
