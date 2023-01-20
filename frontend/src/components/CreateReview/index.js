import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react"
import { addReview } from "../../store/reviews"
import { getSpotReviews } from "../../store/reviews"
import { getSingleSpot } from "../../store/spots";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";

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
            // .then(() => setShowEdit(false))
            .catch(
                async (res) => {
                    const data = await res.json();
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
                <form onSubmit={handleSubmit}>
                    <ul>
                        {console.log("star errors", errors)}
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>

                    <label>review
                        <input
                            type="text"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required

                        />
                    </label>

                    <label>stars
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