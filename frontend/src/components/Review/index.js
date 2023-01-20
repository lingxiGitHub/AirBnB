import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { loadReviews, getSpotReviews } from "../../store/reviews"
import CreateReview from "../CreateReview"
import { deleteReview, deleteReviewThunk } from "../../store/reviews";



export default function DisplayReview({ singleSpot, spotId }) {

    // console.log("Single Spot id for reviews", spotId)

    const allReviewObj = useSelector((state) => {
        return state.reviews.spot
    })

    console.log("allReviewObj", allReviewObj)

    const allReviewArr = allReviewObj ? Object.values(allReviewObj) : []

    console.log("allReviewArr", allReviewArr)

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

    //    && allReviewsUserId.includes(+currentUserId)
    const sessionUser = useSelector(state => state.session.user)
    let sessionLinks

    if (sessionUser) {





        const currentUserId = sessionUser.id

        console.log("arr's user id",)

        let theReviewId
        let allReviewsUserId = []

        for (let review of allReviewArr) {
            allReviewsUserId.push(+review.userId)
            if (+currentUserId === +review.userId) {
                console.log("review.userId", review.userId)
                theReviewId = review.id

            }

        }


        // console.log("arr's user id", allReviewsUserId)
        // console.log("theReviewId", theReviewId)
        // console.log("allReviewsUserId", allReviewsUserId)
        // console.log("currentUserId", currentUserId)


        const handleDelete = () => {
            dispatch(deleteReviewThunk(+theReviewId)).then(() => dispatch(getSpotReviews(+spotId)))
        }
        if (allReviewsUserId.includes(+currentUserId)) {

            sessionLinks = (

                <button
                    onClick={handleDelete}
                >Delete Review</button>
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

                    <div className="addReview">
                        <button
                            onClick={() => setShowEdit(!showEdit)}
                        >Create Review</button>
                    </div>
                    {showEdit && (

                        <CreateReview
                            spotId={spotId}
                            showEdit={showEdit}
                            setShowEdit={setShowEdit}
                        />
                    )}

                    {sessionUser && (sessionLinks)}


                </div>
            </>
        )

    )
}