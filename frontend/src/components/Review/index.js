import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getSpotReviews } from "../../store/reviews"
import CreateReview from "../CreateReview"
import { deleteReviewThunk } from "../../store/reviews";
import { getSingleSpot } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";


export default function DisplayReview({ singleSpot, spotId }) {

    // console.log("Single Spot id for reviews", spotId)

    const allReviewObj = useSelector((state) => {
        return state.reviews.spot
    })

    // console.log("allReviewObj", allReviewObj)

    const allReviewArr = allReviewObj ? Object.values(allReviewObj) : []

    // console.log("allReviewArr", allReviewArr)

    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotReviews(+spotId)).then(() => setIsLoaded(true))
    }, [dispatch])

    const [showEdit, setShowEdit] = useState(false);

    //find the review Id that the userId created
    // const currentUserId = useSelector((state) => {
    //     return state.session.user.id
    // })


    const sessionUser = useSelector(state => state.session.user)

    let sessionLinks

    let alreadyReviewSessionLinks

    if (sessionUser) {

        const currentUserId = sessionUser.id
        // console.log("arr's user id",)

        let theReviewId
        let allReviewsUserId = []

        for (let review of allReviewArr) {
            allReviewsUserId.push(+review.userId)
            if (+currentUserId === +review.userId) {
                // console.log("review.userId", review.userId)
                theReviewId = review.id

            }

        }


        // console.log("arr's user id", allReviewsUserId)
        // console.log("theReviewId", theReviewId)
        // console.log("allReviewsUserId", allReviewsUserId)
        // console.log("currentUserId", currentUserId)


        const handleDelete = () => {
            dispatch(deleteReviewThunk(+theReviewId))
                .then(() => dispatch(getSpotReviews(+spotId)))
                .then(() => dispatch(getSingleSpot(+spotId)))
        }

        if (allReviewsUserId.includes(+currentUserId)) {

            sessionLinks = (
                
                    <li>
                        <button
                            onClick={handleDelete}
                        >Delete Review</button>
                    </li>

                 
                
            )

        }

        if (!allReviewsUserId.includes(+currentUserId)) {
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



    return (
        isLoaded && (
            <>
                <h2>to display reviews here</h2>

                <div className="reviews">
                    <p>{singleSpot.avgStarRating}</p>
                    <p>{singleSpot.numReviews}</p>
                    {allReviewArr && (allReviewArr.map(item => {

                        return (
                            +spotId === +item.spotId && (
                                <p key={item.id}>{item.review}</p>
                            )

                        )
                    }))}

                    {/* <div className="addReview">
                        <button
                            onClick={() => setShowEdit(!showEdit)}
                        >Create Review</button>
                    </div>
                    {showEdit && (

                        <CreateReview
                            spotId={spotId}
                            showEdit={showEdit}
                            setShowEdit={setShowEdit}
                            singleSpot={singleSpot}
                        />
                    )} */}

                    {/* <li>
                        <OpenModalButton
                            buttonText="Create Review"
                            modalComponent={<CreateReview
                                spotId={spotId}
                                showEdit={showEdit}
                                setShowEdit={setShowEdit}
                                singleSpot={singleSpot}
                            />}
                        />

                    </li> */}

                    {sessionUser && (sessionLinks)}


                </div>
            </>
        )

    )
}