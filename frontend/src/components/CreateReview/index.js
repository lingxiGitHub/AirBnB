import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react"
import { addReview } from "../../store/reviews"
import { getSpotReviews } from "../../store/reviews"
import { getSingleSpot } from "../../store/spots";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import "./CreateReview.css"

export default function CreateReview({ spotId, showEdit, setShowEdit, singleSpot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const { closeModal } = useModal();

    useEffect(() => {
        const validationErrors = []
        if (stars && stars < 1 || stars > 5) { validationErrors.push("Star must be between 1 and 5") }
        setErrors(validationErrors)

    }, [stars])


    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            review,
            stars
        }
        setErrors([]);

        return dispatch(addReview(newReview, +spotId))
            .then(() => dispatch(getSpotReviews(+spotId)))
            .then(() => dispatch(getSingleSpot(+spotId)))
            .then(() => closeModal())
            .catch(
                async (res) => {
                    const data = res ? await res.json() : {};
                    console.log("data", data.errors)
                    if (data && data.errors) setErrors(data.errors);
                }
            )


    }

    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        if (sessionUser.id !== singleSpot.ownerId) {
            sessionLinks = (
                <form 
                className="create-review-form"
                onSubmit={handleSubmit}
                >
                    <ul className="error-display">
                        {console.log("star errors", errors)}
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>

                    <label>
                        <span>Review</span>
                        <input
                            type="text"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required

                        />
                    </label>

                    <label>
                        <span>Stars</span>
                        <input
                            type="number"
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                            required

                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            )
        } else if (sessionUser.id === singleSpot.ownerId) {
            sessionLinks = (
                <div>You are the owner. You are not authorized to leave reviews.</div>
            )

        }

    } else {
        sessionLinks = (
            <div>
                Please log in to create a review
            </div>
        )

    }


    return (
        <>
            {sessionLinks}

        </>
    )
}