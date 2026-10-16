import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import ModalShell from "../../context/ModalShell";
import StarInput from "../StarInput";
import { getSpotReviews, updateReviewThunk } from "../../store/reviews";
import { getSingleSpot } from "../../store/spots";
import "../CreateReview/CreateReview.css";

export default function UpdateReviewComp({ spotId, grabReview }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState(grabReview.review);
    const [stars, setStars] = useState(grabReview.stars);
    const [errors, setErrors] = useState([]);

    const handleUpdate = (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(updateReviewThunk({ review, stars }, grabReview.id))
            .then(closeModal)
            .then(() => dispatch(getSpotReviews(spotId)))
            .then(() => dispatch(getSingleSpot(spotId)))
            .catch(async (res) => {
                const data = res && res.json ? await res.json() : {};
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    };

    return (
        <ModalShell title="Edit your review">
            <form className="review-form" onSubmit={handleUpdate}>
                {errors.length > 0 && (
                    <ul className="form-errors">{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
                )}
                <div className="review-form-label">Overall rating</div>
                <StarInput value={stars} onChange={setStars} />
                <div className="review-form-label">Your review</div>
                <div className="field-group">
                    <label className="field">
                        <textarea
                            className="review-textarea"
                            rows={5}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button className="btn btn-primary btn-block review-submit" type="submit">Save changes</button>
            </form>
        </ModalShell>
    );
}
