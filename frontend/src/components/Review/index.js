import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/reviews"
import CreateReview from "../CreateReview"
import { deleteReviewThunk } from "../../store/reviews";
import { getSingleSpot } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import "./Review.css"
import UpdateReviewComp from "../UpdateReview";

export default function DisplayReview({ singleSpot, spotId }) {


    const allReviewObj = useSelector((state) => {
        return state.reviews.spot
    })



    const allReviewArr = allReviewObj ? Object.values(allReviewObj) : []



    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotReviews(+spotId)).then(() => setIsLoaded(true))
    }, [dispatch])

    const [showEdit, setShowEdit] = useState(false);



    const sessionUser = useSelector(state => state.session.user);
    const ownerId = useSelector(state => state.spots.singleSpot.ownerId)

    let sessionLinks



    if (sessionUser) {

        const currentUserId = sessionUser.id
        // console.log("arr's user id",)

        let theReviewId
        let allReviewsUserId = []
        let grabReview
        for (let review of allReviewArr) {
            // console.log("rrrr",review)
            if (+review.spotId === +spotId){
              allReviewsUserId.push(+review.userId)  
            }
            
            if (+currentUserId === +review.userId) {
                // console.log(review)
                theReviewId = review.id
                grabReview = review
                // console.log("grab", grabReview)

            }

        }

        // console.log("&&&&",allReviewsUserId)
        // console.log("_____", currentUserId)





        const handleDelete = () => {
            dispatch(deleteReviewThunk(+theReviewId))
                .then(() => dispatch(getSpotReviews(+spotId)))
                .then(() => dispatch(getSingleSpot(+spotId)))
        }


        // console.log("grab", grabReview)
        if (allReviewsUserId.includes(+currentUserId) && currentUserId != ownerId) {

            sessionLinks = (
                <div className="review-buttons">
                    <OpenModalButton
                        buttonText="Update"
                        modalComponent={<UpdateReviewComp
                            spotId={spotId}
                            grabReview={grabReview}

                        />} />

                    <li>
                        <button
                            onClick={handleDelete}
                        >Delete</button>
                    </li>

                </div>

            )

        }

        if (!allReviewsUserId.includes(+currentUserId) && currentUserId != ownerId) {
            sessionLinks = (
                <li>
                    <OpenModalButton
                        buttonText="Create Review"
                        modalComponent={<CreateReview
                            spotId={spotId}
                            showEdit={showEdit}
                            setShowEdit={setShowEdit}
                            singleSpot={singleSpot}
                        />}
                    />

                </li>
            )

        }


    }

    const options = { year: 'numeric', month: 'long' };

    return (
        isLoaded && (
            <>


                <div className="reviews">

                    <p>★ {singleSpot.avgStarRating}</p>
                    <p>{singleSpot.numReviews} reviews</p>

                    <div className="reviews-container">
                        {allReviewArr && (allReviewArr.map(item => {

                            return (
                                +spotId === +item.spotId && (
                                    <div className="review-card">
                                        <div className="review-header">
                                            <img className="review-img" src="https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-700-202768327.jpg" />
                                            <div className="review-header-text">
                                                <div><b>{item.User.firstName}</b></div>
                                                <div className="grey-word">{new Date(item.createdAt).toLocaleDateString("en-US", options)}</div>

                                            </div>

                                        </div>

                                        <p key={item.id}>{item.review}</p>

                                    </div>
                                )

                            )
                        }))}

                    </div>




                    {sessionUser && (sessionLinks)}


                </div>
            </>
        )

    )
}