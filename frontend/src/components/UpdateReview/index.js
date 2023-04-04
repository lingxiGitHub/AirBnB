import "./UpdateReview.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSpotThunk } from "../../store/spots"
import { useModal } from "../../context/Modal";
import { getSpotReviews, updateReviewThunk } from "../../store/reviews";
import { getSingleSpot } from "../../store/spots";

export default function UpdateReviewComp({ spotId, grabReview }) {

    // console.log("--->inside update review comp",spotId)
    // console.log("--->inside update review comp", grabReview)

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState(grabReview.review);
    const [stars, setStars] = useState(grabReview.stars);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const validationErrors = []
        if (stars && stars < 1 || stars > 5) { validationErrors.push("Star must be between 1 and 5") }
        setErrors(validationErrors)

    }, [stars])

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedReview = {
            review,
            stars
        }

        // console.log("am i here?",updatedReview)


        dispatch(updateReviewThunk(updatedReview, grabReview.id))
            .then(closeModal)
            .then(()=>dispatch(getSpotReviews(spotId)))
            .then(() => dispatch(getSingleSpot(spotId)))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }



    return (
        <>
            <form
                className="update-review-form"
                onSubmit={handleUpdate}
            >

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
                        min={1}
                        max={5}
                        required

                    />
                </label>
                <button type="submit">Submit</button>


            </form>


        </>
    )

}