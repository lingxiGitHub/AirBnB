import { useDispatch } from "react-redux";
import { useState } from "react";
import { addReview, getSpotReviews } from "../../store/reviews";
import { getSingleSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import ModalShell from "../../context/ModalShell";
import StarInput from "../StarInput";
import "./CreateReview.css";

export default function CreateReview({ spotId, singleSpot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!stars) return setErrors(["Please choose a star rating"]);
        setErrors([]);

        return dispatch(addReview({ review, stars }, +spotId))
            .then(() => dispatch(getSpotReviews(+spotId)))
            .then(() => dispatch(getSingleSpot(+spotId)))
            .then(() => closeModal())
            .catch(async (res) => {
                const data = res && res.json ? await res.json() : {};
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    };

    return (
        <ModalShell title="Write a review">
            <form className="review-form" onSubmit={handleSubmit}>
                <h2 className="modal-heading">How was your stay at {singleSpot.name}?</h2>
                {errors.length > 0 && (
                    <ul className="form-errors">{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
                )}
                <div className="review-form-label">Overall rating</div>
                <StarInput value={stars} onChange={setStars} />
                <div className="review-form-label">Tell future guests about your stay</div>
                <div className="field-group">
                    <label className="field">
                        <textarea
                            className="review-textarea"
                            placeholder="What did you love? What could be better?"
                            rows={5}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button className="btn btn-primary btn-block review-submit" type="submit">Post review</button>
            </form>
        </ModalShell>
    );
}
