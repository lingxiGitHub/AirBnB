import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpot } from "../../store/spots"
import { useParams } from 'react-router-dom';
import UpdateSpot from "../UpdateSpot";
import DisplayReview from "../Review";
import { useHistory } from "react-router-dom";
import DeleteSpot from "../DeleteSpot";
import "./SingleSpot.css"
import OpenModalButton from "../OpenModalButton";
import Booking from "../Booking";

function SingleSpotComponent() {

    const history = useHistory();

    const { spotId } = useParams()
    // console.log("Single Spot id", spotId)



    const singleSpot = useSelector((state) => {
        // console.log("singleSpotState", state)
        return state.spots.singleSpot
    })

    // console.log("singleSpot at component", singleSpot)


    const dispatch = useDispatch()

    // const currentUserId = useSelector(state => state.session.user.id);
    // const ownerId = useSelector(state => state.spots.singleSpot.ownerId)

    useEffect(() => {
        dispatch(getSingleSpot(+spotId)).then(() => setIsLoaded(true));

        // setIsLoaded(true)
    }, [dispatch, spotId])

    const [isLoaded, setIsLoaded] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteEdit, setShowDeleteEdit] = useState(false)
    const [showCreateReviewEdit, setShowCreateReviewEdit] = useState(false)

    const sessionUser = useSelector(state => state.session.user);

    let currentUserId;
    if (sessionUser) {
        currentUserId = sessionUser.id;
    }
    let ownerId;

    if (singleSpot) {
        ownerId = singleSpot.ownerId
    }

    const heartSvg = (<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 2; overflow: visible;"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path></svg>)





    return (
        <>
            {isLoaded && (
                <div>
                    <h1>{singleSpot.name}</h1>
                    <div className="under-name">

                        <div className="address-line">
                            <span> ★{singleSpot.avgStarRating}</span>
                            <span>{singleSpot.numReviews} reviews</span>
                            <span>{singleSpot.address}</span>
                            <span>{singleSpot.city}</span>
                            <span>{singleSpot.state}</span>
                            <span>{singleSpot.country}</span>

                        </div>

                        <div
                            className="update-delete-buttons">
                            {sessionUser && currentUserId == ownerId && (
                                <div
                                    className="update-delete-buttons"
                                >

                                    <OpenModalButton
                                        buttonText={
                                            <div className="flex-box-style-1">
                                                <i class="far fa-edit"></i>
                                                <span className="update-text">Update</span>
                                            </div>
                                        }
                                        className="single-crud"
                                        modalComponent={<UpdateSpot
                                            showEdit={showEdit}
                                            setShowEdit={setShowEdit}
                                            singleSpot={singleSpot}
                                            sessionUser={sessionUser}

                                        />} />


                                    <button
                                        onClick={() => setShowDeleteEdit(!showDeleteEdit)}
                                        className="single-crud"
                                    >
                                        <div className="flex-box-style-1">
                                            <i class="far fa-trash-alt"></i>
                                            <span className="delete-text">Delete</span>
                                        </div>

                                    </button>

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

                                </div>


                            )}

                            <button className="single-crud">
                                <i class="far fa-heart"></i>
                                <span className="save">Save</span>
                            </button>



                        </div>


                    </div>


                    <div className="photos">





                        <img className="preview-image" src={singleSpot.SpotImages.find(item => item.preview === true).url} width="300" />

                        {singleSpot.SpotImages.length > 1 && (

                            <div className="other-image">

                                {singleSpot.SpotImages.map(img => {
                                    if (img.preview === false) {
                                        return (
                                            <img className="indi-img" key={img.id} src={img.url} alt="pic" width="200" />
                                        )

                                    }

                                })}
                            </div>

                        )}



                    </div>



                    <div className="hardcode">
                        <div className="left-right-container">
                            <div className="left-part">
                                <div className="section-below-photo">
                                    <div>
                                        <h2>Entire home hosted by {singleSpot.Owner.firstName}</h2>
                                        <p>4 guests •2 bedrooms •2 beds •1 bath</p>
                                    </div>
                                    <img className="host-photo" src="https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-700-202768327.jpg" />
                                </div>
                                <hr></hr>
                                <div className="flex-box-style-1">
                                    <i class="fas fa-medal"></i>
                                    <div>
                                        <b>{singleSpot.Owner.firstName} is Superhost</b>
                                        <p>Superhosts are experienced, highly rated hosts who are commited to providing great stays for guests.</p>
                                    </div>
                                </div>

                                <div className="flex-box-style-1">


                                    <i class="fas fa-door-open"></i>
                                    <div>
                                        <b>Self check-in</b>
                                        <p>Check yourself in with the keypad.</p>
                                    </div>
                                </div>
                                <i class="fas fa-calendar-minus"></i>
                                <b>Free cancellation.</b>

                                <hr></hr>

                                <img src="https://a0.muscache.com/im/pictures/f4a1e0fb-bd06-4f11-91e3-8d3979d3431a.jpg" width="50" />
                                <p> Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>

                                <hr></hr>
                                <p>{singleSpot.description}</p>

                            </div>




                            {sessionUser && currentUserId != ownerId && (

                                <div className="right-part">
                                    <div className="three-items">
                                        <div className="booking-area">

                                            <Booking
                                                spotId={spotId}
                                                singleSpot={singleSpot}
                                            />

                                        </div>
                                    </div>

                                </div>
                            )}



                        </div>
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
                        <h2>Hosted by {singleSpot.Owner.firstName}</h2>

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