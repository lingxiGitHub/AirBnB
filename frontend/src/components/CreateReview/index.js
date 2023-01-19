import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useState } from "react"
import { addReview } from "../../store/reviews"
import { loadReviews, getSpotReviews } from "../../store/reviews"

export default function CreateReview({ spotId,showEdit,setShowEdit }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            review,
            stars
        }
        dispatch(addReview(newReview, +spotId)).then(() => dispatch(getSpotReviews(+spotId)))
        setShowEdit(false)
    }


    return (
        <>

            <form onSubmit={handleSubmit}>
                <ul>
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
        </>
    )
}