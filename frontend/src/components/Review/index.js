import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { getSpotReviews, deleteReviewThunk } from "../../store/reviews";
import { getSingleSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import CreateReview from "../CreateReview";
import UpdateReviewComp from "../UpdateReview";
import { formatRating, pluralize } from "../../utils/format";
import "./Review.css";

const dateOptions = { year: 'numeric', month: 'long' };

function Stars({ value }) {
    const rounded = Math.round(Number(value));
    return (
        <span className="review-stars" aria-label={`${value} stars`}>
            {[1, 2, 3, 4, 5].map(n => (
                <FaStar key={n} className={n <= rounded ? "on" : ""} />
            ))}
        </span>
    );
}

export default function DisplayReview({ singleSpot, spotId }) {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const [isLoaded, setIsLoaded] = useState(false);

    const allReviewObj = useSelector(state => state.reviews.spot);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSpotReviews(+spotId)).then(() => setIsLoaded(true));
    }, [dispatch, spotId]);

    if (!isLoaded) return null;

    const reviews = (allReviewObj ? Object.values(allReviewObj) : [])
        .filter(review => +review.spotId === +spotId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const isOwner = sessionUser && +sessionUser.id === +singleSpot.ownerId;
    const myReview = sessionUser && reviews.find(review => +review.userId === +sessionUser.id);
    const canReview = sessionUser && !isOwner && !myReview;

    const handleDelete = () => {
        dispatch(deleteReviewThunk(+myReview.id))
            .then(() => dispatch(getSpotReviews(+spotId)))
            .then(() => dispatch(getSingleSpot(+spotId)));
    };

    return (
        <section className="reviews-section" id="reviews">
            <div className="reviews-header">
                <h2 className="reviews-title">
                    <FaStar className="reviews-title-star" />
                    {formatRating(singleSpot.avgStarRating)}
                    <span className="dot">·</span>
                    {pluralize(singleSpot.numReviews, "review")}
                </h2>
                {canReview && (
                    <button
                        className="btn btn-outline"
                        onClick={() => setModalContent(<CreateReview spotId={spotId} singleSpot={singleSpot} />)}
                    >
                        Write a review
                    </button>
                )}
            </div>

            {reviews.length === 0 ? (
                <p className="muted reviews-empty">
                    No reviews yet. {canReview ? "Stayed here? Be the first to share your experience." : ""}
                </p>
            ) : (
                <div className="reviews-grid">
                    {reviews.map(item => (
                        <article className="review-card" key={item.id}>
                            <div className="review-header">
                                <span className="avatar avatar-md">{item.User.firstName[0]}</span>
                                <div>
                                    <div className="review-author">{item.User.firstName}</div>
                                    <div className="muted review-date">
                                        {new Date(item.createdAt).toLocaleDateString("en-US", dateOptions)}
                                    </div>
                                </div>
                            </div>
                            <Stars value={item.stars} />
                            <p className="review-text">{item.review}</p>

                            {myReview && myReview.id === item.id && (
                                <div className="review-actions">
                                    <button
                                        className="btn-link review-action"
                                        onClick={() => setModalContent(<UpdateReviewComp spotId={spotId} grabReview={item} />)}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn-link review-action" onClick={handleDelete}>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
