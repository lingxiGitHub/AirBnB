import "./EditBooking.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBookingThunk } from "../../store/booking"
import { useModal } from "../../context/Modal";



export default function EditBooking({ bookingId }) {

    const dispatch = useDispatch()

    const [startDate, setStateDate] = useState();
    const [endDate, setEndDate] = useState();

    const { closeModal } = useModal();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedBooking = {
            startDate,
            endDate
        }

        await dispatch(updateBookingThunk(updatedBooking, +bookingId))
        closeModal()
    }

    return (

        <form
            className="update-booking-form"
            onSubmit={handleUpdate}
        >

            <label><span>Address</span></label>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStateDate(e.target.value)}
            />

            <label><span>City</span> </label>
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />

            <button
                type="submit"
            >Submit</button>

        </form>
    )


}