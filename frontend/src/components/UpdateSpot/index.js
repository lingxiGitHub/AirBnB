import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSpotThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";
import ModalShell from "../../context/ModalShell";
import SpotFormFields from "../CreateSpot/SpotFormFields";
import "../CreateSpot/CreateSpot.css";

export default function UpdateSpot({ singleSpot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const [city, setCity] = useState(singleSpot.city);
    const [state, setState] = useState(singleSpot.state);
    const [address, setAddress] = useState(singleSpot.address);
    const [country, setCountry] = useState(singleSpot.country);
    const [name, setName] = useState(singleSpot.name);
    const [description, setDescription] = useState(singleSpot.description);
    const [price, setPrice] = useState(singleSpot.price);

    const handleUpdate = (e) => {
        e.preventDefault();
        setErrors([]);
        const updatedSpot = {
            id: singleSpot.id,
            address, city, state, country,
            lat: singleSpot.lat, lng: singleSpot.lng,
            name, description, price
        };

        dispatch(updateSpotThunk(updatedSpot))
            .then(() => closeModal())
            .catch(async (res) => {
                const data = res && res.json ? await res.json() : {};
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    };

    return (
        <ModalShell title="Edit listing" width="640px">
            <form className="spot-form" onSubmit={handleUpdate}>
                {errors.length > 0 && (
                    <ul className="form-errors">{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
                )}
                <SpotFormFields
                    values={{ address, city, state, country, name, description, price }}
                    set={{ address: setAddress, city: setCity, state: setState, country: setCountry, name: setName, description: setDescription, price: setPrice }}
                />
                <button type="submit" className="btn btn-dark btn-block spot-form-submit">Save changes</button>
            </form>
        </ModalShell>
    );
}
