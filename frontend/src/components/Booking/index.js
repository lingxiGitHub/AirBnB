import "./Booking.css"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings, addBookingThunk } from "../../store/booking";
import { useHistory } from "react-router-dom";
import SpotSuccess from "../SpotSuccess";
import { useModal } from '../../context/Modal';

// GMT+800 or GMT-600
const gmtStr = ` GMT${new Date("2030-01-02").toString().split("GMT")[1]}`;

export default function Booking({ spotId, singleSpot }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isLoaded, setIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);



    // console.log("single spot", singleSpot)
    useEffect(() => {
        dispatch(getAllBookings(+spotId));
        setIsLoaded(true)
    }, [dispatch])

    const currentUserId = useSelector(state => state.session.user.id);
    const ownerId = useSelector(state => state.spots.singleSpot.ownerId)

    // console.log(currentUserId ===ownerId)
    // console.log(currentUserId)
    // console.log(ownerId)

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBooking = {
            startDate: startDate + gmtStr,
            endDate: endDate + gmtStr
        }



        dispatch(addBookingThunk(newBooking, spotId))
            .then(() => {
                setShowModal(true)

            })
            .catch(
                async (res) => {

                    const data = res ? await res.json() : {};
                    if (data && data.errors) setErrors(data.errors);
                }
            )



    }

    return (isLoaded && (

        <div>
            {
                currentUserId != ownerId && (
                    <>
                        <div className="booking-top-section">
                            <div>
                                <span className="price-bold">${singleSpot.price} </span>
                                <span> night</span>
                            </div>
                            <div> ★{singleSpot.avgStarRating} • {singleSpot.numReviews} reviews</div>

                        </div>




                        <form
                            className="booking-form"
                            onSubmit={handleSubmit}
                        >
                            <ul className="red-errors">
                                {

                                    Object.values(errors).map((error, idx) => (
                                        <li key={idx}>{error}</li>
                                    ))
                                }
                            </ul>

                            <div className="check-in-out">


                                <div className="check-in-div">
                                    <label >
                                        CHECK-IN</label>
                                    <input
                                        type="date"
                                        placeholder="Add date"
                                        value={startDate}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) => {
                                            // console.log("on change start date", e.target.value)
                                            setStartDate(e.target.value)
                                        }}
                                        required
                                    >

                                    </input>

                                </div>


                                <div className="check-out-div">

                                    <label>
                                        CHECKOUT </label>

                                    <input
                                        type="date"
                                        placeholder="Add date"
                                        value={endDate}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    >

                                    </input>

                                </div>

                            </div>
                            <button
                                className="reserve-button"
                                type="submit"
                            >Reserve</button>

                        </form>

                        <SpotSuccess show={showModal} />


                    </>

                )

            }

        </div>
    )

    )
}