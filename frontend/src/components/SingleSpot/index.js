import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleSpot, getSingleSpot, deleteSpotThunk } from "../../store/spots"
import { useParams } from 'react-router-dom';
import { updateSingleSpot } from "../../store/spots"
import UpdateSpot from "../UpdateSpot";
import { deleteSpot } from "../../store/spots"
import DisplayReview from "../Review";
import CreateReview from "../CreateReview"
import { useHistory } from "react-router-dom";
import DeleteSpot from "../DeleteSpot";
import "./SingleSpot.css"

function SingleSpotComponent() {

    const history = useHistory();

    const { spotId } = useParams()
    // console.log("Single Spot id", spotId)



    const singleSpot = useSelector((state) => {
        // console.log("singleSpotState", state)
        return state.spots.singleSpot
    })

    console.log("singleSpot at component", singleSpot)


    const dispatch = useDispatch()

    // const handleDelete = () => {
    //     dispatch(deleteSpotThunk(+spotId))
    //     .then(()=>history.push("/"))
    // }

    useEffect(() => {
        dispatch(getSingleSpot(+spotId)).then(() => setIsLoaded(true));

        // setIsLoaded(true)
    }, [dispatch, spotId])

    const [isLoaded, setIsLoaded] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteEdit,setShowDeleteEdit]=useState(false)
    const [showCreateReviewEdit, setShowCreateReviewEdit] = useState(false)

    const sessionUser = useSelector(state => state.session.user);


    


    return (
        <>
            {isLoaded && (
                <div>
                    <div className="title">
                        <p> ★{singleSpot.avgStarRating}</p>
                        <p>{singleSpot.numReviews} reviews</p>
                        <p>{singleSpot.address}</p>
                        <p>{singleSpot.city}</p>
                        <p>{singleSpot.state}</p>
                        <p>{singleSpot.country}</p>
                    </div>


                    <div className="updateSpot">
                        <button
                            onClick={() => setShowEdit(!showEdit)}
                        >Update Spot</button>
                    </div>
                    {showEdit && (
                        <UpdateSpot
                            showEdit={showEdit}
                            setShowEdit={setShowEdit}
                            singleSpot={singleSpot}
                            sessionUser={sessionUser}
                        />
                    )}


                    <div className="deleteSpot">
                        <button
                            onClick={() => setShowDeleteEdit(!showDeleteEdit)}
                        >Delete Spot</button>
                    </div>
                    {showDeleteEdit && (
                        <DeleteSpot
                            singleSpot={singleSpot}
                            sessionUser={sessionUser}
                            dispatch={dispatch}
                            history={history}
                            spotId={spotId}
                            setShowDeleteEdit={setShowDeleteEdit}

                        />
                    )}

                   

<h1>{singleSpot.name}</h1>
                    <div className="photos">
                        
                        {singleSpot.SpotImages.map(img => {
                            return (
                                <img id="indi-img" key={img.id} src={img.url} alt="pic" width="200" />
                            )
                        })}



                    </div>



                    <div className="hardcode">
                        <h2>Treehouse hosted by Amber</h2>
                        <p>4 guests •2 bedrooms •2 beds •1 bath</p>
                        <hr></hr>
                        <p>Featured in</p>
                        <p> Treehouse Trippers - Best Treehouses in US, July 2022</p>

                        <p>Designed by</p>
                        <p>Billy Millican</p>

                        <p> Free cancellation before Jan 24.</p>
                        <hr></hr>

                        <img src="https://a0.muscache.com/im/pictures/f4a1e0fb-bd06-4f11-91e3-8d3979d3431a.jpg" width="50" />
                        <p> Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                        <button>Learn more</button>
                        <hr></hr>
                        <p>{singleSpot.description}</p>
                        <button>Show more</button>
                        <hr></hr>


                        <h3>What this place offers</h3>
                        <p>Mountain view</p>
                        <p>Valley view</p>
                        <p>Kitchen</p>
                        <p>Wifi</p>
                        <p>Dedicated workspace</p>
                        <hr></hr>
                    </div>



                 



                    <DisplayReview
                        singleSpot={singleSpot}
                        spotId={spotId}
                    />

                    <div className="host-info">
                        <h2>Hosted by Amber</h2>
                        <span>Joined in June 2020</span>
                        <h3>During your stay</h3>
                        <span>We want to honor your privacy and the solitude the treehouse provides. However, we are always available by text, email, or phone and can be there quickly. ( Number provided before check-in)
                        </span>
                    </div>
                    <hr></hr>

                    <div className="things-to-know">
                        <h3>Things to know</h3>

                        <div className="house-rules">
                            <h4>House rules</h4>
                            <span>
                                Check-in: 4:00 PM - 12:00 AM<br />
                                Checkout before 11:00 AM<br />
                                4 guests maximum</span>
                        </div>

                        <div className="safety-property">
                            <h4>Safety & property</h4>
                            <span>
                                Security camera/recording device<br />
                                Pool/hot tub without a gate or lock<br />
                                Climbing or play structure</span>
                        </div>

                        <div className="cancellation-policy">
                            <h4>Cancellation policy</h4>
                            <span>
                                Free cancellation before Jan 24.<br />
                                Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.<br />
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SingleSpotComponent;